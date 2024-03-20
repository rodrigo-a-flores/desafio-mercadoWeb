const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const path = require("path");
const PORT = 3000;

app.use('/assets', express.static(path.join(__dirname,'assets')));
app.use('/bootstrap', express.static(path.join(__dirname,'node_modules/bootstrap/dist/css')));
app.use('/bootstrap-js', express.static(path.join(__dirname,'node_modules/bootstrap/dist/js')));

app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
    res.render('dashboard', { 
        title: 'Dashboard',
        products: ['banana', 'cebollas', 'pimenton', 'papas', 'lechuga', 'tomate']
    });
});

app.listen(PORT, () => {
    console.log(`El servidor está inicializado en el puerto http://localhost:${PORT}`);
});
