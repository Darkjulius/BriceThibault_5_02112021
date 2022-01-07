/**
 * La fonction recupArticles() permet de récupérer les articles de l'API afin de pouvoir les afficher sur la page index.HTML.
 * 1. Récupération des articles avec la requête fetch.
 * 2. Répartition de ceux-ci dans le DOM.
 */

function recupArticles(){
    fetch("http://localhost:3000/api/products")
    .then(function(response){
        if (response.ok) {
            return response.json();
        }
    })
    .then(function(data){
        const products = data;
        console.log(products);
        for(let kanap in products){
            let items = document.querySelector('#items');
    
            let lienArticle = document.createElement("a");
            items.appendChild(lienArticle);
            lienArticle.href = `product.html?id=${data[kanap]._id}`;
    
            let article = document.createElement("article");
            lienArticle.appendChild(article);
    
            let articleImg = document.createElement("img");
            article.appendChild(articleImg);
            articleImg.setAttribute('src', data[kanap].imageUrl);
            articleImg.setAttribute('alt', data[kanap].altTxt);
    
            let articleTitle = document.createElement("h3");
            article.appendChild(articleTitle);
            articleTitle.innerHTML = data[kanap].name;
            articleTitle.classList.add("productName");
    
            let articleDescription = document.createElement("p");
            article.appendChild(articleDescription);
            articleDescription.innerHTML = data[kanap].description;
            articleDescription.classList.add("productDescription");
        }
    })
    .catch(function(erreur){
        console.log(`Erreur: ${erreur}`);
    })
}
recupArticles();
