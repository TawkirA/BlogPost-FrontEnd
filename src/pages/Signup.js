import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ErrorMessage } from '../components/error';
import { SignUp } from '../services/Auth.service';
import './Login.css';

export const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {        
        const resp = await SignUp(data);        
    }

    const handleCancel = () => {
        reset({
            name: '',        
            email: '',
            password: ''            
        })
    }

    return (
        <Container maxWidth="md">
            <Box md={{ bgcolor: '#cfe8fc' }}>
                <div className='login-cont'>
                    <h1><span><AccountCircleIcon sx={{ fontSize: 35 }} /></span> SignUp</h1>                               
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl sx={{ m: 2 }}>
                            <TextField
                                id="outlined-basic-1"
                                name="email"
                                label="Email"
                                color="success"
                                variant="outlined"
                                {...register("email", {
                                    required: true,
                                    validate: {                                        
                                        matchPattern: (value) =>
                                        /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/.test(
                                            value
                                        )
                                    }
                            })} />
                            {errors.email?.type === "required" && (
                                <ErrorMessage message="Email is required."/>
                            )}
                            {errors.email?.type === "matchPattern" && (
                                <ErrorMessage message="Please enter a valid email."/>                                
                            )}
                        </FormControl>
                        <FormControl sx={{ m: 2 }}>
                            <TextField
                                id="outlined-basic"
                                name="name"
                                label="Name"
                                color="success"
                                variant="outlined"
                                {...register("name", {
                                    required: true,
                                    validate: {
                                        checkLength: (value) => value.length >= 4                                        
                                    }
                            })} />
                            {errors.name?.type === "required" && (
                                <ErrorMessage message="Name is required."/>
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
                                    required: true,
                                    validate: {
                                        checkLength: (value) => value.length >= 6,
                                        matchPattern: (value) =>
                                        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                                            value
                                        )
                                    }                                 
                            })} />
                            {errors.password?.type === "required" && (
                                <ErrorMessage message="Password is required."/>                                
                            )}
                            {errors.password?.type === "checkLength" && (
                                <ErrorMessage message="Password should be at-least 6 characters."/>                                
                            )}
                            {errors.password?.type === "matchPattern" && (
                                <ErrorMessage message="Password should contain at least one uppercase letter, lowercase
                                letter, digit, and special symbol."/>                                
                            )}
                        </FormControl>
                        <div className="submit-btn">
                            <Button type="button" color="secondary" variant="outlined" onClick={handleCancel}>Clear</Button>
                            <Button type="submit" variant="contained" color="secondary">Submit</Button>
                        </div>
                    </form>
                    </div>                
            </Box>
        </Container>
    )
}