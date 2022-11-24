import http from 'http'
import { exec, execFile, spawn, fork } from 'child_process'

(function (run) {
  if (!run) return
  console.log(`Directorio actual de trabajo: ${process.cwd()}`);
  console.log(`Id del proceso: ${process.pid}`);
  console.log(`Version de Node: ${process.version}`);
  console.log(`Titulo del proceso: ${process.title}`);
  console.log(`Sistema operativo: ${process.platform}`);
  console.log(`Directorio de ejecución: ${process.execPath}`);
  console.log(`Uso de de la memoria: ${JSON.stringify(process.memoryUsage(), null, 2)}`);
  // heapTotal y heapUsed se refieren al uso de memoria de V8.
  // external se refiere al uso de memoria de objetos C++ vinculados a objetos JavaScript administrados por V8.
  // rss, Resident Set Size es la cantidad de espacio ocupado en el dispositivo de memoria principal (que es un subconjunto de la memoria total asignada) para el proceso, incluidos todos los objetos y códigos de C++ y JavaScript.
  // arrayBuffers hace referencia a la memoria asignada para ArrayBuffers y SharedArrayBuffers, incluidos todos los búferes de Node.js. Esto también está incluido en el valor externo. Cuando Node.js se usa como una biblioteca integrada, este valor puede ser 0 porque es posible que no se realice un seguimiento de las asignaciones para ArrayBuffers en ese caso.
  process.stdout.write('Hello from \n')
})();

(function (run) {
  if (!run) return
  process.on('beforeExit', function (code) {
    console.log(`Proceso llama evento beforeExit con código: ${code}`);
  })

  process.on('exit', function (code) {
    console.log(`Proceso llama evento exit con código: ${code}`);
  })

  process.on('uncaughtException', function (error) {
    console.log(`Ocurrio un error -> ${error}`);
  })

  process.exit(-2)

  funcionquenoexiste()

  console.log('Si ves este mensaje, algo salio mal.');
})();

(function (run) {
  if (!run) return
  exec('ls -lh', (error, stdout, stderr) => {
    if(error) {
      return console.error('error', error.message)
    }
    if(stderr) {
      return console.error('stderr', stderr)
    }
  
    console.log('stdout\n', stdout);
  })
})();

(function (run) { // chmod +x example.sh
  if (!run) return
  execFile('./example.sh', (error, stdout, stderr) => {
    if(error) {
      return console.error('error', error.message)
    }
    if(stderr) {
      return console.error('stderr', stderr)
    }
  
    console.log('stdout\n', stdout);
  })
})();

(function (run) {
  if (!run) return
  const child = spawn('find', ['.'])

  child.stdout.on('data', data => {
    console.log('stdout\n', String(data))
  })

  child.stderr.on('data', data => {
    console.log('stderr:', data)
  })

  child.on('error', (error) => {
    console.error('error', error.message)
  })

  child.on('close', (code) => {
    console.log(`Proceso hijo termino con código: ${code}`);
  })
})();

(function (run) {
  if (!run) return
  let visitas = 0

  function calculo() {
    let result = 0
    for (let i = 1; i < 6e9; i++) {
      result += i
    }
    return result
  }

  const server = http.createServer()

  server.on('request', (req, res) => {
    let {url} = req
    if (url == '/calculo') {
      const result = calculo()
      res.end(`La suma es ${result}.`)
    } else if (url == '/calculo-2') {
      const computo = fork('./calculo.js')
      computo.on('message', sum => {
        computo.send('Hello')
        res.end(`La suma es ${sum}.`)
      })
    } else if (url == '/') {
      res.end(`OK ${++visitas}`)
    } else {
      res.end('404 not found')
    }
  })

  server.listen(8080, error => {
    if (error) throw new Error('Error en servidor', error.message)
    console.log('Servidor http en el puerto 8080');
  })
})(1);