import express from 'express'
import http from 'http'
import { v4 as uuidV4 } from 'uuid'
import { exec, execFile } from 'child_process'

const app = express()

const PORT = process.env.NODE_PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('<h1>Hello world!</h1>')
})

app.get('/download', (req, res) => {
  const { query: { target } } = req
  const folderName = uuidV4()
  const fileName = `${folderName}.zip`
  execFile('./scripts/download.sh', [target, folderName], (error, stdout, stderr) => {
    if(error) {
      console.error('error', error.message)
      return res.status(500).json({ error })
    }
    if(stderr) {
      console.error('stderr', stderr)
    }
    console.log('stdout\n', stdout);

    res.download(`./${fileName}`, 'repo.zip', (err) => {
      if(err) {
        console.error('Download error', err.message)
      }
      exec(`rm ./${fileName}`, (error, stdout, stderr) => {
        if(error) {
          console.error('Final rm error', error.message)
          return res.status(500).json({ error })
        }
        if(stderr) {
          console.error('Final rm stderr', stderr)
        }
        console.log('Final rm stdout\n', stdout);
      })
    })
  })
})


const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}/`)
})