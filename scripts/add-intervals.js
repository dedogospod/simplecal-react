const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

db.collection('entries')
  .get()
  .then(daysSnapshot => {
            daysSnapshot.docs.forEach(day => {
                    day.ref.delete()
            })
  });