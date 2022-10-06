class Perimetro {
  static cuadrado(lado:number) {
    return 4 * lado
  }
  static rectangulo(base:number, altura:number) {
    return 2 * (base + altura)
  }
  static circulo(radio:number) {
    return Math.PI * radio * 2;
  }
}

export default Perimetro