let cards = [];
let tipoActual = 3;
const modalTarget = document.getElementById("modal");

const lblNombreCarta = document.querySelector("#nombreCarta");
const lblNombreEspanolCarta = document.querySelector("#nombreEspanolCarta");
const lblNumeroCarta = document.querySelector("#numeroCarta");
const lblAparicionManga = document.querySelector("#aparicionManga");
const lblSignificado = document.querySelector("#significado");
const imaCartaSakura = document.querySelector("#cartaSakura");
const imaCartaClow = document.querySelector("#cartaClow");

fetch("https://protected-taiga-89091.herokuapp.com/api/card?pageSize=55")
.then((response)=>response.json())
.then((data)=>{
    cards = data.data;
    render(cards, tipoActual);
});

let render = (cardsArr, tipo) => {
    document.querySelector("#resultadosApi").innerHTML = "";

    for(let i in cardsArr){
        let card = document.createElement("div");
        card.classList.add('tarjeta');
        card.setAttribute("data-id", cardsArr[i]._id);

        let contenido = '<div>';
            contenido += imagenes(cardsArr[i], tipo);
        contenido += '</div>';

        contenido += '<div class="card-content">';
            contenido += '<div class="is-flex is-justify-content-center">';
                contenido += '<div class="content mb-0">';
                    contenido += '<span class="tag is-danger">'+cardsArr[i].cardNumber+'.- '+cardsArr[i].englishName+' ('+cardsArr[i].spanishName+')</span>';
                contenido += '</div>';
                contenido += '<div class="ml-3">';
                    contenido += '<span>'+cardsArr[i].kanji+'</span>';
                contenido += '</div>';
            contenido += '</div>';
        contenido += '</div>';

        card.innerHTML = contenido;
        card.addEventListener("click", ()=>showModal(card.dataset.id));
        document.querySelector("#resultadosApi").append(card);

    }
};

function imagenes(cartas, type){
    let contenidoImg = '';
    if(type == 3 || type == 1)
    {
        if(revisarClowVersion(cartas.sakuraCard) == 1)
        {
            contenidoImg += '<img src="'+cartas.sakuraCard+'" alt="Carta SAKURA '+cartas.englishName+'">';
            contenidoImg += '<img src="'+cartas.cardsReverse.sakuraReverse+'" alt="Reverso carta SAKURA '+cartas.englishName+'">';
        }
    }
    if(type == 3 || type == 2)
    {
        if(revisarClowVersion(cartas.clowCard) == 1)
        {
            contenidoImg += '<img src="'+cartas.clowCard+'" alt="Carta SAKURA '+cartas.englishName+'">';
            contenidoImg += '<img src="'+cartas.cardsReverse.clowReverse+'" alt="Reverso carta SAKURA '+cartas.englishName+'">';
        }
    }
    return contenidoImg;
}

function revisarClowVersion(cartaRevisar){
    if (cartaRevisar == undefined || cartaRevisar == '')
    {
        return 0; //No tiene version
    }
    else{
        return 1;
    }
}

const showModal = (id) => {
    lblNombreCarta.innerText = '';
    lblNombreEspanolCarta.innerHTML = '';
    lblNumeroCarta.innerHTML = '';
    lblAparicionManga.innerHTML = '';
    lblSignificado.innerHTML = '';
    imaCartaSakura.setAttribute('hidden', 'true');
    imaCartaClow.setAttribute('hidden', 'true');

    modalTarget.classList.toggle("is-active");
    
    if(id !== undefined){
        fetch('https://protected-taiga-89091.herokuapp.com/api/card/'+id)
        .then((response)=>response.json())
        .then((data)=>{
            const {cardNumber, spanishName, englishName, appeardManga, clowCard, sakuraCard, meaning} = data;

            lblNombreCarta.innerText = englishName;
            lblNombreEspanolCarta.innerHTML = '<strong>Nombre en español: </strong>' + spanishName;
            lblNumeroCarta.innerHTML = '<strong>Número de carta: </strong>' + cardNumber;
            lblAparicionManga.innerHTML = '<strong>Capitulo de aparición en serie manga: </strong>' + appeardManga;
            lblSignificado.innerHTML = '<strong>Significado de carta: </strong>' + meaning;
            imaCartaSakura.setAttribute('src', sakuraCard);
            imaCartaSakura.removeAttribute('hidden');
            imaCartaClow.removeAttribute('hidden');
            imaCartaClow.setAttribute('src', clowCard);
        });
    }
}