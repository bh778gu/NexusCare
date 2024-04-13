import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai =  new OpenAIApi(configuration);

export async function POST(
    req: Request
) {
    // return "hi";
    console.log(JSON.stringify(openai));
    try {
        const { userId } = auth();
        console.log(userId);
        const body = await req.json();
        const { messages } = body;

        if(!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!configuration.apiKey){
            return new NextResponse("OpenAI API Key not configured", { status: 500 });
        }

        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }

        // const freeTrial = await checkApiLimit();

        // if (!freeTrial) {
        //     return new NextResponse("Free trial has expired.", { status: 403});
        // }

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{"role": "system", "content": "You are an AI model that is used in the healthcare industry. You need to reduce medical errors and improve decision making by providing the latest research and guidelines related to the input that the doctor will give you. You need to provide the important information in less than 100 words. You can go through as many links as possible to find reliable information. Abide by the hippocratic oath. Provide the link of the information that you provide. If you are asked a question that is not related to healthcare, reply with: 'Please give me a healthcare related question'. If a question is asked that the information is given in the provided documents, give the best answer you can with your given knowledge"}, ...messages]
        });

        await incrementApiLimit();

        return NextResponse.json(response.data.choices[0].message);
    }catch (error: any){
        console.log("[CONVERSATION_ERROR]",error);
        return new NextResponse(error.message, { status: 500 });
    }
}
