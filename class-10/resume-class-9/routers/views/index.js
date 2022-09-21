const { Router } = require('express')
const obtener = require('./obtener')

const router = Router()
router.use('/usuarios', obtener)

module.exports = router