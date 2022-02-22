import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const config = {
  apiKey: 'AIzaSyASc3S-wnS-_PW2BNnxsvQlr-xVkLt3ulc',
  authDomain: 'apsidal-958a8.firebaseapp.com',
  projectId: 'apsidal-958a8',
  storageBucket: 'apsidal-958a8.appspot.com',
  messagingSenderId: '544407532321',
  appId: '1:544407532321:web:a797e01bdc2880ae39c460'
};

const initFirabase = () => {
  const app = initializeApp(config);

  app.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          unsubscribe();
          resolve(user);
        },
        reject
      );
    });
  };

  return app;
};

export default initFirabase;
