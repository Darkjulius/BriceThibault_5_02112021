let recupDonneesDuLocalStorage = JSON.parse(localStorage.getItem("produits"));
console.log(recupDonneesDuLocalStorage);
const cartItems = document.querySelector("#cart__items");

function traitementLocalStorage(){
    if (recupDonneesDuLocalStorage === null || recupDonneesDuLocalStorage == 0) {
        const panierVide = `<p>Votre panier est vide</p>`;
        cartItems.innerHTML = panierVide;
    } else {
        for (let kanap in recupDonneesDuLocalStorage){
            let article = document.createElement("article");
            let dataId = document.getElementsByClassName("data-id");
                cartItems.appendChild(article);
                article.classList.add("cart__item", "data-id");
                dataId = article.setAttribute("data-id", recupDonneesDuLocalStorage[kanap]._id);
        
            let divParentImg = document.createElement("div");
            article.appendChild(divParentImg);
            divParentImg.classList.add("cart__item__img");
        
            let articleImg = document.createElement("img");
            divParentImg.appendChild(articleImg);
            articleImg.setAttribute("src", recupDonneesDuLocalStorage[kanap].imageProduit);
        
            let divCartItemContent = document.createElement("div");
            article.appendChild(divCartItemContent);
            divCartItemContent.classList.add("cart__item__content");
        
                let divCartItemContentTitlePrice = document.createElement("div");
                divCartItemContent.appendChild(divCartItemContentTitlePrice);
                divCartItemContentTitlePrice.classList.add("cart__item__content__titlePrice");
        
                    let articleTitle = document.createElement("h2");
                    divCartItemContentTitlePrice.appendChild(articleTitle);
                    articleTitle.innerHTML = recupDonneesDuLocalStorage[kanap].nomProduit;

                    let couleurArticle = document.createElement("p");
                    articleTitle.appendChild(couleurArticle);
                    couleurArticle.innerHTML = recupDonneesDuLocalStorage[kanap].couleurProduit;
        
                    let articlePrix = document.createElement("p");
                    divCartItemContentTitlePrice.appendChild(articlePrix);
                    articlePrix.innerHTML = (recupDonneesDuLocalStorage[kanap].prixProduit * recupDonneesDuLocalStorage[kanap].quantiteProduit) + " €";
                
                let divCartItemContentSettings = document.createElement("div");
                divCartItemContent.appendChild(divCartItemContentSettings);
                divCartItemContentSettings.classList.add("cart__item__content__settings");
        
                    let divCartItemContentSettingsQuantity = document.createElement("div");
                    divCartItemContentSettings.appendChild(divCartItemContentSettingsQuantity);
                    divCartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
        
                        let articleQte = document.createElement("p");
                        divCartItemContentSettingsQuantity.appendChild(articleQte);
                        articleQte.innerHTML = "Qté : ";
        
                        let inputQteValeur = document.createElement("input");
                        divCartItemContentSettingsQuantity.appendChild(inputQteValeur);
                        inputQteValeur.value = recupDonneesDuLocalStorage[kanap].quantiteProduit;
                        inputQteValeur.setAttribute("type", "number");
                        inputQteValeur.setAttribute("min", "1");
                        inputQteValeur.setAttribute("max", "100");
                        inputQteValeur.setAttribute("name", "itemQuantity");
                        inputQteValeur.classList.add("itemQuantity");

                    let divCartItemContentSettingsDelete = document.createElement("div");
                    divCartItemContentSettings.appendChild(divCartItemContentSettingsDelete);
                    divCartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");
        
                        let suppItem = document.createElement("p");
                        divCartItemContentSettingsDelete.appendChild(suppItem);
                        suppItem.classList.add("deleteItem");   
                        suppItem.textContent = "Supprimer";
        }
    }
}
traitementLocalStorage();

function montantQuantiteEtTotalPanier(){
    let qteTotal = document.querySelectorAll(".itemQuantity");
    let totalQuantite = 0;
    for(let qte = 0; qte < qteTotal.length; qte++){
        totalQuantite = totalQuantite + qteTotal[qte].valueAsNumber;
        console.log("Qte a chaque tour de boucle: " + totalQuantite);
    }

    let quantiteTotalProduit = document.querySelector("#totalQuantity");
    quantiteTotalProduit.innerHTML = totalQuantite;
    console.log("Qte total a la fin de la boucle: " + totalQuantite);

    const arrayPrix = [];
    let prix = 0;
    for(let montant = 0; montant < qteTotal.length; montant++){
        let totalMontant = recupDonneesDuLocalStorage[montant].prixProduit;
        let qteUnitaire = recupDonneesDuLocalStorage[montant].quantiteProduit;
        prix = totalMontant * qteUnitaire;
        console.log(`Prix total d'un produit x qté choisie: ${totalMontant} * ${qteUnitaire} = ${prix}`);  
        arrayPrix.push(prix);
    }
    
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    console.log(arrayPrix.reduce(reducer, 0));

    let prixTotal = (arrayPrix.reduce(reducer, 0));
    let sommeTotalProduit = document.querySelector("#totalPrice");
    sommeTotalProduit.innerHTML = prixTotal;
    console.log(`Prix total du panier est de ${prixTotal}`);
}
montantQuantiteEtTotalPanier();

function modificationQuantitePanier(){
    let modifQteProduit = document.querySelectorAll(".itemQuantity");
    let arrayQte = [];
    for(let quantite = 0; quantite < recupDonneesDuLocalStorage.length; quantite++){
        let qteProduit = recupDonneesDuLocalStorage[quantite].quantiteProduit;
        arrayQte.push(qteProduit);
        console.log(arrayQte);

        modifQteProduit[quantite].addEventListener("change", (event) => {
            event.preventDefault();
            console.log(event);

            qteProduit;
            let modifQteValeur = modifQteProduit[quantite].valueAsNumber;
            console.log(modifQteValeur);

            let resultatValeurQteModifie = recupDonneesDuLocalStorage.find((produit) => produit.modifQteProduit !== qteProduit);
            resultatValeurQteModifie.quantiteProduit = modifQteValeur;
            recupDonneesDuLocalStorage[quantite].quantiteProduit = resultatValeurQteModifie.quantiteProduit;

            localStorage.setItem("produits", JSON.stringify(recupDonneesDuLocalStorage));
            location.reload();
        })
    }
}
modificationQuantitePanier()

function suppressionProduitPanier(){
    let boutonSupprimer = document.querySelectorAll(".deleteItem");
        //console.log(boutonSupprimer);
    for(let suppression = 0; suppression < boutonSupprimer.length; suppression++){
        //console.log(boutonSupprimer[suppression]);

        boutonSupprimer[suppression].addEventListener("click" , (event) => {
            event.preventDefault();
            //console.log(event);

            let suppressionIdProduit = recupDonneesDuLocalStorage[suppression]._id;
            console.log(suppressionIdProduit);

            recupDonneesDuLocalStorage = recupDonneesDuLocalStorage.filter(produit => produit._id !== suppressionIdProduit);
            console.log(recupDonneesDuLocalStorage);

            localStorage.setItem("produits", JSON.stringify(recupDonneesDuLocalStorage));

            alert("Ce produit a bien été supprimé du panier !");
            location.reload();
        })
    }
}
suppressionProduitPanier();
