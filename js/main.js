                /*  NEWS*/


const apiKey = '2bfbbeef13a403a82c76e6889d63f4eb';
const endpoint = `https://gnews.io/api/v4/top-headlines?lang=es&token=${apiKey}`;

fetch(endpoint)
  .then(response => response.json())
  .then(data => {
    const noticias = data.articles.slice(0, 4); // Obtener las primeras 4 noticias
    mostrarNoticias(noticias);
  })
  .catch(error => {
    console.error('Error al obtener noticias', error);
  });

function mostrarNoticias(noticias) {
  document.getElementById('new1').innerHTML = crearNoticiaHTML(noticias[0]);
  document.getElementById('new2').innerHTML = crearNoticiaHTML(noticias[1]);
  document.getElementById('new3').innerHTML = crearNoticiaHTML(noticias[2]);
  document.getElementById('new4').innerHTML = crearNoticiaHTML(noticias[3]);
}

function crearNoticiaHTML(noticia) {
  return `
    <h3>${noticia.title}</h3>
    <img src="${noticia.image}" alt="${noticia.title}">
    <p>${noticia.description}</p>
  `;
}




                /*PRESUPUESTO*/
function calculateBudget() {
    // Get the selected destination
    const destination = document.getElementById("destination").value;
    let destinationValue;
    switch (destination) {
      case "canary":
        destinationValue = 1000;
        break;
      case "emiratos":
        destinationValue = 1500;
        break;
      case "western":
        destinationValue = 1300;
        break;
      case "nile":
        destinationValue = 1000;
        break;
      case "baltic":
        destinationValue = 1100;
        break;
    }
  
    // Get the selected membership
    const membership = document.getElementById("membership").value;
    let membershipValue;
    switch (membership) {
      case "interior":
        membershipValue = 100;
        break;
      case "exterior":
        membershipValue = 150;
        break;
      case "suite":
        membershipValue = 300;
        break;
    }
  
    // Get the selected departure date
    const departureDate = new Date(document.getElementById("departure-date").value);
    const today = new Date();
    const timeDiff = departureDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    let discount = 0;
    if (daysDiff > 90) {
      discount = 0.15;
    } else if (daysDiff > 60) {
      discount = 0.1;
    } else if (daysDiff > 30) {
      discount = 0.05;
    }
  
    // Get the selected extras
    let extrasValue = 0;
    const homeDelivery = document.getElementById("home-delivery").checked;
    const withoutLines = document.getElementById("without-lines").checked;
    if (homeDelivery) {
      extrasValue += 100;
    }
    if (withoutLines) {
      extrasValue += 130;
    }
  
    // Calculate the total budget
    const totalBudget = destinationValue + membershipValue + extrasValue;
    const discountedBudget = totalBudget - (totalBudget * discount);
    
    // Set the result in the budget input field
    const budgetInput = document.getElementById("budget");
    budgetInput.value = discountedBudget + " €";
  }

                /*GSAP*/
function animateFrom(elem, direction) {
    direction = direction || 1;
    var x = 0,
        y = direction * 100;
    if(elem.classList.contains("gs_reveal_fromLeft")) {
      x = -100;
      y = 0;
    } else if (elem.classList.contains("gs_reveal_fromRight")) {
      x = 100;
      y = 0;
    }
    elem.style.transform = "translate(" + x + "px, " + y + "px)";
    elem.style.opacity = "0";
    gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
      duration: 1.25, 
      x: 0,
      y: 0, 
      autoAlpha: 1, 
      ease: "expo", 
      overwrite: "auto"
    });
  }
  
  function hide(elem) {
    gsap.set(elem, {autoAlpha: 0});
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
      hide(elem); // assure that the element is hidden when scrolled into view
      
      ScrollTrigger.create({
        trigger: elem,
        markers: false,
        onEnter: function() { animateFrom(elem) }, 
        onEnterBack: function() { animateFrom(elem, -1) },
        onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
      });
    });
  });

                /*NAV*/

var nav = document.querySelector('nav');
window.addEventListener('scroll', function(){
    if(window.pageYOffset >100){
        nav.classList.add('bgscroll', 'shadow');
    }else{
        nav.classList.remove('bgscroll', 'shadow');
    }
});

                /*GALLERY*/
    document.addEventListener('DOMContentLoaded', function() {

let imagenes = [
    { img: 'img/Gallery/barco1.jpg' },
    { img: 'img/Gallery/barco2.jpg' },
    { img: 'img/Gallery/barco3.jpg' },
    { img: 'img/Gallery/barco4.jpg' },
    { img: 'img/Gallery/barco5.jpg' },
    { img: 'img/Gallery/barco6.jpg' },
   
];

let contador = 0
const contenedor = document.querySelector('.slideshow');
const overlay = document.querySelector('.overlay');
const galeria_imagenes = document.querySelectorAll('.gallery img');
const img_slideshows = document.querySelector('#img_slideshow');


contenedor.addEventListener('click', function(event) {
    let atras = contenedor.querySelector('.atras'),
        adelante = contenedor.querySelector('.adelante'),
        img = contenedor.querySelector('#img_slideshow'),
        tgt = event.target
    if (tgt == atras) {
        if (contador > 0) {
            img.src = imagenes[contador - 1].img
            contador--
        } else {
            img.src = imagenes[imagenes.length - 1].img
            contador = imagenes.length - 1
        }
    } else if (tgt == adelante) {
        if (contador < imagenes.length - 1) {
            img.src = imagenes[contador + 1].img
            contador++
        } else {
            img.src = imagenes[0].img
            contador = 0
        }
    }

})
Array.from(galeria_imagenes).forEach(img => {
    img.addEventListener('click', event => {
        const imagen_seleccionada = +(event.target.dataset.imgMostrar)
        img_slideshows.src = imagenes[imagen_seleccionada].img
        contador = imagen_seleccionada
        overlay.style.opacity = 1
        overlay.style.visibility = 'visible'
    })
})

document.querySelector('.btn_cerrar').addEventListener('click', () => {
    overlay.style.opacity = 0

overlay.style.visibility = 'hidden'})

var span = document.getElementsByClassName("btn_cerrar")[0];
span.onclick = function() {
    overlay.style.visibility = "hidden";
}
})
