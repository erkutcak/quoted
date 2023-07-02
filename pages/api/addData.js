import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseApp";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body.date);

    try {
      const docRef = await addDoc(collection(db, "quotes"), {
        title: req.body.title,
        author: req.body.author,
        likes: req.body.likes,
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