const galerie = document.querySelector(".gallery")

async function ajouterGallerie() {
    //APPEL FETCH POUR RÉCUPERER LES DONNÉES DU TABLEAU "WORKS"//
    const reponseWorks = await fetch("http://localhost:5678/api/works");
    const works = await reponseWorks.json();
    console.log(works)
    galerie.innerHTML = "" //Vider la gallerie
    for (let i = 0; i < works.length; i++) {
        const article = works[i]
        //CREER LA BALISE PRINCIPAL//
        const figure = document.createElement("figure")
        //CRÉER LES BALISES ENFANTS//
        const image = document.createElement("img")
        image.src = article.imageUrl
        image.alt = article.title
        const figCaption = document.createElement("figcaption")
        figCaption.innerText = article.title
        //ATTACHER LES BALISES ENTRE ELLES//
        galerie.appendChild(figure)
        figure.appendChild(image)
        figure.appendChild(figCaption)
    }
}
ajouterGallerie()

//CONSOLE LOG POUR VERIFIER QUE LES APPELS FETCH FONCTIONNE BIEN//
afficherWorks()


//AFFICHER LES BOUTONS FILTRES//
const categoryDiv = document.querySelector(".categorie")
async function displayBouton() {
    //APPEL FETCH POUR RÉCUPERER LES DONNÉES DU TABLEAU "CATEGORIES"//
    const reponseCategories = await fetch("http://localhost:5678/api/categories")
    const categories = await reponseCategories.json();
}