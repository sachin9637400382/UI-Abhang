// MyButton.js
"use client";

import { Button } from "@mui/material";

interface MyButtonProps {
  onClick: ()=> void;
  btnText : string
}

const MyButton = ({ onClick,btnText }: MyButtonProps) => {

  const onButtonClick =()=>{
    console.log("testing");
    onClick()
  }
  return (
    <Button variant="contained" color="primary" onClick={onButtonClick}>
          {btnText}
     </Button>
  );
};

export default MyButton;