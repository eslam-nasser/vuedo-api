# API for [VueDo](https://github.com/Eslam-nasser-wd/vue-trello-clone)
> Simple api for the Basic trello clone VueDo

[<img width="60" align="middle" src="https://cdn.rawgit.com/gilbarbara/logos/e7b1dc2666c3dabe6c1276abd0a767b6ebd6af43/logos/nodejs-icon.svg">](https://nodejs.org)
[<img width="150" align="middle" src="https://cdn.worldvectorlogo.com/logos/mongodb.svg">](https://nodejs.org)
[<img width="150" align="middle" src="https://camo.githubusercontent.com/b0c9dc0e2f5bcd190403159a24d4a541e496e30a/68747470733a2f2f636f6c69676f2e696f2f696d616765732f657870726573732e737667">](https://nodejs.org)
[<img width="60" align="middle" src="https://s3-us-west-2.amazonaws.com/svgporn.com/logos/mocha.svg">](https://nodejs.org)
## Usage
To get up and running run:
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm start

# or you can use nodemon for auto server restart
nodemon
```
Yes, that's it. Only two commands!

If you still think that's too much effort, you could also run:
``` bash
$ npm i && npm start
```
## Database configurations
you can use a local database if you have mongo installed locally or use a free mongo provider like [mLab](mlab.com)
after you create your database you can place your url in `/config/default.json` and `/config/dev.json`

you can make another database just for testing and place it's url in `/config/test.json`

## Done
Now the app is running at `http://localhost:3000`, or what ever is the configs you made

For detailed explanation on how things work, checkout the [Express Docs](https://expressjs.com/en/api.html) and [MongoDB Docs](https://docs.mongodb.com/)

## Author
This app made by [Eslam nasser](https://www.facebook.com/Eslam.nasser.yousef)

## Contributing

Contributions, questions and comments are all welcome and encouraged. For code contributions submit a pull request with unit test.

## License
This project is licensed under the [MIT License](https://en.wikipedia.org/wiki/MIT_License)
