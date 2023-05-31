import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ImSpinner3 } from "react-icons/im";
import { commonModalClasses } from '../../utilities/theme'
import Container from '../container'
import FormContainer from "../form/formContainer";
import Title from '../form/Title'
import FormInputer from '../form/FormInputer'
import Submit from '../form/Submit'
import { resetPassword, verifyPasswordResetToken } from "../../api/auth";
import { useNotification } from "../../hooks";

export default function ConfirmPassword() {
  const [password, setPassword] = useState({
    one: "",
    two: "",
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const { updateNotification } = useNotification();
  const navigate = useNavigate();

  // isValid, !isValid
  useEffect(() => {
    isValidToken();
  }, []);

  const isValidToken = async () => {
    const { error, valid } = await verifyPasswordResetToken(token, id);
    setIsVerifying(false);
    if (error) {
      navigate('/auth/reset-password', { replace: true });
      return updateNotification("error", error);
    }

    if (!valid) {
      setIsValid(false);
      return navigate('/auth/reset-password', { replace: true });
    }

    setIsValid(true);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPassword({ ...password, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.one.trim())
      return updateNotification('error', "Password is missing!");

    if (password.one.trim().length < 8)
      return updateNotification('error', "Password must be 6 characters long!");

    if (password.one !== password.two)
      return updateNotification('error', "Password do not match!");

    const { error, message } = await resetPassword({
      newPassword: password.one,
      userId: id,
      token,
    });

    if (error) return updateNotification("error", error);

    updateNotification("success", message);
    navigate("/auth/signin", { replace: true });
  };

  if (isVerifying)
    return (
      <FormContainer>
        <Container>
          <div className="flex space-x-2 items-center">
            <h1 className="text-4xl font-semibold dark:text-white text-primary">
              Please wait we are verifying your token!
            </h1>
            <ImSpinner3 className="animate-spin text-4xl dark:text-white text-primary" />
          </div>
        </Container>
      </FormContainer>
    );

  if (!isValid)
    return (
      <FormContainer>
        <Container>
          <h1 className="text-4xl font-semibold dark:text-white text-primary">
            Sorry the token is invalid!
          </h1>
        </Container>
      </FormContainer>
    );

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-96"}>
          <Title>Enter New Password</Title>
          <FormInputer
            value={password.one}
            onChange={handleChange}
            label="New Password"
            placeholder="********"
            name="one"
            type="password"
          />
          <FormInputer
            value={password.two}
            onChange={handleChange}
            label="Confirm Password"
            placeholder="********"
            name="two"
            type="password"
          />
          <Submit value="Confirm Password" />
        </form>
      </Container>
    </FormContainer>
  );
}



/*export default function ConfirmPassword() {
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
*/