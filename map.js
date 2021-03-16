class Map {

    constructor(){
        
        this.initialisation();
        this.localStorageReservation();
        this.cancelReservation();  

    }

    initialisation(){

        fetch('https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=7cb7533211cf94b29af1d1ee0513425e1e69e2e5')
            .then(function(res) {
                if(res.ok){
                    res.json().then(function(data){
                        console.log(data);
                        for(const station of data){
                            let latitude = station.position.lat;
                            let longitude = station.position.lng;
                            const coordonnees = [latitude,longitude];
                            if(station.address !== "" && station.status === "OPEN" && station.available_bikes > 0 ){
                                L.marker(coordonnees, {icon : myIcon}).addTo(mymap).on("click", function(){   
                                    nomRue.innerHTML = "Nom de la station : "+ station.name;
                                    veloDispo.innerHTML = "Nombre de vélo disponible : "+ station.available_bikes;
                                    placeDispo.innerHTML = "Nombre de place disponible : "+ station.available_bike_stands;
                                    
                                })
                            } else if(station.status !== "OPEN"){
                                L.marker(coordonnees, {icon : myIconErreur}).addTo(mymap).on("click", function(){
                                    alert("La station " + station.name + " est fermée pour l'instant");
                                })

                            } else if(station.name !== "" && (station.available_bikes === 0) ){
                                L.marker(coordonnees, {icon : myIconFin}).addTo(mymap).on("click", function(){
                                    nomRue.innerHTML = "Nom de la station : "+ station.name;
                                    veloDispo.innerHTML = "Nombre de vélo disponible : "+ station.available_bikes;
                                    placeDispo.innerHTML = "Nombre de place disponible : "+ station.available_bike_stands;
                                })
                            }
                        }
                    })
                } else{
                    console.error("Erreur envoyée dans la console");
                }
            });    
    }

    localStorageReservation(){

        //window.onload = window.addEventListener("DOMContentLoaded", () => { ... }
        window.addEventListener("DOMContentLoaded", () => {    
            document.getElementById("nomReservation").innerHTML = "votre nom : " + localStorage.getItem("nom");
            document.getElementById("prenomReservation").innerHTML = "votre prénom : " + localStorage.getItem("prenom");
            document.getElementById("adresseReservation").innerHTML = localStorage.getItem("station");
            if(localStorage.length !== 0){
                compteur.restartCountdown();
            };
        });
    };

    confirmButton(canvas, timer){ 

        boutonR.addEventListener("click", function(){
            if(nomRue.innerHTML.length === 0){
                alert("Veuillez sélectionner une station");
            } else if(document.getElementById("nomUtilisateur").value === ""){
                alert("Veuillez saisir votre nom");
            } else if(document.getElementById("prenomUtilisateur").value === ""){
                alert("Veuillez saisir votre prénom");
            } else if(canvas.beginning != true){
                alert("Veuillez signer s'il vous plait");

            } else if(veloDispo.innerHTML === "Nombre de vélo disponible : "+0){
                alert("Plus de vélo disponible");

            } else {
                localStorage.setItem("nom", document.getElementById("nomUtilisateur").value);
                localStorage.setItem("prenom", document.getElementById("prenomUtilisateur").value);
                localStorage.setItem("station", nomRue.innerHTML);
                document.getElementById("nomReservation").innerHTML = "votre nom : " + localStorage.getItem("nom");
                document.getElementById("prenomReservation").innerHTML = "votre prénom : " + localStorage.getItem("prenom");
                document.getElementById("adresseReservation").innerHTML = localStorage.getItem("station");
                document.getElementById("boutonR").disabled = true;
                setTimeout(() => timer.countdown(), 1000);
                canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
                document.getElementById("flexInfo").style.display="none";
                document.getElementById("ficheReservation").style.display="block"; 
            }

        })
    };

    cancelReservation(){ 

        annulerReservation.addEventListener("click", function(){
            document.getElementById("boutonR").disabled = false;
            location.reload();
            localStorage.clear();      
        })
    }

}