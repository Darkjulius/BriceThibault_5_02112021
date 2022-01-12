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

/**
 * EXPLIQUER LE FONCTIONNEMENT DE LA FONCTION controleDuFormulaire()
 *
 *
 */
function controleDuFormulaire() {
  const cartOrderForm = document.querySelector(".cart__order__form");
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let adresseRegExp = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );
  let nomPrenomVilleRegExp = new RegExp("^[a-zA-Z ,.'-]+$");

  //Ecoute d'événement sur la modification du champ Prénom.
  cartOrderForm.firstName.addEventListener("change", function () {
    validFirstName(this);
  });

  //Ecoute d'événement sur la modification du champ Nom.
  cartOrderForm.lastName.addEventListener("change", function () {
    validLastName(this);
  });

  //Ecoute d'événement sur la modification du champ Adresse.
  cartOrderForm.address.addEventListener("change", function () {
    validAddress(this);
  });

  //Ecoute d'événement sur la modification du champ Ville.
  cartOrderForm.city.addEventListener("change", function () {
    validCity(this);
  });

  //Ecoute d'événement sur la modification du champ Email.
  cartOrderForm.email.addEventListener("change", function () {
    validEmail(this);
  });

  //validation du PRENOM
  const validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (nomPrenomVilleRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = "";
    } else {
      firstNameErrorMsg.innerHTML = "Format du prénom invalide.";
    }
  };

  //validation du NOM
  const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (nomPrenomVilleRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = "";
    } else {
      lastNameErrorMsg.innerHTML = "Format du nom invalide.";
    }
  };

  //validation de l'ADRESSE
  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (adresseRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = "";
    } else {
      addressErrorMsg.innerHTML = "Format de l'adresse invalide.";
    }
  };

  //validation de la VILLE
  const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (nomPrenomVilleRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = "";
    } else {
      cityErrorMsg.innerHTML = "Format de la ville invalide.";
    }
  };

  FormData;

  //validation de l'EMAIL
  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = "";
    } else {
      emailErrorMsg.innerHTML = "Format de la l'email invalide.";
    }
  };
}
controleDuFormulaire();

/**
 * EXPLIQUER LE FONCTIONNEMENT DE LA FONCTION envoiDeLaCommande()
 *
 *
 */
function envoiDeLaCommande() {
  let produitsAchetes = [];
  produitsAchetes.push(produitsDansLeLocalStorage);
  console.log(produitsAchetes);

  const boutonCommander = document.querySelector("#order");

  boutonCommander.addEventListener("click", (e) => {
    let inputFirstName = document.querySelector("#firstName");
    let inputLastName = document.querySelector("#lastName");
    let inputAdress = document.querySelector("#address");
    let inputCity = document.querySelector("#city");
    let inputMail = document.querySelector("#email");

    const order = [{
      client:{
        prenom: inputFirstName,
        nom: inputLastName,
        adresse: inputAdress,
        ville: inputCity,
        email: inputMail
      }
    },
    {
      produits: produitsAchetes
    }
  ];
    console.log(order);

    //Création de la requête
    const options = {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.clear();
        localStorage.setItem("orderId", data.orderId);
        document.location.href = "confirmation.html";
      })
      .catch((erreur) => {
        alert(`Erreur: ${erreur}`);
      });
  });
}
envoiDeLaCommande();
