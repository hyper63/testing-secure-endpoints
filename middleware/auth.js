exports.check = function (req, res, next) {
  if (req.path === '/movies' && req.session.user) {
    req.user = req.session.user
    next()
  } else {
    res.status(401).json({ message: 'not authorized' })
  }
}
