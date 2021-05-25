const express = require('express')
const session = require('express-session')
const app = express()
const auth = require('./middleware/auth')

app.use(session({
  secret: 'jack russell',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(auth.check)

app.post('/login', (req, res) => {
  req.session.user = { name: req.query.name }
  res.status(201).json({ ok: true })
})

app.get('/movies', (req, res) => {
  res.status(200).json(['Ghostbusters', 'Grounhog Day', 'What about Bob?', 'Stripes', 'Caddyshack'])
})

app.get('/logout', (req, res) => {
  res.session.user = null
  res.json({ ok: true })
})

if (!module.parent) {
  app.listen(3000)
}

module.exports = app
