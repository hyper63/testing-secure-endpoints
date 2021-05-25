exports.check = function (req, res, next) {
  if (req.path !== '/login' && req.session.user) {
    next()
  } else {
    res.status(401).json({ message: 'not authorized' })
  }
}
