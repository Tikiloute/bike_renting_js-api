class Draw {

    constructor(canvas, ctx, radius){
        this.canvas = canvas;
        this.ctx = ctx;
        this.radius = radius;
        this.line = false;
        this.beginning = false;
        this.ctx.lineWidth = this.radius*2;
        this.allAddEventListenerCanvas();
        this.cancelSignature();
    };

    dotted(e){
        if (this.line === true) { 
            this.ctx.lineTo(e.offsetX, e.offsetY);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.arc(e.offsetX, e.offsetY, this.radius, 0, Math.PI*2);
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.moveTo(e.offsetX, e.offsetY);
            this.beginning = true;
        } 
    };

    begin(){
        this.line = true;
    };

    stop(){
        this.line = false;
  //permet de recomencer un nouveau tracé, sans ce beginPath le nouveau tracé serait relié à la fin du dernier tracé---------------------------------------------------------------------------------------------
        this.ctx.beginPath();
    };

    // on efface tout depuis le 0,0 jusqu'à la hauteur et largeur du canvas-----------------------------------------------------
    cancelSignature(){
        boutonCanvas.addEventListener("click", () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.beginning = false;
        });
    }
    
    allAddEventListenerCanvas(){
        this.canvas.addEventListener('mousemove', (e) => this.dotted(e));
        this.canvas.addEventListener('mousedown', () => this.begin());
        this.canvas.addEventListener('mouseup', () => this.stop()); 
    }
    
}

