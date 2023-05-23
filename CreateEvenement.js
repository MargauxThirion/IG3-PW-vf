import { trouverAnnonceMaxNumeroMission } from "./CountAnnonce.js";

export function ajoutListenersAjouterEvenement() {
    var boutonAjouter = document.getElementById('btn-annonce-ajouter');
    var formulaireContainer = document.querySelector('.formulaire-container-ajouter');
    boutonAjouter.addEventListener('click', function() {
      if (formulaireContainer.style.display === 'none') {
        formulaireContainer.style.display = 'block';
      } else {
        formulaireContainer.style.display = 'none';
      }
    });
}
export function ajoutListenersSupprEvenement() {
    var boutonSuppr = document.getElementById('btn-annonce-suppr');
    var formulaireContainer = document.querySelector('.formulaire-container-suppr');
    boutonSuppr.addEventListener('click', function() {
      if (formulaireContainer.style.display === 'none') {
        formulaireContainer.style.display = 'block';
      } else {
        formulaireContainer.style.display = 'none';
      }
    });
}

export async function ajoutListenerEnvoyerEvenement() {
  const formulaireEvenement = document.querySelector(".formulaire-evenement");
  formulaireEvenement.addEventListener("submit", async function (event) {
  event.preventDefault(); // empeche le rechargement de la page
    
  try {
    const maxNumeroMission = await trouverAnnonceMaxNumeroMission();
    // création d'un nouvel objet avis 
    const evenement = {
        nom_association: event.target.elements.nom_association.value,
        nom_mission: event.target.elements.nom_mission.value,
        numero_mission: maxNumeroMission + 1,
        desc: event.target.elements.desc.value,
        date: event.target.elements.date.value,
        duree: event.target.elements.duree.value,
        nbr_benevole: event.target.elements.nbr_benevole.value,
        competence: event.target.elements.competence.value,
        pays: event.target.elements.pays.value,
        ville: event.target.elements.ville.value,
        code_postal: event.target.elements.code_postal.value,
        rue: event.target.elements.rue.value,
        image: event.target.elements.image.value,
      };
    // conversion de l'objet en JSON
      const Json = JSON.stringify(evenement);
      await fetch("http://localhost:3500/annonce", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: Json,
      });
      setTimeout(function() {
        location.reload();
      }, 500);
      
  } catch (error) {
    console.error('Erreur lors de l ajout des annonces :', error);
  throw error;
  }
}); 
}


export function ajoutListenerSupprimerEvenement() {
  const formulaireSupprimerEv = document.querySelector(".formulaire-supprimer-ev");
    formulaireSupprimerEv.addEventListener("submit", function (event) {
        event.preventDefault(); // empeche le rechargement de la page
        // Récupération de l'id de l'avis à supprimer
        const numero_mission = parseInt(event.target.elements.numero_mission.value) 
        if (isNaN(numero_mission)) {
          console.error("L'ID de la mission n'est pas un nombre valide.");
          return; // Arrêter l'exécution de la fonction ou afficher un message d'erreur approprié
        }
        console.log("je suis la");
        // Suppression de l'avis 
        fetch(`http://localhost:3500/annonce/${numero_mission}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        })
        .then(response => {
            if (response.ok) {
              setTimeout(function() {location.reload()}, 500);
            } else {
                // Sinon, on affiche un message d'erreur
                console.error("Une erreur s'est produite lors de la suppression de l'avis", error);
                throw error;
            }
        });
    });
}
