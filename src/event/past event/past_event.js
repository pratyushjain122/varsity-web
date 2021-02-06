const db = firebase.firestore();
const RefCollection = db.collection("Past Event");

console.log("A");

let arr_year = ["2018", "2019", "2020", "2021"];

for (let i = 0; i < arr_year.length; i++) {
  console.log(typeof arr_year[i]);

  RefCollection.doc(arr_year[i])
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
          var html_insert =
            '<div class="col"><div class="card border-dark mb-3" style="max-width: 28rem"><div class="img-card"><img src="' +
            doc.data().url1 +
            '" id="img_2021" class="card-img-top" alt="..." /></div><div class="card-body text-dark"><h5 class="card-title" id="post_2021">' +
            doc.data().Title +
            '</h5><p class="card-text" id="desc_2021">' +
            doc.data().description +
            "</p></div></div></div>";

          document.getElementById("container-" + arr_year[i]).innerHTML += html_insert;
        }
      });
    });
}

// document.getElementById("container-2020").innerHTML += html_insert;
// document.getElementById("container-2019").innerHTML += html_insert;
// document.getElementById("container-2018").innerHTML += html_insert;
