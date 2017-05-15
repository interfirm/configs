#!/bin/sh
set -e

WORKDIR=tmp

# setup
rm -rf $WORKDIR
mkdir $WORKDIR
cd $WORKDIR
yarn init -y

# test local
yarn add --dev "file:$(dirname $(pwd))"
ls -l node_modules/@interfirm/configs

# teardown
cd ..
rm -rf $WORKDIR
