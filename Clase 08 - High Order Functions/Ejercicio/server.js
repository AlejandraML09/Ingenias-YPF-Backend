const express = require("express");
const productos = require("./productos");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Ejercicio de High Order Functions!");
});

app.get("/productos", (req, res) => {
  const ordenarProductosAlfabeticamente = () => {
    const productosOrdenados = productos.sort((a, b) => {
      if (a.nombre > b.nombre) {
        return 1;
      }
      if (a.nombre < b.nombre) {
        return -1;
      }
      return 0;
    });
    console.log(productosOrdenados);
    return productosOrdenados;
  };
  ordenarProductosAlfabeticamente();
  res.send(ordenarProductosAlfabeticamente());
});


// Como las rutas de productos/:nombre y productos/:id son iguales, le agregamos al de id
// el regex (\d+) (https://expressjs.com/en/guide/routing.html)
app.get("/productos/:id(\d+)", (req, res) => {
  let id = parseInt(req.params.id);
  const productoEncontrado = productos.find((producto) => producto.id === id);
  productoEncontrado === undefined
    ? res.json({ id: "ERROR", description: "No se encuentra coincidencias" })
    : res.json(productoEncontrado);
});

app.get("/productos/:nombre", (req, res) => {
  console.log(req.params);
  let nombreIngresado = req.params.nombre.trim().toLowerCase();
  // Tengo que también poner en minúscula los datos que vienen del JSON :)
  const nombresEncontrados = productos.filter((producto) =>
    producto.nombre.trim().toLowerCase().includes(nombreIngresado)
  );
  // Si nombreIngresado NO encontró nada, entonces el array de nombresEncontrados es 0. Por lo tanto si el array es
  // 0, entonces no encontró nada :)
  nombresEncontrados.length == 0  
    ? res.json({ id: "ERROR", description: "No se encuentra coincidencias" })
    : res.json(nombresEncontrados);
});

// rutas inexistentes
app.get("*", (req, res) => {
  res.status(404).send("Lo lamento, pero la página que buscas no existe.");
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
