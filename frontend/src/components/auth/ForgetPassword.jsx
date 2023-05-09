import React from 'react'
import Container from '../container'
import Title from '../form/Title'
import FormInputer from '../form/FormInputer'
import Submit from '../form/Submit'
import MyLinks from '../MyLinks'
import FormContainer from '../form/formContainer'

export default function ForgetPassword() {
    return (
        <FormContainer>
            <Container>
                <form className='bg-secondary rounded p-6 w-96 space-y-6'>
                    <Title>Please Enter Your Email</Title>
                    <FormInputer label='Email' placeholder='johndoe@email.com' name='email' />
                    
                    <Submit value='Send Link' />

                    <div className="flex justify-between">
                        <MyLinks to='/auth/signin'>Sign in</MyLinks>
                        <MyLinks to='/auth/signup'>Sign up</MyLinks>
                    </div>
                </form>
            </Container> 
        </FormContainer>
    )
}
