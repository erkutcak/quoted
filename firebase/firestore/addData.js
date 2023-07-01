// import { db } from "../firebaseApp";
// import { collection, doc, setDoc } from "firebase/firestore";

// export default async function addData() {

//     let newQuoteRef = null;
//     let error = null;

//     try {
//         newQuoteRef = await addDoc(collection(db, "quotes"))
//         console.log("Document written with ID: ", newQuoteRef.id);
//     } catch (e) {
//         error = e;
//     }

//     return { newQuoteRef, error };
// }