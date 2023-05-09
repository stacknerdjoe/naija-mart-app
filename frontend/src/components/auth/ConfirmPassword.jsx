import React from 'react'
import Container from '../container'
import Title from '../form/Title'
import FormInputer from '../form/FormInputer'
import Submit from '../form/Submit'

export default function ConfirmPassword() {
  return (
    <div className='fixed inset-0 bg-primary -z-10 flex justify-center items-center'>
            <Container>
                <form className='bg-secondary rounded p-6 w-96 space-y-6'>
                    <Title>Please Enter New Password</Title>
                    <FormInputer label='New Password' placeholder='********' name='password' type='password'/>
                    <FormInputer label='Confrim Password' placeholder='********' name='confrimPassword' type='password' />
                    <Submit value='Confirm Password' />
                </form>
            </Container>
        </div>
  )
}
