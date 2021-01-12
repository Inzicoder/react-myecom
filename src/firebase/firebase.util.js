import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

const config={
    apiKey: "AIzaSyCFFj5EFqq7BpcnEXCR3wFAqWNTbO1c4BY",
    authDomain: "crown-db-e317a.firebaseapp.com",
    projectId: "crown-db-e317a",
    storageBucket: "crown-db-e317a.appspot.com",
    messagingSenderId: "952002537993",
    appId: "1:952002537993:web:95a18c250b4afa1deae6d8",
    measurementId: "G-ESPR1Y0Z70"
  };


  export const createUserProfileDocument = async(userAuth,additionalData) =>{
    if(!userAuth) return
    
    const userRef= firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get() 

    if(!snapShot.exists){
 const{displayName,email} =userAuth;
 const createdAt = new Date();

 try{
await userRef.set({
 displayName,
 email,
 createdAt,
...additionalData
})
 } catch(error){
console.log('error crating user' ,error.message)
 }
    }
    return userRef;
  }
  firebase.initializeApp(config); 

  export const auth = firebase.auth();

  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt:'select_account'});

  export const signInWithGoogle=() => auth.signInWithPopup(provider)




  export default firebase