// ================= 1. FIREBASE SETUP =================
// TODO: Replace this with your actual Firebase config from the Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyDsd02E3o7sAm3LTAhlAkto4spIoi3J8js",
    authDomain: "student-id-generator-ed5a7.firebaseapp.com",
    projectId: "student-id-generator-ed5a7",
    storageBucket: "student-id-generator-ed5a7.firebasestorage.app",
    messagingSenderId: "172335404553",
    appId: "1:172335404553:web:f9c639f1748fdf55fe0ad8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ================= 2. AUTHENTICATION LOGIC =================
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

// Monitor Login State to Switch Pages
auth.onAuthStateChanged(user => {
    if (user) {
        // User is logged in, show generator, hide login
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('generator-page').style.display = 'block';
        generateAutoID(); // Generate ID when page opens
    } else {
        // User is logged out, show login, hide generator
        document.getElementById('login-page').style.display = 'flex';
        document.getElementById('generator-page').style.display = 'none';
    }
});

// ================= 3. GENERATOR LOGIC =================

// Auto-Generate ID (e.g., STD-2026-1234)
function generateAutoID() {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4 digit random number
    const finalID = `STD-${year}-${randomNum}`;
    
    document.getElementById('cardIdNumber').innerText = finalID;
}

// Real-Time Name Update
document.getElementById('nameInput').addEventListener('input', function(e) {
    document.getElementById('cardName').innerText = e.target.value || "Student Name";
});

// Real-Time Course Update
document.getElementById('courseInput').addEventListener('input', function(e) {
    document.getElementById('cardCourse').innerText = e.target.value || "Course";
    
});

// Real-Time Level Update
document.getElementById('levelInput').addEventListener('input', function(e) {
    document.getElementById('cardLevel').innerText = e.target.value || "Level";
});

// Real-Time Matric Number Update
document.getElementById('matricInput').addEventListener('input', function(e) {
    document.getElementById('cardMatric').innerText = e.target.value || "Matric Number";
});

// Real-Time Photo Preview Upload
document.getElementById('photoInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('cardPhoto').src = event.target.result;
        }
        reader.readAsDataURL(file); // Convert image to base64 so it can be shown in the browser
    }
}); 

