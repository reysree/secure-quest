import { NextResponse } from "next/server";
import OPENAI from "openai";
import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { TextLoader } from "langchain/document_loaders/fs/text";

const systemprompt = `Your name is Cypher. You are an AI assistant and teacher specialized in data privacy and data security. Your role is to help users understand and learn key compliance concepts, definitions, and best practices regarding data privacy and data security. Use the following guidelines:

1. Provide detailed, accurate, and instructive explanations based only on the provided context, which includes definitions, core principles, and examples related to data privacy and data security.
2. If a question involves information not explicitly covered in the context, supplement your answer with well-established industry knowledge and best practices.
3. Maintain a professional, clear, and friendly tone—similar to a teacher guiding a student.
4. Use markdown formatting when explaining complex concepts or lists to improve clarity.
5. Focus on key topics such as data minimization, informed consent, purpose limitation, encryption, access control, audit logging, and risk management.
6. Do not invent or assume any information that is not provided or that lies outside the scope of data privacy and data security.
7. Avoid generic or introductory phrases. Begin your response directly with the relevant explanation.


Note : Please give concise answers and dont elaborate a lot.

Context: {context}

User Question: {question}

Provide a clear, concise, and helpful answer as if you were teaching these compliance concepts to a student.`;

const openai = new OPENAI(process.env.OPENAI_API_KEY);
const OPEN_AI_KEY = process.env.OPENAI_API_KEY;
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME;

let vectorStore;
let fullDocument;

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
      //stream: true,
    });
    // const stream = new ReadableStream({
    //   async start(controller) {
    //     const encoder = new TextEncoder();
    //     try {
    //       for await (const chunk of response) {
    //         const content = chunk.choices[0]?.delta?.content;
    //         if (content) {
    //           const text = encoder.encode(content);
    //           controller.enqueue(text);
    //         }
    //       }
    //     } catch (err) {
    //       console.error("Error in stream processing:", err);
    //       controller.error(err);
    //     } finally {
    //       console.log("Stream completed.");
    //       controller.close();
    //     }
    //   },
    // });
    const aiMessage =
      response.choices?.[0]?.message?.content || "No response available";
    //console.log("OpenAI Response:", aiMessage);

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
