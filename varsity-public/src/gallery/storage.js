let page_no = 0; //change this to 1

const db = firebase.firestore();
const RefCollection = db.collection("Gallery");

let lastdoc = null;
let firstdoc = null;

let firstime = 1,
  temp_count;

const field = "url";
const pageSize = 5;

const query = RefCollection.orderBy(field).limit(pageSize);

// function page_change() {
//   document.getElementById("page1").innerHTML = page_no;
//   document.getElementById("1").id = page_no;
//   document.getElementById("page2").innerHTML = page_no + 1;
//   document.getElementById("2").id = page_no + 1;
//   document.getElementById("page3").innerHTML = page_no + 2;
//   document.getElementById("3").id = page_no + 2;
// }

// function particular_page(id) {
//   const el = document.getElementById(id);

//   $(".same").click(function () {
//     // Select all list items
//     var listItems = $(".same");

//     // Remove 'active' tag for all list items
//     for (let i = 0; i < listItems.length; i++) {
//       listItems[i].classList.remove("active");
//     }

//     // Add 'active' tag for currently selected item
//     el.classList.add("active");
//   });
//   console.log(el);
//   console.log(temp_count);
//   console.log(page_no);
// }

async function nextPage() {
  //calculate last document of query

  console.log(temp_count);
  console.log(page_no);

  if (page_no < temp_count) {
    console.log("page change can happen");
    page_no++;

    let list_url = [];
    console.log(lastdoc);

    if (firstime == 1) {
      console.log("null");
      document.getElementById("previous").style.visibility = "hidden";
    } else {
      document.getElementById("previous").style.visibility = "visible";
    }

    firstime = 0;

    const ref = RefCollection.orderBy("Date").startAfter(lastdoc).limit(9);

    const data = await ref.get();

    data.docs.forEach((doc) => {
      list_url.push(doc.data().url);
    });
    lastdoc = data.docs[data.docs.length - 1];
    firstdoc = data.docs[0];
    console.log(list_url);
    //console.log(lastdoc);

    print_image(list_url);
  } else {
    console.log("NOT POSSIBLE");
  }
}

async function prevPage() {
  //calculate first document of query
  console.log(temp_count);
  console.log(page_no);

  // if (page_no >= temp_count) {
  //   console.log("page REVERT can happen");
  //   page_no--;
  //   //page_change();
  // } else {
  //   console.log("NOT POSSIBLE");
  // }

  if (page_no > 1 && page_no <= temp_count) {
    console.log("page REVERT can happen");
    page_no--;

    let list_url = [];
    console.log(firstdoc);
    const ref = RefCollection.orderBy("createdAt").endBefore(firstdoc).limitToLast(9);
    const data = await ref.get();

    data.docs.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      list_url.push(doc.data().url);
    });
    lastdoc = data.docs[data.docs.length - 1];
    firstdoc = data.docs[0];
    console.log(list_url);
    console.log(lastdoc);
    print_image(list_url);
  } else {
    console.log("NOT REVERT");
  }

  console.log(page_no);
}

async function print_image(list_url) {
  // var start = no_image * (page - 1);
  // var end = no_image * page;
  document.getElementById("image-container").innerHTML = "";
  for (var x = 0; x < list_url.length; x++) {
    var html_insert = '<div class="item col-md-4"><img class="image" src="' + list_url[x] + '" alt="gallery_image"></div>';
    //console.log(html_insert);
    document.getElementById("image-container").innerHTML += html_insert;
  }
}

async function page_cal() {
  const cal_ref = db.collection("Calculations").doc("Gallery image count");
  const doc = await cal_ref.get();
  console.log(doc.data().total_pages);

  return doc.data();

  // if (page_no <= total_pages) {
  //   page_no++;
  // }
}

async function load() {
  const page_count = await page_cal();
  temp_count = page_count.total_pages;

  console.log(temp_count);
  nextPage();
}

load();
