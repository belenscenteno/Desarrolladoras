const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

// Mensajes de error comunes a todos los campos
const emptyMessage = "Campo vacío.";
const emptyTooltipMessage = "Rellena este campo.";

// Muestra el icono rojo al lado del campo que corresponda y le añade un tooltip personalizado
function errorIcon(field, tooltipMessage) {
  document.querySelector(`#${field} + .input-icon`).innerHTML = '<img src="images/error-icon.svg">';
  document.getElementById(`${field}-icon`).setAttribute('title', tooltipMessage);
}

// Muestra el icono verde al lado del campo que corresponda y le añade un tooltip para indicar que está correcto
function successIcon(field) {
  document.querySelector(`#${field} + .input-icon`).innerHTML = '<img src="images/success-icon.svg">';
  document.getElementById(`${field}-icon`).setAttribute('title', "Válido.");
}

// Atiende a que el usuario pulse el botón ENVIAR
// Realiza validaciones personalizadas para cada campo y al final comprueba si ya se puede enviar el formulario
// Utiliza la propiedad "classList" para añadir las clases "valid" o "invalid" a los campos y así cambiar su color del borde indicando validez
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Valida que el nombre de usuario no está vacío y que solo tiene letras
  const usernameRegex = /^[a-zA-Z]*$/;
  if (username.value === "") {
    username.classList.add("invalid");
    username.classList.remove("valid");
    document.getElementById("username-error").innerHTML = emptyMessage;
    errorIcon("username",emptyTooltipMessage);
  } else if (!usernameRegex.test(username.value)) {
    username.classList.add("invalid");
    username.classList.remove("valid");
    document.getElementById("username-error").innerHTML = "El usuario solo admite letras.";
    errorIcon("username","Elimina posibles caracteres numéricos o especiales.");
  } else {
    username.classList.remove("invalid");
    username.classList.add("valid");
    document.getElementById("username-error").innerHTML = "";
    successIcon("username");
  }

  // Valida que el email no está vacío y que tiene un formato correcto mediante expresiones regulares
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value === "") {
    email.classList.add("invalid");
    email.classList.remove("valid");
    document.getElementById("email-error").innerHTML = emptyMessage;
    errorIcon("email",emptyTooltipMessage);
  } else if (!emailRegex.test(email.value)) {
    email.classList.add("invalid");
    email.classList.remove("valid");
    document.getElementById("email-error").innerHTML = "El email no es válido.";
    errorIcon("email","Introduce un email válido.");
  } else {
    email.classList.remove("invalid");
    email.classList.add("valid");
    document.getElementById("email-error").innerHTML = "";
    successIcon("email");
  }

  // Valida que la contraseña no está vacía y que tiene al menos 8 caracteres
  if (password.value === "") {
    password.classList.add("invalid");
    password.classList.remove("valid");
    document.getElementById("password-error").innerHTML = emptyMessage;
    errorIcon("password",emptyTooltipMessage);
  } else if (password.value.length < 8) {
    password.classList.add("invalid");
    password.classList.remove("valid");
    document.getElementById("password-error").innerHTML = "La contraseña es demasiado corta.";
    errorIcon("password","Introduce una contraseña de al menos 8 caracteres.");
  } else {
    password.classList.remove("invalid");
    password.classList.add("valid");
    document.getElementById("password-error").innerHTML = "";
    successIcon("password");
  }

  // Valida que la confirmación de la contraseña no está vacía y que coincide con la contraseña de arriba
  if (confirmPassword.value === "") {
    confirmPassword.classList.add("invalid");
    confirmPassword.classList.remove("valid");
    document.getElementById("confirmPassword-error").innerHTML = emptyMessage;
    errorIcon("confirmPassword",emptyTooltipMessage);
  } else if (password.value !== confirmPassword.value) {
    confirmPassword.classList.add("invalid");
    confirmPassword.classList.remove("valid");
    document.getElementById("confirmPassword-error").innerHTML = "Las contraseñas no coinciden.";
    errorIcon("confirmPassword","Repite la contraseña.");
  } else {
    confirmPassword.classList.remove("invalid");
    confirmPassword.classList.add("valid");
    document.getElementById("confirmPassword-error").innerHTML = "";
    successIcon("confirmPassword");
  }

  // Valida si todos los campos están correctos para mostrar mensaje de éxito
  if (form.querySelectorAll('.invalid').length === 0) {
    alert("¡Cuenta creada con éxito!");
  }
});
