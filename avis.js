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
    const annoncesEl = document.querySelectorAll(".fiches article buttonA");
    for (let i = 0; i < annoncesEl.length; i++) {
        annoncesEl[i].addEventListener("click", async function (event) {
            const missionId = annoncesEl[i].numero_mission;
            const Json = JSON.stringify(missionId);
            console.log(Json);
            const reponses = await fetch(`http://localhost:3500/avis/mission/${Json}`, {
            method: "GET",
            });
  
            try {
                const avis = await reponses.json();
                const annonceEl = event.target.parentElement;
                const avisContainer = document.createElement("div");
  
                for (let j = 0; j < avis.length; j++) {
                    if (avis[j].numero_mission === missionId) {
                        const avisEl = document.createElement("p");
                        avisEl.innerHTML = `Avis_${j}: ${avis[j].id_user}: ${avis[j].commentaire} <br>`;
                        avisContainer.appendChild(avisEl);
                    }
                }
                annonceEl.appendChild(avisContainer);
            } catch (error) {
                console.error('Erreur lors de la récupération des avis:', error)}
        });
    }
}
  

export function ajoutListenerEnvoyerAvis() {
    const formulaireAvis = document.querySelector(".formulaire-avis");
    formulaireAvis.addEventListener("submit", function (event) {
    event.preventDefault(); // empeche le rechargement de la page
    // création d'un nouvel objet avis 
    const avis = {
        missionId: parseInt(event.target.elements.missionId.value), // querySelector permet de récupérer un élément du DOM
        id_user: event.target.elements.id_user.value,
        commentaire: event.target.elements.commentaire.value,
    }
    // conversion de l'objet en JSON
    const avisJSON = JSON.stringify(avis);
    fetch("http://localhost:3500/avis", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: avisJSON,
}); 

});
}

