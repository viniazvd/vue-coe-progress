# server
```js
const concat = require('concat-stream')

module.exports = async function (fastify, opts) {
  fastify.register(require('fastify-cors'))
  fastify.register(require('fastify-multipart'), { limits: { fileSize: 3000000 } })
  fastify.post('/', function (req, reply) {
    const mp = req.multipart(handler,
      (err) => {
        if (err) reply.code(400).send(err)
        reply.code(200).send('done')
      }
    )

    function handler(field, file, filename, encoding, mimetype) {
      file.pipe(concat(function (buf) {
        console.log('received', filename, 'size', buf.length)
      }))

      file.on('limit', () => reply.code(500).send('File size limit reached'))
    }

    mp.on('filesLimit', () => reply.code(400).send('Maximum number of files reached'))
    mp.on('fieldsLimit', () => reply.code(400).send('Maximim number of fields reached'))
    mp.on('partsLimit', () => reply.code(400).send('Maximum number of form parts reached'))
  })
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
  "devDependencies": {
    "cors": "^2.8.5",
    "fastify": "^2.10.0",
    "fastify-cli": "^1.3.0",
    "fastify-cors": "^3.0.0",
    "concat-stream": "^2.0.0",
    "fastify-multipart": "^1.0.2"
  }
}
```
