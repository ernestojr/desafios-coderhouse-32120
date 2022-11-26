process.on("message", (msg) => {
  console.log(`Message from app.js: ${msg}`)
  if (msg === 'start-task') {
    process.send(calculo())
    process.send('Adios!')
    process.exit()
  }
});

function calculo() {
  let result = 0
  console.log('calculando...');
  for (let i = 1; i < 6e9; i++) {
    result += i
  }
  return result
}

process.send('ready')