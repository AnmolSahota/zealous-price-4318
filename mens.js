fetch('dummy.json').then((res)=>{
    return res.json()
})
.then((data)=>{
    console.log(data.Mens)
    localStorage.setItem("mens", JSON.stringify(data.Mens))
})
.catch((err)=>{
    console.log(err)
})

let mens_data=JSON.parse(localStorage.getItem("mens"))||[]
let productGridItems = document.getElementById("productGridItems");


const displayProducts = (data) => {
  productGridItems.innerHTML = "";
  console.log(data);
  data.forEach(function (product) {

    let outer_div = document.createElement("div");
    let div = document.createElement("div");
    let image_div = document.createElement("div");
    image_div.className = "img_div";

    outer_div.setAttribute("id", "products");

    let img = document.createElement("img");
    img.src = product.img;
 

    div.innerHTML = `<a>
    <div>
      <div class="brandname">${product.title} <span></span></div>
      <div class="title">${product.category}</div>
      <div class="price"> Rs. ${product.realPrice} <span class="line-through">Rs. ${product.offprice}</span> <span class="discount">(${product.Percantage}% OFF)</span>
      </div>
    </div></a>`;

  
    let wishListDiv = document.createElement ('div');
    wishListDiv.setAttribute('id','wishListDiv')
    let wishListBtn = document.createElement ('button');
    wishListBtn.setAttribute('id','wishListBtn');
    let wishicon = document.createElement ('span');
    wishicon.className = 'material-icons';
    wishicon.innerHTML = 'favorite_border';
    let wishname = document.createElement ('span');
    wishname.innerHTML = 'WISHLIST';
    wishListBtn.append (wishicon, wishname);
    wishListDiv.append(wishListBtn)


    outer_div.onmousemove = function () {
      wishListDiv.style.visibility = 'visible';
      // wishListBtn.innerHTML=`<button id="wishListBtn"><span class='material-icons'>favorite_border</span>WISH LIST</button>`
    };

     outer_div.onmouseout = function () {
      wishListDiv.style.visibility = 'hidden';
    };

  

    wishListBtn.onclick = function () {
      wishListBtn.style.backgroundColor = "#535766";
      wishListBtn.style.color = "white"
      wishname.innerHTML = 'WISHLISTED';
      addToWishList(product);
    };

//==========================================================================================================
    image_div.append (img, wishListDiv);

    outer_div.append(image_div, div);

    img.addEventListener("click", () => {
      localStorage.setItem("PoductDetalisData", JSON.stringify(product));
    //   window.location.href = "../HTML/productDetail.html";
    });

    div.addEventListener("click", () => {
      localStorage.setItem("PoductDetalisData", JSON.stringify(product));
    //   window.location.href = "../HTML/productDetail.html";
    });

    productGridItems.append(outer_div);
  });
};

displayProducts(mens_data)

let sortButton = document.getElementById("sortButton");
sortButton.addEventListener("change", sortProducts);

function sortProducts() {
  let sortCriteria = sortButton.value;
  let mens_data = JSON.parse(localStorage.getItem("mens"))||[];

  let updatedProductList = mens_data.sort((prodA, prodB) => {
    if (sortCriteria === "asc") {
      return prodA.realPrice - prodB.realPrice;
    } else if (sortCriteria === "desc") {
      return prodB.realPrice - prodA.realPrice;
    } else if (sortCriteria === "whatsNew") {
      return prodB.id - prodA.id;
    }else if (sortCriteria === "Discount") {
      return prodB.Percantage - prodA.Percantage;
    } else {
      return true;
    }
  });
  displayProducts(updatedProductList);
}

//filter by price 
  // let FilterPrice = document.getElementById("filterButtonPrice");
  
  // FilterPrice.addEventListener("click", (event) => {
  //   let men_data = JSON.parse(localStorage.getItem("mens"));
  //   let filter = event.target.checked;
  //   let sortCriteria = sortButton.value;
  //   let filterCriteria = event.target.value;
  
  //   if (filter) {  
  //     let updatedProductList = men_data.filter((prod) => {
  //       if (filterCriteria === "Roadster") {
  //         return prod.title == "Roadster";
  //       } else if (filterCriteria === "WROGN") {
  //         return prod.title == "WROGN";
  //       } else if (filterCriteria === "HRX by Hrithik Roshan") {
  //         return prod.title == "HRX by Hrithik Roshan";
  //       } else if (filterCriteria === "Louis Philippe Sport") {
  //         return prod.title == "Louis Philippe Sport";
  //       } else if (filterCriteria === "Puma") {
  //         return prod.title == "Puma";
  //       } else {
  //         return true;
  //       }
  //     }).sort((prodA, prodB) => {
  //       if (sortCriteria === "asc") {
  //         return prodA.realPrice - prodB.realPrice ;
  //       } else if (sortCriteria === "desc") {
  //         return prodB.realPrice  - prodA.realPrice ;
  //       } else if (sortCriteria === "whatsNew") {
  //         return prodB.id - prodA.id;
  //       }  else if (sortCriteria === "Percantage") {
  //         return prodB.Percantage - prodA.Percantage;
  //       } else {
  //         return true;
  //       }
  //     });
  //     displayProducts(updatedProductList);
  //   }
  // });
