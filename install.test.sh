#!/bin/sh
set -eux

WORKDIR=tmp

# setup
rm -rf $WORKDIR
mkdir $WORKDIR
cd $WORKDIR
npm init -y

# test local
npm install --save-dev "file:$(dirname $(pwd))" --no-progress
test -f .codeclimate.yml
test -f .config.reek
test -f .editorconfig
test -f .rubocop.yml

# teardown
cd ..
rm -rf $WORKDIR
