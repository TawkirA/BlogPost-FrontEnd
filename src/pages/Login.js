import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ErrorMessage } from '../components/error';
import { SignIn, getCurrentUser } from '../services/Auth.service';
import './Login.css';

export const Login = ({ getUser }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [ invalidReq, setInvalidReq ] = useState(false);
    const navigate = useNavigate();    
    const onSubmit = async (data) => {         
        const {email, password} = data;        
        const resp = await SignIn(email, password);        
        if (resp.status == 400 || resp.status == 500 || resp.status == 403) {
            setInvalidReq(true);
            return;
        }
        setInvalidReq(false);
        getCurrentUser();            
        navigate('/')
    }    

    const handleCancel = () => {
        reset({
            username: '',        
            password: ''            
        })
    }

    const navToRegister = () => {
        navigate('/register')
    }

    return (
        <Container maxWidth="md">
            <Box md={{ bgcolor: '#cfe8fc' }}>
                <div className='login-cont'>
                    {invalidReq && <ErrorMessage message="Email or password is not correct." />}
                    <h1><span><AccountCircleIcon sx={{ fontSize: 35 }} /></span> Login</h1>                               
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl sx={{ m: 2 }}>
                            <TextField
                                id="outlined-basic"
                                name="email"
                                label="Email"
                                color="success"
                                variant="outlined"
                                {...register("email", {
                                    required: true
                            })} />
                            {errors.email?.type === "required" && (
                                <ErrorMessage message="Email is required."/>
                            )}
                        </FormControl>
                        <FormControl sx={{ m: 2 }}>
                            <TextField
                                id="outlined-password-input"                           
                                label="Password"
                                type="password"
                                color="success"
                                autoComplete="current-password"
                                {...register("password", {
                                    required: true                                    
                            })} />
                            {errors.password?.type === "required" && (
                                <ErrorMessage message="Password is required."/>                                
                            )}                            
                        </FormControl>
                        <div className="submit-btn">
                            <Button type="button" color="secondary" variant="outlined" onClick={handleCancel}>Clear</Button>
                            <Button type="submit" variant="contained" color="secondary" onClick={getUser}>Login</Button>
                        </div>
                    </form>
                    <div>
                        <p className="register-link">Don't have Login credentials? <Button size="small" color="secondary" variant='text' onClick={navToRegister}>Register</Button> here</p>
                    </div>
                    </div>                
            </Box>
        </Container>
    )
}