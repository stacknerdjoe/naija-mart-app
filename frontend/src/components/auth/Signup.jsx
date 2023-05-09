import React, { useState } from 'react';
import Container from '../container';
import Title from '../form/Title';
import FormInputer from '../form/FormInputer';
import Submit from '../form/Submit';
import MyLinks from '../MyLinks';
import FormContainer from '../form/formContainer';

const validateUserInfo = ({ name, email, password }) => {
    const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isValidName = /^[a-z A-Z]+$/;

    if (!name.trim()) return { ok: false, error: 'Name is missing!' };
    if (!isValidName.test(name)) return { ok: false, error: 'Invalid name!' }

    if (!email.trim()) return { ok: false, error: 'Email is missing!' };
    if (!isValidEmail.test(email)) return { ok: false, error: 'Email is invalid!' }

    if (!password.trim()) return { ok: false, error: 'Password is missing!' }
    if (password.length < 6) return { ok: false, error: 'Password must be 6 characters long!' }

    return { ok: true };
}

export default function Signup() {

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: '',
    });
    const handleChange = ({ target }) => {
        const { value, name } = target;
        setUserInfo({ ...userInfo, [name]: value })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { ok, error } = validateUserInfo(userInfo);

        if (!ok) return console.log(error);
    }

    const { name, email, password } = userInfo



    return <FormContainer>
        <Container>
            <form onSubmit={handleSubmit} className='bg-secondary rounded p-6 w-72 space-y-6'>
                <Title>Sign up</Title>
                <FormInputer value={name} onChange={handleChange} label='Name' placeholder='john Doe' name='name' />
                <FormInputer value={email} onChange={handleChange} label='Email' placeholder='johndoe@email.com' name='email' />
                <FormInputer value={password} onChange={handleChange} label='Password' placeholder='********' name='password' type='password' />
                <Submit value='Sign up' />

                <div className="flex justify-between">
                    <MyLinks to='/auth/forget-password'>Forgot Password ?</MyLinks>
                    <MyLinks to='/auth/signin'>Sign in</MyLinks>
                </div>
            </form>
        </Container>
    </FormContainer>;

}
