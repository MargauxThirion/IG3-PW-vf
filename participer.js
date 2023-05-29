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
            console.log(id);
            const reponse = await fetch(`https://web-hands-in-hands.onrender.com/participer/mission/${id}`, {
            method:"GET",
            });
            const participe = await reponse.json(); //transforme le json en objet js
            const annonceEl = event.target.parentElement;
            const participeEl = document.createElement("part");
            for (let i = 0; i < participe.length; i++) {
                participeEl.innerHTML += `<br> <strong>${participe[i].id_user}</strong> participe <br>`;
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
    fetch("https://web-hands-in-hands.onrender.com/participer", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: participeJSON,
    });
    setTimeout(function() {location.reload()}, 500); 

});
}

