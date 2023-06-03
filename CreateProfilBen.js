function getToken() {
    return localStorage.getItem('email');
}

// Exemple d'utilisation pour récupérer et afficher le token
document.addEventListener('DOMContentLoaded', function() {
    var token = getToken();
    if (token) {
        console.log('Mail:', localStorage.getItem('email'));
        var tokenValueElement = document.getElementById('tokenValue');
        if (tokenValueElement) {
            tokenValueElement.textContent = token;
        }
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

    const annonces = await reponses.json();
    for (let i = 0; i < annonces.length; i++) {
        console.log('user.length = ',annonces.length);
        console.log('user[i] = ',annonces[i]);
        const User = JSON.stringify(annonces[i]);
        const annonce = await fetch (`https://web-hands-in-hands.onrender.com/annonce/mission/${User}`, {
            method: "GET",
        });
        const evenements = await annonce.json();
        console.log('resultat du fetch : ',evenements);
            const sectionFiches = document.querySelector(".fiches");
            const evenementEl = document.createElement("article");
$
            const nomEl = document.createElement("h2"); //le titre
            nomEl.innerText = evenements.nom_association;

            const nomMissionEl = document.createElement("h3"); //le titre de la mission
            nomMissionEl.innerHTML = '<strong> Mission </strong>'+ evenements.numero_mission + ' : ' + evenements.nom_mission;

            const descriptionEl = document.createElement("p"); //la description
            descriptionEl.innerHTML ='<strong> Description: </strong>' + evenements.desc;

            const dateEl = document.createElement("p"); // Élément pour afficher la date
            const dateDebut = new Date(evenements.date); // Convertit la date en objet Date
            // Formattage de la date
            const jour = String(dateDebut.getDate()).padStart(2, "0"); // Récupère le jour avec deux chiffres (ajoute un zéro si nécessaire)
            const mois = String(dateDebut.getMonth() + 1).padStart(2, "0"); // Récupère le mois avec deux chiffres (ajoute un zéro si nécessaire)
            const annee = dateDebut.getFullYear(); // Récupère l'année
            const dateFormatee = jour + "-" + mois + "-" + annee; // Formatage final de la date
            dateEl.innerHTML = "<strong> Date début: </strong> " + dateFormatee;

            const dureeEl = document.createElement("p"); //la durée
            dureeEl.innerHTML = '<strong> Durée:</strong> ' + evenements.duree + ' heures';
    
            const nbr_benevoleEl = document.createElement("p"); //le nombre de bénévole
            nbr_benevoleEl.innerHTML = '<strong>Nombre de personne nécessaire : </strong>' + evenements.nbr_benevole;
    
            const competencesEl = document.createElement("p"); // les compétences
            const competenceValue = evenements.competence;
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
            const paysEnMajuscules = evenements.pays.toUpperCase(); // Met le pays en majuscules
            adresseEl.innerHTML = '<strong>Adresse :</strong> ' + evenements.rue + ' ' + evenements.ville + ' ' + evenements.code_postal + ' ' + paysEnMajuscules;


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
        //}
        //genererAnnonce(evenements);
    //}
});