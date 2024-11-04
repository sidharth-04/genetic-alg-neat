// Bird object

var Bird = function(inherit,NNInherited) {
    
    // Physics variables
    this.pos = createVector(width/2,height/2);
    this.vel = createVector(0,0);
    this.size = 20;
    // Miscellaneous variables9
    this.crashed = false;
    this.age = 0;
    this.fitness = 0;
    this.causeOfDeath = "Alive";
    this.reportedDeath = false;
    // NeuralNetwork
    if (inherit) this.nn = NNInherited;
    else {this.nn = new NeuralNetwork();this.nn.generateWeights();}
    
    this.calcFitness = function() {
        
        this.fitness = this.age*this.age;
        //if (this.causeOfDeath == "BoundaryCrash") this.fitness /= 50;
        
    };
    
    this.getFitness = function() {
        
        return this.fitness;
        
    };
    
    this.getDeadNotReported = function() {
        
        if (this.crashed && !this.reportedDeath) {
            this.reportedDeath = true;
            return true;
        }
        
    };
    
    this.getNN = function() {
        
        return this.nn;
        
    };
    
    this.checkCrash = function(x_1,x_2,y_1,y_2) {
        
        if (this.pos.y>380) {this.crashed = true; this.causeOfDeath = "BoundaryCrash";}
        
        // Check crash with bar
        var dx = 0;
        var dy = 0;
        
        if (this.pos.x < x_1) dx = x_1-this.pos.x;
        else if (this.pos.x > x_2) dx = this.pos.x-x_2;
        
        if (this.pos.y < y_1) dy = this.pos.y-y_1;
        else dy = 0;
        
        if (sqrt((dx*dx)+(dy*dy)) <= this.size/2) {
            this.crashed = true;
            this.causeOfDeath = "CollisionCrash";
        }
        
        if (this.pos.y > y_2) dy = y_2-this.pos.y;
        else dy = 0;
        
        if (sqrt((dx*dx)+(dy*dy)) <= this.size/2) {
            this.crashed = true;
            this.causeOfDeath = "CollisionCrash";
        }
        
    };
    
    this.fall = function() {
        
        this.vel.add(G);
        
    };
    
    this.jump = function() {
        
        this.vel.add(JumpForce);
        
    };
    
    this.update = function(x_1,x_2,y_1,y_2) {
        
        if (this.crashed) return;
        
        this.age ++;
        
        //this.nn.updateInputs(this.pos.y,dist(this.pos.x,this.pos.y,x_1,y_1),dist(this.pos.x,this.pos.y,x_2,y_2),this.vel.y);
        this.nn.updateInputs(this.pos.y,y_1,y_2,this.vel.y);
        if (this.nn.evaluate()) this.jump();
        
        if (this.pos.y < 30) {
            this.pos.y = 30;
            this.vel.y = 0;
        }
        
        this.checkCrash(x_1,x_2,y_1,y_2);
        if (this.crashed) return;
        
        this.pos.add(this.vel);
        this.fall();
        
    };

    this.show = function() {
        
        if (this.crashed) return;
        
        noStroke();
        fill(255,50);
        ellipse(this.pos.x,this.pos.y,this.size,this.size);
        
    };
    
    this.stare = function(x_1,y_1,x_2,y_2) {
        
        if (this.crashed) return;
        
        stroke(255,0,0);
        line(this.pos.x,this.pos.y,x_1,y_1);
        line(this.pos.x,this.pos.y,x_2,y_2);
        
    };

};