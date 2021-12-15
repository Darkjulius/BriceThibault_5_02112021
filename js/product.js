let params = (new URL(window.location)).searchParams;
let id = params.get("id");
console.log(`Le paramètre récupéré dans l'URL est ${id}`);

fetch(`http://localhost:3000/api/products/${id}`)
.then(function (reponse) {
    if (reponse.ok) {
      return reponse.json();
    }
})
.then(function (data) {
    console.log(data);

        /**
         * Création des éléments HTML <img> et <option></option>: pour la sélection de la couleur vert ou blanc.
         * Lien parent/enfant pour ces éléments (img à la balise div qui a la class item__img) / (option à la balise option qui a le contenu SVP, Choisissez une couleur).
         * Ajout de l'attribut src et alt pour l'image. Récupération des données pour chaque attribut correspondant dans data.
         * Modification du contenu de l'élément HTML ayant pour id=title, id=price et id=description. Récupération des données dans data pour l'attribut correspondant.
         * Création de l'attribut value avec la valeur correspondante (vert ou blanc).
         * Modification du contenu des éléments HTML <option></option>: L'un vert et l'autre blanc.
        **/

        let itemImg = document.querySelector('.item__img');
        let imageDuProduit = document.createElement('img');
            itemImg.appendChild(imageDuProduit);
            imageDuProduit.src = data.imageUrl;
            imageDuProduit.alt = data.altTxt;

        let nomDuProduit = document.querySelector('#title');
            nomDuProduit.textContent = data.name;
        let prixDuProduit = document.querySelector('#price');
            prixDuProduit.textContent = data.price;
        let descriptionDuProduit = document.querySelector('#description');
            descriptionDuProduit.textContent = data.description;

        let optionCouleurs = document.querySelector('#colors');
        let optionCouleurVert = document.createElement('option');
            optionCouleurs.appendChild(optionCouleurVert);
            optionCouleurVert.setAttribute('value', 'vert');
            optionCouleurVert.textContent = "Vert";
        let optionCouleurBlanc = document.createElement('option');
            optionCouleurs.appendChild(optionCouleurBlanc);
            optionCouleurBlanc.setAttribute('value', 'blanc');
            optionCouleurBlanc.textContent = "Blanc";

})
.catch(function (erreur) {
    console.log("Message d'erreur : \n" + erreur);
    alert("Une erreur est survenue lors du chargement");
});