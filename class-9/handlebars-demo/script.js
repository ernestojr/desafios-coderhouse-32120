var template = document.getElementById('handlebars-demo').innerHTML;

var templateScript = Handlebars.compile(template);

var context = { "name" : "Ritesh Kumar", "occupation" : "developer" };

var html = templateScript(context);

document.body.innerHTML += html;
