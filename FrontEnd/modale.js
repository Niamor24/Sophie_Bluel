// Modale pour supprimer une photo

let modaleOverlay = document.querySelector('.modal-container');
const overlay = document.querySelector('.overlay');
const cross = document.querySelector('.cross > i');

// Initialiser l'état du style (ne pas réaffecter modaleOverlay)
modaleOverlay.style.display = "none";
cross.style.cursor = "pointer"

// Faire apparaitre la modale
const editModal = document.querySelector(".edit-modale");

editModal.addEventListener("click", function(event) {
    event.preventDefault();
    modaleOverlay.style.display = "flex"; // Affiche la modale
    console.log("edit");
});

// Faire disparaitre la modale
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

const contenuModal = document.querySelector(".contenu")
const gallerie = ajouterGallerie(works);

function modale () {
    contenuModal.appendChild(gallerie)
}