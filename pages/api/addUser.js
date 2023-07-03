import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseApp";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);
    try {
        const docRef = await addDoc(collection(db, "users"), {
            username: req.body.username,
            email: req.body.email,
            profile_pic: req.body.profile_pic,
            date: req.body.date,
        });
        res.status(200).json({ id: docRef.id, ...req.body });
    } catch (error) {
        res.status(500).json({ error: "Failed to add document" });
    }
    } else {
    res.status(405).json({ error: "Method not allowed" });
    }
}