import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {

  return (
    <div>
   
    <section>
      <div
        className="mt-8 mx-auto gap-x-8 h-[auto] flex flex-col items-center justify-center px-4 md:px-0 md:gap-x-16 w-full pb-6"
      >
        <img
          src="https://i.ibb.co/cJCs3pV/pagenotfound.jpg"
          id="faq-image"
          className="md:pt-12 min-w-175px"
          alt=""
        />

        <div
            className='text-center md:w-1/2 w-full h-full mx-auto flex flex-row items-center justify-center md:py-12 font-bold text-2xl'
        >
            Return to &nbsp; <Link to='/' className='text-accent'>Home</Link>
        </div>

     
      </div>
    </section>
    
  </div>
  )
}

export default PageNotFound
