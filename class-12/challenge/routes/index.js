const { Router } = require('express')
const { emit } = require('../socket')

const router = Router()

router.post('/aviso', (req, res) => {
  const { body } = req
  console.log('aviso', body);
  emit('notification', body)
  res.send('OK')
})

module.exports = router