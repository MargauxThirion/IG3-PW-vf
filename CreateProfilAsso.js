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
    const reponses = await fetch(`https://web-hands-in-hands.onrender.com/userAsso/${encodedEmail}`, {
    method: "GET",
    });
    const userA = await reponses.json();
    
    console.log(userA);
    function genererProfil(userA){
        for (let i = 0; i < userA.length; i++) {
        const user = userA[i];
        const sectionFiches = document.querySelector(".Profile");
        const userEl = document.createElement("article");

        const nomA = document.createElement("h2"); 
        nomA.innerText = nomA;

        const emailA = document.createElement("h3"); 
        emailA.innerText = user.emailA;

        const num_telA = document.createElement("p");
        num_telA.innerText = user.num_telA; 

        const adresseA = document.createElement("p");
        adresseA.innerText = user.adresseA;

        const descA = document.createElement("p");
        descA.innerText = user.descA;

        sectionFiches.appendChild(userEl);
        userEl.appendChild(nomA);
        userEl.appendChild(emailA);
        userEl.appendChild(num_telA);
        userEl.appendChild(adresseA);
        userEl.appendChild(descA);
        }
    }
    genererProfil(userA);
});