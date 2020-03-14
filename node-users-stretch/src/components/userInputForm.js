import React, { useState } from "react";
import axios from "axios";

const Form = () => {
    const [user, setUser] = useState({
        name: "",
        bio: ""
    });

    console.log(user);
    

    const handleChange = (event) => {
        setUser({
            ...user, 
            [event.target.name]: event.target.value 
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios
        .post("/api/users", user)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.log(err)
        );
    };


    
    return (
        <>
            <form>
                <label>Name</label>
                <input onChange={handleChange} type="text" name="name" value={user.name}  />
                <label>Bio</label>
                <input onChange={handleChange} type="text" name="bio" value={user.bio}  />
                <button onSubmit={handleSubmit}>Submit</button>
            </form>
        </>
    )
}

export default Form;