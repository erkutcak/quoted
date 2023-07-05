import { initFirebase } from "../firebaseApp";
import { signInWithEmailAndPassword } from "firebase/auth";

const auth = initFirebase;

export default async function signIn(email, password) {
    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password).then((user) => {
            console.log(user)})
    } catch (e) {
        error = e;
    }

    return { result, error };
}