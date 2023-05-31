import React from 'react';
import Container from '../container';
import { Link } from 'react-router-dom';
import { BsFillSunFill } from "react-icons/bs";
import { useAuth, useTheme } from "../../hooks";

export default function Navbar() {
  const { toggleTheme } = useTheme();
  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;

  return (
    <div className="bg-secondary shadow-sm shadow-gray-500">
      <Container className="p-2">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img src="./logo2.png" alt="" className="h-10" />
          </Link>

          <ul className="flex items-center space-x-4">
            <li>
              <button
                onClick={toggleTheme}
                className="dark:bg-white bg-dark-subtle p-1 rounded"
              >
                <BsFillSunFill className="text-secondary" size={24} />
              </button>
            </li>
            <li>
              <input
                type="text"
                className="border-2 border-dark-subtle p-1 rounded bg-transparent text-xl outline-none focus:border-white transition text-white"
                placeholder="search..."
              />
            </li>
            <li>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="text-white font-semibold text-lg"
                >
                  Log out
                </button>
              ) : (
                <Link
                  className="text-white font-semibold text-lg"
                  to="/auth/signin"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}


/*export default function Navbar() {
  return (
    <div className="bg-secondary shadow-sm shadow-gray-500">
      <Container className="p-1">
        <div className='flex justify-between items-center'>
          <Link to='/'>
            <img src="./logo2.png" alt="" className='h-12' />
          </Link>


          <ul className='flex items-center space-x-5'>
            <li>
              <button className='bg-dark-subtle p-1 rounded'>
                <BsSun className='text-secondary' size={24} />
              </button>
            </li>
            <li>
              <input type="text" className='border-2 border-dark-subtle p-1 rounded bg-transparent text-xl outline-none focus:border-white transition text-white'
                placeholder='search...'
              />
            </li>
            <li >
              <Link className='text-white font font-semibold text-lg' to='/auth/signin'>
                Login
              </Link>

            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}
*/