// Datos de las colecciones
const colecciones = [
  {
    id: 1,
    nombre: "Reloj",
    descripcion: "Disponible en multiples colores. PRECIO SOLO LA CAJA, si quieres adicionar la almohadilla" +
      "y el moño, aumenta $1,000",
    precio: "Desde 4,000",
    imagenes: "img/reloj.jpeg",
    caracteristicas:["7,5cm x 8,5cm x 7cm de alto $4,000"],
  },
  {
    id: 2,
    nombre: "Colección Clásica",
    descripcion: "Diseños atemporales en madera noble",
    precio: "Desde €35",
    imagen: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    caracteristicas: ["Madera de caoba", "Acabado satinado", "Multiple compartimentos"]
  },
  {
    id: 3,
    nombre: "Colección Moderna",
    descripcion: "Líneas minimalistas con materiales innovadores",
    precio: "Desde €55",
    imagen: "https://images.unsplash.com/photo-1506629905607-e48b0e67d879?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    caracteristicas: ["Acrílico premium", "LED integrado", "Base espejada"]
  },
  {
    id: 4,
    nombre: "Colección Vintage",
    descripcion: "Inspirado en la elegancia de épocas pasadas",
    precio: "Desde €65",
    imagen: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    caracteristicas: ["Detalles artesanales", "Piel genuina", "Numerado"]
  },
  {
    id: 5,
    nombre: "Colección Viajero",
    descripcion: "Cajas compactas y seguras para joyas en movimiento",
    precio: "Desde €28",
    imagen: "https://images.unsplash.com/photo-1584302179602-e4819bb92daa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    caracteristicas: ["A prueba de golpes", "Compacta", "Seguridad TSA"]
  },
  {
    id: 6,
    nombre: "Colección Luxury",
    descripcion: "Máxima exclusividad con materiales excepcionales",
    precio: "Desde €120",
    imagen: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    caracteristicas: ["Cuero italiano", "Detalles en platino", "Edición limitada"]
  }
];


// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  cargarColecciones();
  cargarTestimonios();
  inicializarAnimaciones();
  inicializarNavbar();
  inicializarFormulario();
});

// Cargar colecciones en el grid
function cargarColecciones() {
  const grid = document.getElementById('colecciones-grid');

  colecciones.forEach(coleccion => {
    const card = crearCardColeccion(coleccion);
    grid.appendChild(card);
  });
}

// En la función crearCardColeccion, cambia la imagen principal
function crearCardColeccion(coleccion) {
  const col = document.createElement('div');
  col.className = 'col-md-6 col-lg-4';

  // Usar la primera imagen como principal
  const imagenPrincipal = coleccion.imagenes[0];

  col.innerHTML = `
        <div class="card coleccion-card h-100" onclick="mostrarDetallesColeccion(${coleccion.id})">
            <div class="position-relative">
                <img src="${imagenPrincipal}" class="card-img-top coleccion-img" alt="${coleccion.nombre}">
                <div class="position-absolute top-0 end-0 m-2">
                    <span class="badge bg-primary">
                        <i class="fas fa-images me-1"></i>${coleccion.imagenes.length}
                    </span>
                </div>
            </div>
            <div class="card-body">
                <h5 class="card-title">${coleccion.nombre}</h5>
                <p class="card-text">${coleccion.descripcion}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="text-primary fw-bold">${coleccion.precio}</span>
                    <button class="btn btn-outline-primary btn-sm">Ver galería</button>
                </div>
            </div>
        </div>
    `;

  return col;
}

// Inicializar animaciones de scroll
function inicializarAnimaciones() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observar elementos con clase fade-in
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
}

// Navbar scroll effect
function inicializarNavbar() {
  const navbar = document.querySelector('.custom-navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}
// Función para redirigir a WhatsApp
function solicitarCatalogoWhatsApp() {
  // Personaliza estos datos
  const numeroWhatsApp = "3007276599"; // Tu número sin el + ni espacios
  const mensaje = "Hola, me interesa recibir el catálogo de cajas para joyas. ¿Podrían enviarme más información?";

  // Codificar el mensaje para URL
  const mensajeCodificado = encodeURIComponent(mensaje);

  // Crear el enlace de WhatsApp
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

  // Abrir en nueva pestaña
  window.open(urlWhatsApp, '_blank');
}
// Función para desplazamiento suave
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Función mejorada para mostrar galería de productos
function mostrarDetallesColeccion(id) {
  const coleccion = colecciones.find(c => c.id === id);

  if (!coleccion) return;

  const modalHTML = `
        <div class="modal fade" id="coleccionModal" tabindex="-1">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${coleccion.nombre}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <!-- Galería de imágenes -->
                            <div class="col-lg-7">
                                <div class="product-gallery">
                                    <div class="main-image mb-3">
                                        <img src="${coleccion.imagenes[0]}"
                                             id="mainProductImage"
                                             class="img-fluid rounded"
                                             alt="${coleccion.nombre}">
                                    </div>
                                    <div class="thumbnail-container">
                                        <div class="row g-2" id="thumbnails">
                                            ${coleccion.imagenes.map((img, index) => `
                                                <div class="col-3">
                                                    <img src="${img}"
                                                         class="thumbnail-img ${index === 0 ? 'active' : ''}"
                                                         onclick="cambiarImagenPrincipal('${img}', this)"
                                                         alt="${coleccion.nombre} - Vista ${index + 1}">
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Información del producto -->
                            <div class="col-lg-5">
                                <div class="product-info">
                                    <h4 class="text-primary mb-3">${coleccion.precio}</h4>
                                    <p class="lead">${coleccion.descripcion}</p>

                                    <div class="features mb-4">
                                        <h6>Características destacadas:</h6>
                                        <ul class="list-unstyled">
                                            ${coleccion.caracteristicas.map(caract => `
                                                <li class="mb-2">
                                                    <i class="fas fa-check text-success me-2"></i>
                                                    ${caract}
                                                </li>
                                            `).join('')}
                                        </ul>
                                    </div>

                                    <div class="product-actions">
                                        <button class="btn btn-primary w-100 mb-2"
                                                onclick="solicitarInformacion(${coleccion.id})">
                                            <i class="fas fa-info-circle me-2"></i>
                                            Solicitar Información
                                        </button>
                                        <button class="btn btn-outline-primary w-100"
                                                onclick="solicitarCatalogoWhatsApp()">
                                            <i class="fab fa-whatsapp me-2"></i>
                                            Consultar por WhatsApp
                                        </button>
                                    </div>

                                    <div class="product-meta mt-4">
                                        <small class="text-muted">
                                            <i class="fas fa-shipping-fast me-1"></i>
                                            Envío gratuito para pedidos superiores a €100
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

  // Crear y mostrar modal
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHTML;
  document.body.appendChild(modalContainer);

  const modal = new bootstrap.Modal(document.getElementById('coleccionModal'));
  modal.show();

  // Limpiar cuando se cierre
  document.getElementById('coleccionModal').addEventListener('hidden.bs.modal', function() {
    modalContainer.remove();
  });
}

// Función para cambiar imagen principal al hacer clic en miniaturas
function cambiarImagenPrincipal(src, element) {
  // Cambiar imagen principal
  document.getElementById('mainProductImage').src = src;

  // Remover clase active de todas las miniaturas
  document.querySelectorAll('.thumbnail-img').forEach(img => {
    img.classList.remove('active');
  });

  // Agregar clase active a la miniatura clickeada
  element.classList.add('active');
}

// Solicitar información
function solicitarInformacion(coleccionId) {
  const coleccion = colecciones.find(c => c.id === coleccionId);
  scrollToSection('contacto');

  // Rellenar automáticamente el asunto en el formulario
  const textarea = document.querySelector('#contactForm textarea');
  textarea.value = `Me interesa recibir información sobre la ${coleccion.nombre}. Por favor, envíenme catálogo y precios.\n\n`;

  // Cerrar modal si está abierto
  const modal = bootstrap.Modal.getInstance(document.getElementById('coleccionModal'));
  if (modal) {
    modal.hide();
  }
}

// Modal de personalización
function openCustomizationModal() {
  alert("¡Próximamente podrás personalizar tu caja directamente aquí! Mientras tanto, contáctanos para crear el diseño perfecto para tu joyería.");
  scrollToSection('contacto');
}

// Efectos adicionales al hacer hover en las cards
document.addEventListener('mouseover', function(e) {
  if (e.target.closest('.coleccion-card')) {
    const card = e.target.closest('.coleccion-card');
    card.style.transform = 'translateY(-10px)';
  }
});

document.addEventListener('mouseout', function(e) {
  if (e.target.closest('.coleccion-card')) {
    const card = e.target.closest('.coleccion-card');
    card.style.transform = 'translateY(0)';
  }
});
