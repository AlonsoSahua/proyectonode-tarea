const express = require('express');
const app = express();

app.use(express.json());

const productos = [
  { id: 1, nombre: 'Agua', precio: 1.20 },
  { id: 2, nombre: 'Galleta', precio: 0.60 },
  { id: 3, nombre: 'Chocolate', precio: 3.00 },
];

const clientes = [
   { id: 1, nombre: 'Fernando' },
   { id: 2, nombre: 'Luciana' },
   { id: 3, nombre: 'Andres' }
];

app.get('/', (req, res) => {
    res.send('Bienvenido a mi aplicación en Express');
});

app.get('/productos', (req, res) => {
    res.json(productos);
});

app.get('/clientes', (req, res) => {
    res.json(clientes);
});

app.post('/productos', (req, res) => {
    const nuevoProducto = {
        id: productos.length + 1,
        nombre: req.body.nombre,
        precio: req.body.precio
    };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const producto = productos.find(p => p.id === id);

    if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    producto.nombre = req.body.nombre || producto.nombre;
    producto.precio = req.body.precio || producto.precio;

    res.json(producto);
});

app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = productos.findIndex(p => p.id === id);

    if (indice === -1) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    productos.splice(indice, 1);
    res.status(204).send(); 
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
