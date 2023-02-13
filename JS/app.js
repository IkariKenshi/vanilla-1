console.log('Conectado')

let carrito = {};
const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment ()



document.addEventListener('DOMContentLoaded', e => {
    cargaDatosBD()
}) //Acesso al Dom

cards.addEventListener('click', e =>{
    console.log('e', e)
    addCarrito(e);
})

const addCarrito = e => {
    if( e.target.classList.contains('btn-dark'))
    {
        setCarrito(e.target.parentElement);
    }
    e.stopPropagation()
}


const setCarrito = item => {
    const producto = {
        id: item.querySelector('button').dataset.id,
        title: item.querySelector('h5').textContent,
        precio: item.querySelector('p').textContent,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(producto.id))
    {
        producto.cantidad = carrito [producto.id].cantidad + 1
    }
    carrito[producto.id] = {...producto} //Empuja todo el objeto a la posicion
    pintarCarrito();
    console.log('producto', producto)
}

const pintarCarrito = () =>{
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
}

const cargaDatosBD = async () => {
    const res = await fetch('../db/api.json') 
    const data = await res.json()
    pintaCards(data)
    console.log('Respuesta', data)
}

const pintaCards = (data) =>{
    data.forEach(item => {
        console.log(item)
        templateCard.querySelector('h5').textContent = item.titulo
        templateCard.querySelector('p').textContent = item.precio
        templateCard.querySelector('button').dataset.id = item.id
        templateCard.querySelector('img').setAttribute("src", item.imageUrl)
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    });
    cards.appendChild(fragment)
}