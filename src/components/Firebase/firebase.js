import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyCgeiOhuBdQE5IhEz7FUpNQE28W6AhLHKA",
    authDomain: "itcountsyoudont.firebaseapp.com",
    databaseURL: "https://itcountsyoudont.firebaseio.com",
    projectId: "itcountsyoudont",
    storageBucket: "itcountsyoudont.appspot.com",
    messagingSenderId: "199688019563"
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.firestore();

        this.googleProvider = new app.auth.GoogleAuthProvider();
    }

    logout() {
        return this.auth.signOut();
    }

    login() {
        return this.auth.signInWithPopup(this.googleProvider);
    }

    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                next(authUser);
            } else {
                fallback();
            }
        });

    days = () => this.db.collection('days');

    entries = () => this.db.collection('entries');

    intervals = () => this.db.collection('intervals');
}

export default Firebase;