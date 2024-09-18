// Récupérer les éléments du formulaire et le message d'erreur
const form = document.querySelector(".formulaire form") // Sélectionne l'élément <form> dans la section avec la classe "formulaire"
const errorMsg = document.querySelector(".formulaire p") // Sélectionne l'élément <p> pour afficher les erreurs

// Connexion au moment de la soumission du formulaire
form.addEventListener("submit", async function(event) {
    event.preventDefault() // Empêche le rechargement automatique de la page lors de la soumission du formulaire

    // Récupérer les valeurs des champs email et mot de passe
    const email = document.querySelector(".formulaire #email") // Sélectionne le champ email par son id
    const password = document.querySelector(".formulaire #password") // Sélectionne le champ password par son id
    console.log(email, password) // Affiche dans la console les objets récupérés (pour debug)

    // Créer l'objet avec les données de connexion (email et password)
    const body = {
        "email": email.value,   // Récupère la valeur saisie dans le champ email
        "password": password.value // Récupère la valeur saisie dans le champ password
    }

    // Envoie d'une requête POST à l'API pour authentifier l'utilisateur
    const response = await fetch("http://localhost:5678/api/users/login", { // Appel de l'API pour la connexion
        method: "POST", // Utilise la méthode POST pour envoyer les données
        headers: {"Content-Type": "application/json"}, // Définit le format JSON pour les données envoyées
        body: JSON.stringify(body) // Convertit l'objet body en chaîne JSON
    })
    console.log(response) // Affiche la réponse de l'API dans la console (pour debug)

    // Si la requête réussit avec le code de statut 200
    if (response.status === 200) {
        const user = await response.json() // Convertit la réponse en objet JavaScript
        const token = user.token // Extrait le token d'authentification de l'objet reçu

        // Stocker le token dans le localStorage pour maintenir la session utilisateur
        window.localStorage.setItem("token", token)

        // Rediriger l'utilisateur vers la page principale après la connexion réussie
        window.location.href = "index.html"
    } else {
        // Si le statut de la réponse n'est pas 200 (échec), afficher un message d'erreur
        errorMsg.textContent = "L'identifiant ou le mot de passe est invalide" // Affiche le message d'erreur
    }
})