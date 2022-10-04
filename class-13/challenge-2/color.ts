
function random(min:number, max:number) : number {
  return Math.floor((Math.random() * (max - min + 1)) + min);
}

class Color {
  static generarColorRGB() {
    const variable = 'valor 2'
    console.log(variable, variable);
    const rojo: number = random(0, 255)
    const verde: number = random(0, 255)
    const azul: number = random(0, 255)
    return {
      rojo,
      verde,
      azul,
    }
  }
}

console.log('01', Color.generarColorRGB())
console.log('02', Color.generarColorRGB())
console.log('03', Color.generarColorRGB())