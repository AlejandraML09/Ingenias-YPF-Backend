// Esto carga el módulo express y lo asigna a la constante homónima. Luego se instancia el framework dentro de la constante app.
const express = require("express");
const app = express();
const path = require("path");
const PORT = 3008;

// Referenciamos al módulo path y leugo utilizamos un Middleware junto al método static() de ExpressJS. El path.join() ayuda a concatenar la variable global __dirname junto a la subcarpeta que contiene el sitio web.
app.set("view engine", "ejs");
app.use(express.static("views"));

const computerProducts = [
    { name: 'Notebook Lenovo', price: 1500 },
    { name: 'MAC pro', price: 2500 },
    { name: 'ASUS Zenbook 17 Fold OLED ', price: 3600 }
]

app.get("/", (req, res) => {
    const data = {
        title: 'Nuestro sitio Web con EJS',
        message: 'Bienvenido a nuestro sitio generado a partir de un motor de plantillas.'
    }
    res.render('index', data)
})

app.get("/productos", (req, res) => {
    const data = {
        title: 'Nuestro sitio Web con EJS',
        message: 'Bienvenido a nuestro sitio generado a partir de un motor de plantillas.',
        products: computerProducts
    }
    res.render('productos', data)
})


// Control de Errores para Rutas inexistentes.    
app.get("*", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ error: 404, description: "No se encuentra la ruta o recurso solicitado." }));
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})
