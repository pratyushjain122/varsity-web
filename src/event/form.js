const db = firebase.firestore();
const storage = firebase.storage();
const storageRef = storage.ref();

let dataEnd;

function check_tab(IDDD) {
  console.log(IDDD);

  switch (IDDD) {
    case "upcoming-events-tab":
      console.log("1");
      //dateToTimestamp("date_upcoming");
      handleEventForm("upcoming", "upcoming-event_form");
      break;
    case "past-events-tab":
      console.log("2");
      handleEventForm("past", "past-event_form");
      break;
    case "gallery-tab":
      console.log("3");
      handleEventForm("gallery", "gallery_form");
      break;
    case "collaborations-tab":
      console.log("4");
      handleEventForm("collaborations", "collaborations_form");
      break;
    case "members-tab":
      console.log("5");
      handleEventForm("members", "members_form");
      break;
    default:
      console.log("default");
  }
  console.log("out of switch case");
}

function handleEventForm(tab, uniqueEventForm) {
  const form = document.getElementById(uniqueEventForm);
  console.log("qq");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const uniqkey = Math.floor(Math.random() * 90000) + 10000;

    switch (tab) {
      case "upcoming": {
        console.log("kitni barrrrrrrrrrrrrrr");
        const RefCollection = db.collection("Upcoming Event");

        const heading = document.getElementById("upcoming-heading").value;
        const description = document.getElementById("upcoming-description").value;
        const date = document.getElementById("upcoming-date").value;
        const file = document.getElementById("upcoming-file").files;

        let dateSplit = date.split("-");

        var newDate = new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);
        timestamp = newDate.getTime();
        console.log(timestamp);

        console.log(heading);
        console.log(description);
        console.log(date);
        console.log(uniqkey);
        console.log("all values set");

        const uniqueObj = {
          Title: heading,
          description: description,
          event_date: date,
          Timestamp: timestamp,
          key: uniqkey,
        };
        console.log(uniqueObj);
        const EventRef = storageRef.child("Upcoming Event/" + uniqkey);

        RefCollection.doc(uniqueObj.Title)
          .set(uniqueObj)
          .then(function () {
            console.log("Success");
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });

        $("#upcoming-toast").toast("show");

        upload_files(file, EventRef, uniqkey);
        form.reset();
        break;
      }
      case "past": {
        const heading = document.getElementById("past-heading").value;
        const description = document.getElementById("past-description").value;
        const date = document.getElementById("past-date").value;
        const file = document.getElementById("past-file").files;

        const uniqueObj = {
          Title: heading,
          description: description,
          event_date: date,
          key: uniqkey,
        };

        const RefCollection = db.collection("Past Event");
        const EventRef = storageRef.child("Past Event/" + uniqkey);

        console.log(heading);
        console.log(description);
        console.log(date);
        console.log(uniqkey);
        console.log(file);
        console.log(typeof file);

        console.log("all values set");
        console.log(uniqueObj);

        RefCollection.doc(uniqueObj.Title)
          .set(uniqueObj)
          .then(function () {
            console.log("Success");
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });

        upload_files(file, EventRef, uniqkey);

        $("#past-toast").toast("show");
        form.reset();
        break;
      }
      case "gallery": {
        //const category = document.getElementById("gallery-category").value;
        const date = document.getElementById("gallery-date").value;
        const file = document.getElementById("gallery-file").files;

        var e = document.getElementById("gallery-category");
        var category = e.options[e.selectedIndex].text;
        console.log(category);

        const uniqueObj = {
          category: category,
          Date: date,
          key: uniqkey,
        };

        const RefCollection = db.collection("Gallery");
        const EventRef = storageRef.child("Gallery/" + uniqkey);

        console.log(category);

        console.log(date);
        console.log(uniqkey);
        console.log(file);
        console.log(typeof file);

        console.log("all values set");
        console.log(uniqueObj);

        RefCollection.doc(uniqueObj.Date)
          .set(uniqueObj)
          .then(function () {
            console.log("Success");
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });

        upload_files(file, EventRef, uniqkey);

        $("#gallery-toast").toast("show");
        form.reset();
        break;
      }
      case "collaborations": {
        const heading = document.getElementById("collaborations-heading").value;
        const description = document.getElementById("collaborations-description").value;
        const date = document.getElementById("collaborations-date").value;
        const file = document.getElementById("collaborations-files").files;

        const uniqueObj = {
          Title: heading,
          description: description,
          event_date: date,
          key: uniqkey,
        };

        const RefCollection = db.collection("Collaborations");
        const EventRef = storageRef.child("Collaborations/" + uniqkey);

        console.log(heading);
        console.log(description);
        console.log(date);
        console.log(uniqkey);
        console.log(file);
        console.log(typeof file);

        console.log("all values set");
        console.log(uniqueObj);

        RefCollection.doc(uniqueObj.Title)
          .set(uniqueObj)
          .then(function () {
            console.log("Success");
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });

        upload_files(file, EventRef, uniqkey);

        $("#collaboration-toast").toast("show");
        form.reset();
        break;
      }
      case "members": {
        const heading = document.getElementById("members-heading").value;
        const email = document.getElementById("members-email").value;
        //const role = document.getElementById("members-role").value;
        const file = document.getElementById("members-files").files;

        var e = document.getElementById("members-role");
        var role = e.options[e.selectedIndex].text;
        console.log(role);

        const uniqueObj = {
          Name: heading,
          Email: email,
          Role: role,
          key: uniqkey,
        };

        const RefCollection = db.collection("Members");
        const EventRef = storageRef.child("Members/" + uniqkey);

        console.log(heading);

        console.log(uniqkey);
        console.log(file);
        console.log(typeof file);
        console.log(email);
        console.log(role);

        console.log("all values set");
        console.log(uniqueObj);

        RefCollection.doc(uniqueObj.Name)
          .set(uniqueObj)
          .then(function () {
            console.log("Success");
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });

        upload_files(file, EventRef, uniqkey);

        $("#members-toast").toast("show");
        form.reset();
        break;
      }
    }
  });
}

function upload_files(file, EventRef, uniqkey) {
  for (const key in file) {
    if (file.hasOwnProperty(key)) {
      const element = file[key];
      const metadata = {
        contentType: file.type,
      };

      const path = EventRef.fullPath;

      console.log(element);
      console.log(element.name);
      console.log(key);
      console.log(file[key]);

      EventRef.child(uniqkey + "-" + key)
        .put(file[key], metadata)
        .then(function (snapshot) {
          console.log(path);
          console.log("Uploaded a blob or file!");
        })
        .catch((e) => console.log(e));
    }
  }
}

const docRef = db.collection("Credentials").doc("Admin");

function signIn() {
  console.log("ss");

  var provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      // /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user);

      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            console.log(user.email);
            console.log(doc.data().Email);

            if (user.email == doc.data().Email) {
              console.log("ID matched");
              window.location.assign("../event/form.html");
            } else {
              $("#error-login").toast("show");
            }
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}

function Logout() {
  $("#logout").toast("show");
  console.log("qwerty");

  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("Logout successfully");
    })
    .catch((error) => {
      // An error happened.
    });
}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    console.log("Bypassed");
  } else {
    console.log("1st time");
    // No user is signed in.
    var myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"), {
      backdrop: "static",
    });
    myModal.show();
  }
});

check_tab("upcoming-events-tab");

// function dateToTimestamp(date_tab) {
//   console.log("we are in");
//   $("[name=date_tab]").on("change", function () {
//     dataEnd = $(this).val();
//     console.log(new Date(dataEnd).getTime());
//   });
// }
