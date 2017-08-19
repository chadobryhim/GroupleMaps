
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBqIeOVvAdTRF0NG33glVdOwfqQYcfaIZs",
    authDomain: "firegroupmap.firebaseapp.com",
    databaseURL: "https://firegroupmap.firebaseio.com",
    projectId: "firegroupmap",
    storageBucket: "",
    messagingSenderId: "550056568245"
};
firebase.initializeApp(config);

var database = firebase.database();

// button for adding users
$("#add-user-btn").on("click", function(event) {
  event.preventDefault();

  debugger;

  //Grabs user input
  var userEmail = $("#user-email-input").val().trim();
  var userPassword = $("#user-password-input").val().trim();

  //temporarily holds data for userLocation
  var newUser = {
    email: userEmail,
    password: userPassword,
  };

  //upload data to the database
  database.ref().push(newUser);

  console.log(newUser.email);
  console.log(newUser.password);

  //alert
  alert("Welcome to GrouponMapper!");

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
  //Handle errors
  var errorCode = error.code;
  var errorMessage = error.message;

});

  //clears input-boxes
  $("#user-email-input").val("");
  $("#user-password-input").val("");
});

$("#add-sign-btn").on("click", function(event) {
  event.preventDefault();


firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
  //Handle errors
  var errorCode = error.code;
  var errorMessage = error.message;
})

});

//create event for adding employees to database
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  //store it!
  var userEmail = childSnapshot.val().email;
  var userPassword = childSnapshot.val().password;

  //console log
  console.log(userEmail);
  console.log(userPassword);
});

// firebase.auth().onAuthStateChanged(function (user) {
//   debugger;
//   console.log(user);
// });

//
