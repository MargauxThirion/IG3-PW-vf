import { ajoutListenersAvis, ajoutListenerEnvoyerAvis, ajoutListenersButtonAvis } from "./avis.js";
import { ajoutListenerEnvoyerEvenement,ajoutListenersAjouterEvenement,ajoutListenersSupprEvenement, ajoutListenerSupprimerEvenement,ajoutListenersModifEvenement, ajoutListenersModifierEvenement } from "./CreateEvenement.js";
import { ajoutListenersParticipe, ajoutListenerEnvoyerParticipe, ajoutListenersButtonParticiper } from "./participer.js";

document.addEventListener('DOMContentLoaded', async function () {
  const reponses = await fetch(`https://web-hands-in-hands.onrender.com/annonce`, {
  method: "GET",
});

const evenements = await reponses.json();

ajoutListenerEnvoyerAvis();
ajoutListenerEnvoyerEvenement();
ajoutListenerEnvoyerParticipe();



function genererEvenements(evenements){
  for (let i = 0; i < evenements.length; i++) {
    const evenement = evenements[i];
    const sectionFiches = document.querySelector(".fiches");
    const evenementEl = document.createElement("article");

    const nomEl = document.createElement("h2"); //le titre
    nomEl.innerText = evenement.nom_association;

    const nomMissionEl = document.createElement("h3"); //le titre de la mission
    nomMissionEl.innerHTML = '<strong> Mission </strong>'+ evenement.numero_mission + ' : ' + evenement.nom_mission;

    const descriptionEl = document.createElement("p"); //la description
    descriptionEl.innerHTML ='<strong> Description: </strong>' + evenement.desc;

    const dateEl = document.createElement("p"); // Élément pour afficher la date
    const dateDebut = new Date(evenement.date); // Convertit la date en objet Date
    // Formattage de la date
    const jour = String(dateDebut.getDate()).padStart(2, "0"); // Récupère le jour avec deux chiffres (ajoute un zéro si nécessaire)
    const mois = String(dateDebut.getMonth() + 1).padStart(2, "0"); // Récupère le mois avec deux chiffres (ajoute un zéro si nécessaire)
    const annee = dateDebut.getFullYear(); // Récupère l'année
    const dateFormatee = jour + "-" + mois + "-" + annee; // Formatage final de la date
    dateEl.innerHTML = "<strong> Date début: </strong> " + dateFormatee;

    const dureeEl = document.createElement("p"); //la durée
    dureeEl.innerHTML = '<strong> Durée:</strong> ' + evenement.duree + ' heures';
    
    const nbr_benevoleEl = document.createElement("p"); //le nombre de bénévole
    nbr_benevoleEl.innerHTML = '<strong>Nombre de personne(s) nécessaire(s) : </strong>' + evenement.nbr_benevole;
    
    const competencesEl = document.createElement("p"); // les compétences
    const competenceValue = evenements[i].competence;
    let competenceText = '';
    switch (competenceValue) {
      case 'Aucune': competenceText = 'Aucune';
        break;
      case 'animaux': competenceText = "Être à l'aise avec les animaux";
        break;
      case 'porter_objet': competenceText = 'Pouvoir porter des objets lourds';
        break;
      case 'sociale': competenceText = 'Être à l\'aise avec les gens';
        break;
      case 'Conduire': competenceText = 'Avoir le permis';
        break;
      default:competenceText = competenceValue;
    }
    competencesEl.innerHTML = '<strong> Compétence nécessaire : </strong>' + competenceText;
    
    const adresseEl = document.createElement("p"); //l'adresse
    const paysEnMajuscules = evenement.pays.toUpperCase(); // Met le pays en majuscules
    adresseEl.innerHTML = '<strong>Adresse :</strong> ' + evenement.rue + ' ' + evenement.ville + ' ' + evenement.code_postal + ' ' + paysEnMajuscules;


    const avisBouton = document.createElement("button");
    avisBouton.dataset.id = evenement.numero_mission;
    avisBouton.classList.add("btn-avis");
    avisBouton.textContent = "Afficher les avis";

    const ParticipeBouton = document.createElement("button");
    ParticipeBouton.dataset.id = evenement.numero_mission;
    ParticipeBouton.classList.add("btn-participe", "hide");
    ParticipeBouton.textContent = "Participant";

    //Ratachement de nos éléments au DOM
    sectionFiches.appendChild(evenementEl);
    evenementEl.appendChild(nomEl);
    evenementEl.appendChild(nomMissionEl);
    evenementEl.appendChild(descriptionEl);
    evenementEl.appendChild(dateEl);
    evenementEl.appendChild(dureeEl);
    evenementEl.appendChild(nbr_benevoleEl);
    evenementEl.appendChild(competencesEl);
    evenementEl.appendChild(adresseEl);
    evenementEl.appendChild(ParticipeBouton);
    evenementEl.appendChild(avisBouton);

  }
  ajoutListenersAvis();
  ajoutListenersParticipe();
  ajoutListenerSupprimerEvenement();
  ajoutListenersModifierEvenement();
}
genererEvenements(evenements);
ajoutListenersButtonAvis();
ajoutListenersButtonParticiper();
ajoutListenersAjouterEvenement();
ajoutListenersSupprEvenement();
ajoutListenersModifEvenement();




function convertirEnDateObjet(dateString) {
  const dateArray = dateString.split("-"); // sépare la chaîne en tableau de jour, mois et année
  const year = parseInt(dateArray[0]);
  const month = parseInt(dateArray[1]) - 1; // les mois dans l'objet de date commencent à 0 (janvier = 0)
  const day = parseInt(dateArray[2]);

  return new Date(year, month, day); // renvoie l'objet de date
}



// bouton pour trier par date chronologique 
const boutonTrierDate = document.querySelector(".btn-trier-date"); //tirer les évènement du plus proche au plus loin
boutonTrierDate.addEventListener("click", function() {
  const dateOrdo = Array.from(evenements);
  dateOrdo.sort(function(a, b) {
    const dateA = convertirEnDateObjet(a.date);
    const dateB = convertirEnDateObjet(b.date);
    return dateA - dateB;
    });
    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = "";
    genererEvenements(dateOrdo);
});



function filtrerEvenementsDansMoinsDuneSemaine(evenements) {
  const uneSemaineEnMs = 7 * 24 * 60 * 60 * 1000; // nombre de millisecondes dans une semaine
  const maintenant = new Date(); // date et heure actuelles

  return evenements.filter(function(evenement) {
      const dateDebut = convertirEnDateObjet(evenement.date);
      const tempsAvantDebut = dateDebut.getTime() - maintenant.getTime(); // temps en millisecondes entre maintenant et la date de début de l'événement
      return tempsAvantDebut <= uneSemaineEnMs && tempsAvantDebut > 0; // renvoie true si la date de début de l'événement est dans moins d'une semaine à partir de maintenant
  });
}
const boutonFiltrerDate = document.querySelector(".btn-filtrer-date"); //filtrer les pièces dont le prix est inférieur à un certain montant
boutonFiltrerDate.addEventListener("click", function () {
  const evenementsDansMoinsDuneSemaine = filtrerEvenementsDansMoinsDuneSemaine(evenements);
    
  // Effacer l'écran et regénérer la page avec les événements filtrés
  document.querySelector(".fiches").innerHTML = "";
  genererEvenements(evenementsDansMoinsDuneSemaine);
});




// supprime les evenement plus long que 2 heures
const evenementsRapides = evenements.filter(evenement => evenement.duree <= 2);
const noms_miss = evenementsRapides.map(evenement => evenement.nom_mission);
/*
//for(let i = evenements.length -1 ; i >= 0; i--){
//  if(evenements[i].duree > 2){
//    evenementsRapides.splice(i,1)
//  }
//}
console.log(evenementsRapides)
*/
//En tête de la liste 
const rEl = document.createElement('p');
rEl.innerText = 'Les missions les plus rapide à réaliser (moins de 2 heures) sont :';
//Création d'une liste
const rapideEl = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < noms_miss.length ; i++){
  const nomEl = document.createElement('li');
  nomEl.innerText = noms_miss[i];
  rapideEl.appendChild(nomEl)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
const rapideELE = document.querySelector('.rapide')
rapideELE.appendChild(rEl);
rapideELE.appendChild(rapideEl);




});
