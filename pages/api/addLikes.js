import { db } from "../../firebase/firebaseApp";
import { doc, updateDoc } from "firebase/firestore";

export default async function handler(req, res) {
    console.log(req.body);
    console.log(req.query);
    if (req.method === "PATCH") {
        const { quoteId } = req.query;
        const { likes } = req.body;
        try {
        const quoteRef = doc(db, 'quotes', quoteId);
        await updateDoc(quoteRef, { likes });
        res.status(200).json({ message: "Quote updated successfully" });
        } catch (error) {
        console.error('Error updating quote:', error);
        res.status(500).json({ error: "Failed to update quote" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}