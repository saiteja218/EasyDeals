import React from 'react';
import { useNavigate } from 'react-router-dom';



function Home(){
    const navigate=useNavigate();

    return(
       <div className='home-div'>
        <div className='buyer'>
            <button  onClick={()=>{navigate("/buyer/login")}}>Buyer</button>
        </div>
        <div className="seller">
            <button onClick={()=>{navigate('/seller/login')}}>Seller</button>
        </div>

       </div>
    )
}

export default Home;