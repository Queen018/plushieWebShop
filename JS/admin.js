document.addEventListener("DOMContentLoaded", () => {
    // Fetch and display orders
    fetchOrders();

    // Event listener for adding a product
    document.getElementById("addProduct").addEventListener("submit", addProduct);

    // Event listener for resetting products
    document.getElementById("resetProducts").addEventListener("click", resetProducts);

    // Event listener for removing a product
    document.getElementById("removeProducts").addEventListener("submit", removeProduct);

    // Event listener for changing a product
    document.getElementById("changeProducts").addEventListener("submit", changeProduct);
});

function fetchOrders() {
    // Fetch orders from localStorage or server
    const orders = JSON.parse(localStorage.getItem("user")) || [];
    const ordersContainer = document.getElementById("ordersContainer");
    ordersContainer.innerHTML = "";

    orders.forEach(item => {
        const orderDiv = document.createElement("div");
        orderDiv.classList.add("col-12");
        orderDiv.classList.add("col-lg-4");
        orderDiv.classList.add("col-sm-6");
        orderDiv.innerHTML = `<div class="plushieContainer p-1">
                                <img src="${item.image}" alt="PlushiePicture">
                                <h3>${item.name}</h3>
                                <p>Size: ${item.size}</p>
                                <p>€${item.price}</p>
                            </div>`;
        ordersContainer.appendChild(orderDiv);
    });
    logLocalStorage();
}

function addProduct(event) {
    event.preventDefault();
    const id = parseInt(document.getElementById("productID").value, 10);
    const name = document.getElementById("productName").value;
    const size = document.getElementById("productSize").value;
    const amount = parseInt(document.getElementById("productAmount").value, 10);
    const price = parseFloat(document.getElementById("productPrice").value);
    const image = document.getElementById("productImage").value;

    const products = JSON.parse(localStorage.getItem("user")) || [];
    products.push({
        id,
        name,
        price,
        size,
        amount,
        image,
    });
    localStorage.setItem("user", JSON.stringify(products));

    alert("Product added successfully!");
    document.getElementById("addProduct").reset();

    fetchOrders();
}

function removeProduct(event) {
    event.preventDefault();
    const id = parseInt(document.getElementById("removeProductID").value, 10);
    console.log("ID to remove:", id);

    let products = JSON.parse(localStorage.getItem("user")) || [];
    console.log("Current products:", products);

    const index = products.findIndex(product => product.id === id);
    console.log("Index found:", index);

    if (index !== -1) {
        products.splice(index, 1);
        console.log("Product removed. Updated products:", products);
    } else {
        console.log("Product not found.");
    }

    localStorage.setItem("user", JSON.stringify(products));

    alert("Product removed successfully!");
    document.getElementById("removeProducts").reset();

    fetchOrders();
}


function changeProduct(event) {
    event.preventDefault();
    const id = parseInt(document.getElementById("changeProductID").value, 10);
    const name = document.getElementById("changeProductName").value;
    const size = document.getElementById("changeProductSize").value;
    const amount = parseInt(document.getElementById("changeProductAmount").value, 10);
    const price = parseFloat(document.getElementById("changeProductPrice").value);
    const image = document.getElementById("changeProductImage").value;

    let products = JSON.parse(localStorage.getItem("user")) || [];
    const index = products.findIndex(product => product.id === id);

    if (index !== -1) {
        // If product exists, update it
        products[index] = {
            id,
            name,
            price,
            size,
            amount,
            image,
        };
        alert("Product updated successfully!");
    } else {
        // If product does not exist, add it
        products.push({
            id,
            name,
            price,
            size,
            amount,
            image,
        });
        alert("Product added successfully!");
    }

    localStorage.setItem("user", JSON.stringify(products));
    document.getElementById("changeProducts").reset();

    fetchOrders();
}


function resetProducts() {
    fetch("../JSON/plush.json")
        .then(res => res.json())
        .then(data => {
            clearLocalStorage();
            localStorage.setItem("user", JSON.stringify(data));
            alert("Products reset to original state!");
        })
        .catch(err => console.log(err));

    fetchOrders();
}

function clearLocalStorage() {
    localStorage.clear("user");
    window.location.reload();
}

function logLocalStorage() {
    JSON.parse(localStorage.getItem("user")).forEach(item => console.log(item));
}