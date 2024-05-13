import React from 'react'
import SignInForm from './SignInForm'

const SignIn = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">Xush kelibsiz!</h3>
                <p>Kirish uchun login va paro&apos;lni kiriting!</p>
            </div>
            <SignInForm disableSubmit={false} />
        </>
    )
}

export default SignIn
