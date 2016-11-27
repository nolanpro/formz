// this module just sets up the connection for what I assume is the firebase global
import { AngularFireModule, AuthMethods } from 'angularfire2';

const firebaseConfig = {
apiKey: 'AIzaSyBNNBzO00vma3U5OuK4SqnDhDMd5-NjqRE',
    authDomain: 'ngtodo-b898a.firebaseapp.com',
    databaseURL: 'https://ngtodo-b898a.firebaseio.com',
    storageBucket: 'ngtodo-b898a.appspot.com',
    messagingSenderId: '322429273293'
};

const firebaseAuthConfig = {
  method: AuthMethods.Popup,
  remember: 'default'
};

export const FirebaseModule = AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig);
