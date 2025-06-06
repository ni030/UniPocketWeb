import { SignIn } from '@clerk/clerk-react'

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