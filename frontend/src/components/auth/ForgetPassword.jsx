import React, { useState } from 'react';
import Container from '../container';
import Title from '../form/Title';
import FormInputer from '../form/FormInputer';
import Submit from '../form/Submit';
import MyLinks from '../MyLinks';
import FormContainer from '../form/formContainer';
import { useNotification } from '../../hooks';
import { forgetPassword } from '../../api/auth';
import { commonModalClasses } from '../../utilities/theme';
import { isValidEmail } from '../../utilities/helper';

export default function ForgetPassword() {

    const [email, setEmail] = useState("");
    const { updateNotification } = useNotification();
  
    const handleChange = ({ target }) => {
      const { value } = target;
      setEmail(value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!isValidEmail(email))
        return updateNotification("error", "Invalid email!");
  
      const { error, message } = await forgetPassword(email);
      if (error) return updateNotification("error", error);
  
      updateNotification("error", message);
    };

    return (
        <FormContainer>
          <Container>
            <form onSubmit={handleSubmit} className={commonModalClasses + " w-96"}>
              <Title>Please Enter Your Email</Title>
              <FormInputer
                onChange={handleChange}
                value={email}
                label="Email"
                placeholder="john@email.com"
                name="email"
              />
              <Submit value="Send Link" />
    
              <div className="flex justify-between">
                <MyLinks to="/auth/signin">Sign in</MyLinks>
                <MyLinks to="/auth/signup">Sign up</MyLinks>
              </div>
            </form>
          </Container>
        </FormContainer>
      );
    }
