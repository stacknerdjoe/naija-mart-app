import React from 'react';
import Container from '../container';
import Title from '../form/Title';
import FormInputer from '../form/FormInputer';
import Submit from '../form/Submit';
import MyLinks from '../MyLinks';
import FormContainer from '../form/formContainer';


export default function Signin() {

   

    return <FormContainer>
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
    </FormContainer>

}
