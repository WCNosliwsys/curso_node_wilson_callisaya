const fs = require('fs');

/*
Problema 1: Uso de Callbacks y Promesas
Descripción:
Escriba una función en Node.js que realice las siguientes tareas usando callbacks y
promesas:
Leer un archivo de texto (usando callbacks): La función debe leer un archivo de texto
(por ejemplo, datos.txt) y pasar su contenido a un callback.*/
// Función para leer un archivo de texto usando callbacks
function leerArchivoConCallback(nombreArchivo, callback) {
  fs.readFile(nombreArchivo, 'utf8', (error, contenido) => {
    if (error) {
      // Manejar el error si ocurre
      return callback(error, null);
    }

    // Llamar al callback con el contenido del archivo
    callback(null, contenido);
  });
}
leerArchivoConCallback('datos.txt', (error, contenido) => {
  if (error) {
    console.error('Error al leer el archivo:', error);
  } else {
    
    console.log('Ejercicio1:\nContenido del archivo:', contenido);
  }
});

/*
Convertir el contenido a mayúsculas (usando promesas): La función debe tomar el
contenido del archivo y convertirlo a mayúsculas, retornando este resultado a través
de una promesa.*/

const leerArchivo = new Promise((resolve, reject) => {
  try{
  const data = fs.readFileSync('./datos.txt', { encoding: "utf-8" });
  resolve(data)
  }
  catch{
    reject("no se pudo leer")
  }
})

leerArchivo
  .then(contenido => contenido.toUpperCase())
  .then(contenidoMayuscula=>console.log(`Ejercicio2:\ncontenido mayuscula: ${contenidoMayuscula}`))
  .catch(error=>console.log(error))
/*
Problema 2: Uso de Fetch y Async/Await
Descripción:
Escriba una función asincrónica en Node.js que utilice fetch para obtener datos de una
API y procesarlos con async/await.
*/

// Función asincrónica para obtener un arreglo de objetos con nombre, especie y genero
const obtenerDatosDePersonajes = async ()=>{
  try {
    const respuesta = await fetch('https://rickandmortyapi.com/api/character');
    
    if (!respuesta.ok) {
      throw new Error(`Error al obtener los datos. Código de estado: ${respuesta.status}`);
    }

    const datos = await respuesta.json();

    const personajes = datos.results.map(personaje => ({
      nombre: personaje.name,
      especie: personaje.species,
      genero: personaje.gender,
    }));

    console.log('Ejercicio3\n','Datos de los personajes:', personajes);
    return personajes; 
  } catch (error) {
    console.error('Error:', error.message);
    throw error; 
  }
}

obtenerDatosDePersonajes();