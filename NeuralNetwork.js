// NeuralNetwork object

var NeuralNetwork = function() {
    
    // Inputs
    this.i0;
    this.i1;
    this.i2;
    this.i3;
    
    // Weights
    this.w0;
    this.w1;
    this.w2;
    this.w3;
    
    this.generateWeights = function() {
        
        this.w0 = random(-30,30);
        this.w1 = random(-30,30);
        this.w2 = random(-30,30);
        this.w3 = random(-30,30);
        
    };
    
    this.setWeights = function(a,b,c,d) {
        
        this.w0 = a;
        this.w1 = b;
        this.w2 = c;
        this.w3 = d;
        
    };
    
    this.updateInputs = function(birdy,bottomy,topy,vel) {
        
        this.i0 = birdy;
        this.i1 = bottomy;
        this.i2 = topy;
        this.i3 = vel;
        
    };
    
    this.evaluate = function() {
        
        var sum = this.i0*this.w0 + this.i1*this.w1 + this.i2*this.w2 + this.i3*this.w3;
        var output = Math.tanh(sum);
        if (output >= 0.5) return true;
        return false;
        
    };

};