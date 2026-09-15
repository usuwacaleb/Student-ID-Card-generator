const firebaseConfig = {
    apiKey: "AIzaSyDsd02E3o7sAm3LTAhlAkto4spIoi3J8js",
    authDomain: "student-id-generator-ed5a7.firebaseapp.com",
    projectId: "student-id-generator-ed5a7",
    storageBucket: "student-id-generator-ed5a7.firebasestorage.app",
    messagingSenderId: "172335404553",
    appId: "1:172335404553:web:f9c639f1748fdf55fe0ad8"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function signup() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => alert("Account Created! You can now log in."))
        .catch(error => document.getElementById('login-error').innerText = error.message);
}

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    auth.signInWithEmailAndPassword(email, password)
        .catch(error => document.getElementById('login-error').innerText = error.message);
}

function logout() {
    auth.signOut();
}

auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('generator-page').style.display = 'block';
        generateAutoID(); 
    } else {
        document.getElementById('login-page').style.display = 'flex';
        document.getElementById('generator-page').style.display = 'none';
    }
});

function generateAutoID() {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4 digit random number
    const finalID = `STD-${year}-${randomNum}`;
    
    document.getElementById('cardIdNumber').innerText = finalID;
}

document.getElementById('nameInput').addEventListener('input', function(e) {
    document.getElementById('cardName').innerText = e.target.value || "Student Name";
});

document.getElementById('courseInput').addEventListener('input', function(e) {
    document.getElementById('cardCourse').innerText = e.target.value || "Course";
    
});

document.getElementById('levelInput').addEventListener('input', function(e) {
    document.getElementById('cardLevel').innerText = e.target.value || "Level";
});

document.getElementById('matricInput').addEventListener('input', function(e) {
    document.getElementById('cardMatric').innerText = e.target.value || "Matric Number";
});

document.getElementById('photoInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('cardPhoto').src = event.target.result;
        }
        reader.readAsDataURL(file); 
    }
}); 

