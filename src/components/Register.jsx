import { SignedOut, SignIn, SignInButton, SignUp } from '@clerk/clerk-react'
import React from 'react'

export const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <SignInButton>
            <SignUp />
        </SignInButton>
    </div>
  )
}
