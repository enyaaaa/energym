echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r dist/* energym@139.162.58.164:/var/www/139.162.58.164/

echo "Done!"