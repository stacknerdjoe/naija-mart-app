import React, { useEffect, useState } from 'react';
import Container from '../container';
import Title from '../form/Title';
import FormInputer from '../form/FormInputer';
import Submit from '../form/Submit';
import MyLinks from '../MyLinks';
import FormContainer from '../form/formContainer';
import { useNavigate } from 'react-router-dom';
import { useAuth, useNotification } from '../../hooks';
import { isValidEmail } from '../../utilities/helper';
import { commonModalClasses } from '../../utilities/theme';


const validateUserInfo = ({ email, password }) => {
    if (!email.trim()) return { ok: false, error: "Email is missing!" };
    if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };
  
    if (!password.trim()) return { ok: false, error: "Password is missing!" };
    if (password.length < 6)
      return { ok: false, error: "Password must be 8 characters long!" };
  
    return { ok: true };
  };

export default function Signin() {
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
      });
    
      const navigate = useNavigate();
      const { updateNotification } = useNotification();
      const { handleLogin, authInfo } = useAuth();
      const { isPending, isLoggedIn } = authInfo;
    
      const handleChange = ({ target }) => {
        const { value, name } = target;
        setUserInfo({ ...userInfo, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const { ok, error } = validateUserInfo(userInfo);
    
        if (!ok) return updateNotification("error", error);
        handleLogin(userInfo.email, userInfo.password);
      };
    
      //useEffect(() => {
      // we want to move our user to somewhere else
       //if (isLoggedIn) navigate("/");
       //}, [isLoggedIn]);

   

      return (
        <FormContainer>
          <Container>
            <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
              <Title>Sign in</Title>
              <FormInputer
                value={userInfo.email}
                onChange={handleChange}
                label="Email"
                placeholder="john@email.com"
                name="email"
              />
              <FormInputer
                value={userInfo.password}
                onChange={handleChange}
                label="Password"
                placeholder="******"
                name="password"
                type="password"
              />
              <Submit value="Sign in" busy={isPending} />
    
              <div className="flex justify-between">
                <MyLinks to="/auth/forget-password">Forget password</MyLinks>
                <MyLinks to="/auth/signup">Sign up</MyLinks>
              </div>
            </form>
          </Container>
        </FormContainer>
      );
    }
