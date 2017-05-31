#!/bin/sh
set -eux

WORKDIR=tmp

# setup
tarball=$(npm pack)
rm -rf $WORKDIR
mkdir $WORKDIR
cd $WORKDIR
npm init -y
node -p 'JSON.stringify(Object.assign(require("./package.json"),{"@interfirm/configs":{rubocop:[true,".rubocop.base.yml"]}}),null,2)' > package.json.new
mv package.json.new package.json

# test
assert() {
  test -f .codeclimate.yml
  test -f .config.reek
  test -f .editorconfig
  test ! -f .rubocop.yml
  test -f .rubocop.base.yml
}

npm install --no-progress --save-dev "file:../$tarball"
cat package.json
assert

yarn install --no-progress
assert

yarn upgrade --no-progress
assert

# teardown
cd ..
rm -rf $WORKDIR
rm $tarball
