// Program

// Population Control and Inheritance
var population;
var popSize = 100;
var genepool = [];
var NNList = [];
// Miscellaneous
var bars;
var generation = 1;
var score = 0;
var highscore = 0;
var currentBar;
var testData = [];
var firstrun = true;

function setup() {
    
    createCanvas(400, 400);
    population = new Population(popSize,false,NNList);
    bars = new Bars();
    G = createVector(0,0.3);
    JumpForce = createVector(0,-8);
    
}

function draw() {
    
    background(30);
    fill(0,0,0);
    noStroke();
    rect(0,0,width,20);
    rect(0,380,width,20);
    
    // Data
    fill(255,100);
    text("Generation: "+generation,5,30);
    text("Alive: "+population.getAlive(),5,45);
    text("Score: "+(score-1),5,60);
    fill(255,0,0,100);
    text("Highscore: "+highscore,5,75);
    
    // Bars
    bars.update();
    bars.show();
    testData = bars.getCurrentBar(firstrun);
    if (testData !== undefined) {currentBar = testData; score ++;}
    firstrun = false;
    
    // Population Flock
    population.run(currentBar[0]-bars.getWidth()/2,currentBar[0]+bars.getWidth()/2,currentBar[1],currentBar[3]);
    //population.stare(currentBar[0],currentBar[1],currentBar[2],currentBar[3]);
    currentBar[0] -= bars.getSpeed();
    currentBar[2] -= bars.getSpeed();
    
    // Check whether to start a new population or not and then create the population if needed
    if (population.getAlive() <= 0) {
        
        population.evaluate();
        
        genepool = population.createGenePool();
        
        var parentA;
        var parentB;
        var nnGeneSet;
        for (var i = 0; i < popSize; i ++) {
            parentA = genepool[Math.floor(random(genepool.length-1))];
            parentB = genepool[Math.floor(random(genepool.length-1))];
            nnGeneSet = new NeuralNetwork();
            nnGeneSet.setWeights(parentA.w0,parentA.w1,parentB.w2,parentB.w3);
            NNList.push(nnGeneSet);
        }
        
        population = new Population(popSize,true,NNList);
        genepool = [];
        NNList = [];
        bars = new Bars();
        firstrun = true;
        if (score > highscore) highscore = score;
        score = 0;
        generation ++;
        
    }
    
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        population.jump();
    }
}
    