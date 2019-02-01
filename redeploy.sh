forever stopall
rm -rf dist/
rm -rf .cache/
git pull
git reset --hard origin/master
npm run build
parcel build ./src/server.js --target node --no-minify --no-source-maps --detailed-report --no-content-hash
forever ./dist/server.js > /dev/null 2>&1 &
