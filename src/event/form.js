const db = firebase.firestore();
const storage = firebase.storage();
const RefContact = db.collection("New Event");
const storageRef = storage.ref();

function handleEventForm() {
  const form = document.getElementById("event_form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const heading = document.getElementById("heading").value;
    const description = document.getElementById("description").value;
    const image_files = document.getElementById("formFileMultiple").value;
    const date = document.getElementById("example-date-input").value;
    const uniqkey = Math.floor(Math.random() * 90000) + 10000;
    const file = document.getElementById("formFileMultiple").files;
    const EventRef = storageRef.child("New Event/" + uniqkey);

    console.log(heading);
    console.log(description);
    console.log(image_files);
    console.log(date);
    console.log(uniqkey);
    console.log(file);
    console.log(typeof file);

    if (heading != null && description != null && image_files != null && date != null) {
      console.log("all values set");
      const obj = {
        Title: heading,
        description: description,
        event_date: date,
        key: uniqkey,
      };

      console.log(obj.Title);
      console.log(obj.description);
      console.log(obj.event_date);

      RefContact.doc(obj.event_date)
        .set(obj)
        .then(function () {
          console.log("Success");
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });

      upload_files(file, EventRef, uniqkey);

      $("#smptst").toast("show");
    } else {
      console.log("empty value");
    }
    form.reset();
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

function check_tab(IDDD) {
  console.log(IDDD);
}

handleEventForm();

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
