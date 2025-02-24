document.addEventListener("DOMContentLoaded", () => {
    // Fetch and display orders
    fetchOrders();

    // Fetch and display products
    fetchProducts();

    // Event listener for adding a product
    document.getElementById("addProduct").addEventListener("submit", addProduct);

    // Event listener for resetting products
    document.getElementById("resetProducts").addEventListener("click", resetProducts);

    // Event listener for deleting orders
    document.getElementById("deleteOrders").addEventListener("click", deleteOrders);

    // Event listener for searching products
    document.getElementById("searchForm").addEventListener("submit", searchProducts);
});

function fetchProducts() {
    // Fetch products from localStorage or server
    const products = JSON.parse(localStorage.getItem("user")) || [];
    displayProducts(products);
}

function displayProducts(products) {
    const productsContainer = document.getElementById("productsContainer");
    productsContainer.innerHTML = "";

    products.forEach(item => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("col-12", "col-lg-4", "col-sm-6");
        productDiv.innerHTML = `
        <div class="plushieContainer p-1">
            <img src="${item.image}" alt="PlushiePicture">
            <h3>${item.name}</h3>
            <p>Size: ${item.size}</p>
            <p>€${item.price}</p>
            <div class="d-flex justify-content-between">
            <button type="button" class="btnBgText m-1" 
            onclick="removeProduct(${item.id});"><i class="bi bi-trash"></i></button>
            <button type="button" class="btnBgText m-1" 
            onclick="changeProductModal('${item.name}', ${item.id});" 
            aria-current="page" data-bs-toggle="modal" data-bs-target="#editModal">
            <i class="bi bi-pencil-fill"></i></button>
            </div>
        </div>`;
        productsContainer.appendChild(productDiv);
    });
    logLocalStorage();
}

function fetchOrders() {
    // Fetch orders from localStorage or server
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const ordersContainer = document.getElementById("ordersContainer");
    ordersContainer.innerHTML = "";

    orders.forEach(order => {
        const orderDiv = document.createElement("div");
        orderDiv.classList.add("col-12", "ordersContainer");

        orderDiv.innerHTML = `<div class="p-1"><h3>${order.time}</h3></div>`;

        order.items.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("d-flex", "justify-content-between");
            itemDiv.innerHTML = `<p>${item.name} ${item.amount}</p>`;
            orderDiv.appendChild(itemDiv);
        });

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

    if (!id || !name || !size || !amount || !price || !image) {
        alert("Not everything is filled in. Please complete all fields.");
        return;
    }

    const products = JSON.parse(localStorage.getItem("user")) || [];
    const existingProduct = products.find(product => product.id === id);

    if (existingProduct) {
        alert("A product with this ID already exists. Please use a different ID.");
        return;
    }

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

    fetchProducts();
}

function removeProduct(id) {
    let products = JSON.parse(localStorage.getItem("user")) || [];
    const index = products.findIndex(product => product.id === id);

    if (index !== -1) {
        products.splice(index, 1);
    }

    localStorage.setItem("user", JSON.stringify(products));

    alert("Product removed successfully!");
    fetchProducts();
}

function changeProductModal(name, id) {
    const title = document.getElementById("modal-title");
    title.innerText = `Changing ${name}`;

    const idtransfer = document.getElementById("changeProductButton");
    idtransfer.innerHTML = `
    <button type="submit" class="btnBgText" onclick="changeProduct(${id});">Change Product</button>`;
}

function changeProduct(id) {
    const name = document.getElementById("changeProductName").value;
    const size = document.getElementById("changeProductSize").value;
    const amount = document.getElementById("changeProductAmount").value;
    const price = document.getElementById("changeProductPrice").value;
    const image = document.getElementById("changeProductImage").value;

    let products = JSON.parse(localStorage.getItem("user")) || [];
    const index = products.findIndex(product => product.id === id);

    if (index !== -1) {
        // If product exists, update it
        if (name) products[index].name = name;
        if (size) products[index].size = size;
        if (amount) products[index].amount = parseInt(amount, 10);
        if (price) products[index].price = parseFloat(price);
        if (image) products[index].image = image;
        alert("Product updated successfully!");
    } else {
        // If product does not exist, add it
        products.push({
            id,
            name: name || products[index].name,
            price: price ? parseFloat(price) : products[index].price,
            size: size || products[index].size,
            amount: amount ? parseInt(amount, 10) : products[index].amount,
            image: image || products[index].image,
        });
        alert("Product added successfully!");
    }

    localStorage.setItem("user", JSON.stringify(products));
    document.getElementById("changeProducts").reset();

    fetchProducts();
}

function deleteOrders() {
    localStorage.removeItem("orders");
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

    fetchProducts();
}

function clearLocalStorage() {
    localStorage.clear("user");
    window.location.reload();
}

function logLocalStorage() {
    const users = JSON.parse(localStorage.getItem("user")) || [];
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    users.forEach(item => console.log(item));
    orders.forEach(item => console.log(item));
}

function searchProducts(event) {
    event.preventDefault();
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const products = JSON.parse(localStorage.getItem("user")) || [];
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchInput));
    displayProducts(filteredProducts);
}