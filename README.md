# is
Extremely lightweight, zero dependency variable checks missing in nodeJS but common in other languages.

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

1. [Development](#development)
    1. [Prerequisites](#prerequisites)
    1. [Initialization](#initialization)
1. [See Also](#see-also)

<!-- contents markdown end -->
<p/>
</td>
</tr>
</table>
<!-- contents box end -->

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

## See Also
- [act](https://github.com/nektos/act) - run GitHub Actions locally
- [docker](https://docs.docker.com/engine)
- [nvm](https://github.com/nvm-sh/nvm)
- [nodeJS](https://www.w3schools.com/nodejs/nodejs_intro.asp)
- [yarn](https://yarnpkg.com)

***
> **_Legal Notice_**  
> This repo contains assets created in collaboration with a large language model, machine learning algorithm, or weak artificial intelligence (AI). This notice is required in some countries.
