const express = require('express');
const cursos = require('./cursos');
const app = express();
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bienvenid@s al servidor web con rutas dinámicas!');
});

// url params
app.get('/cursos/:categoria', (req, res) => {
  let parametro = req.params.categoria.trim().toLowerCase();
  console.log(parametro)
  if (parametro !== '') {
    let resultado = []
    for (let curso of cursos) {
      if (curso.categoria.toLowerCase() === parametro) {
        resultado.push(curso)
      }
    }
    // opcion 1 de resultado --> if/else comun
    // if (resultado.length > 0) {
    //   res.json(resultado) 
    // } else {
    //   res.json({id:'ERROR', description:'No se encuentra coincidencias'})
    // }

    // opcion 2 ---> triada --> 
    // condicion ? resultado si cumple la condicion: resultado si no cumple la condicion
    resultado.length > 0 ?
      res.json(resultado) : res.json({ id: 'ERROR', description: 'No se encuentra coincidencias' })
  }
})

app.get('/cursos', (req, res) => {
  const queryParams = Object.keys(req.query)
  if (queryParams.length === 0) {
    res.json(cursos);
  } else {
    let resultado = [];
    for (let curso of cursos) {
      res.send(typeof req.query.id)
      // && es and 
      // valor1 | valor2 | result
      // true | true | true |
      // false | true | false
      // true false false
      // false | false | true
      // || es or
      // valor1 | valor2 | result
      // true | true | true 
      // false | true | true
      // true | false |true
      // false | false | false
      console.log(req.query)
      if (curso.nombre.toLowerCase() === String(req.query.nombre).toLowerCase()
        && curso.categoria.toLowerCase() === String(req.query.categoria).toLowerCase()) {
        resultado.push(curso)
      }
    }
    resultado.length > 0 ?
      res.json(resultado) : res.json({ id: 'ERROR', description: req.query.nombre })
  }
})

app.get('/curso/codigo/:id', (req, res) => {
  let id = parseInt(req.params.id.trim())
  console.log(id)
  console.log(typeof id)
  if (typeof id !== "number") {
    res.json({ id: 'ERROR', description: 'No se encuentra coincidencias' })
  } else {
    let resultado = [];
    for (let curso of cursos) {
      if (curso.id == id) {
        console.log(curso)
        resultado.push(curso)
      }
    }
    console.log("resultado", resultado)
    resultado.length > 0 ?
      res.json(resultado) : res.json({ id: 'ERROR', description: req.query.nombre })

  }


})


app.get('/curso/nombre/:nombre', (req, res) => {
  // saco espacios y todo en minúsculas
  let parametro = req.params.nombre.trim().toLowerCase();
  console.log(parametro)
  if (parametro !== '') {
    let resultado = []
    for (let curso of cursos) {
    // uso el método includes para Strings, devuelve en este caso un true o false, no es necesario compararlo de nuevo con parametro porque seria comparar un boolean con un string.
      if (curso.nombre.toLowerCase().includes(parametro)) {
        console.log(curso)
        resultado.push(curso)
      }
    }
    resultado.length > 0 ?
      res.json(resultado) : res.json({ id: 'ERROR', description: 'No se encuentra coincidencias' })
  }

}

)

// rutas inexistentes
app.get("*", (req, res) => {
  res.status(404).send("Lo siento, pero esta pagina que buscas no existe.");
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});