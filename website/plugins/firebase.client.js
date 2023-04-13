import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDIGVJmkDdkHER_ShveqRMdMDz9OfKG0Ss',
  authDomain: 'blankly-6ada5.firebaseapp.com',
  databaseURL: 'https://blankly-6ada5-default-rtdb.firebaseio.com',
  projectId: 'blankly-6ada5',
  storageBucket: 'blankly-6ada5.appspot.com',
  messagingSenderId: '77963558433',
  appId: '1:77963558433:web:ceeb8916c0ed3398032d60',
}

export default ({ app }, inject) => {
  const firebaseApp = initializeApp(firebaseConfig)

  let analyticsLocal = null

  if (process.client) {
    analyticsLocal = getAnalytics(firebaseApp)
  }

  const analytics = analyticsLocal

  // utils
  const db = getFirestore(firebaseApp)

  inject('analytics', analytics)
  inject('db', db)
}
