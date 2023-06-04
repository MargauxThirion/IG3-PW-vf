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

export function ajoutListenersModifEvenement() {
  var boutonModif = document.getElementById('btn-annonce-modif');
  var formulaireContainer = document.querySelector('.formulaire-container-modif');
  boutonModif.addEventListener('click', function() {
    if (formulaireContainer.style.display === 'none') {
      formulaireContainer.style.display = 'block';
    } else {
      formulaireContainer.style.display = 'none';
    }
  });
}

function getToken() {
  return localStorage.getItem('email');
}

// Exemple d'utilisation pour récupérer et afficher le token
document.addEventListener('DOMContentLoaded', function() {
  var token = getToken();
  if (token) {
      var tokenValueElement = document.getElementById('tokenValue');
      if (tokenValueElement) {
          tokenValueElement.textContent = token;
      }
  } else {
      console.log('Token non trouvé');
  }
});

const mail = localStorage.getItem('email');
const nom = localStorage.getItem('nom');
const encodedEmail = encodeURIComponent(mail);

export async function ajoutListenerEnvoyerEvenement() {
  const formulaireEvenement = document.querySelector(".formulaire-evenement");
  formulaireEvenement.addEventListener("submit", async function (event) {
  event.preventDefault(); // empeche le rechargement de la page

    
  try {
    const maxNumeroMission = await trouverAnnonceMaxNumeroMission();
    // création d'un nouvel objet avis 
    const evenement = {
        nom_association: nom,
        nom_mission: event.target.elements.nom_mission.value,
        numero_mission: maxNumeroMission + 1,
        email: mail,
        desc: event.target.elements.desc.value,
        date: event.target.elements.date.value,
        duree: event.target.elements.duree.value,
        nbr_benevole: event.target.elements.nbr_benevole.value,
        competence: event.target.elements.competence.value,
        pays: event.target.elements.pays.value,
        ville: event.target.elements.ville.value,
        code_postal: event.target.elements.code_postal.value,
        rue: event.target.elements.rue.value,
      };
    // conversion de l'objet en JSON
      const Json = JSON.stringify(evenement);
      await fetch("https://web-hands-in-hands.onrender.com/annonce", {
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
    // Suppression de l'avis 
    fetch(`https://web-hands-in-hands.onrender.com/annonce/${numero_mission}`, {
      method: "DELETE"
      })
    .then(response => {
      if (response.ok) {setTimeout(function() {location.reload()}, 500);} 
      else {console.error("Une erreur s'est produite lors de la suppression de l'avis", error);
        throw error;}
    });
  });
}

export async function ajoutListenersModifierEvenement() {
  const formulaireEvenementModif = document.querySelector(".formulaire-modifier-ev");
  formulaireEvenementModif.addEventListener("submit", async function (event) {
    event.preventDefault(); // Empêche le rechargement de la page

    try {
      const numero_mission = parseInt(event.target.elements.numero_mission.value); // Récupère l'identifiant de l'annonce

      const evenement = {
        nom_association: nom,
        nom_mission: event.target.elements.nom_mission.value,
        if (nomMission) {
          evenement.nom_mission = nomMission;
        },
        numero_mission: numero_mission, // Utilise l'identifiant de l'annonce
        email: mail,
        desc: event.target.elements.desc.value,
        if (desc) {
          evenement.desc = desc;
        },
        date: event.target.elements.date.value,
        if (date) {
          evenement.date = date;
        },
        duree: event.target.elements.duree.value,
        if (duree) {
          evenement.duree = duree;
        },
        nbr_benevole: event.target.elements.nbr_benevole.value,
        if (nbr_benevole) {
          evenement.nbr_benevole = nbr_benevole;
        },
        competence: event.target.elements.competence.value,
        if (competence) {
          evenement.competence = competence;
        },
        pays: event.target.elements.pays.value,
        if (pays) {
          evenement.pays = pays;
        },
        ville: event.target.elements.ville.value,
        if (ville) {
          evenement.ville = ville;
        },
        code_postal: event.target.elements.code_postal.value,
        if (code_postal) {
          evenement.code_postal = code_postal;
        },
        rue: event.target.elements.rue.value,
        if (rue) {
          evenement.rue = rue;
        }
        
      };

      const Json = JSON.stringify(evenement);
      const response = await fetch(`https://web-hands-in-hands.onrender.com/annonce/mission/${numero_mission}`, { // Utilise l'URL avec l'identifiant de l'annonce
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: Json,
      });

      if (response.ok) {
        console.log("Requête réussie !");
      } else {
        console.error("Erreur lors de la requête :", response.status);
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  });
}
