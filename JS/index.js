window.addEventListener("load", () => {
    if (!localStorage.getItem("user")) {
        fetch("JSON/plush.json")
            .then(res => res.json())
            .then(data => {
                const jsonString = JSON.stringify(data);
                localStorage.setItem("user", jsonString);
                displayClothing(data);
            })
            .catch(err => console.log(err));
    } else {
        const retrievedString = localStorage.getItem("user");
        const retrievedObject = JSON.parse(retrievedString);
        displayClothing(retrievedObject);
    }

    // Retrieve cart data and update displayed count
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.amount, 0);
    const container = document.getElementById("amountCart");
    container.innerText = totalItems;

    const searchForm = document.getElementById("searchForm");
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const searchInput = document.getElementById("searchInput").value.toLowerCase();
        const data = JSON.parse(localStorage.getItem("user"));
        const filteredData = data.filter(item => item.name.toLowerCase().includes(searchInput));
        
        if (filteredData.length === 0) {
            const container = document.getElementById("people-container");
            container.innerHTML = "<h2>No results found</h2>";
        } else {
            displayClothing(filteredData);
        }
    });
});

// Function to add items to the cart and view them
function itemsInCart(name, image, price, amount) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let itemIndex = cart.findIndex(item => item.name === name);

    if (itemIndex !== -1) {
        cart[itemIndex].amount += amount;
    } else {
        cart.push({ name, image, amount, price });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Update displayed count
    const container = document.getElementById("amountCart");
    const totalItems = cart.reduce((sum, item) => sum + item.amount, 0);
    container.innerText = totalItems;
}

function displayClothing(data) {
    const container = document.getElementById("people-container");
    container.innerHTML = "";

    data.forEach(item => {
        const userDiv = document.createElement("div");
        userDiv.classList.add("col-12");
        userDiv.classList.add("col-lg-4");
        userDiv.classList.add("col-sm-6");
        userDiv.innerHTML = `<div class="plushieContainer p-1">
                                <img src="${item.image}" alt="PlushiePicture">
                                <h3>${item.name}</h3>
                                <p>Size: ${item.size}</p>
                                <p>€${item.price}</p>
                                <div class="buttons">
                                    <button class="btnBgText" type="button" onclick="itemsInCart('${item.name}', '${item.image}', '${item.price}', 1), addedAlert('${item.name}', '${item.image}');">Toevoegen</button>
                                </div>
                            </div>`;
        container.appendChild(userDiv);
    });
    JSON.parse(localStorage.getItem("user")).forEach(item => console.log(item));
}

function addedAlert(name, image) {
    const alertContainer = document.createElement("div");
    alertContainer.classList.add("alert");
    alertContainer.classList.add("position-fixed");
    alertContainer.classList.add("bottom-0");
    alertContainer.classList.add("start-50");
    alertContainer.classList.add("translate-middle");
    alertContainer.classList.add("z-2");
    alertContainer.style.transition = "opacity 1s";
    alertContainer.innerHTML = `<div class="alertProduct p-3 rounded-5 border border-3 border-success d-flex align-items-center justify-content-center">
                                    <img src="${image}" alt="plushiePictureAdded">
                                    <h3>${name} Added To Cart</h3>
                                </div>`;

    document.body.appendChild(alertContainer);

    setTimeout(() => {
        alertContainer.style.opacity = "0";
        setTimeout(() => {
            alertContainer.remove();
        }, 1000);
    }, 1000);
}

function filterBySize(size) {
    const data = JSON.parse(localStorage.getItem("user"));
    const filteredData = data.filter(item => item.size === size);
    displayClothing(filteredData);
}

function resetFilter() {
    const data = JSON.parse(localStorage.getItem("user"));
    displayClothing(data);
}

function allSizes() {
    const data = JSON.parse(localStorage.getItem("user"))
    displayClothing(data);
}

// Login JS
const email = document.querySelector('#exampleInputEmail1');
const password = document.querySelector('#exampleInputPassword1');

const login = document.querySelector('#login');
login.addEventListener("click", logSillyMessageFrom);

function logSillyMessageFrom() {
    if (email.value === "admin" && password.value === "1234") {
        window.location.href = "../pages/admin.html";
    }
    else {
        const invalid = document.querySelector("#invalid");
        invalid.style.display = "block";
        setTimeout(() => {
            invalid.style.display = "none";
        }, 2000);
    }
}