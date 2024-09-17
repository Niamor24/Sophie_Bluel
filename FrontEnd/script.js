const galerie = document.querySelector(".gallery");
const categoryDiv = document.querySelector(".categorie");

let works = [];
let activeButton = null; // Variable pour suivre le bouton actif

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

async function displayBouton() {
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

            // Gérer la classe active du bouton
            if (activeButton) {
                activeButton.classList.remove('green-btn');
                activeButton.classList.add('btn-filter');
            }

            // Mettre à jour le bouton actif
            btn.classList.remove('btn-filter');
            btn.classList.add('green-btn');
            activeButton = btn;

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

// Bouton "Tous"
const allBtn = document.createElement("button");
allBtn.textContent = "Tous";
allBtn.classList.add('green-btn');
categoryDiv.appendChild(allBtn);

allBtn.addEventListener("click", function(event) {
    event.preventDefault(); // Prévenir le comportement par défaut du bouton
    ajouterGallerie(works); // Afficher tous les projets

    // Réinitialiser le bouton actif
    if (activeButton) {
        activeButton.classList.add('green-btn');
        activeButton.classList.remove('btn-filter');
    } else {
        activeButton.classList.remove('green-btn');
        activeButton.classList.add('btn-filter');
    }
});

// Fonction principale pour charger les données initiales
async function init() {
    // Récupérer toutes les œuvres
    const reponseWorks = await fetch("http://localhost:5678/api/works");
    works = await reponseWorks.json();

    // Afficher toutes les œuvres initialement
    ajouterGallerie(works);

    // Créer les boutons de filtre
    displayBouton();
}

// Appel de la fonction principale
init();