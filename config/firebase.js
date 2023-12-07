import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/app";
import Constants from   'expo-constants';

//firebase config
const firebaseConfig = {
    apiKey: Constants.manifest2.extra.apiKey,
    authDomain: Constants.manifest2.extra.authDomain,
    projectId: Constants.manifest2.extra.projectId,
    storageBucket: Constants.manifest2.extra.storageBucket,
    messagingSenderId: Constants.manifest2.extra.messagingSenderId,
    appId: Constants.manifest2.extra.appId,
    databaseURL: Constants.manifest2.extra.databaseURL,
};

// initialize
 initializeApp(firebaseConfig);
 export const database = getFirestore();