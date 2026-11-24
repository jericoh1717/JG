const CLAVE_CARRITO = "jg-carrito";

const PRECIOS = {
  "relojes-classic-steel": 189,
  "relojes-urban-black": 229,
  "relojes-silver-edition": 249,
  "cadenas-only-chain": 89,
  "cadenas-silver-link": 109,
  "cadenas-urban-necklace": 119,
  "gafas-de-sol-urban-black": 129,
  "gafas-de-sol-classic-vision": 149,
  "gafas-de-sol-casimiro": 169,
  "pulseras-black-essential": 59,
  "pulseras-golden-touch": 79,
  "pulseras-la-snake": 89
};

function leerCarrito() {
  try {
    const carrito = JSON.parse(localStorage.getItem(CLAVE_CARRITO) || "[]");

    return carrito.map((producto) => {
      const precio = Number(producto.precio) ||
        PRECIOS[producto.id] ||
        0;

      return {
        ...producto,
        precio,
        cantidad: Math.max(1, Number(producto.cantidad) || 1)
      };
    });
  } catch {
    return [];
  }
}

function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  window.dispatchEvent(new CustomEvent("jg-carrito-actualizado"));
}

export function obtenerCarrito() {
  return leerCarrito();
}

export function agregarAlCarrito(producto) {
  const carrito = leerCarrito();
  const existente = carrito.find((item) => item.id === producto.id);

  const nuevoProducto = {
    ...producto,
    precio: Number(producto.precio) || PRECIOS[producto.id] || 0
  };

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...nuevoProducto, cantidad: 1 });
  }

  guardarCarrito(carrito);
}

export function cambiarCantidad(id, cantidad) {
  const carrito = leerCarrito();
  const producto = carrito.find((item) => item.id === id);

  if (!producto) return;

  producto.cantidad = Math.max(1, Number(cantidad) || 1);
  guardarCarrito(carrito);
}

export function eliminarDelCarrito(id) {
  guardarCarrito(leerCarrito().filter((item) => item.id !== id));
}

export function vaciarCarrito() {
  guardarCarrito([]);
}
