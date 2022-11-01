import assert from 'assert'

class Calculadora {
  static suma(a, b) {
    const resultado = a + b
    return resultado
  }
}

function testSuma() {
  try {
    assert.equal(Calculadora.suma(3, 3), 8)
    console.log('Test OK!')
  } catch (error) {
    console.log('Test Filed:', error)
  }
}

testSuma()