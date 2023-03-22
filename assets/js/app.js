/*Es una aplicación de JavaScript que utiliza la API pública de GitHub 
para recuperar información del usuario y mostrarla en una página web*/ 


// Definir constantes para los endpoints y los elementos del DOM
const BASE_ENDPOINT = 'https://api.github.com';
const USERS_ENDPOINT = `${BASE_ENDPOINT}/users`;

//Colocar nombres descriptivos a las constantes
const $name = document.querySelector('#name');
const $blog = document.querySelector('#blog');
const $location = document.querySelector('#location');


/*la función displayUser está utilizando la palabra  await para esperar 
la respuesta del servidor pero no está definida como una función asíncrona*/

// Función asincrónica para mostrar los datos de un usuario
async function displayUser(username) {
  try {
    // Mostrar un mensaje de carga
    $name.textContent = 'Cargando...';
    $blog.textContent = '';
    $location.textContent = '';

    // Obtener los datos del usuario desde la API de GitHub 
    const response = await fetch(`${USERS_ENDPOINT}/${username}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const user = await response.json();

    // Mostrar los datos del usuario en el DOM
    $name.textContent = user.name || 'Nombre no disponible';
    $blog.textContent = user.blog || 'Blog no disponible';
    $location.textContent = user.location || 'Ubicación no disponible';
  } catch (error) {
    // Mostrar un mensaje de error en caso de que ocurra un problema
    console.error(error);
    $name.textContent = 'Ocurrió un problema al obtener los datos del usuario.';
  }
}

// Asociar la función displayUser al evento submit del formulario
const $form = document.querySelector('form');
$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = event.target.elements.username.value;
  displayUser(username);
});
