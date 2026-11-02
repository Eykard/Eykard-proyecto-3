document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const modalConfirmacion = new bootstrap.Modal(document.getElementById('modalConfirmacion'));

    // Validación del formulario y simulación de llamado a correo con Modal
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        // Validación básica de email por expresión regular
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let isValid = true;

        if (nombre === '') {
            document.getElementById('nombre').classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('nombre').classList.remove('is-invalid');
            document.getElementById('nombre').classList.add('is-valid');
        }

        if (!emailRegex.test(email)) {
            document.getElementById('email').classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('email').classList.remove('is-invalid');
            document.getElementById('email').classList.add('is-valid');
        }

        if (mensaje === '') {
            document.getElementById('mensaje').classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('mensaje').classList.remove('is-invalid');
            document.getElementById('mensaje').classList.add('is-valid');
        }

        if (isValid) {
            // Simulación de llamado al cliente de correo mediante protocolo mailto
            const correoDestino = "contacto@vetpatitas.com";
            const asunto = encodeURIComponent("Consulta Web de " + nombre);
            const cuerpo = encodeURIComponent("Nombre: " + nombre + "\nCorreo: " + email + "\n\nMensaje:\n" + mensaje);
            
            // Disparar enlace mailto en segundo plano para abrir la aplicación de correo del navegador/sistema
            const mailtoLink = document.createElement('a');
            mailtoLink.href = `mailto:${correoDestino}?subject=${asunto}&body=${cuerpo}`;
            document.body.appendChild(mailtoLink);
            mailtoLink.click();
            document.body.removeChild(mailtoLink);

            // Mostrar la ventana modal de confirmación con emojis
            modalConfirmacion.show();

            // Limpiar formulario tras el envío exitoso
            contactForm.reset();
            document.querySelectorAll('.form-control').forEach(element => {
                element.classList.remove('is-valid');
            });
        }
    });

    // Control dinámico opcional para pausar el carrusel al pasar el mouse
    const clientCarousel = document.getElementById('clientCarousel');
    if (clientCarousel) {
        const carouselInstance = new bootstrap.Carousel(clientCarousel, {
            interval: 5000,
            wrap: true
        });
    }
});