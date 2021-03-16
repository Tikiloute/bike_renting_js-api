
class Slider{

    constructor(images, sliderDom, cpt = 0){
        this.images = images;
        this.cpt = cpt;
        this.sliderDom = sliderDom;
        this.timeout = {};
        this.slideWithButtons();
        this.slideWithKeys();
        this.slideAutomatic();
        this.breakSlider();
        this.restartSlider();
    }

    movingForwardSlide(){
        if(this.cpt >= this.images.length -1){
            this.cpt = 0;
        } else {
            this.cpt = this.cpt + 1;
        }
       this.sliderDom.src = this.images[this.cpt];
    };

    moveBackSlide(){
        if(this.cpt <= 0){
            this.cpt = this.images.length-1;
            console.log(this.cpt);
        } else {
            this.cpt = this.cpt - 1;
        }
        this.sliderDom.src = this.images[this.cpt];
    };


    moveBackArrowButton(){
        this.moveBackSlide();
        clearTimeout(this.timeout);
        pause.style.display = "none";
        reprendre.style.display = "block";
    };

    movingForwardArrowButton(){
        this.movingForwardSlide();
        clearTimeout(this.timeout);
        pause.style.display = "none";
        reprendre.style.display = "block";
    };

    keyboard(e){ 
        if(e.key === "ArrowRight"){
            this.movingForwardSlide();
            clearTimeout(this.timeout);
            pause.style.display = "none";
            reprendre.style.display = "block";
        } else if(e.key === "ArrowLeft"){
            this.moveBackSlide();
            clearTimeout(this.timeout);
            pause.style.display = "none";
            reprendre.style.display = "block";
        }
    };

    slideAutomatic(){
        this.movingForwardSlide();
        this.timeout = setTimeout(() => this.slideAutomatic(), 5000);
    };

    slideWithButtons(){
        droite.addEventListener("click", () => this.movingForwardArrowButton());
        
        gauche.addEventListener("click", () => this.moveBackArrowButton());

    }

    slideWithKeys(){
        window.addEventListener("keydown", (e) => this.keyboard(e));
    }

    break() {
        clearTimeout(this.timeout);
        pause.style.display = "none";
        reprendre.style.display = "block";
    };

    restart(){
        this.timeout = setTimeout(() => this.slideAutomatic(), 5000);
        pause.style.display = "block";
        reprendre.style.display = "none";
    };

    breakSlider(){
        pause.addEventListener("click", () => this.break());
    }

    restartSlider(){
        reprendre.addEventListener("click", () => this.restart());
    }
    
}
