object = [];
status = "";
o_bject = "";
function setup(){
    

    video = createCapture(VIDEO);
    video.size(800,400);
   
}

function modelLoaded(){
console.log("model is Loaded");
status = true;


}

function start(){
    console.log("started");
    object_detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
    o_bject = document.getElementById("object").value;
}


function gotResult(error,results){
    if(error){
        console.error(error);
        
    }
    console.log(results);
    object = results;

}

function draw(){

    image(video,0,0,380,380);
    if(status != ""){

        object_detector.detect(video,gotResult);
        
        for(i = 0; i < object.length ; i++){
            r = random(255);
            g =random(255);
            b = random(255);
            document.getElementById("status").innerHTML = "status : objects detected";
            
            fill(r,g,b);
            percentage = floor(object[i].confidence*100);
            text(object[i].label+" "+percentage+"%",object[i].x + 15,object[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);

            if(object[i].label = o_bject){
                video.stop();
                object_detector.detect(video,gotResult);

                document.getElementById("found").innerHTML = o_bject+" found";

            }
            else{
                
                document.getElementById("found").innerHTML = o_bject+" not found";
            }

           

        }
    }

}



    

