let buscar = (evt) => {
    let name = document.querySelector("#inputBusqueda").value.toLowerCase();
    let filtrados = cards.filter((card)=>{
        return card.spanishName.toLowerCase().includes(name) || card.englishName.toLowerCase().includes(name);
    });
    console.log(filtrados)
    render(filtrados, tipoActual);
}

let ordenar = (type, numTipo) =>{
    tipoActual = numTipo;
    let filtro = cards.filter((card)=>{
        return card.cardsReverse;
    });
    render(filtro, tipoActual);
}

let invertirCartas = () =>{
    let filtro = cards.reverse((card)=>{
        return card;
    });
    render(filtro, tipoActual);
}

document.querySelector("#inputBusqueda").addEventListener("keyup", buscar)
document.querySelector("#catAmbas").addEventListener("click", ()=> ordenar(' ', 3));
document.querySelector("#catClow").addEventListener("click", ()=> ordenar('clowReverse', 2));
document.querySelector("#catSakura").addEventListener("click", ()=> ordenar('sakuraReverse', 1));
document.querySelector("#catInvertir").addEventListener("click", ()=> invertirCartas());