const db = firebase.firestore();
const RefCollection = db.collection("Past Event");

console.log("A");

RefCollection.doc("2021")
  .collection("events")
  .get()
  .then((querySnapshot) => {
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log("A");
      if (doc.data().url1) {
        // if first url is present
        console.log(doc.data());
        const timestamp = new Date(doc.data().Timestamp);
        console.log(timestamp.getFullYear());
        // document.getElementById("post_2021").innerHTML = doc.data().Title;
        // document.getElementById("desc_2021").innerHTML = doc.data().description;
        // document.getElementById("img_2021").src = doc.data().url1;
      }
    });
  });

var html_insert =
  '<div class="col"><div class="card border-dark mb-3" style="max-width: 28rem"><div class="img-card"><img src="../../../assets/past_events/2021_cancer_day.png" id="img_2021" class="card-img-top" alt="..." /></div><div class="card-body text-dark"><h5 class="card-title" id="post_2021">NEW EVENT</h5><p class="card-text" id="desc_2021">brtbtrbtrbrbtrrtbrtbbtrtrbtrbbrtbrtbt</p></div></div></div>';

document.getElementById("container-2021").innerHTML += html_insert;
// document.getElementById("container-2020").innerHTML += html_insert;
// document.getElementById("container-2019").innerHTML += html_insert;
// document.getElementById("container-2018").innerHTML += html_insert;
