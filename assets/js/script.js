document.addEventListener('DOMContentLoaded', (event) => {
    const productosSeleccionados = [];

    function actualizarContador() {
        const contador = document.querySelector('.carrito-contador');
        contador.textContent = productosSeleccionados.length;
    }

    const carritoIcono = document.querySelector('#carroCompras');

    carritoIcono.addEventListener('click', (e) => {
        e.preventDefault();
        const modalProductos = new bootstrap.Modal(document.getElementById('productosModal'));
        modalProductos.show();
    });


    document.querySelectorAll('.producto').forEach((producto, index) => {
        producto.addEventListener('click', () => {
            const nombreProducto = producto.getAttribute('data-nombre');
            const imagenProducto = producto.getAttribute('data-imagen');
            productosSeleccionados.push({ id: index, nombre: nombreProducto, imagen: imagenProducto });
            actualizarModal(productosSeleccionados);        
            actualizarContador();
        });
    });

    function actualizarModal(productos) {
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = '';

        const productosContainer = document.createElement('div');
        productosContainer.style.display = 'flex';
        productosContainer.style.flexWrap = 'wrap';
        productosContainer.style.justifyContent = 'center';
        productosContainer.style.gap = '10px';

        productos.forEach((producto, index) => {
            const productoElement = document.createElement('div');
            productoElement.classList.add('producto-seleccionado');
            productoElement.style.position = 'relative';

            const eliminarBtn = document.createElement('div');
            eliminarBtn.classList.add('animal_insertado_close');
            eliminarBtn.title = 'Haz click aquí para eliminar el producto';
            eliminarBtn.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
            eliminarBtn.style.position = 'absolute';
            eliminarBtn.style.top = '0';
            eliminarBtn.style.right = '0';
            eliminarBtn.style.cursor = 'pointer';
            eliminarBtn.onclick = function () {
                actualizarContador();
                productosSeleccionados.splice(index, 1);
                actualizarModal(productosSeleccionados);         

            };


            const imagenElement = document.createElement('img');
            imagenElement.src = producto.imagen;
            imagenElement.alt = producto.nombre;
            imagenElement.style.width = '100px';

            productoElement.appendChild(imagenElement);
            productoElement.appendChild(eliminarBtn);

            const nombreElement = document.createElement('p');
            nombreElement.textContent = producto.nombre;
            productoElement.appendChild(nombreElement);

            productosContainer.appendChild(productoElement);
        });

        modalBody.appendChild(productosContainer);
    }  

    document.querySelector('.modal-footer .btn-primary').addEventListener('click', () => {
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div class="alert alert-success text-center" role="alert">
                Gracias por su compra! Regrese Pronto
            </div>
        `;
        productosSeleccionados.length = 0;
        actualizarContador();

    });
});