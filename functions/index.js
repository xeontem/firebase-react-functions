// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// for shell debugging only
// var serviceAccount = require('../key.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://first-38138.firebaseio.com'
// });

//-------------------------- debugging -----------------------------------
exports.notify = functions.https.onRequest((req, res) => {
  admin.auth().listUsers(1000)
    .then(({ users, pageToken }) => {
      console.log(users);
      users.forEach(user => {
        const payload = {
          notification: {
            title: 'React App',
            body: 'Hello!!',
            click_action: 'https://dummypage.com',
            icon: 'https://firebasestorage.googleapis.com/v0/b/circle-ci-test-31dfc.appspot.com/o/firestore.png?alt=media&token=a1227c5e-6cad-4dfb-81d6-ae07d7dbac1c'
          }
        };
        admin.messaging().sendToTopic('TODOS', payload);
        res.send('asdf');
      });
    }).catch(err => console.log(err));
});

//-------------------------- messaging -----------------------------------
exports.subscribeToTopic = functions.https.onCall((data, context) => {
  admin.messaging().subscribeToTopic(data.token, data.topic)
    .then(function(response) {
      console.log('Successfully subscribed to topic:', response);
    })
    .catch(function(error) {
      console.log('Error subscribing to topic:', error);
    });
});

exports.fsSendupdate = functions.firestore.document('/todos/{todoID}')
.onUpdate(todo => {
  const previousValue = todo.before.data();
  const payload = {
    notification: {
      title: 'React App',
      body: `todo ${previousValue.header} successfully updated!`,
      icon: 'https://firebasestorage.googleapis.com/v0/b/circle-ci-test-31dfc.appspot.com/o/firestore.png?alt=media&token=a1227c5e-6cad-4dfb-81d6-ae07d7dbac1c'
    }
  };

  console.log('-----------------------------------------');
  console.log(`todo ${previousValue.header} successfully updated!`);
  console.log('-----------------------------------------');

  admin.messaging().sendToTopic('TODOS', payload);
  return true;
});


//-------------------------- actions -----------------------------------
exports.backupTodos = functions.https.onRequest((data, context) => {
  admin.firestore().collection('backup_todos').get()
    .then(querySnap => querySnap.docs)
    .then(docs => docs.map(doc => doc.ref.delete()))
    .then(docs => admin.firestore().collection('todos').get())
    .then(querySnap => querySnap.docs)
    .then(docs => docs.map(doc => ({ data: doc.data(), id: doc.id })))
    .then(todos => todos.map(todo =>
        admin.firestore().collection('backup_todos').doc(`${todo.id}`).set(todo.data)))
    .then(backup => {
      console.log(`backuped ${backup.length} todos. Backup success!!`);
      const payload = {
        notification: {
          title: 'React App',
          body: `backuped ${backup.length} todos. Backup success!!`,
          icon: 'https://firebasestorage.googleapis.com/v0/b/circle-ci-test-31dfc.appspot.com/o/firestore.png?alt=media&token=a1227c5e-6cad-4dfb-81d6-ae07d7dbac1c'
        }
      };
      admin.messaging().sendToTopic('TODOS', payload);
      return true;
    });
});

// exports.saveUser = functions.auth.user().onCreate(event => {
//     console.log(event)
//   const user = event.data; // The Firebase user.
//   const email = user.email; // The email of the user.
//   const displayName = user.displayName; // The display name of the user.
//   const token = user.token;
//   const photoURL = user.photoURL;

//   admin.firestore().collection('users').doc(user.id).set({
//     email, displayName, token, photoURL
//   })
// });
