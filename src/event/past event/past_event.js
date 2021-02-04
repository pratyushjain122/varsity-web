const db = firebase.firestore();
const RefCollection = db.collection("Past Event");

RefCollection.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots

    if (doc.data().url1) {
      // if first url is present
      console.log(doc.data().Timestamp);
      const timestamp = new Date(doc.data().Timestamp);
      console.log(timestamp.getFullYear());
      document.getElementById("post_2021").innerHTML = doc.data().Title;
      document.getElementById("desc_2021").innerHTML = doc.data().description;
      document.getElementById("img_2021").src = doc.data().url1;
    }
  });
});
