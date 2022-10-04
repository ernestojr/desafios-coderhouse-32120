(function () {
  const lista:Array<string> = ['Ernest', 'Jose', 'Juan', 'Pedro']
  lista.map((nombre:string, index:number) => {
    return `${index + 1} ${nombre}`;
  }).forEach((item:string) => {
    console.log(item)
  })
})();