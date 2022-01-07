let params = (new URL(window.location)).searchParams;
let id = params.get("id");
console.log(id);

const itemImg = document.querySelector('.item__img');
const nomDuProduit = document.querySelector('#title');
const prixDuProduit = document.querySelector('#price');
const descriptionDuProduit = document.querySelector('#description');
const couleurDuProduit = document.querySelector('#colors');
const nombreProduitSelectionne = document.querySelector('#quantity');

/**
 * La fonction recupArticles() permet de récupérer l'article de l'API qui a été sélectionné sur la page index.html.
 * Si il y a des données dans la constante data. Exécution de la fonction traitementData.
 */
function recupArticles(){
    fetch(`http://localhost:3000/api/products/${id}`)
    .then(function(response){
        if (response.ok) {
            return response.json();
        }
    })
    .then(function(data){
        const products = data;
        if (products){
            traitementData(products);
        }
    })
    .catch(function(erreur){
        console.log(`Erreur: ${erreur}`);
    })
}
recupArticles();

/**
 * La fonction traitementData(products) affiche les données du produit sélectionné -> 
 * Image, Nom du produit, sa description et le choix de la couleur de celui-ci.
 */
function traitementData(products){
    let imageDuProduit = document.createElement('img');
    itemImg.appendChild(imageDuProduit);
        imageDuProduit.setAttribute("src", products.imageUrl);
        imageDuProduit.setAttribute("alt", products.altTxt)

        nomDuProduit.innerHTML = products.name;
        prixDuProduit.innerHTML = products.price;
        descriptionDuProduit.innerHTML = products.description;

    for(let couleur of products.colors){
        console.table(colors);
        let choixCouleur = document.createElement("option");
        couleurDuProduit.appendChild(choixCouleur);
        choixCouleur.value = couleur;
        choixCouleur.innerHTML = couleur;
    }
    ajoutPanier(products);
}

/**
 * La fonction ajoutPanier(products) permet d'ajouter le produit sélectionné avec la couleur choisie et sa quantité
 * dans le localStorage du navigateur.
 * Les données injectées dans le localStorage sont analysées car si un produit est déjà à l'intérieur avec la même couleur. Le produit
 * est ajouté au produit existant. C'est une mise à jour. Si le produit n'est pas présent dans le panier. L'intégration dans le localStorage se fait et
 * si le panier est vide. Les produits sélectionné sont intégrés dans le localStorage.
 */
function ajoutPanier(products){
    const ajoutProduitPanier = document.querySelector('#addToCart');

    ajoutProduitPanier.addEventListener("click", function(){
        if (nombreProduitSelectionne.value > 0 && nombreProduitSelectionne.value <= 100 && nombreProduitSelectionne.value != 0) {
            let selectionCouleur = couleurDuProduit.value;
            let selectionQuantite = nombreProduitSelectionne.value;

            let produitAjoute = {
                _id: id,
                couleurProduit: selectionCouleur,
                quantiteProduit: selectionQuantite,
                nomProduit: products.name,
                prixProduit: products.price,
                descriptionProduit: products.description,
                imageProduit: products.imageUrl,
                altImageProduit: products.altTxt
            };

            let produitDansLeLocalStorage = JSON.parse(localStorage.getItem("produits"));
            
            const popUpConfirmation =() =>{
                if(window.confirm(`Votre commande est ajoutée au panier \nNom : ${products.name}\nQuantité : ${selectionQuantite}\nCouleur : ${selectionCouleur}.\nPour consulter votre panier, cliquez sur Ok`)){
                    window.location.href="cart.html";
                }
            }

            //Import dans le localStorage
            //Si le panier comporte déjà 1 produit
            if(produitDansLeLocalStorage){
                const resultat = produitDansLeLocalStorage.find((element) => element._id === id && element.couleurProduit === selectionCouleur);
                //Si le produit commandé est déjà dans le panier
                if(resultat){
                    let nouvelleQuantite = parseInt(produitAjoute.quantiteProduit) + parseInt(resultat.quantiteProduit);
                    console.log(nouvelleQuantite);
                    resultat.quantiteProduit = nouvelleQuantite;
                    localStorage.setItem("produits", JSON.stringify(produitDansLeLocalStorage));
                    console.table(produitDansLeLocalStorage);
                    popUpConfirmation();
                //Si le produit n'est pas dans le panier
                }else{
                    produitDansLeLocalStorage.push(produitAjoute);
                    localStorage.setItem("produits", JSON.stringify(produitDansLeLocalStorage));
                    console.table(produitDansLeLocalStorage);
                    popUpConfirmation();
                }
            //Si le panier est vide
            }else{
                produitDansLeLocalStorage = [];
                produitDansLeLocalStorage.push(produitAjoute);
                localStorage.setItem("produits", JSON.stringify(produitDansLeLocalStorage));
                console.table(produitDansLeLocalStorage);
                popUpConfirmation()
            }
        }
    });
}