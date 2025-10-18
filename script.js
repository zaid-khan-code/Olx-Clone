let sellItemEl = document.querySelector('.sellBottun');
let bg = document.querySelector('.bg');
const auth = firebase.auth();
const db = firebase.firestore();




const boby = document.getElementById("body");
const botn = document.querySelector(".bouutns");
const messgaea = document.querySelector(".messasasa");
const signOutEl = document.querySelector(".sasdaas");


const productNameEl = document.getElementById("proName");
const productPriceEl = document.getElementById("proPrice");
const productUrlEl = document.getElementById("proImage");
const productDecsEl = document.getElementById("proDetail");
const productTypeEl = document.getElementById("proType");
const productSelectEl = document.getElementById("proName");
const productLocaionEl = document.getElementById("proLoc");


const productAddProductEl = document.querySelector(".addYourProduct")


auth.onAuthStateChanged(  (user) => {
  if (user) {
    let products = [];
    
    
    getProducts()
    console.log("User is logged in:", user.email);
    productAddProductEl.addEventListener('click', () => {
      oneTimeAdd()
    })
    function oneTimeAdd() {

      if (bg.classList[1] === "deAcvtive") {
        console.log("Applyed DEactive IF");
        bg.classList.add('active')
        bg.classList.remove('deAcvtive')
        sellItemEl.classList.add("onProduct")

        boby.classList.add('boby')

      } else if (bg.classList[1] === "active") {
        addProductToOlx();
        boby.classList.remove('boby')


      }
      console.log(bg);

    }
    function addProductToOlx() {
      if (productDecsEl.value !== "" && productNameEl.value !== "" && productPriceEl.value !== "" && productTypeEl.value !== "" && productUrlEl.value !== "" && productLocaionEl.value !== "") {
        sellItemEl.classList.remove("onProduct")
        bg.classList.remove('active');
        botn.innerHTML = "Sell Items";
        sellItemEl.classList.remove("onProduct");
        bg.classList.add('deAcvtive');
        db.collection("products")
          .add({
            dec: productDecsEl.value,
            imgUrl: productUrlEl.value,
            name: productNameEl.value,
            price: productPriceEl.value,
            type: productTypeEl.value,
            location: productLocaionEl.value,
            uid: auth.currentUser.uid
          })
          .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            productDecsEl.value = '';
            productUrlEl.value = '';
            productNameEl.value = '';
            productPriceEl.value = '';
            productTypeEl.value = '';
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      } else {
        messgaea.innerHTML = "Enter All Fields";
      }
    }





    function signOut() {
      auth
        .signOut()
        .then(() => {
          // Sign-out successful.
          window.location.href = "./login.html";
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    }
    sellItemEl.addEventListener('click', () => {
      sellItem();
    });

    signOutEl.addEventListener('click', () => {
      signOut();
    });



    function sellItem() {
      if (bg.classList[1] === "deAcvtive") {
        bg.classList.add('active');
        bg.classList.remove('deAcvtive');
        sellItemEl.classList.add("onProduct");
        botn.innerHTML = "X";
        boby.classList.add('boby');

      } else {
        bg.classList.remove('active');
        boby.classList.remove('boby')
        botn.innerHTML = "Sell Items";
        sellItemEl.classList.remove("onProduct");
        bg.classList.add('deAcvtive');
      }
      console.log(bg);

    }



    const adsGrid = document.querySelector('.ads-grid');

    function renderProduct(doc) {
      const product = doc.data();
      const card = document.createElement('div');
      card.className = `ad-card`;
      card.setAttribute('data-id', doc.id); // Set a data-id to find the card later for updates/deletes
      card.setAttribute('style', 'display: block !important;')
      card.innerHTML = `
        <div class="ad-img">
            <img src="${product.imgUrl}" alt="${product.name}">
            <span class="featured-badge">Featured</span>
        </div>
        <div class="ad-info">
            <h4 class="price">Rs ${product.price}</h4>
            <p class="title">${product.name}</p>
            <p class="title tiat">${product.dec}</p>
            <div class="location-time">
                <span>${product.location}</span>
            </div>
        </div>`;

      adsGrid.appendChild(card);
    }


    function getProducts() {

      db.collection("products")
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              renderProduct(change.doc);
            }
            if (change.type === "modified") {
              updateTodoFromDom(change.doc);
            }
            if (change.type === "removed") {
              deleteFromDom(change.doc);
            }
          });

        }, (error) => {
          console.error(error);
        });
    }
  } else {
    window.location.href = "./login.html";
  }
});