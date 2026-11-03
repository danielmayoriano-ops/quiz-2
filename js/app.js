const API_URL = "https://dummyjson.com/recipes?limit=1";

// Traducciones opcionales; si el valor no está, se muestra tal cual llega de la API.
const DIFICULTAD = { Easy: "Fácil", Medium: "Medio", Hard: "Difícil" };
const COCINA = {
  Italian: "Italiana", Asian: "Asiática", American: "Americana",
  Mexican: "Mexicana", Indian: "India", Greek: "Griega",
  Thai: "Tailandesa", Japanese: "Japonesa", Turkish: "Turca"
};

const contenedor = document.getElementById("receta-api");

function crearTarjeta(receta) {
  const articulo = document.createElement("article");
  articulo.className = "receta";

  const img = document.createElement("img");
  img.src = receta.image;
  img.alt = receta.name;

  const info = document.createElement("div");
  info.className = "receta-info";

  const titulo = document.createElement("h3");
  titulo.textContent = receta.name;
  info.appendChild(titulo);

  const filas = [
    ["Tipo de cocina:", COCINA[receta.cuisine] || receta.cuisine],
    ["Dificultad:", DIFICULTAD[receta.difficulty] || receta.difficulty],
    ["Tiempo de preparación:", `${receta.prepTimeMinutes} minutos`],
    ["Primer paso:", receta.instructions[0]]
  ];

  filas.forEach(([etiqueta, valor]) => {
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = etiqueta + " ";
    p.appendChild(strong);
    p.appendChild(document.createTextNode(valor));
    info.appendChild(p);
  });

  articulo.append(img, info);
  return articulo;
}

async function cargarRecetas() {
  try {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) throw new Error("Error " + respuesta.status);
    const datos = await respuesta.json();

    contenedor.innerHTML = "";
    datos.recipes.forEach(r => contenedor.appendChild(crearTarjeta(r)));
  } catch (error) {
    contenedor.innerHTML = '<p class="estado error">No se pudieron cargar las recetas. Revisa tu conexión e inténtalo de nuevo.</p>';
    console.error(error);
  }
}

cargarRecetas();
