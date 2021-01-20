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
      document
        .getElementById("toast")
        .setAttribute("class", "toast d-flex align-items-center text-white bg-success border-0 mt-3");
      document.getElementById("toast-body").innerHTML = "We will be in touch shortly!";
      $("#toast").toast("show");
      form.reset();
    } else {
      console.log("empty value");
      document
        .getElementById("toast")
        .setAttribute("class", "toast d-flex align-items-center text-white bg-danger border-0 mt-3");
      document.getElementById("toast-body").innerHTML = "Please fill the form!";
      $("#toast").toast("show");
    }
  });
}

handleForm();

var a = 0;
$(window).scroll(function () {
  var oTop = $("#counter").offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() > oTop) {
    $(".counter").each(function () {
      var $this = $(this),
        countTo = $this.attr("data-count");
      $({
        countNum: $this.text(),
      }).animate(
        {
          countNum: countTo,
        },
        {
          duration: 5000,
          easing: "swing",
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
            //alert('finished');
          },
        }
      );
    });
    a = 1;
  }
});
