import { NextResponse } from "next/server";
import OPENAI from "openai";
import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";

const systemprompt = `Your name is Cypher. You are an AI assistant and teacher specialized in data privacy and data security. Your role is to help users understand and learn key compliance concepts, definitions, and best practices regarding data privacy and data security. Use the following guidelines:

1. Provide concise, accurate, and instructive explanations based only on the provided context, which includes definitions, core principles, and examples related to data privacy and data security.
2. If a question involves information not explicitly covered in the context, supplement your answer with brief, well-established industry knowledge and best practices.
3. Maintain a professional, clear, and friendly tone—similar to a teacher guiding a student.
4. Use markdown formatting (e.g., bullet points, bold terms) for clarity and brevity.
5. Focus on key topics such as data minimization, informed consent, purpose limitation, encryption, access control, audit logging, and risk management.
6. Do not invent or assume any information that is not provided or that lies outside the scope of data privacy and data security.
7. Keep responses short and to the point, avoiding unnecessary elaboration.


Note: Provide concise answers in markdown format for quick readability.

Context: {context}

User Question: {question}

Provide a clear, concise, and helpful answer as if you were teaching these compliance concepts to a student.`;

const openai = new OPENAI(process.env.OPENAI_API_KEY);
const OPEN_AI_KEY = process.env.OPENAI_API_KEY;
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME;

let vectorStore;

async function getVectorStore() {
  if (vectorStore) return vectorStore;

  console.log("Initializing vector store connection...");
  const pc = new Pinecone({
    apiKey: PINECONE_API_KEY,
  });
  const pineconeIndex = pc.index(PINECONE_INDEX_NAME);

  const embeddings = new OpenAIEmbeddings({ openAIApiKey: OPEN_AI_KEY });
  vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    namespace: "production",
  });
  console.log("Vector store connection established.");

  return vectorStore;
}

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the incoming request JSON
    console.log("Received request:", body.messages[body.messages.length - 1]);

    const lastMessage = body.messages[body.messages.length - 1];
    if (!lastMessage || typeof lastMessage.content !== "string") {
      throw new Error(
        "Invalid format: last message is not a string or invalid content"
      );
    }
    const userQuestion = lastMessage.content;

    const vectorStore = await getVectorStore();
    console.log("Performing similarity search...");
    const relevantDocs = await vectorStore.similaritySearch(userQuestion, 3);
    console.log("Relevant documents retrieved:", relevantDocs.length);
    let context = relevantDocs.map((doc) => doc.pageContent).join("\n\n");
    const systemPrompt = `${systemprompt
      .replace("{context}", context)
      .replace("{question}", userQuestion)}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: systemprompt }, ...body.messages],
    });
    const aiMessage =
      response.choices?.[0]?.message?.content || "No response available";

    return NextResponse.json({
      role: "assistant",
      content: aiMessage,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
