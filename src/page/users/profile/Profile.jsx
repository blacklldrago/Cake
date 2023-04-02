import React, { useState } from "react";
import {Button, Container, TextField } from "@mui/material";
import { getToken } from "../../../utils/axiosRequest";

import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Edit } from "@mui/icons-material";

const Profile = () => {
  const { iss, iat, exp, jti, nbf, aud, sub, ...user } = getToken();

  const handleSubmit = (event) => {
    event.preventDefault();
    let obj = {};
    let arr = Object.keys(user).filter((elem) => elem !== "UserId");
    obj.UserId = user.UserId;
    arr.forEach((elem) => {
      obj[elem] = event.target[elem].value;
    });
    console.log(obj);
  };
  return (
    <div>
        <div className="profile text-center pt-[30px] mt-[80px] bg-[white] border border-[black] w-[400px] pb-[50px] m-auto rounded-[15px]">
            {/* <h1><AccountCircleIcon sx={{fontSize:60, position:"relative", bottom:"10px"}}/></h1> */}
            <div className="justify-center flex mb-[10px]">

            <img className = "h-[60px] w-[60px] rounded-[100%]" src="https://avatars.githubusercontent.com/u/24698301?v=4" alt="" />
            </div>
            <Container>
            <form onSubmit={handleSubmit}>
                {Object.keys(user).map((elem) => {
                    if (elem === "UserId") return;
                    return (
                        <div key={elem} style={{ margin: 5 }}>
                    <TextField
                        label={elem}
                        type="text"
                        sx={{marginBottom:1, width:300}}
                        name={elem}
                        defaultValue={user[elem]}
                        /> 
                    </div>
                );
                })}
                <Button className = "w-[180px] h-[40px] text-[20px] mt-[20px]">Send&nbsp;<Edit/></Button>
            </form>
        </Container>
        </div>
    </div>
  );
};

export default Profile;
