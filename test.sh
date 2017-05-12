#!/bin/sh
set -e

WORKDIR=tmp

# setup
rm -rf $WORKDIR
mkdir $WORKDIR
cd $WORKDIR
yarn init -y

echo '{}' > if-configs.json

# test local
yarn add --dev "file:$(dirname $(pwd))"

# test remote
yarn add --dev @interfirm/configs

# teardown
cd ..
rm -rf $WORKDIR
