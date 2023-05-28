export function ajoutListenersButtonParticiper() {
    var boutonParticiper = document.getElementById('btn-participer');
    var formulaireContainer = document.querySelector('.formulaire-container-participer');
    boutonParticiper.addEventListener('click', function() {
        if (formulaireContainer.style.display === 'none') {
            formulaireContainer.style.display = 'block';
        } else {
            formulaireContainer.style.display = 'none';
        }
    });
}

export function ajoutListenersParticipe() {
    const annoncesEl = document.querySelectorAll(".fiches article .btn-participe");

    for (let i = 0; i < annoncesEl.length; i++) {
        annoncesEl[i].addEventListener("click", async function (event) {
            
            const id = event.target.dataset.id;
            const reponse = await fetch(`http://localhost:3500/participer/${id}`);
            const participe = await reponse.json(); //transforme le json en objet js
            const annonceEl = event.target.parentElement;
            const participeEl = document.createElement("part");
            for (let i = 0; i < participe.length; i++) {
                participeEl.innerHTML += `${participe[i].utilisateur}<br>`;
            }
            annonceEl.appendChild(participeEl);
        });
    }
}

export function ajoutListenerEnvoyerParticipe() {
    const formulaireParticipe = document.querySelector(".formulaire-participer");
    formulaireParticipe.addEventListener("submit", function (event) {
    event.preventDefault(); // empeche le rechargement de la page
    // création d'un nouvel objet avis 
    const participe = {
        missionId: parseInt(event.target.elements.missionId.value), // querySelector permet de récupérer un élément du DOM
        id_user: event.target.elements.id_user.value,
    }
    // conversion de l'objet en JSON
    const participeJSON = JSON.stringify(participe);
    fetch("http://localhost:3500/participer", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(participeJSON),
}); 

});
}

