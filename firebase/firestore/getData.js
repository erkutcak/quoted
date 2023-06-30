import { db } from "../firebaseApp";
import { collection, getDocs } from "firebase/firestore";

export default async function getData () {

    let querySnapshot = null;
    let error = null;
    
    try {
        querySnapshot = await getDocs(collection(db, "quotes"));
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        });
    } catch (e) {
        error = e;
    }

    return { querySnapshot, error };
}