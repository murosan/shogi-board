#!/usr/bin/env bash -e

read -ep "Version (ex. 1.0.0) > " VERSION
cd $(dirname $0)/..

SB_DIR="shogi-board-$VERSION"
DEST="release/$SB_DIR"

export PUBLIC_URL="./"

rm -rf $DEST
mkdir -p $DEST

yarn build
cp -a build/* $DEST

cd release
tar cvzf $SB_DIR.tar.gz $SB_DIR
rm -rf $SB_DIR
