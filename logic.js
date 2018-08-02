$(document).ready(function () {
    console.log("ready!");

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCQOkD0CIcJwRAgDDf5vbTIBWwtWpscuD4",
        authDomain: "train-schedule-4cb16.firebaseapp.com",
        databaseURL: "https://train-schedule-4cb16.firebaseio.com",
        projectId: "train-schedule-4cb16",
        storageBucket: "train-schedule-4cb16.appspot.com",
        messagingSenderId: "274534594411"
    };

    firebase.initializeApp(config);
    var database = firebase.database();

    $("#submit").on("click", function () {
        var trainName = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var startTime = $("#start-time").val().trim();
        var freq = $("#frequency").val().trim();


        // Creates local "temporary" object for holding train data
        var newTrain = {
            name: trainName,
            destination: destination,
            start: startTime,
            freq: freq
        };

        // Uploads train data to the database
        database.ref().push(newTrain);

        // Logs everything to console
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.start);
        console.log(newTrain.freq);
      

        alert("Train successfully added");

        // Clears all of the text-boxes
        $("#train-name").val("");
        $("#destination").val("");
        $("#start-time").val("");
        $("#frequency").val("");
    })

});