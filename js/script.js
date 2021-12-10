fetch("http://localhost:3000/api/products")
.then(function (reponse) {
    if (reponse.ok) {
      // Retour de la reponse au format JSON.
      return reponse.json();
    }
})
.then(function (data) {
    // Affichage du résultat de l'API.
    console.log(data);

    for (let i = 0; i < data.length; i++){
        let items = document.querySelector('#items');

        //Création des différents éléments HTML.
        let baliseLiensA = document.createElement("a");
        let baliseArticle = document.createElement("article");
        let baliseImg = document.createElement("img");
        let baliseH3 = document.createElement("h3");
        let baliseP = document.createElement("p");

        items.appendChild(baliseLiensA); // Ajout de la balise <a></a> à la balise parente <section></section> dans le DOM
        baliseLiensA.href = `product.html?id=${data[i]._id}`; // Ajout de l'attribut 'href' à la balise <a></a> dans le DOM et création du lien entre un produit de la page d'accueil et la page produit
  
        baliseLiensA.appendChild(baliseArticle); // Ajout de la balise <article></article> à la balise parente <a></a> dans le DOM
  
        baliseArticle.appendChild(baliseImg); // Ajout de la balise </img> à la balise parente <article></article> dans le DOM
        baliseImg.src = data[i].imageUrl; // Ajout de l'attribut 'src' à la balise </img> dans le DOM
        baliseImg.alt = data[i].altTxt; // Ajout de l'attribut 'alt' à la balise </img> dans le DOM
  
        baliseArticle.appendChild(baliseH3); // Ajout de la balise <h3></h3> à la balise parente <article></article> dans le DOM
        baliseH3.textContent = data[i].name; // Ajout du nom du canapé dans la balise <h3></h3> dans le DOM
        baliseH3.classList.add("productName"); // Ajout de 'class="productName"' à la balise balise <h3></h3> dans le DOM
  
        baliseArticle.appendChild(baliseP); // Ajout de la balise <p></p> à la balise parente <article></article> dans le DOM
        baliseP.textContent = data[i].description; // Ajout de la description du canapé dans la balise <p></p> dans le DOM
        baliseP.classList.add("productDescription"); // Ajout de 'class="productDescription"' à la balise <p></p> dans le DOM
    }
    console.log(items); //Affichage du résultat dans la console
})
.catch(function (erreur) {
    console.log("Message d'erreur : \n" + erreur);
    alert("Une erreur est survenue lors du chargement");
});