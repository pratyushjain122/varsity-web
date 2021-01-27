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
  });
}

displayData();

// Since you mentioned your images are in a folder,
// we'll create a Reference to that folder:

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

  // Find all the prefixes and items.
  //   storageRef
  //     .child("Upcoming Event/" + key + "/")
  //     .listAll()
  //     .then((res) => {
  //       console.log(res);
  //       // res.prefixes.forEach((folderRef) => {
  //       //   // All the prefixes under listRef.
  //       //   // You may call listAll() recursively on them.
  //       // });
  //       res.items.forEach((itemRef) => {
  //         // All the items under listRef.
  //         console.log(itemRef);
  //       });
  //     })
  //     .catch((error) => {
  //       // Uh-oh, an error occurred!
  //     });
}
