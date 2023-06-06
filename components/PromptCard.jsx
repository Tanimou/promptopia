"use client"

import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'

const PromptCard = ({ prompt, handleTagClick, handleEdit, handleDelete }) => {
    const [copied, setcopied] = useState("")
    const { data: session } = useSession()

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt.prompt)
        setcopied(prompt.prompt)
        setTimeout(() => 
            setcopied(""),3000)
        
    }
  return (
    <div className='prompt_card'>
    <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start gap-3 items-center cursor-pointer'>
            <Image src={prompt.creator.image} alt='user profile' width={40} height={40}
                className='rounded-full object-contain' />
            <div className='flex flex-col'>
                <h3 className='text-gray-900 font-semibold'>{prompt.creator.username}</h3>
                <p className='text-sm font-inter text-gray-500'>{prompt.creator.email}</p>
            </div>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
            <Image 
                      src={copied === prompt.prompt ? '/assets/icons/tick.svg'
                          : '/assets/icons/copy.svg'}
                      width={12}
                        height={12}
                  />

        </div>
          </div>
          <p className='my-4 font-satoshi text-sm text-gray-700'>
              {prompt.prompt}
          </p>
          <p className='font-inter text-sm blue_gradient cursor-pointer'
              onClick={() => handleTagClick && handleTagClick(prompt.tag)}>
              {prompt.tag}
          </p>
</div>
  )
}

export default PromptCard