var prediction_1 =  '';
var prediction_2 = '';

Webcam.set({
    height: 300,
    width:350,
    image_format: 'png',
    png_quality:30

});

camera = document.getElementById("camera");
Webcam.attach('camera');

function take_Snapshot(){
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'">';
    });
}

console.log("ml5_version:",ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/uAgN0L2D7/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model loaded successfully');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data1 = 'The first prediction is'+prediction_1;
    speak_data2 = 'the second prediction is'+prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis);
}

function Check() {
    img = document.getElementById("captured_image")
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error){
        console.error(error);
    }

    if (results){
        console.log(results)
        document.getElementById("emotion_name1").innerHTML = results[0].label;
        document.getElementById("emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak()
    }

    if (results[0].label == "SWAG") {
        document.getElementById("emoji1").innerHTML = "&#9996;";
    }

    if (results[0].label == "PEACE LIFE") {
        document.getElementById("emoji1").innerHTML = "&#129304;";
    }

    if (results[0].label == "THUMBS UP") {
        document.getElementById("emoji1").innerHTML = "&#129304;";
    }

    if (results[1].label == "SWAG") {
        document.getElementById("emoji2").innerHTML = "&#9996;";
    }

    if (results[1].label == "PEACE LIFE") {
        document.getElementById("emoji2").innerHTML = "&#129304;";
    }

    if (results[1].label == "THUMBS UP") {
        document.getElementById("emoji2").innerHTML = "&#129304;";
    }
}