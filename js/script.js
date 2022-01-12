/**
 * EXPLIQUER LE FONCTIONNEMENT DE LA FONCTION affichageDesProduits()
 *
 *
 */

function affichageDesProduits() {
  fetch("http://localhost:3000/api/products")
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      const listeDesProduits = data;
      for (let produits in listeDesProduits) {
        let items = document.querySelector("#items");

        let lienArticle = document.createElement("a");
        items.appendChild(lienArticle);
        lienArticle.href = `product.html?id=${listeDesProduits[produits]._id}`;

        let article = document.createElement("article");
        lienArticle.appendChild(article);

        let articleImg = document.createElement("img");
        article.appendChild(articleImg);
        articleImg.setAttribute("src", listeDesProduits[produits].imageUrl);
        articleImg.setAttribute("alt", listeDesProduits[produits].altTxt);

        let articleTitle = document.createElement("h3");
        article.appendChild(articleTitle);
        articleTitle.innerHTML = listeDesProduits[produits].name;
        articleTitle.classList.add("productName");

        let articleDescription = document.createElement("p");
        article.appendChild(articleDescription);
        articleDescription.innerHTML = listeDesProduits[produits].description;
        articleDescription.classList.add("productDescription");
      }
    })
    .catch(function (erreur) {
      console.log(`Erreur: ${erreur}`);
    });
}
affichageDesProduits();
