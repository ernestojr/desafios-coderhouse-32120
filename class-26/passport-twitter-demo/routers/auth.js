import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.get('/twitter', passport.authenticate('twitter'))

router.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/sign-in' }), (req, res) => {
  res.redirect('/welcome')
})

export default router
