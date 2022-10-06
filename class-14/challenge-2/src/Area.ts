class Area {
  static cuadrado(lado:number) {
    return lado * lado
  }
  static rectangulo(base:number, altura:number) {
    return base * altura
  }
  static circulo(radio:number) {
    return Math.PI * (radio * radio);
  }
}

export default Area