import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAEat_4gXSfGA2dqw4VKtzouE8jtS8OE1g',
  authDomain: 'menudelivery-dd275.firebaseapp.com',
  projectId: 'menudelivery-dd275',
  storageBucket: 'menudelivery-dd275.appspot.com',
  messagingSenderId: '942236762979',
  appId: '1:942236762979:web:e28ecdf8f8708c347d4956',
  measurementId: 'G-Z81WWZVJ2B',
}

firebase.initializeApp(firebaseConfig)

export default firebase
