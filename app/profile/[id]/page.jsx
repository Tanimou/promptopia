"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter,useSearchParams } from 'next/navigation'

import CreatorProfilePage from "@components/CreateProfilePage"

const UserProfile = () => {
    const creatorId = useParams().id
    const name = useSearchParams().get("name")
    
    const [prompts, setPrompts] = useState([]);

    useEffect(() => {
        const getPrompt = async () => {

            const response = await fetch(`/api/users/${creatorId}/prompt`)

            const data = await response.json()
            setPrompts(data)
            console.log(data)
        }

        if (creatorId) {
            getPrompt()
        }
    }, [])


    return (
        <CreatorProfilePage
            creatorId={creatorId}
            name={name}
            desc="Welcome!"
            data={prompts}
        />
    )
}

export default UserProfile