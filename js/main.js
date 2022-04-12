//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
// let cocktail = document.querySelector('input').value.toLowerCase();
// let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`

let getCt = document.querySelector('.get-ct');
getCt.addEventListener('click', getDrink);

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
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

            // if there are li elements, remove them first
            const ingreList = document.querySelector('ul.ingredients');
            removeAllChildNodes(ingreList);


            for (let i = 0; i < ingredients.length; i++) {
                let listItem = document.createElement('li');
                listItem.classList.add('list-group-flush');
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

function getDrink() {
    let cocktailName = document.querySelector('.drink-name').value.toLowerCase();
    getRecipe(cocktailName);
    // let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(Object.keys(data.drinks[0]));
    //         let ingredients = Object.keys(data.drinks[0]).filter(k => (k.startsWith('strIngredient')) && data.drinks[0][k] !== null);
    //         // console.log(ingredients);
    //         let measures = Object.keys(data.drinks[0]).filter(k => k.startsWith('strMeasure') && data.drinks[0][k] !== null);

    //         document.querySelector('img').src = `${data.drinks[0].strDrinkThumb}/preview`;
    //         document.querySelector('h2').textContent = data.drinks[0].strDrink;
    //         document.querySelector('h3.ingredients').textContent = 'Ingredients';
    //         document.querySelector('h3.instructions').textContent = 'Instructions';

    //         // if there are li elements, remove them first
    //         function removeAllChildNodes(parent) {
    //             while (parent.firstChild) {
    //                 parent.removeChild(parent.firstChild);
    //             }
    //         }
    //         const ingreList = document.querySelector('ul.ingredients');
    //         removeAllChildNodes(ingreList);


    //         for (let i = 0; i < ingredients.length; i++) {
    //             let listItem = document.createElement('li');
    //             listItem.classList.add('list-group-flush');
    //             let measure = data.drinks[0][measures[i]] ? data.drinks[0][measures[i]] : '';
    //             let node = document.createTextNode(`${measure} ${data.drinks[0][ingredients[i]]}`);
    //             listItem.appendChild(node);

    //             let element = document.querySelector('ul.ingredients');
    //             element.appendChild(listItem);
    //         }

    //         let para = document.createElement('p');
    //         para.textContent = data.drinks[0].strInstructions;
    //         let element = document.querySelector('.instructions');
    //         element.appendChild(para);
    //     })
    //     .catch(err => console.log(`error ${err}`))
}

let getDrinks = document.querySelector('.get-drinks');
getDrinks.addEventListener('click', getDrinkList);

function getDrinkList() {
    let ingredentName = document.querySelector('.ingredient-name').value.toLowerCase();
    let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredentName}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // // data['drinks'] is an array of objects
            console.log(data['drinks']);

            const recipe = document.querySelector('.drink-recipe');
            removeAllChildNodes(recipe);

            for (let i = 0; i < data['drinks'].length; i++) {
                let carouselItem = document.createElement('div');
                if (i === 0) {
                    carouselItem.classList.add('active');
                }
                carouselItem.classList.add('carousel-item');
                let carouselImg = document.createElement('img');
                carouselImg.classList.add('d-block', 'w-100');
                carouselImg.src = data['drinks'][i].strDrinkThumb;
                // console.log(carouselImg.src);

                let caption = document.createElement('div');
                caption.classList.add('carousel-caption', 'd-none', 'd-md-block');
                caption.innerHTML = `<h5>${data['drinks'][i].strDrink}</h5>`;

                

                carouselItem.appendChild(carouselImg);
                carouselItem.appendChild(caption);


                document.querySelector('.carousel-inner').appendChild(carouselItem);
            }


        })
        .catch(err => console.log(`error ${err}`))
}

$('.carousel').carousel({
    interval: 2000
})


