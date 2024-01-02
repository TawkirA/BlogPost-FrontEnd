import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import './AddPost.css';
import { InputForm } from '../components/InputForm';

export const AddPost = () => {    
    const data = {        
        description: "",        
        tags: "",
        title: ""
    }
    
    return (
        <div>
            <InputForm formInput={data} />            
        </div>
    )
}