song = "";
status = "";
objects = [];

function preload(){
    song = loadSound("alert_alert.mp3");
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status : object detecting";
}
function draw(){
    image(video, 0, 0, 380, 380);

    if (status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults);
        for (i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : object detected";
            fill(r, g, b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == "person"){
                document.getElementById("number_of_objects").innerHTML = "BABY FOUND";
                console.log("stop");
                song.stop();
            }
            else {
                document.getElementById("number_of_objects").innerHTML = "BABY NOT FOUND!!!";
                console.log("play");
                song.play();
            }
        }
        if (objects.length == 0){
            document.getElementById("number_of_objects").innerHTML = "BABY NOT FOUND!!!";
        }
    }
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}

function gotResults(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}