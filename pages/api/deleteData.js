import { db } from "../../firebase/firebaseApp";
import { doc, deleteDoc } from "firebase/firestore";

export default async function handler(req, res) {
    if (req.method === "DELETE") {
    const { quoteId } = req.query;

    try {
        await deleteDoc(doc(db, "quotes", quoteId));
        res.status(200).json({ message: "Quote deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete quote" });
    }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}