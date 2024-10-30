// Modale pour supprimer une photo

let modaleOverlay = document.querySelector('.modal-container');
const overlay = document.querySelector('.overlay');
const cross = document.querySelector('.cross > .bx-x');

// Initialiser l'état du style (ne pas réaffecter modaleOverlay)/////////////////////////
modaleOverlay.style.display = "none";
cross.style.cursor = "pointer"
/////////////////////////////////////////////////////////////////////////////////////////

// Faire apparaitre la modale ///////////////////////////////////////////////////////////
const editModal = document.querySelector(".edit-modale");

editModal.addEventListener("click", function(event) {
    event.preventDefault();
    modaleOverlay.style.display = "flex"; // Affiche la modale
    console.log("edit");
});
/////////////////////////////////////////////////////////////////////////////////////////

// Fonction pour faire disparaitre la modale ////////////////////////////////////////////
function  modaleDisplay() {
    overlay.addEventListener('click', function(event) {
    event.preventDefault();
    modaleOverlay.style.display = "none"; // Cache la modale
    console.log("clic");
    });

cross.addEventListener('click', function(event) {
    event.preventDefault();
    modaleOverlay.style.display = "none"; // Cache la modale
    console.log("clic");
    });
}
modaleDisplay()
/////////////////////////////////////////////////////////////////////////////////////////

async function initDeux() {
    const reponseWorks = await fetch("http://localhost:5678/api/works");
    works = await reponseWorks.json();

    works.forEach(function(articleUn) {
        // Sélectionner la section où les éléments seront insérés
        const section = document.querySelector('.contenu');
        const gallery = document.querySelector('.gallery'); // La galerie principale

        // Créer les éléments pour la modale
        const suppr = document.createElement('div');
        const imageDeux = document.createElement("img");
        const trash = document.createElement('div');
        const im = document.createElement('i');

        // Ajouter les classes nécessaires
        suppr.classList.add('suppr');
        trash.classList.add('trash');
        im.classList.add('bx', 'bx-trash'); // Séparer les classes par une virgule

        // Définir l'image (src et alt)
        imageDeux.src = articleUn.imageUrl;
        imageDeux.alt = articleUn.title;

        // Ajouter les éléments dans le DOM (modale)
        section.appendChild(suppr);  // Ajoute "suppr" dans la section ".contenu"
        suppr.appendChild(imageDeux); // Ajoute l'image dans "suppr"
        suppr.appendChild(trash);     // Ajoute "trash" dans "suppr"
        trash.appendChild(im);        // Ajoute l'icône dans "trash"

        // Ajouter l'image dans la galerie principale
        const figure = document.createElement("figure");
        const imageGallery = document.createElement("img");
        const figCaption = document.createElement("figcaption");

        imageGallery.src = articleUn.imageUrl;
        imageGallery.alt = articleUn.title;
        figCaption.innerText = articleUn.title;

        figure.appendChild(imageGallery);
        figure.appendChild(figCaption);
        gallery.appendChild(figure); // Ajoute l'image dans la galerie principale

        // Ajouter l'événement pour supprimer l'image
        trash.style.cursor = 'pointer'
        trash.addEventListener('click', function() {
            // Supprimer dans la modale
            section.removeChild(suppr);

            // Supprimer dans la galerie principale
            const allFigures = gallery.querySelectorAll('figure');
            allFigures.forEach(function(fig) {
                const imgInGallery = fig.querySelector('img');
                if (imgInGallery && imgInGallery.src === articleUn.imageUrl) {
                    gallery.removeChild(fig);
                }
            });

            // Optionnel : si tu veux aussi supprimer l'image du serveur, envoie une requête DELETE
            // await fetch(`http://localhost:5678/api/works/${articleUn.id}`, { method: 'DELETE' });

            console.log('Image supprimée partout');
        });

        // Ajouter une photo (Modale)

        // Garder la modale existante et juste remplacer les elements liste ci-dessous :
        // - titre
        // - ajout de la fleche
        // - enlever les projets
        // - ajouter contenu pour ajouter photo
        // - changer le bouton valider
        // - garder le hr
        const sectionDeux = document.querySelector('.contenu-deux')
        const modaleButton = document.querySelector('.modale-button')
        const arrowBack = document.querySelector('.visibilite')
        const titleModale = document.querySelector('.title-modal > h3')
        // Variables pour les elements du dom concernant la 2 eme modal
        const addPicture = document.createElement('div');
        const pA  = document.createElement('i');
        const buttonAdding = document.createElement('button');
        const pFormatImg = document.createElement('p');
        const form = document.createElement('form');
        const titleUpload = document.createElement('div');
        const  labelOne = document.createElement('label');
        const inputOne = document.createElement('input');

        addPicture.classList.add('add-picture');
        pA.classList.add('bx', 'bx-photo-album');
        buttonAdding.classList.add('add-picture-button');

        sectionDeux.style.display = 'none';

        arrowBack.style.cursor = 'pointer' // Transformation du curseur en pointer au passage de la souris

        modaleButton.addEventListener('click', function(event) {
            event.preventDefault
            if (modaleButton.innerText === 'Ajouter une photo') {
                modaleButton.innerText = 'Valider'
                arrowBack.style.visibility = 'visible'
                section.style.display = 'none'
                titleModale.innerText = 'Ajout photo'
                sectionDeux.style.display = 'flex';
                }
            })

        arrowBack.addEventListener('click', function(event) {
            event.preventDefault
            modaleButton.innerText = 'Ajouter une photo'
            arrowBack.style.visibility = 'hidden'
            section.style.display = 'grid'
            titleModale.innerText = 'Galerie photo'
            sectionDeux.style.display = 'none';
        })
    });

    console.log(works); // Affiche les œuvres récupérées dans la console
}
initDeux();