import React from 'react';
import Container from '../container';
import Title from '../form/Title';
import FormInputer from '../form/FormInputer';
import Submit from '../form/Submit';
import MyLinks from '../MyLinks';


export default function Signin() {

   

    return <div className='fixed inset-0 bg-primary -z-10 flex justify-center items-center'>
        <Container>
            <form className='bg-secondary rounded p-6 w-72 space-y-6'>
                <Title>Sign in</Title>
                <FormInputer label='Email' placeholder='johndoe@email.com' name='email' />
                <FormInputer label='Password' placeholder='********' name='password' />
                <Submit value='Sign in' />

                <div className="flex justify-between">
                    <MyLinks to='/auth/forget-password'>Forgot Password ?</MyLinks>
                    <MyLinks to='/auth/signup'>Sign up</MyLinks>
                </div>
            </form>
        </Container>
    </div>

}
