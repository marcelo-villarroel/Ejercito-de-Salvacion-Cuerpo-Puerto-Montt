// Año automático en el footer
document.getElementById("anio").textContent = new Date().getFullYear();

// ===== Menú móvil =====
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  const abierto = navMenu.classList.toggle("abierto");
  navToggle.setAttribute("aria-expanded", abierto);
});

// Cierra el menú al elegir un link (útil en celular)
navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("abierto");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ===== Revelado suave al hacer scroll =====
const elementosRevelar = document.querySelectorAll("[data-revelar]");

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visible");
      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.15 });

elementosRevelar.forEach(el => observador.observe(el));

// ===== Lightbox de la galería =====
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCerrar = document.getElementById("lightboxCerrar");

document.querySelectorAll(".foto").forEach(foto => {
  foto.addEventListener("click", () => {
    lightboxImg.src = foto.dataset.full;
    lightboxImg.alt = foto.dataset.alt;
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function cerrarLightbox() {
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
}

lightboxCerrar.addEventListener("click", cerrarLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) cerrarLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") cerrarLightbox();
});
