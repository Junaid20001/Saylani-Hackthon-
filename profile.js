firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var uid = user.uid;
        firebase.database().ref(`users/${uid}`).once('value', (data) => {
            let username = document.getElementById("username");
            let email = document.getElementById("email");
            let userprofile = document.getElementById("userprofile");
            username.innerHTML = data.val().username;
            email.innerHTML = data.val().email
            userprofile.setAttribute('src', data.val().profile)
            console.log(data.val())
        })
    } else {
        window.location = "index.html"
    }
});



let uploadFiles = (file) => {
    return new Promise((resolve, reject) => {
        let storageRef = firebase.storage().ref(`myfolder/todayImages/${file.name}`);
        let uploading = storageRef.put(file)
        uploading.on('state_changed',
            (snapshot) => {

                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                reject(error)
            },
            () => {
                uploading.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    resolve(downloadURL)
                });
            }
        );
    })
}



let logout = () => {
    firebase.auth().signOut()
        .then(() => {
            window.location = "index.html"
        })
}


let updateProfile = async () => {
    let editProfile = document.getElementById('editProfile');
    let closeBtn = document.getElementById('closeBtn');
    let userprofile = document.getElementById("userprofile");
    let uploadedImage = await uploadFiles(editProfile.files[0])
    firebase.auth().onAuthStateChanged((user) => {
        firebase.database().ref(`users/${user.uid}`).update({ profile: uploadedImage })
            .then(() => {
                userprofile.setAttribute('src', uploadedImage)
                closeBtn.click()
            })
    })
}