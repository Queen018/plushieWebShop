window.addEventListener("load", () => {
    fetch("../JSON/plush.json")
        .then(res => res.json())
        .then(data => {
            const jsonString = JSON.stringify(data);
            localStorage.setItem("user", jsonString);
            const retrievedString = localStorage.getItem("user");
            const retrievedObject = JSON.parse(retrievedString);
            JSON.parse(localStorage.getItem("user")).forEach(item => console.log(item));
            JSON.parse(localStorage.getItem("cart")).forEach(item => console.log(item));
        })
        .catch(err => console.log(err));

    // Retrieve cart data and update displayed count
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.amount, 0);
    const container = document.getElementById("amountCart");
    container.innerText = totalItems;

    // Display items in cart on page load
    displayItemsCart();
    totalPrice();
});

function totalPrice() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => sum + (item.price * item.amount), 0);
    const container = document.getElementById("total");
    container.innerText = `Your total is: €${total}`;
}

function displayItemsCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("items");
    container.innerHTML = "";

    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `<div class="cart-item-inside">
                                <img src="${item.image}" alt="PlushiePicture">
                                <h3>${item.name}</h3>
                                <p>Aantal: ${item.amount}</p>
                                <p>Price: €${item.price}</p>
                             </div>
                             <hr>`;
        container.appendChild(itemDiv);
    });
}

function setOrder() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const time = new Date().toISOString();
    const newOrder = { items: cart, time };

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.removeItem("cart");

    displayItemsCart(); // Update the cart display after placing the order
    totalPrice(); // Update the total price after placing the order
}

function clearLocalStorage() {
    localStorage.clear();
    window.location.reload();
}

// Login JS
const email = document.querySelector('#exampleInputEmail1');
const password = document.querySelector('#exampleInputPassword1');

const login = document.querySelector('#login');
login.addEventListener("click", logSillyMessageFrom);

function logSillyMessageFrom() {
    if (email.value === "admin" && password.value === "1234") {
        window.location.href = "../pages/admin.html";
    } else {
        const invalid = document.querySelector("#invalid");
        invalid.style.display = "block";
        setTimeout(() => {
            invalid.style.display = "none";
        }, 2000);
    }
}