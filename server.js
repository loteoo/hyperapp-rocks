const Koa = require('koa')
import {h, app} from 'hyperapp'
import {withRender} from '@hyperapp/render'
// import {view} from './src/views/Header/Header.js'


const server = new Koa();

server.use(async ctx => {
  ctx.body = 'Hello World';
});

server.listen(80);




// const strapi = require('strapi');
// const ua = require('universal-analytics');




// let server = express();

// server.use('/', express.static('public'))

// server.get('/', (req, res) => {

//   // let visitor = ua('UA-73430538-4')
//   // visitor.pageview("/").send()

//   res.send('hello world')

// })

// server.listen(80)



console.log('SSR on :80');





// TODO:
// SETUP NGINX STATIC SERVER ON :80 /public
// SSR CATCH ALL ROUTE ON :80/*

// AND STRAPI ON :1337 (disable strapi static files server)

// (should work without JS (no interaction but ok visuals))



// Front:
// preview hover links (svg icons)
// conditionnal infos in popup
// Requirements list for submission
// max img size & img resolution?
// next / prev arrows in popup
// better animations (cubic beziers anims, xbox style)

