import { Router } from 'express'

const router = Router()

router.get('/welcome', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Welcome ${req.user.email} | <a href="/sign-out">Sign Out</a>`)
  } else {
    res.redirect('/sign-in')
  }
});

router.get('/sign-in', (req, res) => {
  res.send('<a href="/api/auth/twitter">Sign in with twitter</a>')
});

router.get('/sign-out', (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error)
    }
    res.redirect('/sign-in')
  })
});

export default router
