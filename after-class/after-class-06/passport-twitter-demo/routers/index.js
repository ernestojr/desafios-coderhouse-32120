import { Router } from 'express'

import users from './users.js'
import auth from './auth.js'

const router = Router()

router.use('/auth', auth)
router.use('/users', users)

export default router