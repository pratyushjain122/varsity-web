const db = firebase.firestore();
const storage = firebase.storage();
const RefContact = db.collection("New Event");
const storageRef = storage.ref();

function check_tab(IDDD) {
  console.log(IDDD);

  switch (IDDD) {
    case "upcoming-events-tab":
      console.log("1");
      handleEventForm(
        "upcoming-event_form",
        "#upcoming-toast",
        "upcoming-heading",
        "upcoming-description",
        "upcoming-date"
      );
      break;
    case "past-events-tab":
      console.log("2");
      handleEventForm("past-event_form", "#past-toast", "past-heading", "past-description", "past-date", "past-file");
      break;
    case "gallery-tab":
      console.log("3");
      handleEventForm(
        "gallery_form",
        "#gallery-toast",
        null,
        null,
        "gallery-date",
        "gallery-file",
        null,
        "gallery-category"
      );
      break;
    case "collaborations-tab":
      console.log("4");
      handleEventForm(
        "collaborations_form",
        "#collaboration-toast",
        "collaborations-heading",
        "collaborations-description",
        "collaborations-date",
        "collaborations-files"
      );
      break;
    case "members-tab":
      console.log("5");
      handleEventForm(
        "members_form",
        "members-toast",
        "members-heading",
        null,
        null,
        "members-files",
        "members-email",
        "members-role"
      );
      break;
  }
  console.log("out of switch case");
}

function handleEventForm(
  uniqueEventForm,
  uniqueToast,
  uniqueheading,
  uniquedescription,
  uniquedate,
  uniqueFile,
  uniqueEmail,
  uniqueRole
) {
  const form = document.getElementById(uniqueEventForm);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const uniqkey = Math.floor(Math.random() * 90000) + 10000;

    const checkfileExist = document.getElementById(uniqueFile);
    const checkdescriptionExist = document.getElementById(uniquedescription);
    const checkdateExist = document.getElementById(uniquedate);
    const checkheadingExist = document.getElementById(uniqueheading);
    const checkemailExist = document.getElementById(uniqueEmail);
    const checkroleExist = document.getElementById(uniqueRole);

    let file, description, date, heading, email, role;

    const uniqueObj = {};

    if (checkfileExist) {
      file = document.getElementById(uniqueFile).files;
    }
    if (checkdescriptionExist) {
      description = document.getElementById(uniquedescription).value;
      uniqueObj.description = description;
    }
    if (checkdateExist) {
      date = document.getElementById(uniquedate).value;
      uniqueObj.date = date;
    }
    if (checkheadingExist) {
      heading = document.getElementById(uniqueheading).value;
      uniqueObj.Title = heading;
    }
    if (checkemailExist) {
      email = document.getElementById(uniqueEmail).value;
      uniqueObj.email = email;
    }
    if (checkroleExist) {
      role = document.getElementById(uniqueRole).value;
      uniqueObj.role = role;
    }

    const EventRef = storageRef.child("New Event/" + uniqkey);

    console.log(heading);
    console.log(description);
    console.log(date);
    console.log(uniqkey);
    console.log(file);
    console.log(typeof file);
    console.log(email);
    console.log(role);

    console.log("all values set");
    console.log(uniqueObj);

    // const obj = {
    //   Title: heading,
    //   description: description,
    //   event_date: date,
    //   key: uniqkey,
    // };

    // console.log(obj.Title);
    // console.log(obj.description);
    // console.log(obj.event_date);

    RefContact.doc(uniqueObj.date)
      .set(uniqueObj)
      .then(function () {
        console.log("Success");
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

    upload_files(file, EventRef, uniqkey);

    $(uniqueToast).toast("show");
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
