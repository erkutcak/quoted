import { db } from "../../firebase/firebaseApp";
import { collection, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
    let snapshot = null;
    let data = null;
    let error = null;

    try {
    const quotesRef = collection(db, "users");
    snapshot = await getDocs(quotesRef);
    data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    } catch (err) {
        error = err;
    }

    if (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    } else {
        res.status(200).json(data);
    }
}