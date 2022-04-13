//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
// let cocktail = document.querySelector('input').value.toLowerCase();
// let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`

// ======= Search recipe by entering name of drink ===========
// add event listener to first button
const searchRecipe = document.querySelector('.search-drink');
searchRecipe.addEventListener('click', getDrink);

// !!!!!! the code below doesn't work as intended...
const inputDrinkName = document.querySelector('.drink-name');
inputDrinkName.addEventListener('keyup', function(event) {
    if (event.key === 'Enter' || event.keyCode === 13) { // keyCode depricated? 
       event.preventDefault();
       searchRecipe.click();
    }
 });

function getDrink() {
    resetContent();
    let cocktailName = document.querySelector('.drink-name').value.toLowerCase();
    getRecipe(cocktailName);
}


function getRecipe(drinkName) {
    let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // console.log(Object.keys(data.drinks[0]));
            let ingredients = Object.keys(data.drinks[0]).filter(k => (k.startsWith('strIngredient')) && data.drinks[0][k] !== null);
            // console.log(ingredients);
            let measures = Object.keys(data.drinks[0]).filter(k => k.startsWith('strMeasure') && data.drinks[0][k] !== null);

            document.querySelector('img').src = `${data.drinks[0].strDrinkThumb}/preview`;
            document.querySelector('h2').textContent = data.drinks[0].strDrink;
            document.querySelector('h3.ingredients').textContent = 'Ingredients';
            document.querySelector('h3.instructions').textContent = 'Instructions';



            for (let i = 0; i < ingredients.length; i++) {
                let listItem = document.createElement('li');
                listItem.classList.add('list-group-flush');

                // combine measurements(if any) with ingredients
                let measure = data.drinks[0][measures[i]] ? data.drinks[0][measures[i]] : '';
                let node = document.createTextNode(`${measure} ${data.drinks[0][ingredients[i]]}`);
                listItem.appendChild(node);

                let element = document.querySelector('ul.ingredients');
                element.appendChild(listItem);
            }

            let para = document.createElement('p');
            para.textContent = data.drinks[0].strInstructions;
            let element = document.querySelector('.instructions');
            element.appendChild(para);
        })
        .catch(err => console.log(`error ${err}`))
}

// Function that resets pre-existing content
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function resetContent() {
    // remove preexisting content
    const drinkName = document.querySelector('h2');
    drinkName.innerHTML = '';
    document.querySelector('img').src = '#';

    const ingredients = document.querySelector('.ingredients');
    ingredients.innerHTML = '';
    const ingreList = document.querySelector('ul.ingredients');
    ingreList.innerHTML = '';
    const instructions = document.querySelector('.instructions');
    instructions.innerHTML = '';
    const carouselSlides = document.querySelector('.carousel-inner');
    if (carouselSlides.hasChildNodes()) {
        removeAllChildNodes(carouselSlides);
    }
    const drinkCarousel = document.querySelector('#drinkCarousel');
    if (!drinkCarousel.classList.contains('hidden')) {
        drinkCarousel.classList.add('hidden');
    }
}


// ===== Search drink by ingredient, display a carousel =====
// add event listener to second button:
let getDrinks = document.querySelector('.get-drinks');
getDrinks.addEventListener('click', getDrinkList);

function getDrinkList() {
    let ingredentName = document.querySelector('.ingredient-name').value.toLowerCase();
    let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredentName}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // // data['drinks'] is an array of objects
            // console.log(data['drinks']);

            resetContent();

            for (let i = 0; i < data['drinks'].length; i++) {
                let carouselItem = document.createElement('div');
                const drinkCarousel = document.querySelector('#drinkCarousel');
                drinkCarousel.classList.remove('hidden');

                if (i === 0) {
                    carouselItem.classList.add('active');
                }
                carouselItem.classList.add('carousel-item');
                let carouselImg = document.createElement('img');
                carouselImg.classList.add('d-block', 'w-100');
                carouselImg.src = data['drinks'][i].strDrinkThumb;
                // console.log(carouselImg.src);

                let caption = document.createElement('div');
                caption.classList.add('carousel-caption');
                caption.innerHTML = `<h5>${data['drinks'][i].strDrink}</h5>`;

                carouselItem.appendChild(carouselImg);
                carouselItem.appendChild(caption);

                document.querySelector('.carousel-inner').appendChild(carouselItem);
            }
        })
        .catch(err => console.log(`error ${err}`))
}

$('.carousel').carousel({
    interval: 3000
})



