import { connectToDatabase } from "@utils/database"
import Prompt from "@models/prompt"
import User from "@models/user"
// GET
export const GET = async (req, {params}) => {

    try {
        await connectToDatabase()
        const prompt = await Prompt.findById(params.id).populate('creator')
        if (!prompt) return new Response("Prompt not found", { status: 404 })
        return new Response(JSON.stringify(prompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to fetch prompts", { status: 500 })
    }

}

// UPDATE
export const PATCH = async (req, { params }) => {
    const {prompt,tag} =await req.json()
    try {
        await connectToDatabase()
        const existingPrompt = await Prompt.findById(params.id)
        if (!existingPrompt) return new Response("Prompt not found", { status: 404 })
        existingPrompt.prompt = prompt
        existingPrompt.tag = tag
        await existingPrompt.save()
        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to update prompts", { status: 500 })
    }

}

// DELETE
export const DELETE = async (req, { params }) => {
    await connectToDatabase()
    return await Prompt.findByIdAndRemove(params.id)
        ? new Response("Prompt deleted successfully", { status: 200 })
        : new Response("Prompt not found", { status: 404 })
}