import OpenAI from "openai";
import readline from "readline";
import dotenv from "dotenv";
dotenv.config();


const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function askQuestion(prompt) {
  return new Promise((resolve) => rl.question(prompt, resolve));
}

async function fetchDBProducts() {
  return [
    { name: "Gaming Laptop X200", price: "$1299", specs: "16GB RAM, RTX 4060" },
    { name: "Mechanical Keyboard K90", price: "$99", specs: "RGB, Blue Switches" },
    { name: "27-inch 4K Monitor", price: "$399", specs: "IPS, 144Hz" }
  ];
}

async function ChatbotMethod() {

  const availableProducts = await fetchDBProducts();
  const toolsMessage = {
    role: "system",
    content: JSON.stringify({ availableProducts })
  };
  const systemMessage = {
    role: "system", 
    content:
      "You are a professional customer service agent for a computer e-commerce store. " +
      "You are helpful and knowledgeable. Only recommend products from the provided list and never invent products."
  };
  const oldmessages = []

  while (true){
    const inputMessage = await await askQuestion("You: ");;
    if (inputMessage === "exit") break;
    
    const completion = await openai.chat.completions.create({
      messages: [systemMessage, toolsMessage, ...oldmessages, {role: "user", content: inputMessage}],
      model: "gpt-4o",
      max_tokens: 150
    });
    if (oldmessages.length > 10) oldmessages.splice(0, oldmessages.length - 10);

    
    oldmessages.push({role: "user", content: inputMessage});
    oldmessages.push({role: "assistant", content: completion.choices[0].message.content});
    console.log("\nAgent:",completion.choices[0].message.content,"\n");
  }
}

ChatbotMethod();
