// Bars object

var Bars = function() {
    
    // Variables
    this.speed = 1;
    this.bars = [];
    this.width = 40;
    this.gap = 100;
    this.count = 140;
    
    this.generateBar = function() {
        var h = random(100,250);
        this.bars.push([[400,400-h,this.width,h],[400,0,this.width,400-h-this.gap]]);
    };
    
    this.update = function() {
        
        if (this.count == 140) {
            this.generateBar();
            this.count = 0;
        }
        this.count++;
        
        for (var i = 0; i < this.bars.length; i ++) {
            this.bars[i][0][0] -= this.speed;
            this.bars[i][1][0] -= this.speed;
        }
        
        if (this.bars[0][0][0]+width < 0) this.bars.shift();
        
    };
    
    this.getCurrentBar = function(firstrun) {
        
        if (firstrun) {
            return [this.bars[0][0][0]+this.width/2,this.bars[0][0][1],this.bars[0][0][0]+this.width/2,this.bars[0][1][3]];
        }
        
        for (var i = 0; i < this.bars.length; i ++) {
            if (this.bars[i][0][0] >= 280 && this.bars[i][0][0] < 281) {
                return [this.bars[i][0][0]+this.width/2,this.bars[i][0][1],this.bars[i][0][0]+this.width/2,this.bars[i][1][3]];
            }
        }
        
    };
    
    this.getSpeed = function() {
        
        return this.speed;
        
    };
    
    this.getWidth = function() {
        
        return this.width;
        
    };

    this.show = function() {
        
        noStroke();
        fill(255,50);
        for (var i = 0; i < this.bars.length; i ++) {
            rect(this.bars[i][0][0],this.bars[i][0][1],this.bars[i][0][2],this.bars[i][0][3]);
            rect(this.bars[i][1][0],this.bars[i][1][1],this.bars[i][1][2],this.bars[i][1][3]);
        }
        
    };

};