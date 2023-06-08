"use client"

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'
import { useRouter } from 'next/navigation'

const PromptCardList = ({ data, handleTagClick, handlePictureClick }) => {
  return (
    <div className="prompt_layout mt-16">
      {data.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
          handlePictureClick={handlePictureClick}
        />
      ))}
    </div>
  )
}


const Feed = () => {

  const [searchText, setsearchText] = useState('')
  const [posts, setposts] = useState([])
  const [filteredPosts, setfilteredPosts] = useState([])
  const router = useRouter()

  const handleSearchChange = (e) => {
    // setsearchText(e.target.value)
    const searchText = e.target.value.toLowerCase();
    const filteredPosts = posts.filter((post) => {
      const promptText = post.prompt.toLowerCase();
      const creatorName = post.creator.username.toLowerCase();
      const tagNames = post.tag.toLowerCase()
      // const tagNames = post.tags.map((tag) => tag.name.toLowerCase());
      return promptText.includes(searchText) || creatorName.includes(searchText) || tagNames.includes(searchText);
    });
    setfilteredPosts(filteredPosts);
    setsearchText(searchText);
  }

  const handleTagClick = (tag) => {
    handleSearchChange({ target: { value: tag } });
  };

  const handlePictureClick = (post) => {
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
  }
  useEffect(() => {
    const getPrompt = async () => {

      const response = await fetch('/api/prompt', { cache: 'no-store' })

      const  data  = await response.json()
      setposts(data)
      console.log(data)
    }

    getPrompt()
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input className="search_input peer"
        
          placeholder="Search"
          value={searchText}
          required
          type='text'
          onChange={handleSearchChange}
        
        />

      </form>

      <PromptCardList
        data={filteredPosts.length > 0 ? filteredPosts : posts}
        handleTagClick={handleTagClick}
        handlePictureClick={handlePictureClick}
      />
    </section>
  )
}

export default Feed