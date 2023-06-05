import React from 'react'
import Link from 'next/link'

const Form = ({type,setPost, post, submitting, handleSubmit}) => {
  return (
    // create a section with a className w-full max-w-full flex-start flex-col
    <section className="w-full max-w-full flex-start flex-col">
      {/* create a h1 with a className head_text */}
      <h1 className="head_text text-left">
        <span className='blue_gradient'>{type} Prompt</span>
      </h1>
      <p className='desc text-left max-w-md'>{type} and share amazing prompts with the world, and let your imagination run wild with any AI-Powered platform
      </p>

      {/* create a form with a className w-full max-w-md flex-start flex-col and onSubmit it will run the handleSubmit function */}
      <form className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism" onSubmit={handleSubmit}>
        {/* create a label with a className label and htmlFor prompt */}
        <label className="label" >
          <span className='font-satoshi font-semibold text-base text-gray-700'>Your Ai Prompt</span>
          {/* create a textarea with a className textarea and id prompt and value of post.prompt and onChange it will run a function that will set the post prompt */}
          <textarea
            className="form_textarea"
            id="prompt"
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Your prompt here'
            required
          />
        </label>
        <label className="label" >
          Tag{' '}
          <span className='font-satoshi font-semibold text-base text-gray-700'>(#product,#webdev,#ideas)</span>
          {/* create a textarea with a className textarea and id prompt and value of post.prompt and onChange it will run a function that will set the post prompt */}
          <input
            className="form_input"
            id="prompt"
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder='#tag'
            required
          />
        </label>
    
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            className='px-5 py-1.5 text-sm rounded-full bg-blue-500 text-white'
              type="submit"
              disabled={submitting}
            >
            {submitting ? `${type}...` : type}
            </button>
      </div>
        </form>
    </section>
  )
}

export default Form