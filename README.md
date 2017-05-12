[![NPM version](https://img.shields.io/npm/v/@interfirm/configs.svg)](https://www.npmjs.com/package/@interfirm/configs)
[![Build Status](https://travis-ci.com/interfirm/configs.svg?token=z7WQGZviWBM4zmGAt52E)](https://travis-ci.com/interfirm/configs)

# INTERFIRM Configs

This repository manages common config files for INTERFIRM projects.
All config files are in `/templates` directory.

## Usage

1. Put `if-configs.json` at the root directory of your repository
1. Install via npm/yarn: `yarn add --dev @interfirm/configs`

This package automatically copies config files to the installed repository when downloaded into your `node_modules`.

## Configuration

By default, this package doesn't copy any files.
To copy config files, you need to configure which config file should be copied via `if-configs.json`.

Example:

```js
{
  // "key": boolean || [boolean, destinationPath]
  "reek": true,
  "codeclimate": true,
  "rubocop": [true, ".rubocop.base.yml"]
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
