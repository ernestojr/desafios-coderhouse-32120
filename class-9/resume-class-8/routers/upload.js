const { Router } = require('express')
const multer  = require('multer')
const {actualizarAvatarPorId} = require('../controllers/usuarios')
const {BadRequestError} = require('../utils/errores')
const validadorUsuarioExisteMiddleware = require('../middlewares/validator-usuario-existe')

const router = Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'pictures/')
  },
  filename: function (req, file, cb) {
    const usuarioId = req.usuario._id
    const extArray = file.mimetype.split('/')
    const extension = extArray[extArray.length - 1]
    cb(null, `${usuarioId}.${extension}`)
  }
})

const upload = multer({ storage })

router.put('/:id/avatar',
  validadorUsuarioExisteMiddleware,
  upload.single('avatar'),
  async (req, res, next) => {
    try {
      if (!req.file) {
        throw new BadRequestError('Debe subir una archivo valido para esta acción.')
      }
      const result = await actualizarAvatarPorId(req.usuario._id, req.file)
      res.json(result)
    } catch (error) {
      next(error)
    }
})

module.exports = router