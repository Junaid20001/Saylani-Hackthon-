let userList = [];
var regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
var regexSpace = /([^\s])/;
var regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

function signIn() {
    var email = document.getElementById("email")
    var password = document.getElementById("password")
    var flag = false;
    // var detail = localStorage.getItem('userInfo')

    if (regexEmail.test(email.value) == false) {
        swal({
            title: "Wrong Email",
            text: "Invalid Format",
            icon: "error",
            button: "Ok",
        });
        email.focus();
        email.value = "";
        password.value = "";
    }
    else{
        var a;
        for (var i = 0; i < userList.length; i++) {
            a = JSON.parse(userList[i])
               if(email.value == a.userEmail && password.value == a.userPassword ){
                   var logUser = a.userName;
                   flag = true;
               }
        }

        if(flag){
            console.log("user Found")
            swal({
                title: `Welcome ${logUser}`,
                text: "User Login Successfully",
                icon: "https://png.pngtree.com/png-vector/20190623/ourlarge/pngtree-accountavataruser-blue-dotted-line-line-icon-png-image_1491314.jpg",
                button: "Ok",
            });
            email.value = "";
            password.value = "";
        }
        else{
            swal({
                title: "User Not Found",
                text: "Please check your credentials or SIGN UP!",
                icon: "error",
                button: "Ok",
            });
            email.value = "";
            password.value = "";
        }
    }

}



function signUp() {
    var userName = document.getElementById("userName")
    var email = document.getElementById("email1")
    var password = document.getElementById("password1")

    var userDetail = {
        userName: userName.value,
        userEmail: email.value,
        userPassword: password.value
    }

    if (userName.value == "" || userName.value == null || regexSpace.test(userName.value) == false) {
        swal({
            title: "Wrong User Name",
            text: "Input field must not be empty",
            icon: "error",
            button: "Ok",
        });
        userName.focus();
        userName.value = "";
    }

    if (regexEmail.test(email.value) == false) {
        swal({
            title: "Wrong Email",
            text: "Invalid Format",
            icon: "error",
            button: "Ok",
        });
        email.focus();
        email.value = "";
    }

    if (regexPass.test(password.value) == false) {
        swal({
            title: "Incorrect Format",
            text: "Start with UpperCase,Min length 8",
            icon: "error",
            button: "Ok",
        });
        password.focus();

    }

    
    if (regexSpace.test(userName.value) && regexEmail.test(email.value) && regexPass.test(password.value)) {
        localStorage.setItem('userInfo', userList.push(JSON.stringify(userDetail)))
        
        console.log(userList)
        swal({
            title: "Good job!",
            text: "User Registered Successfully",
            icon: "success",
            button: "Ok",
        });
        userName.value = "";
        email.value = "";
        password.value = "";
    }
    
}




var sign_Up = document.getElementById("signUp");
var sign_In = document.getElementById("signIn");

function showSignIn() {
    sign_Up.setAttribute("class", "container hide")
    sign_In.setAttribute("class", "container")
}

function showSignUp() {
    sign_Up.setAttribute("class", "container")
    sign_In.setAttribute("class", "container hide")
}








    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    console.log(user);

    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
    // ..
  });

let signIn = ()=>{
    let email = document.getElementById("signIn-email")
    let password = document.getElementById("sigIn-password")

    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
      
      var user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
}





