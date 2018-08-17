'use strict';

/**
 * Use `server.js` to run your application without `$ strapi start`.
 * To start the server, run: `$ npm start`.
 *
 * This is handy in situations where the Strapi CLI is not relevant or useful.
 */

process.chdir(__dirname);

const express = require("express");
const proxy = require("express-http-proxy");
const strapi = require('strapi');
let app = express();




// ========================
// Google analytics proxy
// ========================

function getIpFromReq (req) { // get the client's IP address
    var bareIP = ":" + ((req.connection.socket && req.connection.socket.remoteAddress)
        || req.headers["x-forwarded-for"] || req.connection.remoteAddress || "");
    return (bareIP.match(/:([^:]+)$/) || [])[1] || "127.0.0.1";
}

app.use("/", proxy("www.google-analytics.com", {
  proxyReqPathResolver: function (req) {
      return req.url + (req.url.indexOf("?") === -1 ? "?" : "&")
          + "uip=" + encodeURIComponent(getIpFromReq(req));
  }
}));
app.listen(6868);





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



strapi.start();

