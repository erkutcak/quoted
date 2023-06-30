import { initFirebase } from "../firebaseApp";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = initFirebase;

export default async function signUp(email, password) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password).then((user) => {
            console.log(user)});
    } catch (e) {
        error = e;
    }

    return { result, error };
}