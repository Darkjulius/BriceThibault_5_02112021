let params = new URL(window.location).searchParams;
let id = params.get("id");

const itemImg = document.querySelector(".item__img");
const nomDuProduit = document.querySelector("#title");
const prixDuProduit = document.querySelector("#price");
const descriptionDuProduit = document.querySelector("#description");
const couleurDuProduit = document.querySelector("#colors");
const nombreProduitSelectionne = document.querySelector("#quantity");

/**
 * EXPLIQUER LE FONCTIONNEMENT DE LA FONCTION recuperationDonneesArticle()
 *
 *
 */
function recuperationDonneesArticle() {
  fetch(`http://localhost:3000/api/products/${id}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      const produitsSelectionnes = data;
      if (produitsSelectionnes) {
        traitementData(produitsSelectionnes);
      }
    })
    .catch(function (erreur) {
      console.log(`Erreur: ${erreur}`);
    });
}
recuperationDonneesArticle();

/**
 * EXPLIQUER LE FONCTIONNEMENT DE LA FONCTION traitementData(produitsSelectionnes)
 *
 *
 */
function traitementData(produitsSelectionnes) {
  let imageDuProduit = document.createElement("img");
  itemImg.appendChild(imageDuProduit);
  imageDuProduit.setAttribute("src", produitsSelectionnes.imageUrl);
  imageDuProduit.setAttribute("alt", produitsSelectionnes.altTxt);

  nomDuProduit.innerHTML = produitsSelectionnes.name;
  prixDuProduit.innerHTML = produitsSelectionnes.price;
  descriptionDuProduit.innerHTML = produitsSelectionnes.description;

  for (let couleur of produitsSelectionnes.colors) {
    let choixCouleur = document.createElement("option");
    couleurDuProduit.appendChild(choixCouleur);
    choixCouleur.value = couleur;
    choixCouleur.innerHTML = couleur;
  }
  ajoutPanier(produitsSelectionnes);
}

/**
 * EXPLIQUER LE FONCTIONNEMENT DE LA FONCTION ajoutPanier(produitsSelectionnes)
 *
 *
 */
function ajoutPanier(produitsSelectionnes) {
  const ajoutProduitPanier = document.querySelector("#addToCart");

  ajoutProduitPanier.addEventListener("click", function () {
    if (
      nombreProduitSelectionne.value > 0 &&
      nombreProduitSelectionne.value <= 100 &&
      nombreProduitSelectionne.value != 0
    ) {
      let selectionCouleur = couleurDuProduit.value;
      let selectionQuantite = nombreProduitSelectionne.value;

      let produitAjoute = {
        _id: id,
        couleurProduit: selectionCouleur,
        quantiteProduit: selectionQuantite,
        nomProduit: produitsSelectionnes.name,
        prixProduit: produitsSelectionnes.price,
        descriptionProduit: produitsSelectionnes.description,
        imageProduit: produitsSelectionnes.imageUrl,
        altImageProduit: produitsSelectionnes.altTxt,
      };

      let produitDansLeLocalStorage = JSON.parse(
        localStorage.getItem("produits")
      );

      const lienVersPageCartHtml = window.location.href = "cart.html";

      //Import dans le localStorage
      //Si le panier comporte déjà 1 produit
      if (produitDansLeLocalStorage) {
        const resultat = produitDansLeLocalStorage.find(
          (element) =>
            element._id === id && element.couleurProduit === selectionCouleur
        );
        //Si le produit commandé est déjà dans le panier
        if (resultat) {
          let nouvelleQuantite =
            parseInt(produitAjoute.quantiteProduit) +
            parseInt(resultat.quantiteProduit);
          resultat.quantiteProduit = nouvelleQuantite;
          localStorage.setItem(
            "produits",
            JSON.stringify(produitDansLeLocalStorage)
          );
          lienVersPageCartHtml;
          //Si le produit n'est pas dans le panier
        } else {
          produitDansLeLocalStorage.push(produitAjoute);
          localStorage.setItem(
            "produits",
            JSON.stringify(produitDansLeLocalStorage)
          );
          lienVersPageCartHtml;
        }
        //Si le panier est vide
      } else {
        produitDansLeLocalStorage = [];
        produitDansLeLocalStorage.push(produitAjoute);
        localStorage.setItem(
          "produits",
          JSON.stringify(produitDansLeLocalStorage)
        );
        lienVersPageCartHtml;
      }
    }
  });
}
