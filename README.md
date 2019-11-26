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
    "cors": "^2.8.5",
    "fastify": "^2.10.0",
    "fastify-cli": "^1.3.0",
    "fastify-cors": "^3.0.0",
    "fastify-formbody": "^3.1.0",
    "fastify-multipart": "^1.0.2"
  }
}


const cors = require('cors')
const fastify = require('fastify')({ logger: true })

module.exports = async function (fastify, opts) {
  fastify.register(require('fastify-cors'))
  fastify.register(require('fastify-formbody'))
  fastify.register(require('fastify-multipart'))

  fastify.post('/', function (req, reply) {
    reply.code(200).send()
  })
}
