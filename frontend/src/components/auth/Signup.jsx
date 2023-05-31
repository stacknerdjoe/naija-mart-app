import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { createUser } from "../../api/auth";
import { useAuth, useNotification } from "../../hooks";
import { isValidEmail } from "../../utilities/helper";
import { commonModalClasses } from "../../utilities/theme";
import Container from '../container';
import Title from '../form/Title';
import FormInputer from '../form/FormInputer';
import Submit from '../form/Submit';
import MyLinks from '../MyLinks';
import FormContainer from '../form/formContainer';


const validateUserInfo = ({ name, email, password }) => {
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

    const navigate = useNavigate();
    const { authInfo } = useAuth();
    const { isLoggedIn } = authInfo;

    const { updateNotification } = useNotification();

    const handleChange = ({ target }) => {
        const { value, name } = target;
        setUserInfo({ ...userInfo, [name]: value });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { ok, error } = validateUserInfo(userInfo);

        if (!ok) return updateNotification('error', error);
        
        const response = await createUser(userInfo);
        if (response.error) return console.log(response.error);
        //console.log(response.user)

        navigate('/auth/verification', {
            state: { user: response.user },
            replace: true,
        });
    

    };

    useEffect(() => {
        // we want to move our user to somewhere else
        if (isLoggedIn) navigate("/");
      }, [isLoggedIn]);


    const { name, email, password } = userInfo



    return (
        <FormContainer>
          <Container>
            <form onSubmit={handleSubmit} className={commonModalClasses +  'w-72'}>
              <Title>Sign up</Title>
              <FormInputer value={name} onChange={handleChange} label='Name' placeholder="John Doe" name='name'
              />
              <FormInputer
                value={email}
                onChange={handleChange}
                label="Email"
                placeholder="johnDoe@email.com"
                name="email"
              />
              <FormInputer
                value={password}
                onChange={handleChange}
                label="Password"
                placeholder="********"
                name="password"
                type="password"
              />
              <Submit value="Sign up" />
    
              <div className="flex justify-between">
                <MyLinks to="/auth/forget-password">Forget password</MyLinks>
                <MyLinks to="/auth/signin">Sign in</MyLinks>
              </div>
            </form>
          </Container>
        </FormContainer>
      );
    }
    