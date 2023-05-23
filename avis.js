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
            missionId = annoncesEl[i].numero_mission;
            const url = `http://localhost:3500/avis/mission/${missionId}`;
        try {
          const response = await fetch(url);
          const avis = await response.json();
  
          const annonceEl = event.target.parentElement;
          const avisEl = document.createElement("av");
  
          for (let j = 0; j < avis.length; j++) {
            avisEl.innerHTML += `Avis_${j}: ${avis[j].id_user}: ${avis[j].commentaire} <br>`;
          }
  
          annonceEl.appendChild(avisEl);
        } catch (error) {
          console.error('Erreur lors de la récupération des avis:', error);
            }
        });
    }
}

    /*const annoncesEl = document.querySelectorAll(".fiches article buttonA");

    for (let i = 0; i < annoncesEl.length; i++) {
        annoncesEl[i].addEventListener("click", async function (event) {
            const id = event.target.dataset.id;
            const reponse = await fetch(`http://localhost:3500/avis?missionId=${i}`);
            const avis = await reponse.json(); //transforme le json en objet js
            const annonceEl = event.target.parentElement;
            const avisEl = document.createElement("av");
            for (let i = 0; i < avis.length; i++) {
                avisEl.innerHTML += `Avis_${[i]} ${avis[i].utilisateur}: ${avis[i].commentaire} <br>`;
            }
            annonceEl.appendChild(avisEl);
        });
    }*/


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

