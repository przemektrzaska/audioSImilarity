var mic;
var gameChar_x = 200;
var gameChar_y = 200;
var start = 0;
var increment = 0.1;
var angle = 0;
var film;
var high = 134;
var len = 25;
var angle = 3.14 / 4;
var angle2 = 3.14 / 4;
var slider;
var fft;
var track;
var button;
var amp;
var volhistory=[];
function preload(){
    track = loadSound('Ryuichi Sakamoto - 28 - Love Is The Devil.flac');
}
function toggleTrack(){
    if(track.isPlaying()){
        track.pause();
    }else{
        track.play();
    }
}

function setup() {
    createCanvas(512,512);
    button = createButton('PLAY');
    button.mousePressed(toggleTrack);
    //button = createButton('LOWPASS');
    //button.mousePressed(lowpassFilter);
   // var filter = new p5.BandPass();
   //mic.disconnect();
    //mic.connect(filter);
    //mic.connect();
    //track.play();
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT(0.91,64);
    mic.connect(fft);
    w = width/64;
    amp = new p5.Amplitude(); 
    
}


function isMouseOverCanvas() {
  var mX = mouseX, mY = mouseY;
  if (mX > 0 && mX < width && mY < height && mY > 0) {
    noise.amp(0.5, 0.2);
  } else {
    noise.amp(0, 0.2);
  }
}
function draw() {
    background(55);
    var centroidplot = 0.0;
    var spectralCentroid = 0;
    // set the BandPass frequency based on mouseX
    var freq = map(mouseX, 0, width, 20, 10000);
    //filter.freq(freq);
    // give the filter a narrow band (lower res = wider bandpass)
    //filter.res(50);
    //fractal tree location
    translate(-50,-10);
    push();
    
    translate(244,high);
    branch(25);
    pop();
    
    push();
    translate(228,150);
    branch2(25);
    pop();
    
    push();
    translate(285,150);
    branch3(25);
    pop();
    //end fractal
    
    //audio begin
    var vol = amp.getLevel();
    var spectrum = fft.analyze();

    stroke(255);
    noStroke();
    fill(255,255,255);
    textSize(12);
    text(spectrum.length+' bins', 400, 100); // number of bins
    stroke(255);
    noFill();
    for(var i = 0; i < spectrum.length;i++){
        var x = map(log(i), 0, log(spectrum.length), 0, width);
        var h = map(spectrum[i], 0, 255, 0, height);
        var rectangle_width = (log(i+1)-log(i))*(width/log(spectrum.length));
        rect(x, height, rectangle_width, -h )
    }
    var nyquist = 22050;

    // get the centroid
    spectralCentroid = fft.getCentroid();

    // the mean_freq_index calculation is for the display.
    var mean_freq_index = spectralCentroid/(nyquist/spectrum.length);
    
    centroidplot = map(log(mean_freq_index), 0, log(spectrum.length), 0, width);


    stroke(255,0,0); // the line showing where the centroid is will be red

    rect(centroidplot, 0, width / spectrum.length, height)
    noStroke();
    fill(255,0,0);  // text is white
    text("centroid: ", 350, 140);
    text(round(spectralCentroid)+" Hz", 400, 140);

    volhistory.push(vol);
    var volume = mic.getLevel(); //The getLevel() method takes an array of amplitude values collected over a small period of time (1024 samples). Then it returns the Root Mean Square (RMS) of these values.
    var decibels = 20 * log(abs(volume));//logarithmic units called decibels

    start = lerp(start, volume, increment);
    noStroke();
    fill(255,255,255);  // text is white
    text("RMS: ", 350, 170);
    text(round(decibels)+" DB", 400, 170);
    stroke(255);
    noFill();
    push();
    beginShape();
    for(var i = 0;i<volhistory.length;i++){
        var y = map(volhistory[i],0,1,height,0);
        vertex(i,y);
    }
    endShape();
    pop();
    if(volhistory.length>width){
        volhistory.splice(0,1);
    }
    
    //audio end
    
    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    
    //graphics
    noStroke();
    //arms
    fill(255,178,102);
    ellipse(gameChar_x+35,gameChar_y-23,6,16);
    ellipse(gameChar_x+55,gameChar_y-23,6,16);
    //head
    push();
    stroke(255,0,0,20);
    
    fill(229,204,255);
    ellipse(gameChar_x+45,gameChar_y-50,start*400+30,start*200+30);
    pop();
    //body
    fill(255,204,204);
    rect(gameChar_x+41,gameChar_y-35,8,5);
    rect(gameChar_x+35,gameChar_y-32,20,20);
    //legs
    fill(255,178,102);
    rect(gameChar_x+38,gameChar_y-12,6,10);
    rect(gameChar_x+46,gameChar_y-12,6,10);
    ellipse(gameChar_x+40,gameChar_y-2,8,5);
    ellipse(gameChar_x+50,gameChar_y-2,8,5);
    //face
    fill(255,0,127);
    rect(gameChar_x+42,gameChar_y-45,6,3);
    ellipse(gameChar_x+45,gameChar_y-42,6,6);
    //eyebrows
    fill(153,0,0);
    beginShape();
    vertex(gameChar_x+49, gameChar_y-55);
    vertex(gameChar_x+55, gameChar_y-55);
    vertex(gameChar_x+55, gameChar_y-54);
    endShape(CLOSE);
    beginShape();
    vertex(gameChar_x+42,gameChar_y-55);
    vertex(gameChar_x+36,gameChar_y-55);
    vertex(gameChar_x+36,gameChar_y+-54);
    endShape(CLOSE);
    //eyes
    fill(0,153,153);
    ellipse(gameChar_x+38,gameChar_y-52,3,3);
    ellipse(gameChar_x+53,gameChar_y-52,3,3);
    //hair
    fill(0,0,0);
    beginShape();
    vertex(gameChar_x+45,gameChar_y-65);
    vertex(gameChar_x+48,gameChar_y-69);
    vertex(gameChar_x+46,gameChar_y-68);
    endShape(CLOSE);
    beginShape();
    vertex(gameChar_x+45,gameChar_y-65);
    vertex(gameChar_x+42,gameChar_y-69);
    vertex(gameChar_x+44,gameChar_y-68);
    endShape(CLOSE);
    //endofgraphics
    
    
    

    //isMouseOverCanvas();
}
function branch(len){
    
    
    stroke(255);
    line(0,0,0,-len);
    translate(0,-len);
    
     if(len > 2){
         push();
            rotate(angle*start*20);
            branch(len*0.67);
         pop();
         push();
            rotate(-angle*start*20);
            branch(len*0.67);
         pop();
     }

}
function branch2(len){
    
    
    stroke(255);
    line(-len,0,0,0);
    translate(-len,0);
    
     if(len > 2){
         push();
            rotate(angle2*start*20);
            branch(-len*0.67);
         pop();
         push();
            rotate(-angle2*start*20);
            branch(len*0.67);
         pop();
     }

}
function branch3(len){
    
    
    stroke(255);
    line(-len,0,0,0);
    translate(0,-len+25);
    
     if(len > 2){
         push();
            rotate(-angle2*start*20);
            branch(-len*0.67);
         pop();
         push();
            rotate(angle2*start*20);
            branch(len*0.67);
         pop();
     }

}
