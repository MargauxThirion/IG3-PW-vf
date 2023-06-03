function getToken() {
    return localStorage.getItem('email');
}

// Exemple d'utilisation pour récupérer et afficher le token
$(document).ready(function() {
        var token = getToken();
        if (token) {
            console.log('Mail:', localStorage.getItem('email'));
        $('#tokenValue').text(token);
       } else {
            console.log('Token non trouvé');
        }
});
const mail = localStorage.getItem('email');
const encodedEmail = encodeURIComponent(mail);

document.addEventListener('DOMContentLoaded', async function () {
    const reponses = await fetch(`https://web-hands-in-hands.onrender.com/userBen/${encodedEmail}`, {
    method: "GET",
    });
    const users = await reponses.json();
    function genererProfil(users){
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
        const sectionFiches = document.querySelector(".Profile");
        const userEl = document.createElement("article");

        const nomUCmp = document.createElement("h2"); 
        nomUCmp.innerHTML = user.nomU + ' ' + user.prenomU;

        const emailU = document.createElement("h3"); 
        emailU.innerHTML =`<strong> Adresse Mail : </strong>` + user.emailU;

        const num_telU = document.createElement("p");
        num_telU.innerHTML = '<strong> Numéro de Téléphone : </strong>' +user.num_telU; 

        const adresseU = document.createElement("p");
        adresseU.innerHTML = '<strong> Adresse : </strong>' +user.adresseU;

        const competenceU = document.createElement("p");
        competenceU.innerHTML = '<strong> Compétence : </strong>' +user.competenceU;

        sectionFiches.appendChild(userEl);
        userEl.appendChild(nomUCmp);
        userEl.appendChild(emailU);
        userEl.appendChild(num_telU);
        userEl.appendChild(adresseU);
        userEl.appendChild(competenceU);
        }
    }
    genererProfil(users);
});

document.addEventListener('DOMContentLoaded', async function () {
    const reponses = await fetch(`https://web-hands-in-hands.onrender.com/participer/user/${encodedEmail}`, {
    method: "GET",
    });

    const users = await reponses.json();
    for (let i = 0; i < users.length; i++) {
        console.log('user[i] = ',users[i]);
        const User = JSON.stringify(users[i]);
        const annonces = await fetch (`https://web-hands-in-hands.onrender.com/annonce/mission/${User}`, {
            method: "GET",
        });
        const evenements = await annonces.json();
        console.log('resultat du fetch : ',evenements);
        for (let j = 0; j < evenements.length; j++) {
            const evenement = evenements[j];
        
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
            nbr_benevoleEl.innerHTML = '<strong>Nombre de personne nécessaire : </strong>' + evenement.nbr_benevole;
    
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
        }
    }
});