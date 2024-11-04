// Population object for controlling rockets

var Population = function(size,inherit,NNList) {
    
    this.size = size;
    this.flock = [];
    this.alive = this.size;
    for (var i = 0; i < this.size; i ++) {
        if (inherit) this.flock[i] = new Bird(inherit,NNList[i]);
        else this.flock[i] = new Bird(inherit,null);
    }
    
    this.getAlive = function() {
        
        return this.alive;
        
    };
    
    this.run = function(x_1,x_2,y_1,y_2) {
        
        for (var i = 0; i < this.size; i ++) {
            this.flock[i].update(x_1,x_2,y_1,y_2);
            this.flock[i].show();
            if (this.flock[i].getDeadNotReported()) this.alive --;
        }
        
    };
    
    this.stare = function(x_1,y_1,x_2,y_2) {
        
        for (var i = 0; i < this.size; i ++) {
            this.flock[i].stare(x_1,y_1,x_2,y_2);
        }
        
    };
    
    this.jump = function() {
        
        for (var i = 0; i < this.size; i ++) {
            this.flock[i].jump();
        }
        
    };
    
    this.evaluate = function() {
        
        for (var i = 0; i < this.size; i ++) {
            this.flock[i].calcFitness();
        }
        
    };
    
    this.createGenePool = function() {
        
        var genepool = [];
        
        var maxfitness = 0;
        for (var i = 0; i < this.size; i ++) {
            if (this.flock[i].getFitness() > maxfitness) maxfitness = this.flock[i].getFitness();
        }
        
        var occurrences;
        for (i = 0; i < this.size; i ++) {
            occurrences = this.flock[i].fitness / maxfitness * this.size;
            for (var j = 0; j < occurrences; j ++) {
                if (random(0,1) < 0.3) this.flock[i].nn.w0 += random(-3,3);
                if (random(0,1) < 0.3) this.flock[i].nn.w1 += random(-3,3);
                if (random(0,1) < 0.3) this.flock[i].nn.w2 += random(-3,3);
                if (random(0,1) < 0.3) this.flock[i].nn.w3 += random(-3,3);
                genepool.push(this.flock[i].getNN());
            }
        }
        
        return genepool;
        
    };
    
};