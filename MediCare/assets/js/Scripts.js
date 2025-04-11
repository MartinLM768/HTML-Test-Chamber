document.addEventListener("DOMContentLoaded", () => {
  const btnMostrarRegistro = document.getElementById("btnMostrarRegistro");
  const btnMostrarLogin = document.getElementById("btnMostrarLogin");
  const registroForm = document.getElementById("registroForm");
  const loginForm = document.getElementById("loginForm");

  // Mostrar/Ocultar formularios
  btnMostrarRegistro.addEventListener("click", () => {
    registroForm.classList.remove("d-none");
    loginForm.classList.add("d-none");
    btnMostrarRegistro.classList.replace("btn-secondary", "btn-primary");
    btnMostrarLogin.classList.replace("btn-primary", "btn-secondary");
  });

  btnMostrarLogin.addEventListener("click", () => {
    loginForm.classList.remove("d-none");
    registroForm.classList.add("d-none");
    btnMostrarLogin.classList.replace("btn-secondary", "btn-primary");
    btnMostrarRegistro.classList.replace("btn-primary", "btn-secondary");
  });

  // Función para mostrar mensajes
  function mostrarMensaje(texto, tipo = "success") {
    const mensaje = document.createElement("div");
    mensaje.className = `alert alert-${tipo}`;
    mensaje.textContent = texto;
    mensaje.style.textAlign = "center";
    mensaje.style.marginTop = "15px";

    const formVisible = !registroForm.classList.contains("d-none")
      ? registroForm
      : loginForm;

    formVisible.appendChild(mensaje);

    setTimeout(() => {
      mensaje.remove();
    }, 3000);
  }

  // Registro
  registroForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const telefono = document.getElementById("telefono").value;
    const contrasena = document.getElementById("contrasena").value;
    const confirmar = document.getElementById("confirmar").value;

    if (contrasena !== confirmar) {
      mostrarMensaje("Las contraseñas no coinciden", "danger");
      return;
    }

    const usuario = {
      nombre,
      correo,
      telefono,
      contrasena
    };

    localStorage.setItem("usuarioRegistrado", JSON.stringify(usuario));

    registroForm.reset();
    mostrarMensaje("Registrado correctamente", "success");
  });

  // Login
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const correo = document.getElementById("loginCorreo").value;
    const contrasena = document.getElementById("loginContrasena").value;

    const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioRegistrado"));

    if (!usuarioGuardado) {
      mostrarMensaje("No hay usuarios registrados", "danger");
      return;
    }

    if (
      correo === usuarioGuardado.correo &&
      contrasena === usuarioGuardado.contrasena
    ) {
      mostrarMensaje("Sesión iniciada exitosamente", "success");
      loginForm.reset();
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500); // Espera 1.5 segundos para que se vea el mensaje
    
    } else {
      mostrarMensaje("Correo o contraseña incorrectos", "danger");
    }
  });
});
