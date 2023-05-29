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

const encodedEmail = encodeURIComponent(mail);

document.addEventListener('DOMContentLoaded', async function () {
    const reponses = await fetch(`https://web-hands-in-hands.onrender.com/userAsso/${encodedEmail}`, {
    method: "GET",
  });
  const user = await reponses.json();
  function genererProfil(user){
    const sectionFiches = document.querySelector(".Profile");
    const userEl = document.createElement("article");

    const nomUCmp = document.createElement("h2"); 
    nomUCmp.innerText = user.nomU + ' ' + user.prenomU;

    const emailU = document.createElement("h3"); 
    emailU.innerText = user.emailU;

    const num_telU = document.createElement("p");
    num_telU.innerText = user.num_telU; 

    const adresseU = document.createElement("p");
    adresseU.innerText = user.adresseU;

    const competenceU = document.createElement("p");
    competenceU.innerText = user.competenceU;
  }

});