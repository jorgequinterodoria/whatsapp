import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyBjNXUAVIJmd3Oh2EscAPdNEHJgE43ZXgE",
    authDomain: "whatsapp-dd99b.firebaseapp.com",
    databaseURL: "https://whatsapp-dd99b.firebaseio.com",
    projectId: "whatsapp-dd99b",
    storageBucket: "whatsapp-dd99b.appspot.com",
    messagingSenderId: "10518773032",
    appId: "1:10518773032:web:cb3bf845b435304d09641d",
    measurementId: "G-6Z7SRW7FTS"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth, provider}
export default db 