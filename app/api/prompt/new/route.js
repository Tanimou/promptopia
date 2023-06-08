import { connectToDatabase } from "@utils/database"
import Prompt from "@models/prompt"

export const POST = async (req, res) => {
    const { prompt, tag, userId } = await req.json()
    try {
        await connectToDatabase()
        const newPrompt = new Prompt({
            prompt,
            tag,
            creator: userId
        })
        await newPrompt.save()
        return new Response("Prompt created",{status:200})
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message },{status:500}))
    }

}