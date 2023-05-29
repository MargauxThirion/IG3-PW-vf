fetch('https://web-hands-in-hands.onrender.com/userAsso/profil', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token') // Assurez-vous d'avoir le token d'authentification stocké après la connexion
  }
})
  .then(response => response.json())
  .then(data => {
    // Récupérer les données de l'association du backend
    const association = data.association;

    // Injecter les données dans les balises HTML correspondantes
    document.getElementById('nomAssociation').innerText = association.nom;
    document.getElementById('emailAssociation').innerText = association.email;
    document.getElementById('adresseAssociation').innerText = association.adresse;
    document.getElementById('telAssociation').innerText = association.num_tel;
    document.getElementById('descriptionAssociation').innerText = association.description;
  })
  .catch(error => {
    console.log(error);
    alert("Erreur lors de la récupération des informations de profil");
  });
