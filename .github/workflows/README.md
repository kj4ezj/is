# is.js CICD
This GitHub Actions workflow initializes, lints, tests, and publishes the `is.js` project.

### Index
1. [Triggers](#triggers)
1. [Inputs](#inputs)
1. [Steps](#steps)
1. [Outputs](#outputs)
1. [See Also](#see-also)

## Triggers
This GitHub action will run under the following circumstances:
1. When code is pushed to a base branch.
1. When a pull request is opened, new commits are pushed, or re-opened.
1. On a workflow dispatch event, a manual CI run which can be triggered by the "Workflow Dispatch" button on the "Actions" tab of the GitHub repository, among other means.

## Inputs
There are currently no user-defined inputs for this pipeline, aside from the source code itself.

## Steps
This workflow performs the following steps on GitHub runners:
1. **Attach Documentation**
    1. [Checkout](https://github.com/actions/checkout) this repo with no submodules.
    1. Attach an annotation to the GitHub Actions build summary page containing CI documentation.
1. **is.js - nodeJS v`𝕟`**  
    > This is a [matrix](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/using-a-matrix-for-your-jobs) job where `𝕟` is a set of supported `node` LTS major versions given by the `node-version` array in [`ci.yml`](./ci.yml). The following steps are run against each `node` version in the array:
    1. [Checkout](https://github.com/actions/checkout) this repo.
    1. [Setup nodeJS](https://github.com/actions/setup-node) using the specified version.
    1. Initialize the project using `yarn`.
    1. Lint.
    1. Unit tests.
    1. Run the build.
        1. Pack build metadata.
        1. Generate the distributable.
        1. Validate the distributable can be successfully installed by `npm`.
        1. If this `node` version matches the one in [`.nvmrc`](../../.nvmrc), publish to NPM.
    1. [Upload artifacts](https://github.com/actions/upload-artifact).

## Outputs
Besides the exit status, the following is generated.
- A `*.tgz` file for each `node` version containing the `is.js` project.

## See Also
- [is.js Documentation](../../README.md)

For assistance with the CI system, please open an issue in this repo.

***
> **_Legal Notice_**  
> This repo contains assets created in collaboration with a large language model, machine learning algorithm, or weak artificial intelligence (AI). This notice is required in some countries.
