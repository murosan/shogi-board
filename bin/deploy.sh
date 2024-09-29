#!/bin/bash -xe

CWD=$(cd $(dirname $0); pwd)
PROJECT_ROOT=$(cd $CWD/..; pwd)
DOCS_ROOT="$PROJECT_ROOT/document"

export PUBLIC_URL="/shogi-board/playground"

cd $PROJECT_ROOT

yarn test:c

# insert Google Analytics to index.html
node $PROJECT_ROOT/bin/ga.js insert

# build app
yarn build

# build document
cd $DOCS_ROOT/website
yarn build

# change language of document files
# en → ja
cd $DOCS_ROOT/website/build/shogi-board

check_sed_version() {
  if sed --version >/dev/null 2>&1; then
    echo "gnu"
  else
    echo "bsd"
  fi
}

sed_version=$(check_sed_version)

# sitemap
if [ "$sed_version" = "gnu" ]; then
  sed -i -e 's/hreflang="en"/hreflang="ja"/g' ./sitemap.xml
  sed -i -e 's/shogi-board\/en\//shogi-board\//g' ./sitemap.xml
else
  sed -i '' -e 's/hreflang="en"/hreflang="ja"/g' ./sitemap.xml
  sed -i '' -e 's/shogi-board\/en\//shogi-board\//g' ./sitemap.xml
fi


# html files
function replace() {
  if [ "$sed_version" = "gnu" ]; then
    find . -type f -name "*.html" -print0 | xargs -0 sed -i -e "s/$1/$2/g"
  else
    find . -type f -name "*.html" -print0 | xargs -0 sed -i '' -e "s/$1/$2/g"
  fi
}

replace 'html lang=""' 'html lang="ja"'
replace 'html lang="en"' 'html lang="ja"'

# copy application to playground directory
mkdir playground
cp -r $PROJECT_ROOT/build/* ./playground/

# restore index.html
node $PROJECT_ROOT/bin/ga.js remove

# deploy
read -p "Are you sure to deploy? [y/n]" CONFIRM
if [[ $CONFIRM != "y" ]]; then exit 1; fi
$PROJECT_ROOT/node_modules/gh-pages/bin/gh-pages.js -m '[ci skip] Updates' -d .
