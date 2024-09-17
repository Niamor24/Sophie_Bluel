const galerie = document.querySelector(".gallery");
const categoryDiv = document.querySelector(".categorie");

async function ajouterGallerie(works) {
    // Vider la galerie avant d'ajouter de nouveaux éléments
    galerie.innerHTML = "";
    
    // Ajouter les éléments à la galerie
    works.forEach(function(article) {
        // Créer la balise principale "figure"
        const figure = document.createElement("figure");

        // Créer les balises enfants "img" et "figcaption"
        const image = document.createElement("img");
        image.src = article.imageUrl;
        image.alt = article.title;

        const figCaption = document.createElement("figcaption");
        figCaption.innerText = article.title;

        // Attacher les balises
        figure.appendChild(image);
        figure.appendChild(figCaption);

        // Ajouter la "figure" dans la galerie
        galerie.appendChild(figure);
    });
}

async function displayBouton(works) {
    // Appel fetch pour récupérer les données du tableau "categories"
    const reponseCategories = await fetch("http://localhost:5678/api/categories");
    const categories = await reponseCategories.json();

    // Création des boutons pour chaque catégorie
    categories.forEach(function(categorie) {
        const btn = document.createElement("button");
        btn.textContent = categorie.name;
        btn.id = categorie.id;
        btn.classList.add('btn-filter');

        btn.addEventListener("click", function(event) {
            event.preventDefault(); // Prévenir le comportement par défaut du bouton

            // Filtrer les projets selon la catégorie sélectionnée
            const filterProjet = works.filter(function(p) {
                return p.categoryId === categorie.id;
            });

            // Afficher les projets filtrés
            ajouterGallerie(filterProjet);
        });

        // Ajouter le bouton dans le DOM
        categoryDiv.appendChild(btn);
    });
}

// Fonction principale pour charger les données initiales
async function init() {
    // Récupérer toutes les œuvres
    const reponseWorks = await fetch("http://localhost:5678/api/works");
    const works = await reponseWorks.json();

    // Afficher toutes les œuvres initialement
    ajouterGallerie(works);

    // Créer les boutons de filtre
    displayBouton(works);
}

// Appel de la fonction principale
init();