import { Router } from 'express'
import UserController from '../controllers/users.js'

const router = Router()

router.get('/welcome', (req, res) => {
  if (req.isAuthenticated()) {
    if (!req.user.email) {
      return res.redirect('/complete-info')
    }
    res.send(`Welcome ${req.user.email || req.user.firstname} | <a href="/sign-out">Sign Out</a>`)
  } else {
    
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

router.get('/complete-info', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`
      <form action="/complete-info/${req.user._id}" method="post">
        <input required type="text" name="firstname" placeholder="firstname" value="${req.user.firstname}">
        <input required type="text" name="lastname" placeholder="lastname">
        <input required type="number" name="age" placeholder="age">
        <input required type="text" name="phone" placeholder="phone">
        <input required type="text" name="email" placeholder="email">
        <button type="submit">Send</button>
      </form>
    `)
  } else {
    res.redirect('/sign-in')
  }
});

router.post('/complete-info/:id', async (req, res, next) => {
  if (req.isAuthenticated()) {
    try {
      // const id = req.user._id // Alternativa si solo usamos la session y no pedimos el id por params.
      const { params: { id }, body } = req
      const { modifiedCount, matchedCount } = await UserController.uploadById(id, body)
      if (!modifiedCount || !matchedCount) {
        return res.redirect('/sign-in')
      }
      res.redirect('/welcome')
    } catch (error) {
      next(error)
    }
  } else {
    res.redirect('/sign-in')
  }
});

export default router
