
const auth = firebase.auth();

let products = [];
let homeProducts =[];

function convertCentsToPKR(cents, usdToPkrRate = 278) {
  // 100 cents = 1 USD
  const dollars = cents / 100;
  const pkr = dollars * usdToPkrRate;
  return Math.round(pkr); // rounded to nearest rupee
}




fetch('https://supersimplebackend.dev/products')
  .then(res => res.json())
  .then(data => {
    products = data;
    homeProducts = products.splice(0,6)
    console.log('Products inside then:', products);
    homeProducts.forEach(product => {
      let container = document.querySelector(`.ads-grid`);
      let html = ``;
      let temp = document.createElement("div");
      html = `<div class="ad-card ${product.name}">
                        <div class="ad-img">
                            <img  src="${product.image}" alt="House">
                            <span class="featured-badge">Featured</span>
                        </div>
                        <div class="ad-info">
                            <h4 class="price">Rs ${convertCentsToPKR(product.priceCents)}</h4>
                            <p class="title">${product.name}</p>
                            <div class="location-time">
                                <span>Lahore</span>
                                <span>3 days ago</span>
                            </div>
                            
                        </div>
                    </div>`;
      temp.innerHTML = html;
      let eduSec = temp.firstElementChild;
      container.append(eduSec);
    });
  })

  .catch(err => console.error(err));


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