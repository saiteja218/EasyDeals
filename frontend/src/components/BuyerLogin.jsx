import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function BuyerLogin(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    // const { id } = useParams();

    async function handleSubmit(e) {
      e.preventDefault();
        
        try {
            const res= await axios.post('http://localhost:5000/buyer/user/login',{
                email,password
            },{withCredentials:true})
            alert(res.data.message);
            navigate(`/buyerhome`)
            console.log(res.data.id);    
            
        } catch (error) {
            // alert(error.response?.data.message);   
            console.log(error);
                  
         }
        //  console.log(res); 

        
        
    }

    return(
        <div>
      <h2>Buyer Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      </div>
    )
}


export default BuyerLogin;