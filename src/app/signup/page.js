"use client"
import { useState } from 'react';
import axios from 'axios';
import  toast  from 'react-hot-toast';

export default function Signup() {
  const [Username, SetUsername] = useState('');
  const [Password, SetPassword] = useState('');
  const [FirstName, SetFirstName] = useState('');
  const [LastName, SetLastName] = useState('');

  const handleSubmit = async (e) => {

    try {
      await axios.post('/api/auth/signup', { Username, Password, FirstName, LastName });
      toast.success('User created successfully');
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error('Error signing up');
    }
  };

  return (
    <div style={{
      minHeight: "80vh"
    }} className='my-10 flex justify-center items-center flex-col'>
      <p className='text-3xl font-bold'>Create Account</p>
  
  
  
      <div className="my-5 form-control w-full max-w-xs">
    <label className="label">
      <span className="label-text">Username: </span>
    </label>
    <input type="text" value={Username} onChange={(e)=>SetUsername(e.target.value)} placeholder="Type here" className="input input-primary w-full max-w-xs" />
   
  </div>
      <div className="my-5 form-control w-full max-w-xs">
    <label className="label">
      <span className="label-text">First Name: </span>
    </label>
    <input type="text" value={FirstName} onChange={(e)=>SetFirstName(e.target.value)} placeholder="Type here" className="input input-primary w-full max-w-xs" />
   
  </div>
      <div className="my-5 form-control w-full max-w-xs">
    <label className="label">
      <span className="label-text">Last Name: </span>
    </label>
    <input type="text" value={LastName} onChange={(e)=>SetLastName(e.target.value)} placeholder="Type here" className="input input-primary w-full max-w-xs" />
   
  </div>
  
      <div className="form-control w-full max-w-xs">
    <label className="label">
      <span className="label-text">Password: </span>
    </label>
    <input type="password" value={Password} onChange={(e)=>SetPassword(e.target.value)} placeholder="Type here" className="input input-primary w-full max-w-xs" />
   
  </div>
  
  
  
  <button onClick={handleSubmit} className='my-10 btn btn-primary'>Signup</button>
  
  
  
      </div>
  );
}
