let produitsDansLeLocalStorage = JSON.parse(localStorage.getItem("produits"));
const cartItems = document.querySelector("#cart__items");

/**
 * EXPLIQUER LE FONCTIONNEMENT DE LA FONCTION afficherProduitsDuLocalStorage()
 *
 *
 */
function afficherProduitsDuLocalStorage() {
  if (produitsDansLeLocalStorage === null || produitsDansLeLocalStorage == 0) {
    const panierVide = `<p>Votre panier est vide</p>`;
    cartItems.innerHTML = panierVide;
  } else {
    for (let produits in produitsDansLeLocalStorage) {
      let article = document.createElement("article");
      let dataId = document.getElementsByClassName("data-id");
      cartItems.appendChild(article);
      article.classList.add("cart__item", "data-id");
      dataId = article.setAttribute(
        "data-id",
        produitsDansLeLocalStorage[produits]._id
      );

      let divParentImg = document.createElement("div");
      article.appendChild(divParentImg);
      divParentImg.classList.add("cart__item__img");

      let articleImg = document.createElement("img");
      divParentImg.appendChild(articleImg);
      articleImg.setAttribute(
        "src",
        produitsDansLeLocalStorage[produits].imageProduit
      );

      let divCartItemContent = document.createElement("div");
      article.appendChild(divCartItemContent);
      divCartItemContent.classList.add("cart__item__content");

      let divCartItemContentTitlePrice = document.createElement("div");
      divCartItemContent.appendChild(divCartItemContentTitlePrice);
      divCartItemContentTitlePrice.classList.add(
        "cart__item__content__titlePrice"
      );

      let articleTitle = document.createElement("h2");
      divCartItemContentTitlePrice.appendChild(articleTitle);
      articleTitle.innerHTML = produitsDansLeLocalStorage[produits].nomProduit;

      let couleurArticle = document.createElement("p");
      articleTitle.appendChild(couleurArticle);
      couleurArticle.innerHTML =
        produitsDansLeLocalStorage[produits].couleurProduit;

      let articlePrix = document.createElement("p");
      divCartItemContentTitlePrice.appendChild(articlePrix);
      //articlePrix.innerHTML = produitsDansLeLocalStorage[produits].prixProduit + " €";
      articlePrix.innerHTML =
        produitsDansLeLocalStorage[produits].prixProduit *
          produitsDansLeLocalStorage[produits].quantiteProduit +
        " €";

      let divCartItemContentSettings = document.createElement("div");
      divCartItemContent.appendChild(divCartItemContentSettings);
      divCartItemContentSettings.classList.add("cart__item__content__settings");

      let divCartItemContentSettingsQuantity = document.createElement("div");
      divCartItemContentSettings.appendChild(
        divCartItemContentSettingsQuantity
      );
      divCartItemContentSettingsQuantity.classList.add(
        "cart__item__content__settings__quantity"
      );

      let articleQte = document.createElement("p");
      divCartItemContentSettingsQuantity.appendChild(articleQte);
      articleQte.innerHTML = "Qté : ";

      let inputQteValeur = document.createElement("input");
      divCartItemContentSettingsQuantity.appendChild(inputQteValeur);
      inputQteValeur.value =
        produitsDansLeLocalStorage[produits].quantiteProduit;
      inputQteValeur.setAttribute("type", "number");
      inputQteValeur.setAttribute("min", "1");
      inputQteValeur.setAttribute("max", "100");
      inputQteValeur.setAttribute("name", "itemQuantity");
      inputQteValeur.classList.add("itemQuantity");

      let divCartItemContentSettingsDelete = document.createElement("div");
      divCartItemContentSettings.appendChild(divCartItemContentSettingsDelete);
      divCartItemContentSettingsDelete.classList.add(
        "cart__item__content__settings__delete"
      );

      let suppItem = document.createElement("p");
      divCartItemContentSettingsDelete.appendChild(suppItem);
      suppItem.classList.add("deleteItem");
      suppItem.textContent = "Supprimer";
    }
  }
}
afficherProduitsDuLocalStorage();

/**
 * EXPLIQUER LE FONCTIONNEMENT DE LA FONCTION montantEtQuantiteTotalPanier()
 *
 *
 */
function montantEtQuantiteTotalPanier() {
  let qteTotal = document.querySelectorAll(".itemQuantity");
  let totalQuantite = 0;
  for (let qte = 0; qte < qteTotal.length; qte++) {
    totalQuantite = totalQuantite + qteTotal[qte].valueAsNumber;
  }

  let quantiteTotalProduit = document.querySelector("#totalQuantity");
  quantiteTotalProduit.innerHTML = totalQuantite;

  const arrayPrix = [];
  let prix = 0;
  for (let montant = 0; montant < qteTotal.length; montant++) {
    let totalMontant = produitsDansLeLocalStorage[montant].prixProduit;
    let qteUnitaire = produitsDansLeLocalStorage[montant].quantiteProduit;
    prix = totalMontant * qteUnitaire;
    arrayPrix.push(prix);
  }

  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  let prixTotal = arrayPrix.reduce(reducer, 0);
  let sommeTotalProduit = document.querySelector("#totalPrice");
  sommeTotalProduit.innerHTML = prixTotal;
}
montantEtQuantiteTotalPanier();

/**
 * EXPLIQUER LE FONCTIONNEMENT DE LA FONCTION modificationQuantitePanier()
 *
 *
 */
function modificationQuantitePanier() {
  let modifQteProduit = document.querySelectorAll(".itemQuantity");
  let arrayQte = [];
  for (
    let quantite = 0;
    quantite < produitsDansLeLocalStorage.length;
    quantite++
  ) {
    let qteProduit = produitsDansLeLocalStorage[quantite].quantiteProduit;
    arrayQte.push(qteProduit);

    modifQteProduit[quantite].addEventListener("change", (event) => {
      event.preventDefault();

      qteProduit;
      let modifQteValeur = modifQteProduit[quantite].valueAsNumber;

      let resultatValeurQteModifie = produitsDansLeLocalStorage.find(
        (produit) => produit.modifQteProduit !== qteProduit
      );
      resultatValeurQteModifie.quantiteProduit = modifQteValeur;
      produitsDansLeLocalStorage[quantite].quantiteProduit =
        resultatValeurQteModifie.quantiteProduit;

      localStorage.setItem(
        "produits",
        JSON.stringify(produitsDansLeLocalStorage)
      );
      location.reload();
    });
  }
}
modificationQuantitePanier();

/**
 * EXPLIQUER LE FONCTIONNEMENT DE LA FONCTION suppressionProduitPanier()
 *
 *
 */
function suppressionProduitPanier() {
  let boutonSupprimer = document.querySelectorAll(".deleteItem");
  for (
    let suppression = 0;
    suppression < boutonSupprimer.length;
    suppression++
  ) {
    boutonSupprimer[suppression].addEventListener("click", (event) => {
      event.preventDefault();

      let suppressionIdProduit = produitsDansLeLocalStorage[suppression]._id;

      produitsDansLeLocalStorage = produitsDansLeLocalStorage.filter(
        (produit) => produit._id !== suppressionIdProduit
      );

      localStorage.setItem(
        "produits",
        JSON.stringify(produitsDansLeLocalStorage)
      );

      alert("Ce produit a bien été supprimé du panier !");
      location.reload();
    });
  }
}
suppressionProduitPanier();