[![NPM version](https://img.shields.io/npm/v/@interfirm/configs.svg)](https://www.npmjs.com/package/@interfirm/configs)
[![Build Status](https://travis-ci.org/interfirm/configs.svg)](https://travis-ci.org/interfirm/configs)

# INTERFIRM Configs

This repository manages common config files for INTERFIRM projects.
All config files are in `/templates` directory.

## Usage

1. Edit `@interfirm/configs` entry in `package.json`.
2. Install via `npm` or `yarn`:

```
npm install --save-dev @interfirm/configs
```

```
yarn add --dev @interfirm/configs
```

This package automatically copies config files to the installed repository when downloaded into your `node_modules`.

## Configuration

```
"key": boolean || [boolean, destinationPath]
```

Default configuration:

```json
{
  "@interfirm/configs": {
    "reek": true,
    "codeclimate": true,
    "rubocop": true,
    "editorconfig": true
  }
}
```

If you omit `destinationPath`, config files are copied to default path.

## Available config files

| service/tool | key | default path |
| --- | --- | --- |
| [reek](https://github.com/troessner/reek) | reek | .config.reek |
| [Code Climate](https://codeclimate.com/) | codeclimate | .codeclimate.yml |
| [Rubocop](https://github.com/bbatsov/rubocop) | rubocop | .rubocop.yml |
| [EditorConfig](http://editorconfig.org/) | editorconfig | .editorconfig |

## Release

1. Run [`yarn version`](https://yarnpkg.com/en/docs/cli/version) command.
2. Push new tag to remote repository.
3. New version will be published by Travis automatically.

Example:

``` sh
$ git checkout master
$ git pull
$ yarn version
$ git push --follow-tags
```
