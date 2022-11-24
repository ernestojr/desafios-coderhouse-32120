process.on("message", function (message) {
  console.log(`Message from app.js: ${message}`);
});

function calculo() {
  let result = 0
  console.log('calculando...');
  for (let i = 1; i < 6e9; i++) {
    result += i
  }
  return result
}

process.send(calculo())