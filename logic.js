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

    //on click, get values from input form
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


        // Clears all of the text-boxes
        $("#train-name").val("");
        $("#destination").val("");
        $("#start-time").val("");
        $("#frequency").val("");

    })

    //firebase event for adding train to db, adds a row to html when user adds train
    database.ref().on("child_added", function (childSnapshot) {
        
        //store everything into a variable
        var trainName = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var startTime = childSnapshot.val().start;
        var freq = childSnapshot.val().freq;
        
        // start time- push back a year for conversion 
        var startTimeConverted = moment(startTime, "HH:mm").subtract(1, "years");
        console.log(startTimeConverted);

        //Current time
        var currentTime = moment();
        console.log("Current time: " + moment(currentTime).format("hh:mm"));

        //Difference between times
        var diffTime = moment().diff(moment(startTimeConverted), "minutes");
        console.log("Difference in time: " + diffTime);

        //Time apart (remainder)
        var tRemainder = diffTime % freq;
        console.log("Time apart: " + tRemainder);

        //calculate minutes away
        var minutesAway = freq - tRemainder;
        console.log("Minutes away: " + minutesAway);

        //Next Train
        var nextTrain = moment().add(minutesAway, "minutes");
        console.log("Arrival time: " + moment(nextTrain).format("hh:mm"));

        //append data to table
        //create new row
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(freq),
            $("<td>").text(moment(nextTrain).format("hh:mm")),
            $("<td>").text(minutesAway),
        )
        //append new row to table
        $("#train-table > tbody").append(newRow);
    })



});