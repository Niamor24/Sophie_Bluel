// Sélection des éléments de la galerie et des catégories
const galerie = document.querySelector(".gallery");
const categoryDiv = document.querySelector(".categorie");

let works = [];
let activeButton = null; // Variable pour suivre le bouton actif

// Fonction pour ajouter les œuvres dans la galerie
async function ajouterGallerie(works) {
    // Vider la galerie avant d'ajouter de nouveaux éléments
    galerie.innerHTML = "";

    // Parcourir les œuvres et les ajouter à la galerie
    works.forEach(function(article) {
        const figure = document.createElement("figure");

        const image = document.createElement("img");
        image.src = article.imageUrl;
        image.alt = article.title;

        const figCaption = document.createElement("figcaption");
        figCaption.innerText = article.title;

        figure.appendChild(image);
        figure.appendChild(figCaption);

        galerie.appendChild(figure);
    });
}

// Fonction pour afficher les boutons de catégorie
async function displayBouton() {
    const reponseCategories = await fetch("http://localhost:5678/api/categories");
    const categories = await reponseCategories.json();

    // Création des boutons de catégorie
    categories.forEach(function(categorie) {
        const btn = document.createElement("button");
        btn.textContent = categorie.name;
        btn.id = categorie.id;
        btn.classList.add('btn-filter');

        btn.addEventListener("click", function(event) {
            event.preventDefault(); // Empêche le comportement par défaut

            // Gestion des classes : désactiver le bouton actif précédent
            if (activeButton) {
                activeButton.classList.remove('green-btn');
                activeButton.classList.add('btn-filter');
            }

            // Activer le bouton actuel
            btn.classList.remove('btn-filter');
            btn.classList.add('green-btn');
            activeButton = btn; // Mettre à jour le bouton actif

            // Faire en sorte que le bouton "Tous" devienne inactif
            allBtn.classList.remove('green-btn');
            allBtn.classList.add('btn-filter');

            // Filtrer les œuvres en fonction de la catégorie sélectionnée
            const filterProjet = works.filter((work) => {
                return work.categoryId === categorie.id;
            });

            // Ajouter les œuvres filtrées dans la galerie
            ajouterGallerie(filterProjet);
        });

        // Ajouter le bouton dans le DOM
        categoryDiv.appendChild(btn);
    });
}

// Bouton "Tous"
const allBtn = document.createElement("button");
allBtn.textContent = "Tous";
allBtn.classList.add('green-btn'); // Par défaut, le bouton "Tous" est actif au chargement
categoryDiv.appendChild(allBtn);

allBtn.addEventListener("click", function(event) {
    event.preventDefault(); // Empêcher le comportement par défaut
    ajouterGallerie(works); // Afficher toutes les œuvres

    // Gestion des classes : désactiver le bouton actif précédent
    if (activeButton) {
        activeButton.classList.remove('green-btn');
        activeButton.classList.add('btn-filter');
    }

    // Activer le bouton "Tous"
    allBtn.classList.remove('btn-filter');
    allBtn.classList.add('green-btn');
    activeButton = allBtn; // Mettre à jour le bouton actif
});

// Fonction principale pour charger les données
async function init() {
    const reponseWorks = await fetch("http://localhost:5678/api/works");
    works = await reponseWorks.json();

    // Afficher toutes les œuvres au départ
    ajouterGallerie(works);

    // Créer les boutons de filtre
    displayBouton();
}

// Appel de la fonction principale
// init();


// Affichage des éléments non visible quand l'utilisateur est connecté
const logout = document.querySelector('.logout')
const login = document.querySelector('.login')
const editionMode = document.querySelector('.edition-mode')
const edit = document.querySelector('.edit')
const displayEdit = document.querySelector('.modifier-et-projet p')

function isUserConnected () {
    const token = localStorage.getItem("token")
    return !!token
}

function toggleFilters () {
    if (isUserConnected()) {
        categoryDiv.style.display = "none"; // Enlève les filtres
        logout.style.display = "block" // Apparition du texte "logout"
        login.style.display = "none" // Disparition du texte "login"
    } else {
        logout.style.display = "none" // Disparition du texte "logout"
        login.style.display = "block" // Apparition du texte "login"
        editionMode.style.display = "none" // Disparition du bandeau édition
        edit.style.display = "none" // Disparition du texte et icone modifier
        displayEdit.style.display = "none"
    }
}

logout.addEventListener("click", function(event) {
    window.localStorage.removeItem("token")
    window.location.reload()
    console.log("cliquez !")
})

toggleFilters()