export async function trouverAnnonceMaxNumeroMission() {
    try {
        const reponses = await fetch(`http://localhost:8000/annonce`, {
        method: "GET",
        });
          
            const annonces = await reponses.json();
            let maxNumeroMission = 0;
            let annonceMaxNumeroMission = null;
  
            annonces.forEach(annonce => {
            if (annonce.numero_mission > maxNumeroMission) {
                maxNumeroMission = annonce.numero_mission;
                annonceMaxNumeroMission = annonce;
            }
        });
        return maxNumeroMission;

    } 
    catch (error) {
      console.error('Erreur lors de la récupération des annonces :', error);
      throw error;
    }

}
  