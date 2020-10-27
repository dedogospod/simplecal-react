const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://itcountsyoudont.firebaseio.com"
});

exports.deleteEntriesForMissingDays = functions.firestore
    .document('/days/{dayId}')
    .onDelete((snap, context) => {
        
        return admin.firestore()
            .collection('entries')
            .where('day', '==', snap.ref)
            .get()
            .then(snapshot => {
                snapshot.docs.forEach(entry => {
                    entry.ref.delete();
                });
                return null;
            });
    });

exports.updateDayCalories = functions.firestore
    .document('/entries/{entryId}')
    .onWrite((change, context) => {
        let entry = change.after.data();
        if(!entry) entry = change.before.data(); 
        const theDay = entry.day;
        
        return theDay.get()
            .then(doc => {
                if(doc.exists) {
                    return admin.firestore()
                        .collection('entries')
                        .where('day', '==', theDay)
                        .get()
                        .then(snapshot => {
                            let totalCalories = 0;
                            snapshot.docs.forEach(entry => {
                                totalCalories += entry.data().count;
                            });
            
                            return theDay.update({totalCalories});
                        });
                }
                return null;
            })
        
    })

exports.updateDayWeight = functions.firestore
    .document('/days/{dayId}')
    .onCreate((snapshot, context) => {
        const day = snapshot.data();

        return admin.firestore()
            .collection('days')
            .where('user', '==', day.user)
            .where('date', '<', day.date)
            .orderBy('date', 'desc')
            .limit(1)
            .get()
            .then(sn => {
                const {weight} = sn.docs[0].data();
                return snapshot.ref.update({ weight });
            });
    })

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
