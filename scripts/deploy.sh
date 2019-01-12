#!/bin/bash -xe

CWD=$(cd $(dirname $0); pwd)
PROJECT_ROOT=$(cd $CWD/..; pwd)
DOCS_ROOT="$PROJECT_ROOT/document"

export PUBLIC_URL="/shogi-board/playground"

cd $PROJECT_ROOT

yarn test:c

# build app
yarn build

# build document
cd $DOCS_ROOT/website
yarn build

# change language of document files
# en → ja
cd $DOCS_ROOT/website/build/shogi-board

# sitemap
sed -i '' -e 's/hreflang="en"/hreflang="ja"/g' ./sitemap.xml
sed -i '' -e 's/shogi-board\/en\//shogi-board\//g' ./sitemap.xml

# html files
find . -type f -name "*.html" -print0 | \
xargs -0 sed -i '' -e 's/html lang=""/html lang="ja"/g'

find . -type f -name "*.html" -print0 | \
xargs -0 sed -i '' -e 's/html lang="en"/html lang="ja"/g'

# copy application to playground directory
mkdir playground
cp -r $PROJECT_ROOT/build/* ./playground/

# deploy
gh-pages -m '[ci skip] Updates' -d .
