let jsonData;
let rating = 12;

window.addEventListener("load", () => {
    displayQuizQ1();
    fetch("../JSON/plush.json")
        .then(res => res.json())
        .then(data => {
            jsonData = data;
        })
        .catch(err => console.log(err));

    // Retrieve cart data and update displayed count
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.amount, 0);
    const container = document.getElementById("amountCart");
    container.innerText = totalItems;
});

function ratingAmount(num) {
    rating += num;
    console.log(rating);
}

function itemsInCart(name, image, price, amount) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let itemIndex = cart.findIndex(item => item.name === name);

    if (itemIndex !== -1) {
        cart[itemIndex].amount += amount;
    } else {
        cart.push({
            name,
            image,
            amount,
            price,
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Update displayed count
    const container = document.getElementById("amountCart");
    const totalItems = cart.reduce((sum, item) => sum + item.amount, 0);
    container.innerText = totalItems;
}

function yours() {
    for (let i = 0; i < jsonData.length; i++) {
        if (rating == jsonData[i].id) {
            const container = document.getElementById("quizContainer");
            container.innerHTML = `
            <div class="PlushieContainer p-1">
                <h2 class="text-light">Your PokePlushie is:</h2>
                <div>
                    <img src="${jsonData[i].image}" alt="PlushiePicture">
                    <h3>${jsonData[i].name}</h3>
                    <p>Size: ${jsonData[i].size}</p>
                    <p>$${jsonData[i].price}</p>
                    <div class="">
                        <button class="btnBgText" 
                        onclick="itemsInCart('${jsonData[i].name}', '${jsonData[i].image}', '${jsonData[i].price}', 1), 
                        addedAlert('${jsonData[i].name}', '${jsonData[i].image}');">Toevoegen</button>
                    </div>
                </div>
                <button class="btnBgText p-2 mt-3" onclick="location.reload();">Restart</button>
        </div>`;
            return;
        }
    }
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
    alertContainer.innerHTML = `
    <div class="alertProduct p-3 rounded-5 border border-3 border-success 
    d-flex align-items-center justify-content-center">
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

function displayQuizQ1() {
    const container = document.getElementById("quizContainer");
    container.innerHTML = `
    <div class="quizQuestion">
        <h2 class="text-light">Question 1/5</h2>
        <h4 class="text-light my-2">Pick a Color:</h4>
        <div class="buttonContainer row text-center gx-3 gy-2 m-1">
            <div class="col-6 col-md-3 col-lg">
                <button class="button1" onclick="ratingAmount(-2), displayQuizQ2();">Red</button>
            </div>
            <div class="col-6 col-md-3 col-lg">
                <button class="button2" onclick="ratingAmount(0), displayQuizQ2();">Blue</button>
            </div>
            <div class="col-6 col-md-3 col-lg">
                <button class="button3" onclick="ratingAmount(-1), displayQuizQ2();">Green</button>
            </div>
            <div class="col-6 col-md-3 col-lg">
                <button class="button4" onclick="ratingAmount(2), displayQuizQ2();">Yellow</button>
            </div>
        </div>
    </div>
    <hr>
    <div class="row text-center gx-3 gy-2 m-1">
        <div class="col-md-6 col-lg">
        </div>
    </div>`;
}

function displayQuizQ2() {
    const container = document.getElementById("quizContainer");
    container.innerHTML = `
    <div class="quizQuestion">
        <h2 class="text-light">Question 2/5</h2>
        <h4 class="text-light my-2">Favo Movie:</h4>
        <div class="buttonContainer row text-center gx-3 gy-2 m-1">
            <div class="col-6 col-md-3 col-lg">
                <button class="button1" onclick="ratingAmount(-2), displayQuizQ3();">Wicked</button>
            </div>
            <div class="col-6 col-md-3 col-lg">
                <button class="button2" onclick="ratingAmount(0), displayQuizQ3();">Barbie</button>
            </div>
            <div class="col-6 col-md-3 col-lg">
                <button class="button3" onclick="ratingAmount(-1), displayQuizQ3();">Smile</button>
            </div>
            <div class="col-6 col-md-3 col-lg">
                <button class="button4" onclick="ratingAmount(0), displayQuizQ3();">Sonic 3</button>
            </div>
        </div>
    </div>
    <hr>
    <div class="row text-center gx-3 gy-2 m-1">
        <div class="col-md-6 col-lg">
            <button class="buttonPrevious p-1 bg-secondary" 
            onclick="displayQuizQ1(), ratingAmount(0);">Previous</button>
        </div>
    </div>`;
}

function displayQuizQ3() {
    const container = document.getElementById("quizContainer");
    container.innerHTML = `
    <div class="quizQuestion">
        <h2 class="text-light">Question 3/5</h2>
        <h4 class="text-light my-2">Type of Music</h4>
        <div class="buttonContainer row text-center gx-3 gy-2 m-1">
            <div class="col-6 col-md-3 col-lg">
                <button class="button1" onclick="ratingAmount(-1), displayQuizQ4();">Pop</button>
            </div>
            <div class="col-6 col-md-3 col-lg">
                <button class="button2" onclick="ratingAmount(0), displayQuizQ4();">Metal</button>
            </div>
            <div class="col-6 col-md-3 col-lg">
                <button class="button3" onclick="ratingAmount(-1), displayQuizQ4();">Hip-hop</button>
            </div>
            <div class="col-6 col-md-3 col-lg">
                <button class="button4" onclick="ratingAmount(-2), displayQuizQ4();">Rock</button>
            </div>
        </div>
    </div>
    <hr>
    <div class="row text-center gx-3 gy-2 m-1">
        <div class="col-md-6 col-lg">
            <button class="buttonPrevious p-1 bg-secondary" 
            onclick="displayQuizQ2(), ratingAmount(0);">Previous</button>
        </div>
    </div>`;
}

function displayQuizQ4() {
    const container = document.getElementById("quizContainer");
    container.innerHTML = `
    <div class="quizQuestion">
        <h2 class="text-light">Question 4/5</h2>
        <h4 class="text-light my-2">Type of Game</h4>
        <div class="buttonContainer row text-center gx-3 gy-2 m-1">
            <div class="col-6 col-md-3 col-lg">
                <button class="button1" onclick="ratingAmount(-2), displayQuizQ5();">RPG</button>
            </div>
            <div class="col-6 col-md-3 col-lg">
                <button class="button2" onclick="ratingAmount(0), displayQuizQ5();">FPS</button>
            </div>
            <div class="col-6 col-md-3 col-lg">
                <button class="button3" onclick="ratingAmount(-1), displayQuizQ5();">Open-World</button>
            </div>
            <div class="col-6 col-md-3 col-lg">
                <button class="button4" onclick="ratingAmount(-1), displayQuizQ5();">Strategy</button>
            </div>
        </div>
    </div>
    <hr>
    <div class="row text-center gx-3 gy-2 m-1">
        <div class="col-md-6 col-lg">
            <button class="buttonPrevious p-1 bg-secondary" 
            onclick="displayQuizQ3(), ratingAmount(0);">Previous</button>
        </div>
    </div>`;
}

function displayQuizQ5() {
    const container = document.getElementById("quizContainer");
    container.innerHTML = `
    <div class="quizQuestion">
        <h2 class="text-light">Question 5/5</h2>
        <h4 class="text-light my-2">Which Animal</h4>
        <div class="buttonContainer row text-center gx-3 gy-2 m-1">
            <div class="col-6 col-md-3 col-lg">
                <button class="button1" onclick="ratingAmount(-2), yours();">Puppy</button>
            </div>
            <div class="col-6 col-md-3 col-lg">
                <button class="button2" onclick="ratingAmount(-1), yours();">Kitty</button>
            </div>
            <div class="col-6 col-md-3 col-lg">
                <button class="button3" onclick="ratingAmount(0), yours();">Ferret</button>
            </div>
            <div class="col-6 col-md-3 col-lg">
                <button class="button4" onclick="ratingAmount(0), yours();">Ant</button>
            </div>
        </div>
    </div>
    <hr>
    <div class="row text-center gx-3 gy-2 m-1">
        <div class="col-md-6 col-lg">
            <button class="buttonPrevious p-1 bg-secondary" 
            onclick="displayQuizQ4(), ratingAmount(0);">Previous</button>
        </div>
    </div>`;
}

JSON.parse(localStorage.getItem("user")).forEach(item => console.log(item));

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