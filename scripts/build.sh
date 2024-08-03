#!/bin/bash
set -eo pipefail

function ee()
{
    echo "$ $*"
    eval "$@" || :
}

echo "Starting build. - ${BASH_SOURCE[0]}"
# environment
NPM_ROOT="$(npm run env | grep '^PWD' | cut -d '=' -f '2')"
pushd "$NPM_ROOT"
ee node --version
ee yarn --version
ee npm --version
if [[ "$CI" == 'true' && -z "$ACT" && -n "$NODE_AUTH_TOKEN" ]]; then
    printf '\e[1;35mNOTICE: Found NODE_AUTH_TOKEN of length %s.\e[0m\n' "${#NODE_AUTH_TOKEN}"
elif [[ "$CI" == 'true' && -z "$ACT" ]]; then
    printf '\e[1;31mERROR: Missing NODE_AUTH_TOKEN!\e[0m\n'
    exit 11
else
    echo 'Ignoring NODE_AUTH_TOKEN for local build.'
fi
# package info
PACKAGE_NAME="$(cat package.json | jq -r '.name')"
PACKAGE_VERSION="$(cat package.json | jq -r '.version')"
echo "Found package.json for \"$PACKAGE_NAME\" version \"$PACKAGE_VERSION\"."
# git info
export GIT_COMMIT="$(git rev-parse HEAD)"
export GIT_SHORT_COMMIT="$(git rev-parse --short HEAD)"
export GIT_TAG="$(git --no-pager tag --points-at HEAD)"
# verify git tag matches package.json version, if it exists
if [[ -z "$GIT_TAG" ]]; then
    printf '\e[1;33mNOTICE: Not a tagged build, no software will be published.\e[0m\n'
elif [[ "$GIT_TAG" != "v$PACKAGE_VERSION" ]]; then
    printf '\e[1;31mERROR: The git tag does not match the package.json version!\e[0m\n'
    echo "             git tag: $GIT_TAG"
    echo "package.json version: $PACKAGE_VERSION"
    echo 'These must match to build a release. Rejecting build.'
    exit 10
else
    printf '\e[1;36mNOTICE: Tagged build, software will be published!\e[0m\n'
fi
# git branch
export GIT_BRANCH="$(git branch --show-current)"
if [[ -z "$GIT_BRANCH" ]]; then # detached head, find tag on base branch or return a feature branch
    BRANCHES="$(git branch --contains "$GIT_COMMIT" | tail -n +2 | tr -d ' ')" # get branches containing tag
    if [[ "$(echo "$BRANCHES" | grep -cP '^develop$')" == '1' ]]; then
        export GIT_BRANCH='develop'
    elif [[ "$(echo "$BRANCHES" | grep -cP '^main$')" == '1' ]]; then
        export GIT_BRANCH='main'
    elif [[ "$(echo "$BRANCHES" | grep -cP '^master$')" == '1' ]]; then
        export GIT_BRANCH='master'
    else
        export GIT_BRANCH="$(echo "$BRANCHES" | tail -n 1 | tr -d '[:space:]')"
    fi
fi
# github actions info
if [[ -n "$GITHUB_TRIGGERING_ACTOR" ]]; then
    export ACTOR="$GITHUB_TRIGGERING_ACTOR"
elif [[ -n "$GITHUB_ACTOR" ]]; then
    export ACTOR="$GITHUB_ACTOR"
else
    export ACTOR="$USER@$HOSTNAME"
fi
[[ -z "$GITHUB_ACTIONS" ]] && export GITHUB_ACTIONS='false'
# pack metadata into the package.json
echo 'Adding git metadata to package.json.'
export UNIX_TIME="$(date +%s)"
ee "mv package.json package.json.$UNIX_TIME.bak"
cat package.json.$UNIX_TIME.bak | jq \
    --arg branch "$GIT_BRANCH" \
    --argjson is_gh_action "$GITHUB_ACTIONS" \
    --arg node_version "$(node --version)" \
    --arg tag "$GIT_TAG" \
    '.git += {
        actor: env.ACTOR,
        branch: (if $branch == "" then null else $branch end),
        build: (if $is_gh_action then (env.GITHUB_RUN_NUMBER | tonumber) else "local" end),
        build_id: (if $is_gh_action then (env.GITHUB_RUN_ID | tonumber) else null end),
        build_node_version: $node_version,
        build_time: (env.UNIX_TIME | tonumber),
        build_url: (if $is_gh_action then (env.GITHUB_SERVER_URL + "/" + env.GITHUB_REPOSITORY + "/actions/runs/" + env.GITHUB_RUN_ID) else null end),
        commit: env.GIT_COMMIT,
        short_commit: env.GIT_SHORT_COMMIT,
        tag: (if $tag == "" then null else $tag end)
    }' > package.json
ee 'cat package.json | jq .git'
# build
echo 'Building...'
ee 'npm pack'
# validate
if [[ "$CI" == 'true' ]]; then
    echo 'Validating package can be installed...'
    ee 'npm install -g kj4ezj-is-*.tgz'
else
    printf '\e[1;33mNOTICE: Skipping validation step for local build.\e[0m\n'
fi
# publish
echo 'Publishing...'
if [[ -z "$GIT_TAG" ]]; then
    printf '\e[1;33mNOTICE: Not a tagged build, no software will be published.\e[0m\n'
elif [[ "$CI" != 'true' || -n "$ACT" ]]; then
    printf '\e[1;33mNOTICE: Skipping publish step for local build.\e[0m\n'
elif [[ "$NODE_MAJOR_VERSION" != "$(cat .nvmrc | tr -d '[:space:]')" ]]; then
    printf '\e[1;33mNOTICE: Skipping publish step for older Node.js matrix job.\e[0m\n'
else
    echo "//registry.npmjs.org/:_authToken=$NODE_AUTH_TOKEN" > ~/.npmrc
    ee 'npm publish --provenance --access public'
    printf '\e[1;32mPublished to npm!\e[0m\n'
fi
# clean up
echo 'Cleaning up.'
ee mv package.json.$UNIX_TIME.bak package.json
popd
echo "Done. - ${BASH_SOURCE[0]}"
