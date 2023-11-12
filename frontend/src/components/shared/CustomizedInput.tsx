import React from 'react';
import { TextField } from '@mui/material'

type Props = {
    name: string;
    type: string;
    label: string;
}

const CustomizedInput = (props: Props) => {
  const inputStyle = { WebkitBoxShadow: "0 0 0 1000px #071728 inset", WebkitTextFillColor: "white"};
  return <TextField 
  name={props.name} 
  label={props.label} 
  type={props.type} 
  sx={{ input: { color: 'white'} }} 
  inputProps={{style: inputStyle}} 
  InputLabelProps={{style: { color: "white"} }}
  margin='normal'
  />
}

export default CustomizedInput