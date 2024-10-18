import React, { useState } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";

function SellerSignup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();

    
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res= await axios.post('http://localhost:5000/seller/user/register',{
                name,email,password
            },{withCredentials:true})
            alert("new user added");
            console.log(res.data.newSeller._id);  
            navigate(`/sellerproducts/${res.data.newSeller._id}`)
             
            
        } catch (error) {
            alert(error.response?.data.message);   
            console.log(error);
        }
        
    }

    return (
        <div>

            <h2>Seller Signup</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text"
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                    />
                </div>
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
                <button type="submit">Signup</button>
            </form>
        </div>
    )
}

export default SellerSignup;