import { GoogleGenerativeAI } from "@google/generative-ai";



const loginHandler = async (req, res) => {
  try {
    let msg = req.body.prompt;
    console.log(msg);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const chat = model.startChat({
    generationConfig: {
        maxOutputTokens: 350,
    },
});


const result = await chat.sendMessage(msg);
const response = await result.response;
const text = response.text();

return res.status(200).json({ type: "success", message: text });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ type: "error", message: "Something went wrong" });
  }
}


export default loginHandler;
