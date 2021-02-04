const db = firebase.firestore();
const RefCollection = db.collection("Past Event");

console.log("A");

RefCollection.doc("2020")
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
        document.getElementById("post_2021").innerHTML = doc.data().Title;
        document.getElementById("desc_2021").innerHTML = doc.data().description;
        document.getElementById("img_2021").src = doc.data().url1;
      }
    });
  });
