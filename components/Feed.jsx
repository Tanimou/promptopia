"use client"

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="prompt_layout mt-16">
      {data.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}


const Feed = () => {

  const [searchText, setsearchText] = useState('')
  const [posts, setposts] = useState([])

  const handleSearchChange = (e) => {
    // setsearchText(e.target.value)
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
        data={posts}
        handleTagClick={() => {
          // setsearchText(tag)    
          }}
      />
    </section>
  )
}

export default Feed