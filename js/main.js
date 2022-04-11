//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
// let cocktail = document.querySelector('input').value.toLowerCase();
// let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`

let getCt = document.querySelector('.get-ct');
getCt.addEventListener('click', getDrink);

function getDrink() {
    let cocktailName = document.querySelector('input').value.toLowerCase();
    let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(Object.keys(data.drinks[0]));
            let ingredients = Object.keys(data.drinks[0]).filter(k => (k.startsWith('strIngredient')) && data.drinks[0][k] !== null);
            // console.log(ingredients);
            let measures = Object.keys(data.drinks[0]).filter(k => k.startsWith('strMeasure') && data.drinks[0][k] !== null);

            document.querySelector('img').src = `${data.drinks[0].strDrinkThumb}/preview`;
            document.querySelector('h2').textContent = data.drinks[0].strDrink;

            for (let i = 0; i < ingredients.length; i++) {
                let listItem = document.createElement('li');
                listItem.classList.add('list-group-flush');
                let measure = data.drinks[0][measures[i]] ? data.drinks[0][measures[i]] : ''; 
                let node = document.createTextNode(`${measure} ${data.drinks[0][ingredients[i]]}`);
                listItem.appendChild(node);

                let element = document.querySelector('.ingredients');
                element.appendChild(listItem);
            }

            let para = document.createElement('p');
            para.textContent = data.drinks[0].strInstructions;
            let element = document.querySelector('.instructions');
            element.appendChild(para);
        })
        .catch(err => console.log(`error ${err}`))
}




