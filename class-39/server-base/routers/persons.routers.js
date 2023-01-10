import { Router } from 'express'

import persons from '../controllers/persons.controllers.js'

const router = Router()

router.get('/', )

router.get('/html-onwire', persons.get)
router.post('/html-onwire', persons.create)

router.post('/data-onwire', persons.createJSON)
router.get('/data-json', persons.getJSON)

export default router