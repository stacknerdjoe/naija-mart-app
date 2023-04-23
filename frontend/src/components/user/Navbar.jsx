import React from 'react';
import{BsSun} from 'react-icons/bs';

export default function Navbar() {
  return <div className="bg-secondary">
    <div className="max-w-screen-xl mx-auto ">
        <div className="flex justify-between items-center">

       
        <img src="./logo2.png" alt="" className='h-12' />
        
         <ul className='flex items-center space-x-5'>
            <li>
                <button className='bg-dark-subtle p-1 rounded'>
                <BsSun className='text-secondary' size={24}/>
                </button>
           </li>
           <li>
                <input type="text" className='border-2 border-dark-subtle p-1 rounded bg-transparent text-xl outline-none focus:border-white transition text-white'
                 placeholder='search...'
                 />
           </li>
           <li className='text-white font font-semibold text-lg'>Login</li>
         </ul>
        </div>
     </div>
  </div>
  
}
