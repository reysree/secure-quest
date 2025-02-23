import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME;

async function deleteNamespaceData() {
  try {
    const pc = new Pinecone({ apiKey: PINECONE_API_KEY });
    const index = pc.index(PINECONE_INDEX_NAME);

    const namespaceToDelete = "production"; // Specify the namespace you want to delete

    console.log(`Deleting all data in namespace: ${namespaceToDelete}...`);
    await index.delete1({
      deleteAll: true,
      namespace: namespaceToDelete,
    });

    console.log(
      `All data in namespace '${namespaceToDelete}' has been deleted.`
    );
  } catch (error) {
    console.error("Error deleting namespace data:", error);
  }
}

deleteNamespaceData().catch(console.error);
