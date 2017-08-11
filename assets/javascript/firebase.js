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

  //Grabs user input
  var userName = $("#user-name-input").val().trim();
  var userEmail = $("#user-email-input").val().trim();
  //var userPassword = $("#user-password-input").val().trim();
  var userFavorites = $("#user-favorites-input").val().trim();
  var userLocation = $("#user-location-input").val().trim();

  //temporarily holds data for userLocation
  var newUser = {
    name: userName,
    email: userEmail,
    //password: userPassword,
    favorites: userFavorites,
    location: userLocation
  };

  //upload data to the database
  database.ref().push(newUser);

  //console longitude
  console.log(newUser.name);
  console.log(newEmail.email);
  //console.log(newPassword.password);
  console.log(newFavorite.favorites);
  console.log(newLocation.location);

  //alert
  alert("Welcome to GrouponMapper!");

  //clears input-boxes
  $("#user-name-input").val("");
  $("#user-email-input").val("");
  //$("#user-password-input").val("");
  $("#user-favorites-input").val("");
  $("#user-location-input").val("");
});

//create event for adding employees to database
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  //store it!
  var userName = childSnapshot.val().name;
  var userEmail = childSnapshot.val().email;
  //var userPassword = childSnapshot.val().password;
  var userFavorites = childSnapshot.val().favorites;
  var userLocation = childSnapshot.val().location;

  //console log
  console.log(userName);
  console.log(userEmail);
  //console.log(userPassword);
  console.log(userFavorites);
  console.log(userLocation);
}

SimpleLogin authClient = new SimpleLogin(myRef, getApplicationContex());
authClient.loginWithEmail("email@example.com", "very secret", new SimpleLoginAuthenticatedHandler() {
  public void authenticated(FirebaseSimpleLoginError error, FirebaseSimpleLoginUser user) {
    if(error != null) {
      // There was an error logging into this account
    }
    else {
      // We are now logged in
    }
  }
});
