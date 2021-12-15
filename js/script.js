fetch("http://localhost:3000/api/products")
.then(function (reponse) {
    if (reponse.ok) {
      return reponse.json();
    }
})
.then(function (data) {
    console.log(data);

    for (let i = 0; i < data.length; i++){
        
        /**
         * Sélection de l'élément HTML qui à l'ID items.
         * Création des différents éléments HTML et ils sont affectés à une variable.
         * Création des liens Parents/Enfants. Création des attributs pour les éléments HTML concernés.
         * Exemple: items.appendChild(elementHTMLLiensA). J'ajoute la balise orpheline (enfant) elementHTMLLiensA à son parent qui a l'ID items dans le DOM.
         * Création de l'attribut href et création du lien entre un produit de la page index.html et la product.html pour la balise <a>.
        **/
       
        let items = document.querySelector('#items');
        let elementHTMLLiensA = document.createElement("a");
        let elementHTMLArticle = document.createElement("article");
        let elementHTMLImg = document.createElement("img");
        let elementHTMLH3 = document.createElement("h3");
        let elementHTMLP = document.createElement("p");

        items.appendChild(elementHTMLLiensA);
            elementHTMLLiensA.setAttribute('href', `product.html?id=${data[i]._id}`);
            elementHTMLLiensA.appendChild(elementHTMLArticle);
  
        elementHTMLArticle.appendChild(elementHTMLImg);
            elementHTMLImg.setAttribute('src', data[i].imageUrl);
            elementHTMLImg.setAttribute('alt', data[i].altTxt);

        elementHTMLArticle.appendChild(elementHTMLH3);
            elementHTMLH3.textContent = data[i].name;
            elementHTMLH3.classList.add("productName");
  
        elementHTMLArticle.appendChild(elementHTMLP);
            elementHTMLP.textContent = data[i].description;
            elementHTMLP.classList.add("productDescription");
    }
    console.log(items);
})
.catch(function (erreur) {
    console.log("Message d'erreur : \n" + erreur);
    alert("Une erreur est survenue lors du chargement");
});