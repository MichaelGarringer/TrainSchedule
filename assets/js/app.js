 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyAbMP_i3vfRZOhxQuvdO23QrnbLYz3wgyk",
    authDomain: "testforclass-d2c1f.firebaseapp.com",
    databaseURL: "https://testforclass-d2c1f.firebaseio.com",
    projectId: "testforclass-d2c1f",
    storageBucket: "testforclass-d2c1f.appspot.com",
    messagingSenderId: "1047111463307"
  };
  firebase.initializeApp(config);
var database = firebase.database();

  //Train Button
$("#train-form").on("submit", function (event) {
    event.preventDefault();

    //User Input
    var trainName = $("#train-name-input").val().trim();
    var trainDes = $("#destination-input").val().trim();
    var trainStart =$("#start-input").val().trim();
    var trainFreq = $("#frequency-input").val().trim();
       alert("Train added");
    
    var newTrain = {
        name: trainName,
        destination: trainDes,
        start: trainStart,
        frequency: trainFreq
    };

     database.ref("/trains").push(newTrain)
});

  database.ref("/trains").on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDes = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().frequency;
    console.log(trainName)
    console.log(trainDes)    
    console.log(trainStart)
    console.log(trainFreq)
    
    var trainStartMoment = trainStart.split(":")
    trainStartMoment = moment().hours(trainStartMoment[0]).minutes(trainStartMoment[1]);
    //Determine if train has arrived at least once for the day already
    //maxmoment ends up being which ever time is further out
    var maxMoment=moment.max(moment(), trainStartMoment)
    if(maxMoment == trainStartMoment){
        console.log("Train has not arrived at least once today")
        //determine when the next arrival is (what time and how many minutes away)
        var nextArrival = trainStartMoment.format("HH:mm a")
        var minutesAway = trainStartMoment.diff(moment(), "minutes")
    }
    else{
        console.log("Train has arrived at least once today")
        //determine when the next arrival is (what time and how many minutes away)
     //clue use % to determine next arrival
        var nextArrival = trainStartMoment.format("HH:mm a")
        var minutesAway = trainStartMoment.diff(moment(), "minutes")
    }

    /////
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDes),
        $("<td>").text(trainStart),
        $("<td>").text(trainFreq),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway),
    );
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  
  });