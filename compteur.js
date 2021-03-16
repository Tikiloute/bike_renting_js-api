class Timer {

    constructor(second, minute){
        this.second = second;
        this.minute = minute;
        this.domTimer = document.getElementById("compteur");
        this.LsSecond = localStorage.getItem("seconde");
        this.LsMinute = localStorage.getItem("minute");
    };

    countdown(){
        this.domTimer.innerHTML = this.minute + " : " + this.second;
        this.second--;
        var timeout = setTimeout(() => this.countdown(), 1000);
        localStorage.setItem("seconde", this.second);
        localStorage.setItem("minute", this.minute);

        if(this.second < 0 ){
            this.second = 59;
            this.minute -= 1;
        }
        if(this.second < 10){
            this.second = "0"+ this.second;
        }
        if(this.minute < 0){
            localStorage.clear();
            clearTimeout(timeout);
            this.compteur = null;
            this.domTimer.textContent = "Fin de reservation";
        }
        
    };
    
    restartCountdown(){
        document.getElementById("boutonR").disabled = true;
        compteur.innerHTML = this.LsMinute + " : " + this.LsSecond;
        this.LsSecond--;
        setTimeout(() => this.restartCountdown(), 1000);
        localStorage.setItem("seconde", this.LsSecond);
        localStorage.setItem("minute", this.LsMinute);
        document.getElementById("flexInfo").style.display="none";
        document.getElementById("ficheReservation").style.display="block";

        if(this.LsSecond < "0" ){
            this.LsSecond = 59;
            this.LsMinute -= 1;
        }
        if(this.LsSecond < 10){
            this.LsSecond = "0"+ this.LsSecond;
        }
        if(this.LsMinute < 0){
            compteur.innerHTML = "Fin de reservation";
            clearTimeout(() => this.restartCountdown());
            localStorage.clear();
        }
    };
}