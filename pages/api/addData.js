import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseApp";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { data } = req.body;

    try {
      const docRef = await addDoc(collection(db, "quotes"), data);
      res.status(200).json({ id: docRef.id, ...data });
    } catch (error) {
      res.status(500).json({ error: "Failed to add document" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}