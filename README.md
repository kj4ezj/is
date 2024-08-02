# is.js
Extremely lightweight, zero dependency variable checks missing in nodeJS but common in other languages.
```ts
is.nullOrEmpty(input: any): boolean
is.string(input: any): boolean;
```
Install `@kj4ezj/is` from [NPM](https://www.npmjs.com/package/@kj4ezj/is) with your preferred package manager!

<!-- contents box begin -->
<table>
<tr/>
<tr>
<td>
<p/>
<div align="center">
<b>Contents</b>
</div>
<p/>
<!-- contents markdown begin -->

1. [Background](#background)
1. [Usage](#usage)
    1. [`is.nullOrEmpty()`](#isnullorempty)
1. [Development](#development)
    1. [Prerequisites](#prerequisites)
    1. [Initialization](#initialization)
    1. [Lint](#lint)
    1. [Test](#test)
    1. [Build](#build)
    1. [Reset](#reset)
    1. [CI](#ci)
1. [See Also](#see-also)

<!-- contents markdown end -->
<p/>
</td>
</tr>
</table>
<!-- contents box end -->

## Background
In the old days™, nodeJS lacked most utilities developers take for granted in other languages. The community created libraries like [lodash](https://github.com/lodash/lodash) (commonly imported and used as `_` in projects) to fill this void. However, modern `node` includes intrinsics that provide almost all of the functionality these large libraries were built to provide. It seems silly to import a 1.4 MB library just to test if a variable is empty.

The `is.js` library provides the most fundamental utilities remaining absent in modern `node` that I expect to have in any language, and nothing more. At the time of writing, `is.js` weighs in at just _461 bytes_, five orders of magnitude smaller than `lodash`!

## Usage
Install `@kj4ezj/is` from [NPM](https://www.npmjs.com/package/@kj4ezj/is) with your preferred package manager...
```bash
bun add @kj4ezj/is
cnpm install @kj4ezj/is
npm install @kj4ezj/is
pnpm add @kj4ezj/is
yarn add @kj4ezj/is
```
...then import it into your source code.
```js
const is = require('@kj4ezj/is');
```
Two utilities are provided.
```ts
is.nullOrEmpty(input: any): boolean
is.string(input: any): boolean;
```
These are documented in the sections below, but the [test cases](./is.test.js) written against expectations should be considered authoritative.

### is.nullOrEmpty()
This is a simple variable emptiness check. Pass it literally anything and it will return `true` if it is `undefined`, `null`, or empty; and `false` otherwise.
```ts
is.nullOrEmpty(input: any): boolean
```
Emptiness is considered in a practical sense, and may be slightly different than implementations in other languages.

<!-- emptiness table begin -->
<table>
<tr/>
<tr>
<td><div align="center"><b>Category</b></div></td>
<td><div align="center"><b>Returns</b></div></td>
<td><div align="center"><b>Examples</b></div></td>
</tr>
<tr>
<td><b>Empty</b></td>
<td><code>true</code></td>
<td>
<!-- empty markdown begin -->

```js
// literals
undefined
null
[]          // zero-length arrays
[[]]        // zero-length multi-dimension arrays
{}          // empty objects
''          // equivalent to "" or ``
' '         // strings containing only whitespace
'    \n\t'

// primitive objects
Array([])
Object({})
String(' \n ')

// constructed objects
new Array([])
new Array([[]])
new Object({})
new String(' \n ')
```

<!-- empty markdown end -->
</td>
</tr>
<tr>
<td><b>Not Empty</b></td>
<td><code>false</code></td>
<td>
<!-- not empty markdown begin -->

```js
// literals
true
false
-1
0
123
0xFFFF00
0b00101010
'yeet'
[[],[]]  // non-zero array length
['one', 'two', 'three']
{key: 'value'}

// primitive types
Boolean(false)
Number(0)
BigInt(81129638414606663681390495662081)

// constructed types
new Boolean(false)
new Number(0)
new String('yeet')
new Array([[],[]])
new Object({key: 'value'})

// functions, no matter the return type or contents
() => undefined
() => null
() => false
() => 0
() => ''
() => []
() => {}
() => new Number(0)
() => new String('')
```

<!-- not empty markdown end -->
</td>
</tr>
</table>
<!-- emptiness table end -->

See the [test cases](./is.test.js) written against expectations for more info, or try it in an interactive shell.

## Development
Start here to contribute to this repo.

> [!NOTE]  
> The source of truth for the version of nodeJS this project uses is the [`.nvmrc`](./.nvmrc) file. As a utility, as many versions of `node` are supported as possible on a best-effort basis. Check out the `node-version` key in the [`ci.yml`](./.github/workflows/ci.yml) to see which versions are being tested.

### Prerequisites
Contributors will need the following tools:
- [act](https://github.com/nektos/act)
    - [docker](https://docs.docker.com/engine/install) - required by `act`
        - Docker Desktop is not required, you only need the free [Docker Engine](https://docs.docker.com/engine).
- [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- [nodeJS](https://www.w3schools.com/nodejs/nodejs_intro.asp)  
    Install `node` using `nvm`. In the root of this repo:
    ```bash
    nvm install
    ```
    This will automagically install and use the correct version of `node` for this project, as defined in the [`.nvmrc`](./.nvmrc) file.
- [yarn](https://yarnpkg.com) version 1  
    The easiest way to install this is using `npm`, which is installed with `node` by `nvm`.
    ```bash
    npm install --global yarn
    ```
These tools are all you need to get started!

### Initialization
Once you have the [prerequisites](#prerequisites) installed, you can get going by navigating to the root of this repo, making sure `nvm` is using the correct version of nodeJS...
```bash
nvm install
```
...then downloading all project dependencies.
```bash
yarn
```
Easy.

### Lint
This project uses [eslint](https://eslint.org) with customizations on top of the [airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) config to perform static code analysis.
```bash
yarn lint
```
The purpose of linting is to catch bugs early, not to create unnecessary friction, so many rules which will not realistically catch bugs are disabled.

### Test
This project uses the [jest](https://jestjs.io) test framework.
```bash
yarn test
```
The goal is full test coverage, not to chase a number but to exhaustively test all expectations.

### Build
This is how release artifacts are generated and, in [CI](#ci), published.
```bash
yarn build
```
The "build" command calls [`scripts/build.sh`](./scripts/build.sh), which packs build metadata into the [`package.json`](./package.json) under the top-level `git` key and calls `npm pack` to generate a `*.tgz` file for distribution. If this script is called in a [CI](#ci) environment then it will continue on to install the newly generated package to validate it can be installed, per [NPM's instructions](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages#testing-your-package). In a tagged build, it will verify that the tag matches the version string in the [`package.json`](./package.json) and publish it to [NPM](https://www.npmjs.com/package/@kj4ezj/is) with [provenance](https://docs.npmjs.com/generating-provenance-statements).

### Reset
This project contains a script to sanitize the project's `node` environment.

> [!WARNING]  
> This will delete build artifacts!

```bash
yarn reset
```
This makes it easy to switch between `node` major versions cleanly.

### CI
This project uses GitHub Actions for CI.
- **is.js CI**s - initialize, lint, and test, and publish the `is.js` project.
    - [Pipeline](https://github.com/kj4ezj/is/actions/workflows/ci.yml)
    - [Documentation](./.github/workflows/README.md)

You can run the GitHub Actions workflow(s) locally using [act](https://github.com/nektos/act).
```bash
yarn act
```
Please make sure your changes do not break `act` compatibility.

## See Also
- CI
    - [Pipeline](https://github.com/kj4ezj/is/actions/workflows/ci.yml)
    - [Documentation](./.github/workflows/README.md)
- Tooling
    - [act](https://github.com/nektos/act) - run GitHub Actions locally
    - [docker](https://docs.docker.com/engine)
    - [eslint](https://eslint.org)
        - [airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base)
    - [jest](https://jestjs.io)
    - [nvm](https://github.com/nvm-sh/nvm)
    - [nodeJS](https://www.w3schools.com/nodejs/nodejs_intro.asp)
    - [yarn](https://yarnpkg.com)

***
> **_Legal Notice_**  
> This repo contains assets created in collaboration with a large language model, machine learning algorithm, or weak artificial intelligence (AI). This notice is required in some countries.
