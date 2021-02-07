var storage = firebase.storage();
var storageRef = storage.ref();
//var list_url = [];
var page = 2; //change this to 1
const no_image = 12;

const db = firebase.firestore();
const RefCollection = db.collection("Gallery");

let lastdoc = null;
let firstdoc = null;

async function display() {
  const ref = RefCollection.orderBy("createdAt")
    .startAfter(lastdoc || 0)
    .limit(6);

  const data = await ref.get();

  data.docs.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    //console.log(doc.id, " => ", doc.data());
    list_url.push(doc.data().url);
  });
  lastdoc = data.docs[data.docs.length - 1];
  firstdoc = data.docs[0];
  // await RefCollection.get().then((querySnapshot) => {
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     //console.log(doc.id, " => ", doc.data());
  //     list_url.push(doc.data().url);
  //   });

  // });

  console.log(list_url);
  console.log(lastdoc);

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
//display();

const field = "url";
const pageSize = 3;

const query = RefCollection.orderBy(field).limit(pageSize);
nextPage();
async function nextPage() {
  //calculate last document of query

  const list_url = [];
  const ref = RefCollection.orderBy("createdAt")
    .startAfter(lastdoc || 0)
    .limit(6);
  const data = await ref.get();

  data.docs.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    //console.log(doc.id, " => ", doc.data());
    list_url.push(doc.data().url);
  });
  lastdoc = data.docs[data.docs.length - 1];

  console.log(list_url);
  console.log(lastdoc);

  var start = no_image * (page - 1);
  var end = no_image * page;
  document.getElementById("image-container").innerHTML = "";
  for (var x = 0; x < list_url.length; x++) {
    var html_insert = '<div class="item col-md-4"><img class="image" src="' + list_url[x] + '" alt="gallery_image"></div>';
    console.log(html_insert);
    document.getElementById("image-container").innerHTML += html_insert;
  }
}

async function prevPage() {
  //calculate first document of query
  //display();
  //return RefCollection.orderBy("createdAt").endBefore(first[field]).limitToLast(6);

  const list_url = [];

  const ref = RefCollection.orderBy("createdAt").endAt(firstdoc).limitToLast(6);
  const data = await ref.get();

  data.docs.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    //console.log(doc.id, " => ", doc.data());
    list_url.push(doc.data().url);
  });
  lastdoc = data.docs[data.docs.length - 1];
  firstdoc = data.docs[0];
  console.log(list_url);
  console.log(firstdoc);

  var start = no_image * (page - 1);
  var end = no_image * page;
  document.getElementById("image-container").innerHTML = "";
  for (var x = 0; x < list_url.length; x++) {
    var html_insert = '<div class="item col-md-4"><img class="image" src="' + list_url[x] + '" alt="gallery_image"></div>';
    console.log(html_insert);
    document.getElementById("image-container").innerHTML += html_insert;
  }
}

// const timestamp = Date.now();

// RefCollection.doc("image 12.jpg")
//   .update({ createdAt: timestamp })
//   .then(function () {
//     console.log("sucess");
//   });
