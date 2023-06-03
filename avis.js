
export function ajoutListenersButtonAvis() {
    var boutonAvis = document.getElementById('btn-avis');
    var formulaireContainer = document.querySelector('.formulaire-container-avis');
    boutonAvis.addEventListener('click', function() {
        if (formulaireContainer.style.display === 'none') {
            formulaireContainer.style.display = 'block';
        } else {
            formulaireContainer.style.display = 'none';
        }
    });
}
export function ajoutListenersAvis() {
    const annoncesEl = document.querySelectorAll(".fiches article .btn-avis");
    for (let i = 0; i < annoncesEl.length; i++) {
        annoncesEl[i].addEventListener("click", async function (event) {
            const missionId = event.target.dataset.id;
            const reponses = await fetch(`https://web-hands-in-hands.onrender.com/avis/mission/${missionId}`, {
            method: "GET",
            });
            const avis = await reponses.json(); //transforme le json en objet js
            const annonceEl = event.target.parentElement;
            const avisEl = document.createElement("av");
            for (let i = 0; i < avis.length; i++) {
                avisEl.innerHTML += `<br>Avis ${[i+1]}:<br> Utilisateur <strong>${avis[i].id_user}</strong> ${avis[i].commentaire} <br> <br>`;
            }
            annonceEl.appendChild(avisEl);
        });
    }
}

function getToken() {
    return localStorage.getItem('email');
}


var token = getToken();
if (token) {
    console.log('Token:', token);
    console.log('Mail:', localStorage.getItem('email'));
    const mail = localStorage.getItem('email');
    // Faites ce que vous voulez avec le token ici, par exemple, l'afficher dans un élément HTML
} else {
    console.log('Token non trouvé');
}

const mail = localStorage.getItem('email');
//const encodedEmail = encodeURIComponent(mail);


export function ajoutListenerEnvoyerAvis() {
    const formulaireAvis = document.querySelector(".formulaire-avis");
    formulaireAvis.addEventListener("submit", function (event) {
    event.preventDefault(); // empeche le rechargement de la page
    // création d'un nouvel objet avis 
    const avis = {
        missionId: parseInt(event.target.elements.missionId.value), // querySelector permet de récupérer un élément du DOM
        id_user: mail,
        commentaire: event.target.elements.commentaire.value,
    }
    // conversion de l'objet en JSON
    const avisJSON = JSON.stringify(avis);
    fetch("https://web-hands-in-hands.onrender.com/avis", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: avisJSON,
    }); 
    setTimeout(function() {
        location.reload();
      }, 500);

});
}

