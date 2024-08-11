"use client"
import { useState } from 'react';
import axios from 'axios';
import  toast  from 'react-hot-toast';
import { useUserStore } from '../../store/store';
import { useRouter } from 'next/navigation';

export default function Login() {
  const {setUsername, setIsLogin} = useUserStore();
  const [Username, SetUsername] = useState('');
  const [Password, SetPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {

    try {
      const response = await axios.post('/api/auth/login', { Username, Password });
      if (response.data.type == "success") {
        localStorage.setItem('studymate_refresh_token', response.data.refreshToken);
        localStorage.setItem('studymate_token', response.data.token);
        setIsLogin(true);
        setUsername(Username)
        toast.success('Logged in successfully');
        router.push("/dashboard");
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Error logging in');
    }
  };

  return (
    <div style={{
      minHeight: "80vh"
    }} className='my-10 flex justify-center items-center flex-col'>
      <p className='text-3xl font-bold'>Login</p>
  
  
  
      <div className="my-5 form-control w-full max-w-xs">
    <label className="label">
      <span className="label-text">Username: </span>
    </label>
    <input type="text" value={Username} onChange={(e)=>SetUsername(e.target.value)} placeholder="Type here" className="input input-primary w-full max-w-xs" />
   
  </div>
  
      <div className="form-control w-full max-w-xs">
    <label className="label">
      <span className="label-text">Password: </span>
    </label>
    <input type="password" value={Password} onChange={(e)=>SetPassword(e.target.value)} placeholder="Type here" className="input input-primary w-full max-w-xs" />
   
  </div>
  
  
  
  <button onClick={handleSubmit} className='my-10 btn btn-primary'>Login</button>
  
  
  
      </div>
  );
}
