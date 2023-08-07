// Esto carga el módulo express y lo asigna a la constante homónima. Luego se instancia el framework dentro de la constante app.
const express = require("express");
const app = express();
const path = require("path");

// Referenciamos al módulo path y leugo utilizamos un Middleware junto al método static() de ExpressJS. El path.join() ayuda a concatenar la variable global __dirname junto a la subcarpeta que contiene el sitio web.
app.use(express.static(path.join(__dirname, "trailerflix")));

// Define una ruta básica - El método get se ocupa de escuchar las peticiones entrantes, y recibe dos parametros. Primero recibe la ruta peticionada, y el segundo es la respuesta a la petición.
app.get("/", (req, res) => {
// El método send() que está asociado a la respuesta (res) se utiliza para enviar la r espuesta de dicha petición.
    res.send ("<h1>Bienvenidas a nuestra web</h1>");
})

app.get("/cursos", (req, res) => {
        res.send ("<h1>Bienvenidas a nuestra sección cursos</h1>");
    })

app.get("/contacto", (req, res) => {
        res.send ("<h1>Prueba de contacto </h1>");
    })

// Control de Errores para Rutas inexistentes.    
app.get("*", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.status(404).send(JSON.stringify({error: 404, description: "No se encuentra la ruta o recurso solicitado."}));
    })    

app.listen(3050, () => {
    console.log("Servidor iniciado en el puerto 3050");
})
