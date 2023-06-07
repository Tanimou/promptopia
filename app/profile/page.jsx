"use client"

import { useState, useEffect } from 'react'
import { useSession} from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from "@components/Profile"

const MyProfile = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [posts, setposts] = useState([])

  useEffect(() => {
    const getPrompt = async () => {

      const response = await fetch(`/api/users/${session?.user.id}/prompt`)

      const data = await response.json()
      setposts(data)
      console.log(data)
    }

  if (session?.user.id)  getPrompt()
  }, [])

  const handleEdit = (post) => {
    router.push(`/profile/edit?id=${post._id}`)
  }
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?")
    if (hasConfirmed) {
    try {

       await fetch(`/api/prompt/${post._id.toString()}`, {
        method: "DELETE",
      
       })
      
      // const filteredPosts = posts.filter((p) => p._id !== post._id)
      // setposts(filteredPosts)


      router.push("/")
    } catch (e) {
      throw Error(e.message)
    } 
    }


  

  }
  return (
    <Profile
      name="My Profile"
      desc="Welcome to your profile page!"
      data={posts}
      handleEdit={handleEdit }
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile