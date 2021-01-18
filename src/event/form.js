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
