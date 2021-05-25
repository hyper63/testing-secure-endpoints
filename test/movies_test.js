const test = require('tape')
const testServer = require('@twilson63/test-server')
const fetch = require('node-fetch')
const sinon = require('sinon')
const auth = require('../middleware/auth')

sinon.stub(auth, 'check').callsFake(function (req, res, next) {
  req.user = 'bob'
  next()
})

const app = require('../server')

test('List Movies', async (t) => {
  t.plan(1)
  const server = testServer(app)
  const result = await fetch(server.url + '/movies').then(r => r.json())
  t.deepEqual(result, ['Ghostbusters', 'Grounhog Day', 'What about Bob?', 'Stripes', 'Caddyshack'])

  server.close()
})

