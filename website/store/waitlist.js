import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

function updateWaitlist(loc, email, $db) {
  const data = { loc, email, timestamp: serverTimestamp() }
  return addDoc(collection($db, 'waitlist'), data)
}

function addChallenge(email, $db) {
  const data = { email, timestamp: serverTimestamp() }
  return addDoc(collection($db, 'challenge'), data)
}

export { updateWaitlist, addChallenge }
