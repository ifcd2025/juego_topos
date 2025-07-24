const filas = 10;
const columnas = 10;
const numeroBichos = 10;

function crearParcela() {
    const parcela = document.getElementById("parcela");

    for(let i = 0; i < filas * columnas; i++) {
        const div = document.createElement("div");
        parcela.appendChild(div);
        div.classList.add("celda");
    }
}

function mostrarBichos() {
    const celdas = document.getElementsByClassName("celda");
    for(let i = 0; i < numeroBichos; i++) {
        const numeroCelda = Math.floor(Math.random() * 101);
        celdas[numeroCelda].style.backgroundImage = "url(imagenes/bicho.png)";
    }

}

crearParcela();
mostrarBichos();