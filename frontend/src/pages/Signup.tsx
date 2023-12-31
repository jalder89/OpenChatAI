import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'
import CustomizedInput from '../components/shared/CustomizedInput'
import { IoIosLogIn } from 'react-icons/io'
import { toast } from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const Signup = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
      toast.loading('Signing up...', {id: 'signup'})
      await auth?.signup(name, email, password)
      toast.success('Signed up!', {id: 'signup'})
    } catch (error: any) {
      toast.error(`Sign Up Failed: ${error.message}`, {id: 'signup'})
    }
  }
  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);
  return (
    <Box width={"100%"} height={"100%"} display="flex" flexDirection="column" flex={1}>
      <Box display={"flex"} flex={1} justifyContent={"center"} alignItems={"center"} padding={0.5} mt={16}>
        <form style={{margin: "auto", padding: "15px 60px 30px", boxShadow: "10px 10px 20px #000", borderRadius: "10px", border: "none", backgroundColor: "#071728"}}
        onSubmit={handleSubmit}>
          <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
            <Typography variant={"h4"} textAlign={"center"} padding={2} fontWeight={600}>
              Signup
            </Typography>
            <CustomizedInput name={"name"} label={"Name"} type={"text"} />
            <CustomizedInput name={"email"} label={"Email"} type={"email"} />
            <CustomizedInput name={"password"} label={"Password"} type={"password"} />
            <Button type='submit' sx={{px: 2, py: 1, mt: 2, width: "400px", borderRadius: 2, bgcolor: "#2CDA9D", color: "black", ":hover": {
              bgcolor: "#6CFAED",
            }}} endIcon={<IoIosLogIn />}>Signup</Button>
          </Box>
        </form>
      </Box>
      <Box padding={0} mt={8} display={"flex"} justifyContent={"center"}>
        <img src="batty.png" alt="Chibi Vampire Waving" style={{width: "200px"}} />
      </Box>
    </Box>

  )
}

export default Signup