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
    console.log(doc.data().Timestamp);

    document.getElementById("upcoming_event_heading").innerHTML = doc.data().Title;
    document.getElementById("upcoming_event_description").innerHTML = doc.data().description;
    countDownTimer(doc.data().Timestamp);
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

function countDownTimer(Timestamp) {
  // Set the date we're counting down to
  var countDownDate = Timestamp;

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("demo").innerHTML =
      "LIVE IN : " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "ALREADY OCCURED!";
    }
  }, 1000);
}
