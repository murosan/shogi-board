#!/bin/bash -xe

CWD=$(cd $(dirname $0); pwd)
PROJECT_ROOT=$(cd $CWD/..; pwd)
DOCS_ROOT="$PROJECT_ROOT/document"

export PUBLIC_URL="/shogi-board/playground"

cd $PROJECT_ROOT

yarn test:c

# insert Google Analytics to index.html
node $PROJECT_ROOT/scripts/ga.js insert

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
function replace() {
  find . -type f -name "*.html" -print0 | \
  xargs -0 sed -i '' -e "s/$1/$2/g"
}

replace 'html lang=""' 'html lang="ja"'
replace 'html lang="en"' 'html lang="ja"'

# copy application to playground directory
mkdir playground
cp -r $PROJECT_ROOT/build/* ./playground/

# restore index.html
node $PROJECT_ROOT/scripts/ga.js remove

# deploy
read -p "Are you sure to deploy? [y/n]" CONFIRM
if [[ $CONFIRM != "y" ]]; then exit 1; fi
gh-pages -m '[ci skip] Updates' -d .
