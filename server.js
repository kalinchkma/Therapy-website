/** @format */
const express = require('express');
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next');
const path = require("path");
 
const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()
 
app.prepare().then(() => {
  const server = express();

  server.use(express.static(path.join(__dirname, "public")));

  server.use(async (req, res) => {
    try {
      
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl
 
      if (pathname === '/a') {
        await app.render(req, res, '/a', query)
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query)
      } else {
        await handle(req, res, parsedUrl)
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })

  // server.on('error', (e) => {
  //   if (e.code === 'EADDRINUSE') {
  //     console.error('Address in use, retrying...');
  //     setTimeout(() => {
  //       server.close();
  //       server.listen(PORT, HOST);
  //     }, 1000);
  //   }
  // });
  server.listen(port, (e) => {
    console.log(e);
    console.log("server is running on port", port);
  })
 

  // createServer(async (req, res) => {
  //   try {
      
  //     // Be sure to pass `true` as the second argument to `url.parse`.
  //     // This tells it to parse the query portion of the URL.
  //     const parsedUrl = parse(req.url, true)
  //     const { pathname, query } = parsedUrl
 
  //     if (pathname === '/a') {
  //       await app.render(req, res, '/a', query)
  //     } else if (pathname === '/b') {
  //       await app.render(req, res, '/b', query)
  //     } else {
  //       await handle(req, res, parsedUrl)
  //     }
  //   } catch (err) {
  //     console.error('Error occurred handling', req.url, err)
  //     res.statusCode = 500
  //     res.end('internal server error')
  //   }
  // })
  //   .once('error', (err) => {
  //     console.error(err)
  //     process.exit(1)
  //   })
  //   .listen(port, () => {
  //     console.log(`> Ready on http://${hostname}:${port}`)
  //   })



})
