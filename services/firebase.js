import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
const config = {
  apiKey: 'AIzaSyBbBVZz0flPe5Y_3F0ZNQz3ZYUbbs0wVP0',
  authDomain: 'test-16680.firebaseapp.com',
  databaseURL: 'https://test-16680.firebaseio.com',
  projectId: 'test-16680',
  storageBucket: 'test-16680.appspot.com',
  messagingSenderId: '1097547905574',
  appId: '1:1097547905574:web:ff1acee6a4b2355d'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export const provider = new firebase.auth.GithubAuthProvider()

export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export const DB = firebase.firestore()
export const database = firebase.database()
export default firebase
