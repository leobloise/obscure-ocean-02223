git commit -am "$1"
git push heroku master
heroku logs --tail