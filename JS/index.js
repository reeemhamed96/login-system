const signupName = document.getElementById("signupName")
const signupEmail = document.getElementById("signupEmail")
const signupPassword = document.getElementById("signupPassword")
const loginEmail = document.getElementById("loginEmail")
const loginPassword = document.getElementById("loginPassword")
const signupButton = document.getElementById("signupButton")
const logoutButton = document.getElementById("logoutButton")
const emailRegex = /^[a-zA-Z0-9_\.]+@\w+\.[a-zA-z]{2,3}$/
const nameRegex = /^(?=.*[a-zA-Z])\w{3,16}$/
const passwordRegex = /^(?=.*[0-9])(?=.*[_\.$@#*!])(?=.*[a-zA-Z])[a-zA-Z0-9_@$\.#*!]{6,16}$/
let userList = []
let index;

// store localstorage data in array
if (localStorage.getItem("userData")) {
    userList = JSON.parse(localStorage.getItem("userData"))
}

// check if user email exist 
function checkIfExist(email) {
    index = userList.findIndex(function (element) {
        return element.userEmail.toLowerCase() === email.toLowerCase()
    })
    return index
}
// sign up
function signUp() {

    if (checkIfExist(signupEmail.value) !== -1) {
        document.querySelector(".check").innerHTML = "Email already exists"
    }
    else {
        if (validate(signupEmail, emailRegex) && validate(signupName, nameRegex) && validate(signupPassword, passwordRegex)) {
            let user = {
                userName: signupName.value,
                userEmail: signupEmail.value,
                userPassword: signupPassword.value
            }
            userList.push(user)

            localStorage.setItem("userData", JSON.stringify(userList))
            document.querySelector(".check").innerHTML = "Success"
        }



    }



}
// validation
if (document.querySelector("body").getAttribute("id") === "signup") {
    signupName.addEventListener("input", function () {
        validate(signupName, nameRegex)

    })
    signupEmail.addEventListener("input", function () {
        validate(signupEmail, emailRegex)

    })
    signupPassword.addEventListener("input", function () {
        validate(signupPassword, passwordRegex)

    })

    signupButton.addEventListener("click", signUp)

}

function validate(input, regex) {
    if (regex.test(input.value)) {
        input.classList.add("is-valid")
        input.classList.remove("is-invalid")
        return true
    }
    else {
        input.classList.add("is-invalid")
        input.classList.remove("is-valid")
        return false
    }
}
// Login
let pageUrl = location.pathname.slice(0, location.pathname.lastIndexOf("/"))

function logIn() {

    if (checkIfExist(loginEmail.value) !== -1 && loginPassword.value === userList[index].userPassword) {

        location.replace(pageUrl + "/home.html")
        localStorage.setItem("WelcomeName", userList[index].userName)

    }
    else if (loginEmail.value === "" || loginPassword.value === "") {
        document.querySelector(".incorrect").textContent = "All inputs are required"

    }
    else {
        document.querySelector(".incorrect").textContent = "Incorrect Email or Password"

    }

}

// add user name to welcome message
if (document.querySelector("body").getAttribute("id") === "home") {
    document.getElementById("welcome").innerHTML = `Welcome, ${localStorage.getItem("WelcomeName")[0].toUpperCase() + localStorage.getItem("WelcomeName").slice(1,).toLowerCase()}`
    logoutButton.addEventListener("click", logOut)

}



// logout
function logOut() {
    localStorage.removeItem("WelcomeName")
    location.replace(pageUrl + "/index.html")

}