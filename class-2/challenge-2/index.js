class Contador {
  constructor (responsible) {
    this.counter = 0
    this.responsible = responsible
  }

  static total = 0

  getResponsible() {
    return this.responsible
  }

  getIndivudualCount() {
    return this.counter
  }

  getTotalCount() {
    return Contador.total
  }

  count() {
    this.counter += 1
    Contador.total += 1
  }
}


const c1 = new Contador('Pedro')
const c2 = new Contador('María')
const c3 = new Contador('Ana')

c2.count()

c1.count()
c1.count()

c3.count()
c3.count()
c3.count()

console.log(c1.getResponsible(), c1.getIndivudualCount())
console.log(c2.getResponsible(), c2.getIndivudualCount())
console.log(c3.getResponsible(), c3.getIndivudualCount())
console.log('Total', c3.getTotalCount())
