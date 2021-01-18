var storage = firebase.storage();
var storageRef = storage.ref();

function display_image(image) {
  image.getDownloadURL().then(function (url) {
    var html_insert = '<div class="item"><img class="image" src="' + url + '" alt="gallery_image"></div>';

    document.getElementById("image-container").innerHTML += html_insert;
  });
}

storageRef
  .child("images/")
  .listAll()
  .then(function (result) {
    result.items.forEach(function (images) {
      display_image(images);
    });
  });
