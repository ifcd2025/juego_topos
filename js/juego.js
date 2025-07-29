const filas = 10;
const columnas = 10;
const numeroBichos = 10;
let bichosRestantes = numeroBichos;
let intentosRestantes = 20;

function crearParcela() {
    document.getElementById("bichosRestantes").textContent = bichosRestantes;
    document.getElementById("intentosRestantes").textContent = intentosRestantes;
    const parcela = document.getElementById("parcela");

    for(let i = 0; i < filas * columnas; i++) {
        const div = document.createElement("div");
        parcela.appendChild(div);
        div.classList.add("celda");
    }
}

function mostrarBichos() {
    const celdas = document.getElementsByClassName("celda");
    const numerosGenerados = [];
    for(let i = 0; i < numeroBichos; i++) {
        // Como puede pasar que genere algún número repetido, vamos a ir
        // metiendo los números en un array y volver generar el número aleatorio
        // si ya está en el array (las veces que haga falta)
        let numeroCelda;
        do {
            numeroCelda = Math.floor(Math.random() * filas * columnas);
        } while(numerosGenerados.includes(numeroCelda));
        // Añadimos el número al array
        numerosGenerados.push(numeroCelda);
        // dataset es la manera decente de añadir propiedades a un elemento
        celdas[numeroCelda].dataset.bicho = true;
        celdas[numeroCelda].style.animation = "animacionMostrarTopo 5s";
    }
    // Queremos que el usuario no pueda comenzar a hacer clic antes de que
    // desaparezcan los topos. Una opción es esperar a que termine la animación
    // de una de las celdas (cualquiera pues todas terminan a la vez)
    celdas[numerosGenerados[0]].addEventListener("animationend", () => {
        document.getElementById("parcela")
            .addEventListener("click", comprobarCelda);
        }
    );
}

function comprobarCelda(evt){
    // target puede ser el div parcela o las celdas del terreno
    // currentTarget siempre es el div parcela
    if(evt.target.classList.contains("celda")) {
        // true entre comillas pues dataset siempre guarda cadenas
        if(evt.target.dataset.bicho == "true") {
            aplicarAnimacion(evt.target, "animacionMuerto .5s forwards");
            // Quitamos el true ya que si no el jugador puede pulsar muchas
            // veces esa celda
            evt.target.dataset.bicho = "muerto";
            bichosRestantes--; // bichosRestantes = bichosRestantes - 1;
            document.getElementById("bichosRestantes").textContent = bichosRestantes;
            if(bichosRestantes == 0) {
                mostrarFin("Has ganado", "victoria.jpg")
            }
        } else if(evt.target.dataset.bicho != "muerto") {
            aplicarAnimacion(evt.target, "animacionFallo .5s");
            intentosRestantes--;
            document.getElementById("intentosRestantes").textContent = intentosRestantes;
            if(intentosRestantes == 0) {
               mostrarFin("Has perdido", "derrota.jpg");
            }
        }
    }
}

function aplicarAnimacion(elemento, animacion) {
    // Si se aplica una animación, la próxima vez ya no la realiza
    // Para ello hay que hacer lo siguiente
    elemento.style.animation = "";
    elemento.offsetWidth;
    elemento.style.animation = animacion;
}

function mostrarFin(texto, imagen) {
    // No queremos que siga pudiendo pulsar celdas
    document.getElementById("parcela")
        .removeEventListener("click", comprobarCelda);
    const fin = document.getElementById("fin");
    document.getElementById("textoFin").textContent = texto;
    fin.style.display = "block";
    fin.style.animation = "animacionFin 1s";
    fin.style.backgroundImage = `url(imagenes/${imagen})`;
}

crearParcela();
mostrarBichos();
document.getElementById("cerrar")
    .addEventListener("click", 
        () => window.location.reload());