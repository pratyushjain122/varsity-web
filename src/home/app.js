const db = firebase.firestore();
const RefContact = db.collection("Contact");

function handleForm() {
  const form = document.getElementById("contact");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const enter_name = document.getElementById("enter_name").value;
    const enter_email = document.getElementById("enter_email").value;
    const enter_message = document.getElementById("enter_message").value;

    if (enter_name != null && enter_email != null && enter_message) {
      console.log("all values set");
      const obj = {
        Name: enter_name,
        Email: enter_email,
        Message: enter_message,
      };

      RefContact.doc(obj.Email)
        .set(obj)
        .then(function () {
          console.log("Success");
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
      //toast_handler();
      $("#smptst").toast("show");

    } else {
      console.log("empty value");
    }
    form.reset();
  });
}

handleForm();
