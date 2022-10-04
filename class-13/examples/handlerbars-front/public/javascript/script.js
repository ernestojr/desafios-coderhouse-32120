(function () {
  const users = [
    {
      fullname: 'Adelina Borrego',
      age: 23,
      email: 'adelinaborrego@email.com',
      phone: '00000000000',
    },
    {
      fullname: 'Sabela Garrido',
      age: 21,
      email: 'sabelagarrido@email.com',
      phone: '00000000000',
    },
    {
      fullname: 'Dylan Aroca',
      age: 24,
      email: 'dylanaroca@email.com',
      phone: '00000000000',
    },
    {
      fullname: 'Hamid Huertas',
      age: 25,
      email: 'hamidhuertas@email.com',
      phone: '00000000000',
    }
  ];

  fetch('/javascript/templates/template.hbs')
  .then(response => response.text())
  .then(text => {
    const template = Handlebars.compile(text);
    const html = template({ users });
    console.log('html', html);
    document.querySelector('tbody').innerHTML = html;
  });

})();