import { Loader2 } from 'lucide-react'
import React from 'react'

const loading = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
        <Loader2 className='animate-spin  w-12 h-12 text-white' />
    </div>
  )
}

export default loading