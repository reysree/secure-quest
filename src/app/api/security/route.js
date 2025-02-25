import { NextResponse } from "next/server";
import OPENAI from "openai";

// Define the questions context: 20 questions in the specified order.
const questionsContext = `
[
  { "id": "1", "subject": "Urgent: Update Your Password", "sender": "security@bank-secure-verify.com", "content": "Dear valued customer, your account will be suspended unless you verify your credentials immediately.", "isPhishing": true, "difficulty": "easy" },
  { "id": "2", "subject": "Meeting Reminder", "sender": "hr@company.com", "content": "Don't forget about the meeting tomorrow at 10 AM.", "isPhishing": false, "difficulty": "easy" },
  { "id": "3", "subject": "Invoice Overdue", "sender": "billing@company.com", "content": "Your invoice is overdue. Please make a payment immediately.", "isPhishing": true, "difficulty": "easy" },
  { "id": "4", "subject": "Team Lunch Invitation", "sender": "manager@company.com", "content": "Let's meet for lunch at our usual spot. No urgent action needed.", "isPhishing": false, "difficulty": "easy" },
  { "id": "5", "subject": "Security Alert", "sender": "security@bank-secure-verify.com", "content": "We detected an unusual login attempt. Verify your identity now.", "isPhishing": true, "difficulty": "easy" },
  { "id": "6", "subject": "Weekly Newsletter", "sender": "newsletter@company.com", "content": "Check out the latest updates and news in our weekly newsletter.", "isPhishing": false, "difficulty": "easy" },
  { "id": "7", "subject": "Policy Update", "sender": "compliance@company.com", "content": "Our company policy has been updated. Please review the changes.", "isPhishing": false, "difficulty": "easy" },
  { "id": "8", "subject": "Appointment Confirmation", "sender": "appointments@company.com", "content": "Your appointment has been confirmed for tomorrow at 3 PM.", "isPhishing": false, "difficulty": "easy" },
  { "id": "9", "subject": "Subscription Renewal Reminder", "sender": "billing@service.com", "content": "Your subscription is up for renewal. Please update your payment details.", "isPhishing": true, "difficulty": "easy" },
  { "id": "10", "subject": "Event Invitation", "sender": "events@company.com", "content": "Join us for our upcoming event next week. RSVP now!", "isPhishing": false, "difficulty": "easy" },
  { "id": "11", "subject": "Confidential Update Required", "sender": "ceo@company.com", "content": "Please review the confidential update attached to this email.", "isPhishing": true, "difficulty": "tough" },
  { "id": "12", "subject": "Invoice Issue Notice", "sender": "billing@company.com", "content": "There is an issue with your recent invoice. Click here to resolve.", "isPhishing": true, "difficulty": "tough" },
  { "id": "13", "subject": "Reward Claim Notification", "sender": "rewards@company.com", "content": "Congratulations! You have been selected for a reward. Claim it now.", "isPhishing": true, "difficulty": "tough" },
  { "id": "14", "subject": "System Downtime Advisory", "sender": "it-support@company.com", "content": "Scheduled maintenance will occur this weekend. Plan accordingly.", "isPhishing": false, "difficulty": "tough" },
  { "id": "15", "subject": "Password Reset Required Immediately", "sender": "it-support@company.com", "content": "Due to a security breach, an immediate password reset is required.", "isPhishing": true, "difficulty": "tough" },
  { "id": "16", "subject": "Legal Notice Attached", "sender": "legal@company.com", "content": "Please review the attached legal notice immediately.", "isPhishing": true, "difficulty": "tough" },
  { "id": "17", "subject": "Software Update Available", "sender": "noreply@updates.com", "content": "A new software update is available. Please update to the latest version.", "isPhishing": false, "difficulty": "tough" },
  { "id": "18", "subject": "Bank Account Verification", "sender": "verification@bank.com", "content": "Verify your account details immediately to avoid suspension.", "isPhishing": true, "difficulty": "tough" },
  { "id": "19", "subject": "Conference Invitation", "sender": "events@conference.com", "content": "You are invited to speak at our upcoming conference. RSVP required.", "isPhishing": false, "difficulty": "tough" },
  { "id": "20", "subject": "Urgent: Account Notice", "sender": "support@bank-secure-verify.com", "content": "Important notice regarding your account. Immediate action is required.", "isPhishing": true, "difficulty": "tough" }
]
`;

const systemprompt = `Your name is Omen. You are an AI assistant and teacher specialized in data privacy and data security. Your role is to help users understand key compliance concepts and to guide them in selecting the next set of questions in a phishing detection quiz.

Guidelines:
1. Provide concise, accurate feedback based solely on the provided context.
2. Even if the "answersArray" is empty, determine the next set of questions solely based on the "errorCount" but in this case feedback should be empty string.
3. Compare the user's answers with the correct answers from the 20 questions (provided below in order).
4. Based on the error count (provided as "errorCount"):
   - If errorCount is between 0 and 2 (inclusive), choose 3 random IDs from the tough questions (IDs 11-20) and 2 random IDs from the easy questions (IDs 1-10).
   - If errorCount is greater than 2, choose 2 random IDs from the tough questions (IDs 11-20) and 3 random IDs from the easy questions (IDs 1-10).
5. Return your response strictly in JSON with keys "indices" (an array of 5 IDs) and "feedback" (a short message describing which concepts the user may need to review).
6. Do not include any text outside the JSON.

Questions:
${questionsContext}

Error Count: {errorCount}
User Answers: {answersArray}
`;

const openai = new OPENAI(process.env.OPENAI_API_KEY);

export async function POST(req) {
  try {
    const { errorCount, answersArray } = await req.json();
    // Replace our placeholders in the system prompt with actual values.
    const prompt = systemprompt
      .replace("{errorCount}", errorCount)
      .replace("{answersArray}", JSON.stringify(answersArray));

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: prompt }],
    });

    const text = response.choices?.[0]?.message?.content || "";
    //Format the response to be a valid JSON
    const cleanedText = text
      .trim()
      .replace(/^```json\s*/, "")
      .replace(/```$/, "");
    const responseData = JSON.parse(cleanedText);
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
