const products =  [ 
    {id: 1,
        price:100,
        productName: "bag",
        totalNumber: 0,
        isFavourite: false,
        imageUrl: "assets/bag.png",
    },
     {
        id:2,
        productName: "socks",
        price: 20,
        desc: "a pair of socks",
        totalNumber:0,
        isFavourite: false,
        imageUrl: "assets/socks.png"
     },
      {
       id:3,
       productName: "shoe",
       desc: "a pair of shoe",
       price: 50,
       totalNumber: 0,
       isFavourite: false,
       imageUrl: "assets/shoe.png"
     }]

let body = document.querySelector("body")

let dColors = document.querySelector(".color-picker")
let diffColors = ["gold", "blue", "grey", "orange", "red", "darkblue"]

let diffInColors = 0;


dColors.addEventListener("click", function(){
  body.style.backgroundColor = diffColors[diffInColors];
 diffInColors++

 if(diffInColors >= diffColors.length){
  diffInColors = 0;
 }
})
     const productsDiv = document.querySelector(".list-products");

     const total = document.querySelector(".total");

 


     function renderProducts(){
        productsDiv.innerHTML = " ";
        let totalPrice = 0;
        for(let product of products){

            totalPrice += product.price * product.totalNumber;

            const cardBodyDiv = document.createElement("div");
            cardBodyDiv.classList.add("card-body");

            cardBodyDiv.innerHTML = `<div class="card-body">
            <div class="card" style="width: 18rem">
              <img
                src=${product.imageUrl}
                class="card-img-top"
                alt="baskets"
              />
              <div class="card-body">
                <h5 class="card-title">${product.productName}</h5>
                <p class="card-text">${product.desc}</p>
                <h4 class="unit-price">${product.price}$</h4>
                <div>
                  <i class="fas fa-plus-circle" value = ${product.id}></i>
                  <span class="quantity">${product.totalNumber}</span>
                  <i class="fas fa-minus-circle" value = ${product.id}></i>
                </div>
                <div>
                  <i class="fas fa-trash-alt" value = ${product.id}></i>
                  ${product.isFavourite ?  `<i class="fas fa-heart favorite" value=${product.id}></i>` : ` <i class="fas fa-heart" value=${product.id}></i>`}
                 
                </div>
              </div>
            </div>
          </div>`

          productsDiv.appendChild(cardBodyDiv)
        }
        const minusIcons = document.getElementsByClassName("fa-minus-circle");

        const heartIcon = document.getElementsByClassName('fas fa-heart')
       
      const deleteIcons = document.getElementsByClassName("fas fa-trash-alt")
        

const plusIcons = document.getElementsByClassName("fa-plus-circle");

total.textContent = `${totalPrice}$`


for ( let deleteIcon of deleteIcons){
  deleteIcon.addEventListener("click", function(event){const deleteIconId = event.target.getAttribute("value"); trash(deleteIconId)})
}
for (let heartIcons of heartIcon){
    heartIcons.addEventListener("click", function (event){
        const heartIconid = event.target.getAttribute("value");
        changeProductColor(heartIconid)
    })
}

for(let plusIcon of plusIcons){
    plusIcon.addEventListener("click", function(event){
        const productId = event.target.getAttribute("value");
        incrementProductQuantity(productId);
    })
}


for(let minusIcon of minusIcons){
    minusIcon.addEventListener("click", function(event){
        const productId = event.target.getAttribute("value");
        decrementProductQuantity(productId);
    })
}
   
     }
     renderProducts()

     function incrementProductQuantity(productId) {
        
        const productIndex = products.findIndex(
            (product) => product.id === Number(productId)
            );
            if(products[productIndex].totalNumber >= 10 ){
                return
            }

            (products[productIndex].totalNumber  += 1);

            return renderProducts()
    }

    
    function decrementProductQuantity(productId) {
        
        const productIndex = products.findIndex(
            (product) => product.id === Number(productId)
            );

            if(products[productIndex].totalNumber <= 0) {
                return
            }
            products[productIndex].totalNumber  -= 1;

            return renderProducts()
    }
     

// change product heart Icon
function changeProductColor(heartIconId) {
    const productIndex = products.findIndex(
        (product) => product.id === Number(heartIconId)
        );


      if(products[productIndex].isFavourite){
        products[productIndex].isFavourite = false
      }else{
        products[productIndex].isFavourite = true
      }

      return renderProducts()
}

function trash(deleteIconId){
  const productIndex = products.findIndex(
    (product) => product.id === Number(deleteIconId)
    );

    products.splice(productIndex, 1)

    return renderProducts()
}

