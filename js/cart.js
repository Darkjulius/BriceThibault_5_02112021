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
        
                    let articlePrix = document.createElement("p");
                    divCartItemContentTitlePrice.appendChild(articlePrix);
                    articlePrix.innerHTML = recupDonneesDuLocalStorage[kanap].prixProduit + " €";
                
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

//Ne pas supprimer la fonction monTotalPanier()
/*function montantQuantiteEtTotalPanier(){
    let quantiteTotal = document.querySelectorAll(".itemQuantity");
    let totalQuantite = 0;
    for(let quantite = 0; quantite < quantiteTotal.length; quantite++){
        totalQuantite = totalQuantite + quantiteTotal[quantite].valueAsNumber;
        console.log("Quantite a chaque tour de boucle: " + totalQuantite);
    }
    let quantiteTotalProduit = document.querySelector("#totalQuantity");
    quantiteTotalProduit.innerHTML = totalQuantite;
    console.log("Quantite total: "+totalQuantite);

    let montantTotal = 0;
    for(let montant = 0; montant <quantiteTotal.length; montant++){
        //montantTotal = montantTotal + (totalQuantite * recupDonneesDuLocalStorage[montant].prixProduit);NE PAS SUPPRIMER
        montantTotal = totalQuantite * recupDonneesDuLocalStorage[montant].prixProduit;
        console.log("Montant a chaque tour de boucle: "+montantTotal);
    }
    let montantTotalProduit = document.querySelector("#totalPrice");
    montantTotalProduit.innerHTML = montantTotal;
    console.log(montantTotal);
}
montantQuantiteEtTotalPanier();*/

function modificationQuantiteProduitPanier(){
    let modificationQuantite = document.querySelectorAll(".itemQuantity");
        console.log(modificationQuantite);
    for(let modification = 0; modification < modificationQuantite.length; modification++){
        console.log(modificationQuantite[modification]);

        modificationQuantite[modification].addEventListener("change", (event) => {
            event.preventDefault();
            console.log(event);

            let modificationQuantiteProduit = recupDonneesDuLocalStorage[modification].quantiteProduit;
            let modificationQuantiteValeur = modificationQuantite[modification].valueAsNumber;
            console.log(modificationQuantiteProduit);
            console.log(modificationQuantiteValeur);

            let resultatValeurQuantiteModifie = recupDonneesDuLocalStorage.find((produit) => produit.modificationQuantiteValeur !== modificationQuantiteProduit);
            resultatValeurQuantiteModifie.quantiteProduit = modificationQuantiteValeur;
            recupDonneesDuLocalStorage[modification].quantiteProduit = resultatValeurQuantiteModifie.quantiteProduit;

            localStorage.setItem("produits", JSON.stringify(recupDonneesDuLocalStorage));

            location.reload();
            /*Cette ligne fout la merde... car si j'ai 2 produits et que je modifie la derniere ligne. Elles se mettent tout à jour en fonction
            de la dernière*/
        })
    }
}
modificationQuantiteProduitPanier()

function suppressionProduitPanier(){
    let boutonSupprimer = document.querySelectorAll(".deleteItem");
        console.log(boutonSupprimer);
    for(let suppression = 0; suppression < boutonSupprimer.length; suppression++){
        console.log(boutonSupprimer[suppression]);

        boutonSupprimer[suppression].addEventListener("click" , (event) => {
            event.preventDefault();
            console.log(event);

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