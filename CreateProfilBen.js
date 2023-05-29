function getToken() {
    return localStorage.getItem('email');
}

// Exemple d'utilisation pour récupérer et afficher le token
$(document).ready(function() {
        var token = getToken();
        if (token) {
            console.log('Token:', token);
            console.log('Mail:', localStorage.getItem('email'));
            const mail = localStorage.getItem('email');
        // Faites ce que vous voulez avec le token ici, par exemple, l'afficher dans un élément HTML
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
    console.log(users);
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