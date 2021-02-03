var storage = firebase.storage();
var storageRef = storage.ref();
var list_url = [];
var page = 2; //change this to 1
const no_image = 12;

const db = firebase.firestore();
const RefCollection = db.collection("Gallery");

function pushToFirestore(url, Name) {
  let imageUrl = {};
  imageUrl["url"] = url;
  RefCollection.doc(Name)
    .set(imageUrl)
    .then(function () {
      console.log("Success");
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

function download_image() {
  function display_image(image) {
    image.getDownloadURL().then(function (url) {
      list_url.push(url);
      console.log(url);

      console.log("size of list = " + list_url.length);

      //pushToFirestore(url, image.name);
    });
  }

  storageRef
    .child("images/")
    .listAll()
    .then(function (result) {
      result.items.forEach(function (images) {
        display_image(images);
        console.log(images.name);
      });
    });
}

async function display() {
  await RefCollection.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      list_url.push(doc.data().url);
    });
  });

  console.log(list_url);

  var start = no_image * (page - 1);
  var end = no_image * page;
  document.getElementById("image-container").innerHTML = "";
  for (var x = 0; x < list_url.length; x++) {
    var html_insert = '<div class="item col-md-4"><img class="image" src="' + list_url[x] + '" alt="gallery_image"></div>';
    console.log(html_insert);
    document.getElementById("image-container").innerHTML += html_insert;
  }
}

function page_change() {
  document.getElementById("index").innerHTML = page;
}

function click_next() {
  console.log("Next clicked");
  if (page + 1 < list_url.length / no_image) {
    page++;
    console.log("next fxn");
    console.log("page now = " + page);
    display();
  }
  console.log("page number = " + page);
  page_change();
}

function click_previous() {
  console.log("previous clicked");
  if (page - 1 >= 1) {
    page--;
    console.log("page now = " + page);
    console.log("page updated to = " + page);
    console.log("previous fxn");
    display();
  }
  page_change();
  console.log("page number = " + page);
}

// download_image() should run before
// display() should run only when download_image() has completely executed
//download_image();
page_change();
display();
