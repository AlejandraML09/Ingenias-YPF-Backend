const http = require("http"); // Importamos Node.js
const PORT = 3008;
const server = http.createServer(function (req, res) { // create web server
    if(req.url == "/") {
        res.writeHead(200, {"Content-Type" : "text/html"});
        // res.write("<h1>Bienvenidas a nuestra web</h1>")
        res.end("<h1>Bienvenidas a nuestra web</h1>")
    } else if (req.url == "/cursos") {
        res.writeHead(200, {"Content-Type" : "text/html"});
        // res.write("<h1>Bienvenidas a nuestra sección cursos</h1>")
        res.end("<h1>Bienvenidas a nuestra sección cursos</h1>")
    
    } else if (req.url == "/contacto") {
        res.writeHead(200, {"Content-Type" : "text/html"});
        // res.write("<h1>No sé que poner en contacto :D </h1>")
        res.end("<h1>No sé que poner en contacto :D </h1>")
    } else {
        // res.writeHead(404, {"Content-Type" : "apllication/text-plain"}); // res.setHeader
        // res.write("<h1>Ruta no encontrada</h1>")
        res.end("Request Invalido")
    }

})

server.listen(PORT, () => {
    console.log("Servidor corriendo :)")
})