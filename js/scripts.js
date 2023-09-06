
// product page slideer
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    // let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    // for (i = 0; i < dots.length; i++) {
    // dots[i].className = dots[i].className.replace(" active", "");
    // }
    // slides[slideIndex - 1].style.display = "block";
    // dots[slideIndex - 1].className += " active";
}




const flowers = [
    {
        image: "category_img1.png",
        name: "fresh flowers",
        price: 100,
    },
    {
        image: "category_img2.png",
        name: "fresh flower",
        price: 200,
    },
    {
        image: "category_img3.png",
        name: "fresh flowers",
        price: 250,
    },
    {
        image: "category_img4.png",
        name: "fresh flowers",
        price: 300,
    },
    {
        image: "category_img5.png",
        name: "fresh flowers",
        price: 400,
    },
    {
        image: "category_img6.png",
        name: "fresh flowers",
        price: 410,
    },
    {
        image: "category_img7.png",
        name: "fresh flowers",
        price: 450,
    },
    {
        image: "category_img8.png",
        name: "fresh flowerss",
        price: 500,
    },
    {
        image: "category_img9.png",
        name: "fresh flowerss",
        price: 510,
    },
    {
        image: "category_img10.png",
        name: "fresh flowerss",
        price: 550,
    },
];

// console.log(flowers);

// function addimages(event) {
//     const root = document.querySelector("#item");

//     flowers.forEach(function (flower, i) {
//         const div = createimage(flower, i);
//         root.appendChild(div);
//     });
// }
// console.log(addimages());
// function createimage(flower, i) {
//     const root = document.querySelector("#root");
//     const div = document.createElement("div");

//     const anchor = document.createElement("a");
//     anchor.setAttribute("href", `/product_page.html?id=${i}`);
//     div.appendChild(anchor);

//     const img = document.createElement("img");
//     img.setAttribute("src", flower.image);

//     const price = document.createElement("p");
//     price.innerHTML = flower.price;

//     const name = document.createElement("p");
//     name.innerHTML = flower.name;


//     div.append(anchor, img, price, name);

//     // root.appendChild(div);
//     return div;
// }

// addimages();

function displayImages(flower) {
    const wrap = document.createElement("div");

    const flowersImages = document.createElement("div");

    const fimage = document.createElement("img");
    fimage.setAttribute("src", flower.image);
    const name = document.createElement("p");
    name.innerHTML = flower.name;
    const price = document.createElement("p");
    price.innerHTML = flower.price;
    flowersImages.append(fimage, name, price);
    wrap.appendChild(flowersImages);
    return wrap;
}

// function onLoad(event) {
//     const flowerEl = document.querySelector("#root");

//     const urlParams = new URLSearchParams(window.location.search);
//     const itemId = Number(urlParams.get("id"));

//     const item = flowers[itemId];


//     //itemEl.appendChild(itemDiv);
//     const pageview = displayImages(item);
//     flowerEl.appendChild(pageview);
// }

let cart = [];
(() => {
    const serializedItems = JSON.stringify(flowers);
    localStorage.setItem('catalog', serializedItems);

    const serializedCart = localStorage.getItem('cart') ?? "[]";
    cart = JSON.parse(serializedCart);
})();

function addToCart(item) {
    const existingItemindex = cart.findIndex(
        (cartItem) => cartItem.name === item.name
    );
    if (existingItemindex > -1) {
        cart[existingItemindex].quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: counter,
        });

    }

    console.log({ cart });

    localStorage.setItem('cart', JSON.stringify(cart));
}


function createCartItem(item, i) {
    const div = document.createElement("div");
    div.classList.add("div1");

    // const anchor = document.createElement("a");
    // anchor.setAttribute("href", `/product-page.html?id=${i}`);

    // div.appendChild(anchor);

    const img = document.createElement("img");
    img.setAttribute("src", item.image);
    img.style.width = "200px";

    const price = document.createElement("p");
    price.innerHTML = item.price;

    const name = document.createElement("p");
    name.innerHTML = item.name;

    // for counter in cart
    const quantity = document.createElement("p");
    quantity.innerHTML = item.quantity;
    const sub = document.createElement("button");
    sub.innerHTML = '-';
    const add = document.createElement("button");
    add.innerHTML = '+';
    const equalbutton = document.createElement("button");
    equalbutton.innerHTML = '='
    const total = document.createElement("p");
    // total.innerHTML = "";
    let counter = item.quantity;
    add.addEventListener('click', function () {
        if (counter < 10) {
            counter = counter + 1;
            quantity.innerHTML = counter;
            cart[i].quantity = counter;


        }
        localStorage.setItem("cart", JSON.stringify(cart));
    });
    sub.addEventListener('click', function () {
        if (counter > 0) {
            counter = counter - 1;
            quantity.innerHTML = counter;
            cart[i].quantity = counter;

        }
        if (counter <= 0) {
            cart.splice(i, 1);
        }
        // total.innerHTML = item.price * counter;
        localStorage.setItem("cart", JSON.stringify(cart));
    });
    // calculate total price of item
    // let sumOftotal = 0;

    // cart.forEach((flowers) => {
    //     const subtotal = flowers.price * flowers.quantity;
    //     sumOftotal += subtotal;
    // });
    // total.innerHTML = "Total price of item :" + " " + sumOftotal;

    // Call the calculateTotalPrice function to get the total cart price
    // const totalPrice = (cart);
    // console.log("Total Cart Price:" + subtotal);


    div.append(img, price, name, add, quantity, sub, total);
    return div;
}



function createCart() {
    const cart = JSON.parse(localStorage.getItem('cart') ?? '[]');
    const cartRoot = document.querySelector('#root2');
    cart.forEach((item, i) => {
        const cartItemEl = createCartItem(item, i);
        cartRoot.appendChild(cartItemEl);
    });
    const cartTotal = total();          //adding total price in cart 
    cartRoot.append(cartTotal);         //adding total price in cart

    if (cart.length === 0) {
        cartRoot.innerHTML = '<h2>Cart is empty</h2>';
    }
}

// calculate total price of cart
function total() {
    const divTotal = document.createElement("div");
    divTotal.classList.add("total");

    // const p = document.createElement("p");
    // p.innerHTML = "Total";

    const total = document.createElement("p");
    let sumOfTotal = 0;

    cart.forEach((flowers) => {
        const subtotal = flowers.price * flowers.quantity;
        sumOfTotal += subtotal;
    });
    total.innerHTML = "Total price of item :" + " " + sumOfTotal;
    divTotal.append(total);
    return divTotal;
}
