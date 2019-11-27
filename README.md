https://gist.github.com/viniazvd/ab0b546a7b1b9171b9aa5e3ee67de63b

# server
```js
module.exports = function (fastify, options, next) {
  fastify.register(require('fastify-cors'))
  fastify.register(require('fastify-formbody'))
  fastify.register(require('fastify-multipart'))

  fastify.post('/', function (_req, reply) {
    reply.code(200).send()
  })

  next()
}
```

package.son
```json
{
  "name": "upload-server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "fastify start index.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "fastify": "^2.10.0",
    "fastify-cli": "^1.3.0",
    "fastify-cors": "^3.0.0",
    "fastify-formbody": "^3.1.0",
    "fastify-multipart": "^1.0.2"
  }
}
```
