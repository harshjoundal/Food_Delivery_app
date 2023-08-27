import  {getApp,getApps,initializeApp} from 'firebase/app'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD6BWSuvvKFcZQWght5BfJoZBrA1xxvYiE" ,
  authDomain:  "fullstack-food-delivery-785df.firebaseapp.com",
  projectId:  "fullstack-food-delivery-785df",
  storageBucket: "fullstack-food-delivery-785df.appspot.com",
  messagingSenderId: "982878006286",
  appId:  "1:982878006286:web:dfd64dc1a755b468f5205f"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)
const storage = getStorage(app);

export {app,storage}