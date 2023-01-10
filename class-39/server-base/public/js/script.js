(function () {
  const form = document.getElementById('person-form');
  const table = document.getElementById('persons-table');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    fetch('/data-onwire', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: document.getElementById('name').value,
        lastname: document.getElementById('lastname').value,
        dni: document.getElementById('dni').value,
      })
    })
      .then((response) => response.json())
      .then(() => {
        getPersons();
        form.reset();
      });
  });

  function getPersons() {
    fetch('/data-json')
      .then((response) => response.json())
      .then(data => {
        let html = `
        <tr>
          <th>Name</th>
          <th>Lastname</th>
          <th>DNI</th>
        </tr>`;
        data.forEach(person => {
          html += `
          <tr>
            <td>${person.name}</td>
            <td>${person.lastname}</td>
            <td>${person.dni}</td>
          </tr>`;
        });
        table.innerHTML = html;
      });
  }
  getPersons();
})();