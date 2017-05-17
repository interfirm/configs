#!/bin/sh
set -eux

WORKDIR=tmp

# setup
rm -rf $WORKDIR
mkdir $WORKDIR
cd $WORKDIR
npm init -y
cat <<JS >update-package.js
const fs = require("fs");
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
pkg["@interfirm/configs"] = { rubocop: [true, ".rubocop.base.yml"] };
fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2), "utf8");
JS
node update-package.js

# test
function assert() {
  test -f .codeclimate.yml
  test -f .config.reek
  test -f .editorconfig
  test ! -f .rubocop.yml
  test -f .rubocop.base.yml
}

npm install --no-progress --save-dev "file:$(dirname $(pwd))"
cat package.json
assert

yarn install --no-progress
assert

yarn upgrade --no-progress
assert

# teardown
cd ..
rm -rf $WORKDIR
