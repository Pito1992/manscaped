import React from 'react'

function Loading() {
  return (
    <div className='bg-loading fixed top-0 left-0 right-0 bottom-0 z-50'>
      <div className='flex w-full h-full items-center justify-center'>
        <span className='text-white text-lg font-bold tracking-widest'>Loading...</span>
      </div>
    </div>
  )
}

export default Loading