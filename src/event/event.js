const db = firebase.firestore();
const storage = firebase.storage();
const RefCollection = db.collection("Upcoming Event");
var storageRef = storage.ref();

async function displayData() {
  const snapshot = await RefCollection.orderBy("Timestamp", "asc").get();

  snapshot.forEach((doc) => {
    SetImgRef(doc.data().key);
    console.log(doc.id, "=>", doc.data());
    console.log(doc.data().key);
    console.log(doc.data().Title);
    console.log(doc.data().description);
    console.log(doc.data().event_date);

    document.getElementById("upcoming_event_heading").innerHTML = doc.data().Title;
    document.getElementById("upcoming_event_description").innerHTML = doc.data().description;
  });
}

displayData();

async function SetImgRef(key) {
  console.log(key);
  //const storageRef = storage.child("Upcoming Event/" + key + "/");

  // Now we get the references of these images
  await storageRef
    .child("Upcoming Event/" + key + "/")
    .listAll()
    .then(function (result) {
      result.items.forEach(function (image) {
        //   display_image(images);
        console.log(image);
        image.getDownloadURL().then(function (url) {
          //var html_insert = '<div class="item col-md-4"><img class="image" src="' + url + '" alt="gallery_image"></div>';
          console.log(url, key);
          //document.getElementById("image-container").innerHTML += html_insert;
        });
      });
    });
}
