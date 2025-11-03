const xprs = require('express');
const app= xprs();

// app.use((req, res, next) => {
//   console.log(`Petición recibida: ${req.method} ${req.path}`);
//   next(); // Pasa a la siguiente ruta o middleware
// });     //ESTO ES PARA CORROBORAR SI EXPRESS ESTA RECIBIENDO LA PETICION DE ANGULAR
const port=3000;
const cors = require('cors');
const RutasAuth = require('./auth'); // Importar las rutas de autenticación

app.use(cors({
  origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(xprs.json());
app.use(xprs.static('uploads'));


const authRoutes = require('./auth');
const Rutasganados = require('./ganados');
const Rutasclientes = require('./clientes');
const Rutastanques = require('./tanques');
const Rutasleches = require('./leches');
const Rutasproveedores = require('./proveedores');
const Rutasrastros = require('./rastros');
const Rutasdetalle_ventas = require('./detalle_ventas');
const Rutasrazas = require('./razas');
const Rutascategorias = require('./categorias');
const Rutascorrales = require('./corrales');
const Rutasventas = require('./ventas');
const Rutasadministradores = require('./administradores');



app.use('/auth', RutasAuth); // Usar las rutas de autenticación
app.use('/ganados', Rutasganados);
app.use('/clientes', Rutasclientes);
app.use('/tanques', Rutastanques);
app.use('/leches', Rutasleches);
app.use('/proveedores', Rutasproveedores);
app.use('/rastros', Rutasrastros);
app.use('/detalle_ventas', Rutasdetalle_ventas);
app.use('/razas', Rutasrazas);
app.use('/categorias', Rutascategorias);
app.use('/corrales', Rutascorrales);
app.use('/ventas', Rutasventas);
app.use('/administradores', Rutasadministradores);
app.use(xprs.urlencoded({ extended: true }));


app.get('/', function(req,res){
  res.send('Bienvenidos a mi proyecto de express')
});

app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));






