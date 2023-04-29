import React from 'react';
import Container from '../container';
import Title from '../form/Title';
import FormInputer from '../form/FormInputer';
import Submit from '../form/Submit';

export default function Signup() {
    return <div className='fixed inset-0 bg-primary -z-10 flex justify-center items-center'>
        <Container>
            <form className='bg-secondary rounded p-6 w-72 space-y-6'>
                <Title>Sign up</Title>
                <FormInputer label='Name' placeholder='john Doe' name='name' />
                <FormInputer label='Email' placeholder='johndoe@email.com' name='email' />
                <FormInputer label='Password' placeholder='********' name='password' />
                <Submit value='Sign up' />

                <div className="flex justify-between">
                    <a className='text-dark-subtle hover:text-white transition' href="#">Forgot Password ?</a>
                    <a className='text-dark-subtle hover:text-white transition' href="#">Sign in</a>
                </div>
            </form>
        </Container>
    </div>;

}
