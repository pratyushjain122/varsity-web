const db = firebase.firestore();
const storage = firebase.storage();
const storageRef = storage.ref();

let dataEnd;

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
              window.location.assign("../admin form/form.html");
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

function check_tab(IDDD) {
  console.log(IDDD);

  switch (IDDD) {
    case "upcoming-events-tab":
      console.log("1");
      //dateToTimestamp("date_upcoming");
      handleEventForm("Upcoming Event", "upcoming-event_form");
      break;
    case "past-events-tab":
      console.log("2");

      fetchPastEventList();
      handleEventForm("Past Event", "past-event_form");
      break;
    case "gallery-tab":
      console.log("3");
      handleEventForm("Gallery", "gallery_form");
      break;
    case "collaborations-tab":
      console.log("4");
      handleEventForm("Collaborations", "collaborations_form");
      break;
    case "members-tab":
      console.log("5");
      handleEventForm("Members", "members_form");
      break;
    default:
      console.log("default");
  }
  console.log("out of switch case");
}

async function handleEventForm(tab, uniqueEventForm) {
  const form = document.getElementById(uniqueEventForm);
  console.log("qq");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const uniqkey = Math.floor(Math.random() * 90000) + 10000;

    switch (tab) {
      case "Upcoming Event": {
        console.log(tab);
        console.log("kitni barrrrrrrrrrrrrrr");
        const RefCollection = db.collection("Upcoming Event");

        const heading = document.getElementById("upcoming-heading").value;
        const description = document.getElementById("upcoming-description").value;
        const date = document.getElementById("upcoming-date").value;
        //const file = document.getElementById("upcoming-file").files;

        let dateSplit = date.split("-");

        var newDate = new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);
        timestamp = newDate.getTime();
        console.log(timestamp);

        console.log(heading);
        console.log(description);
        console.log(date);
        console.log(uniqkey);

        const uniqueObj = {
          Title: heading,
          description: description,
          event_date: date,
          Timestamp: timestamp,
          key: uniqkey,
        };
        console.log(uniqueObj);
        const EventRef = storageRef.child("Upcoming Event/" + heading + "-" + uniqkey);

        addForm(RefCollection, uniqueObj);

        //upload_files(file, EventRef, uniqkey, RefCollection, uniqueObj.Title, tab);

        $("#upcoming-toast").toast("show");

        form.reset();
        break;
      }
      case "Past Event": {
        console.log(tab);
        //const heading = document.getElementById("past-heading").value;
        //const description = document.getElementById("past-description").value;
        //const date = document.getElementById("past-date").value;
        const file = document.getElementById("past-file").files;

        // let dateSplit = date.split("-");

        // var newDate = new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);
        // timestamp = newDate.getTime();
        // console.log(timestamp);

        var e = document.getElementById("brand-select");
        var category = e.options[e.selectedIndex].text;
        console.log(category);

        const category_split = category.split(" - ");
        const past_key = category_split[0];

        const past_Title = category_split[1];

        console.log(past_key);
        console.log(past_Title);

        // const uniqueObj = {
        //   Title: heading,
        //   description: description,
        //   event_date: date,
        //   key: uniqkey,
        //   Timestamp: timestamp,
        // };

        const RefCollection = db.collection("Past Event");
        const ImagPending = db.collection("Img Pending in Past Event");
        const EventRef = storageRef.child("Past Event/" + past_Title + "-" + past_key);

        // console.log(heading);
        // console.log(description);
        // console.log(date);
        // console.log(uniqkey);
        // console.log(file);
        // console.log(typeof file);

        const snapshot = await ImagPending.get();

        snapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
          const completed_obj = doc.data();

          console.log("12345");

          if (doc.data().key == past_key) {
            console.log("qqqqqqqqqqqqqqqq");

            console.log(file);
            console.log(EventRef);
            console.log(past_Title);
            console.log(past_key);
            console.log(RefCollection);
            console.log(tab);
            //const Title = doc.data().Title;

            const uploaded = upload_files(file, EventRef, past_key, ImagPending, past_Title, tab);

            //console.log(fullprocess);
            checkModification(RefCollection);
          }
        });

        console.log("all values set");

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

async function upload_files(file, EventRef, uniqkey, RefCollection, Title, tab) {
  console.log(Object.keys(file).length);
  console.log(tab);
  console.log(Title);

  for (let key = 0; key < Object.keys(file).length; key++) {
    //if (file.hasOwnProperty(key)) {
    const element = file[key];
    const metadata = {
      contentType: file.type,
    };

    console.log(element.name);
    console.log(key);

    await EventRef.child(uniqkey + "-" + key)
      .put(file[key], metadata)
      .then(function (snapshot) {
        console.log("Uploaded a blob or file!");
        generateURL(uniqkey, RefCollection, Title, tab);
      })
      .catch((e) => console.log(e));
  }
}

function addForm(RefCollection, uniqueObj) {
  console.log(uniqueObj);

  RefCollection.doc(uniqueObj.Title)
    .set(uniqueObj)
    .then(function () {
      console.log("Success");
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

async function generateURL(key, RefCollection, Title, tab) {
  let count = 0;
  console.log("function called");
  console.log(Title);
  await storageRef
    .child(tab + "/" + Title + "-" + key + "/")
    .listAll()
    .then(function (result) {
      result.items.forEach(function (image) {
        //   display_image(images);

        image.getDownloadURL().then(function (url) {
          console.log(url, key);
          count++;
          addImageURL(url, RefCollection, Title, count);
        });
      });
    });
}

async function addImageURL(url, RefCollection, Title, count) {
  let imageUrl = {};
  imageUrl["url" + count] = url;

  console.log(Title);

  await db
    .collection("Img Pending in Past Event")
    .doc(Title)
    .update(imageUrl)
    .then(function () {
      console.log("Success");
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

check_tab("upcoming-events-tab");

async function moveEvent() {
  const timestamp = Date.now();
  const upcomigRef = db.collection("Upcoming Event");
  const PastRef = db.collection("Img Pending in Past Event");

  console.log(timestamp);
  let obj;

  var query = await upcomigRef
    .where("Timestamp", "<=", timestamp)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        obj = doc.data();
        console.log(obj);
      });

      return obj;
    })
    .then(function (obj) {
      console.log(obj.Timestamp);
      const timestampToYear = new Date(obj.Timestamp);
      console.log(timestampToYear.getFullYear());

      const which_year = timestampToYear.getFullYear();
      //addForm(PastRef, obj);
      console.log(typeof which_year);

      PastRef.doc(obj.Title)
        .set(obj)
        .then(function () {
          console.log("Success");
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });

      return obj.Title;
    })
    .then(function (Title) {
      upcomigRef
        .doc(Title)
        .delete()
        .then(function () {
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
}

moveEvent();

async function fetchPastEventList() {
  let count = 1;
  const upcomingToPast = {};

  await db
    .collection("Img Pending in Past Event")

    .get()
    .then((querySnapshot) => {
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data());
        upcomingToPast[count] = doc.data().key + " - " + doc.data().Title;
        count++;
      });
    });

  console.log(upcomingToPast);

  for (var field in upcomingToPast) {
    console.log(upcomingToPast[field]);
    $('<option value="' + upcomingToPast[field] + '">' + upcomingToPast[field] + "</option>").appendTo("#brand-select");
  }
}

function deleteDoc(ImagPending, Title) {
  ImagPending.doc(Title)
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
}

function checkModification(RefCollection) {
  const ImagPending = db.collection("Img Pending in Past Event");

  const observer = ImagPending.onSnapshot((querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        console.log("New city: ", change.doc.data());
      }
      if (change.type === "modified") {
        console.log("Modified city: ", change.doc.data());

        const obj = change.doc.data();
        const Title = change.doc.data().Title;

        RefCollection.doc(Title)
          .set(obj)
          .then(function () {
            console.log("Success");
            console.log(Title);
            return Title;
          })

          .then(function (Title) {
            console.log(Title);
            deleteDoc(ImagPending, Title);
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
      }
      if (change.type === "removed") {
        console.log("Removed city: ", change.doc.data());
      }
    });
  });
}
