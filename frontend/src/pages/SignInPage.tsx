import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const SignInPage = () => {
  return (
    <div className='flex h-screen w-screen justify-center items-center'>
      <SignIn
        appearance={{
          elements: {
            footerAction: { display: "none" },
          },
        }}
       />
    </div>
  )
}

export default SignInPage