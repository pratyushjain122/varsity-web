const db = firebase.firestore();
const storage = firebase.storage();
const RefCollection = db.collection("Upcoming Event");
var storageRef = storage.ref();

var days, hours, minutes, seconds;

async function displayData() {
  const snapshot = await RefCollection.orderBy("Timestamp", "asc").get();

  snapshot.forEach((doc) => {
    //let urlfetch = SetImgRef(doc.data());
    console.log(doc.id, "=>", doc.data());
    console.log(doc.data().key);
    console.log(doc.data().Title);
    console.log(doc.data().description);
    console.log(doc.data().event_date);
    console.log(doc.data().Timestamp);

    //let getCountDown = countDownTimer(doc.data().Timestamp);
    // console.log(getCountDown);
    // let days = getCountDown[0];

    // let hours = getCountDown[1];
    // let minutes = getCountDown[2];
    // let seconds = getCountDown[3];

    // document.getElementById("upcoming_event_heading").innerHTML = doc.data().Title;
    // document.getElementById("upcoming_event_description").innerHTML = doc.data().description;

    for (let i = 0; i < 5; i++) {
      // var li_insert = '<li data-bs-target="#carouselExampleDark" data-bs-slide-to="' + i + '" class="active"></li>';
      // console.log(li_insert);
      // document.getElementById("fuck").innerHTML += li_insert;
      // var html_insert =
      //   '<div class="carousel-item active" data-bs-interval="6000"> <img src="' +
      //   doc.data().url1 +
      //   '" class="img d-block w-100" id="upcoming_event_image" alt="..."/><div class="carousel-caption d-flex justify-content-center"> <div class="card align-items-end text-white bg-dark mb-3" style="max-width: 50rem"><div class="card-header text-warning" id="demo"></div><div class="card-body"><h3 class="card-title" id="upcoming_event_heading">' +
      //   doc.data().Title +
      //   '</h3><p class="card-text" id="upcoming_event_description">' +
      //   doc.data().description +
      //   " </p></div></div></div></div>";
      // document.getElementById("fuck2").innerHTML += html_insert;

      var html_insert =
        '<div class="carousel-item active"><div class="d-flex justify-content-center"><div class="card"><div class="card-body"><h3 class="card-title">' +
        doc.data().Title +
        '</h3><p class="card-text">' +
        doc.data().description +
        '</p></div><div class="card-footer text-danger text-center" id="demo"></div></div></div></div>"';

      document.getElementById("EVENT").innerHTML += html_insert;
    }
    //console.log(countDownTimer(doc.data().Timestamp));
    countDownTimer(doc.data().Timestamp);
  });
}

displayData();

async function SetImgRef(objfetch) {
  //const storageRef = storage.child("Upcoming Event/" + key + "/");
  key = objfetch.key;
  console.log(key);
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
          console.log(objfetch.Title);
          return url;

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
    days = Math.floor(distance / (1000 * 60 * 60 * 24));
    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    console.log(document.getElementById("demo"));

    document.getElementById("demo").innerHTML = "LIVE IN : " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    console.log("qwerty");

    // COUNTDOWN = "LIVE IN : " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    // console.log(COUNTDOWN);

    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "ALREADY OCCURED!";
    }
    let returnarr = [days, hours, minutes, seconds];
    //console.log(returnarr);

    return returnarr[0];
  }, 1000);
  //return x().days;
  console.log(x);
}
