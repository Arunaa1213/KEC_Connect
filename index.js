import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";

import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDVJj1CeA1EYhYMd-HfiWw5kWWsdl3gtow",
  authDomain: "kec-contacts-2gk-ar-ch-aa.firebaseapp.com",
  projectId: "kec-contacts-2gk-ar-ch-aa",
  storageBucket: "kec-contacts-2gk-ar-ch-aa.appspot.com",
  messagingSenderId: "571844708517",
  appId: "1:571844708517:web:47b0eca7394ceab68b254c",
  measurementId: "G-SXEVZYKZQE",
};

initializeApp(firebaseConfig);
const db = getFirestore();

const colref = collection(db, "KEC Contacts");

function del(userdoc) {
  const docRef = doc(db, "KEC Contacts", userdoc.id);
  deleteDoc(docRef);
}

function openForm(userdocd) {
  document.getElementById("myForm").style.display = "block";
  var usernamenew = document.getElementById("usernamenew");
  var emailnew = document.getElementById("emailnew");
  var phonenumbernew = document.getElementById("phonenumbernew");
  var designationnew = document.getElementById("designationnew");
  var departmentnew = document.getElementById("departmentnew");
  var categorynew = document.getElementById("categorynew");
  var roomnew = document.getElementById("roomnew");
  var whatsappnew = document.getElementById("whatsappnew");
  var indexnew = document.getElementById("indexnew");
  // console.log("inside openform");
  // usernamenew.value = "Arunaa";
  usernamenew.value = userdocd.username;
  emailnew.value = userdocd.email;
  phonenumbernew.value = userdocd.phonenumber;
  designationnew.value = userdocd.designation;
  departmentnew.value = userdocd.dept;
  categorynew.value = userdocd.category;
  roomnew.value = userdocd.roomNo;
  whatsappnew.value = userdocd.whatsappnumber;
  indexnew.value = userdocd.index;
}
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function openFormadd() {
  document.getElementById("myForm1").style.display = "block";
}
function closeFormadd() {
  document.getElementById("myForm1").style.display = "none";
}

var closeedit = document.getElementById("closeedit");
closeedit.addEventListener("click", closeForm);

var closeadd = document.getElementById("closeadd");
closeadd.addEventListener("click", closeFormadd);
var url;

function addnew() {
  openFormadd();
  const addBookForm = document.querySelector(".add");
  var imageadd = document.getElementById("imageadd");
  imageadd.addEventListener("change", (e) => {
    console.log("adding imge");
    const file = e.target.files[0];
    const metaData = {
      contentType: file.type,
    };
    const storage = getStorage();
    const storageRef = sRef(storage, "Staff/" + file.name);
    const UploadTask = uploadBytesResumable(storageRef, file, metaData);
    console.log("uploaded");
    UploadTask.on(
      "state-changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        document.getElementById("upprogress").innerHTML =
          "Upload: " + progress + "%";
      },
      (error) => {
        console.log(error);
        alert("Image not uploaded");
      },
      () => {
        getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
          url = downloadURL;
        });
      }
    );
  });
  // if (url == "") {
  //   var urldefault =
  //     ;
  //   url = urldefault;
  // }
  addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addDoc(colref, {
      username: document.getElementById("usernameadd").value,
      email: document.getElementById("emailadd").value.split(","),
      phonenumber: document.getElementById("phonenumberadd").value,
      designation: document.getElementById("designationadd").value,
      dept: document.getElementById("departmentadd").value,
      category: document.getElementById("categoryadd").value,
      roomNo: document.getElementById("roomadd").value,
      whatsappnumber: document.getElementById("whatsappadd").value,
      index: document.getElementById("indexadd").value,
      imgurl: url,
    }).then(() => {
      addBookForm.reset();
      window.location.reload();
    });
  });
}

function edituser(userdoc, userdocd) {
  openForm(userdocd);
  // const updateForm = document.querySelector(".form-container");
  const editbut = document.getElementById("updatebut");
  // updateForm.addEventListener("submit", (e) => {
  editbut.addEventListener("click", (e) => {
    e.preventDefault();
    let docRef = doc(db, "KEC Contacts", userdoc.id);
    var usernamenew = document.getElementById("usernamenew").value;
    var emailnew = document.getElementById("emailnew").value;
    var phonenumbernew = document.getElementById("phonenumbernew").value;
    var designationnew = document.getElementById("designationnew").value;
    var departmentnew = document.getElementById("departmentnew").value;
    var categorynew = document.getElementById("categorynew").value;
    var roomnew = document.getElementById("roomnew").value;
    var whatsappnew = document.getElementById("whatsappnew").value;
    var indexnew = document.getElementById("indexnew").value;
    updateDoc(docRef, {
      username: usernamenew,
      email: emailnew,
      phonenumber: phonenumbernew,
      designation: designationnew,
      dept: departmentnew,
      category: categorynew,
      roomNo: roomnew,
      whatsappnumber: whatsappnew,
      index: indexnew,
    }).then(() => {
      // updateForm.reset();
      // console.log("updated");
      window.location.reload();
    });
  });
}

function deluser(userdoc) {
  const docRef = doc(db, "KEC Contacts", userdoc.id);
  deleteDoc(docRef).then(() => {
    window.location.reload();
  });
}

function displaycard(userdocd, userdoc) {
  var wrapper = document.createElement("div");
  wrapper.className = "card";
  var image = document.createElement("img");
  image.src = userdocd.imgurl;
  var container = document.createElement("div");
  container.className = "container";
  var username = document.createElement("p");
  username.innerText = userdocd.username;
  username.className = "username";
  var emaillist = document.createElement("div");
  // emaillist.innerText = userdocd.email;
  userdocd.email.map((e) => {
    var email = document.createElement("p");
    email.innerText = e;
    // console.log(e);
    emaillist.appendChild(email);
  });

  var phonenumber = document.createElement("p");
  phonenumber.innerText = userdocd.phonenumber;
  var designation = document.createElement("p");
  designation.innerText = userdocd.designation;
  var department = document.createElement("p");
  department.innerText = userdocd.dept;
  department.className = "dept";
  var category = document.createElement("p");
  category.innerText = userdocd.category;
  var roomno = document.createElement("p");
  roomno.innerText = userdocd.roomNo;
  var whatsappnumber = document.createElement("p");
  whatsappnumber.innerText = "Whatsapp: " + userdocd.whatsappnumber;
  wrapper.appendChild(image);
  container.appendChild(username);
  container.appendChild(emaillist);
  container.appendChild(phonenumber);
  container.appendChild(designation);
  container.appendChild(department);
  container.appendChild(category);
  container.appendChild(roomno);
  wrapper.appendChild(container);
  container.appendChild(whatsappnumber);
  // console.log(userdoc.data());
  var delet = document.createElement("button");
  delet.className = "delbut";
  delet.addEventListener("click", (e) => {
    e.preventDefault();
    deluser(userdoc);
  });
  delet.innerHTML = `<i class="fa-solid fa-trash icon"></i>`;
  var edi = document.createElement("button");
  edi.className = "editbut";
  edi.innerHTML = `<i class="fa-solid fa-pen-to-square icon"></i>`;
  edi.addEventListener("click", (e) => {
    e.preventDefault();
    edituser(userdoc, userdocd);
  });
  var but = document.createElement("div");
  but.appendChild(edi);
  but.appendChild(delet);
  but.className = "buttons";
  wrapper.appendChild(but);
  box.appendChild(wrapper);
}
var addbut = document.getElementById("addbutton");
addbut.addEventListener("click", (e) => {
  e.preventDefault();
  addnew();
});

var box = document.getElementById("box");
var users = [];
getDocs(colref).then((snapshot) => {
  snapshot.docs.forEach((userdoc) => {
    users.push(userdoc.data());
    displaycard(userdoc.data(), userdoc);
  });
});

function buttonUp() {
  const input = document.querySelector(".searchbox-input");
  const inputdept = document.querySelector(".searchbox-inputdept");
  const cards = document.getElementsByClassName("card");
  let filter = input.value.toLowerCase();
  let filterdept = "";
  filterdept = inputdept.value.toLowerCase();
  for (let i = 0; i < cards.length; i++) {
    let title = cards[i].querySelector(".username");
    let dept = cards[i].querySelector(".dept");
    if (
      title.innerText.toLowerCase().indexOf(filter) > -1 &&
      dept.innerText.toLowerCase().indexOf(filterdept) > -1
    ) {
      cards[i].classList.remove("d-none");
    } else {
      cards[i].classList.add("d-none");
    }
  }
}

var search = document.getElementById("searchBar");
search.addEventListener("keyup", (e) => {
  e.preventDefault();
  buttonUp();
});
var search1 = document.getElementById("searchBar1");
search1.addEventListener("keyup", (e) => {
  e.preventDefault();
  buttonUp();
});
