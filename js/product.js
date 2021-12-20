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
         * Création des éléments HTML <img> et <option></option>: pour la sélection d'une couleur associé au produit en lui-même.
         * Lien parent/enfant pour ces éléments.
         * Ajout de l'attribut src et alt pour l'image. Récupération des données pour chaque attribut correspondant dans data.
         * Modification du contenu de l'élément HTML ayant pour id=title, id=price et id=description. Récupération des données dans data pour l'attribut correspondant.
         * Création de l'élément HTML <option></option> avec la liste des couleurs associées au produit
        **/

        let itemImg = document.querySelector('.item__img');
        let imageDuProduit = document.createElement('img');
            itemImg.appendChild(imageDuProduit);
            imageDuProduit.setAttribute('src', data.imageUrl);
            imageDuProduit.setAttribute('alt', data.altTxt);

        let nomDuProduit = document.querySelector('#title');
            nomDuProduit.textContent = data.name;
        let prixDuProduit = document.querySelector('#price');
            prixDuProduit.textContent = data.price;
        let descriptionDuProduit = document.querySelector('#description');
            descriptionDuProduit.textContent = data.description;

        let couleurs = document.querySelector('#colors');
        let choixCouleurs = data.colors;
        console.log(choixCouleurs);
            for(i = 0; i < choixCouleurs.length; i++){
                let choixCouleur = document.createElement('option');
                couleurs.appendChild(choixCouleur);
                choixCouleur.textContent = choixCouleurs[i];
            }
})
.catch(function (erreur) {
    console.log("Message d'erreur : \n" + erreur);
    alert("Une erreur est survenue lors du chargement");
});