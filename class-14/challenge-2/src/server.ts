import express from 'express'
import http from 'http'

import Perimetro from './Perimetro'
import Area from './Area'

const app = express()

const PORT = process.env.PORT || 8080

app.get('/perimetro/cuadrado', (req, res) => {
  const lado:number = parseFloat(req.query.lado as string)
  const resultado = Perimetro.cuadrado(lado)
  res.json({
    tipo: 'perimetro',
    figura: 'cuadrado',
    parametros: { lado },
    resultado,
  })
})

app.get('/perimetro/rectangulo', (req, res) => {
  const base:number = parseFloat(req.query.base as string)
  const altura:number = parseFloat(req.query.altura as string)
  const resultado = Perimetro.rectangulo(base, altura)
  res.json({
    tipo: 'perimetro',
    figura: 'rectangulo',
    parametros: { base, altura },
    resultado,
  })
})

app.get('/perimetro/circulo', (req, res) => {
  const radio:number = parseFloat(req.query.radio as string)
  const resultado = Perimetro.circulo(radio)
  res.json({
    tipo: 'perimetro',
    figura: 'circulo',
    parametros: { radio },
    resultado,
  })
})

app.get('/area/:figura', (req, res) => {
  const figura:string = req.params.figura as string
  let parametros
  let resultado
  switch(figura) {
    case 'cuadrado':
      const lado:number = parseFloat(req.query.lado as string)
      resultado = Area.cuadrado(lado)
      parametros = { lado }
      break
    case 'rectangulo':
      const base:number = parseFloat(req.query.base as string)
      const altura:number = parseFloat(req.query.altura as string)
      resultado = Area.rectangulo(base, altura)
      parametros = { base, altura }
      break
    case 'circulo':
      const radio:number = parseFloat(req.query.radio as string)
      resultado = Area.circulo(radio)
      parametros = { radio }
      break
  }
  res.json({
    tipo: 'area',
    figura,
    parametros,
    resultado,
  })
})

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`conectado al puerto: ${PORT}`)
})
