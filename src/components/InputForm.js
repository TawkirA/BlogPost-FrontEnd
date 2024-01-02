import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { addPost } from '../services/Post.service';
import './InputForm.css';
import { useEffect } from 'react';

export const InputForm = (props) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();    
    
    const onSubmit = async (data) => {        
        const payload = {
            ...data,
            createdBy: 'Test User 4'
        }
        console.log('Payload', payload);
        const resp = await addPost(payload);
        console.log('DATA', resp);
    }

    const formTitle = props.title || "Add Post";
    const btnText = props.btnText || "Post";

    

    const handleCancel = () => {
        reset({
            title: props.formInput.title || '',        
            description: props.formInput.description || '',        
            tags: props.formInput.tags || ''
        })
    }

    return (
        <Container maxWidth="md">
            <Box md={{ bgcolor: '#cfe8fc' }}>
                <h1>{formTitle}</h1>                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField
                            id="outlined-basic"
                            name="title"
                            label="Title"
                            color="success"
                            defaultValue={props.formInput.title || ''}                           
                            variant="outlined" {...register("title")} />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField
                            id="outlined-textarea"
                            rows={8}
                            label="Description"
                            name="description"
                            color="success" 
                            defaultValue={props.formInput.description || ''}                           
                            multiline {...register("description")} />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel id="demo-simple-select-label" color="success">Tag</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Tag"
                            name="tags"
                            color="success"                            
                            defaultValue={props.formInput.tags || 'Angular'}                          
                            {...register("tags")}
                        >
                            <MenuItem value="Angular">Angular</MenuItem>
                            <MenuItem value="React">React</MenuItem>
                            <MenuItem value="Vue">Vue</MenuItem>
                            <MenuItem value="Next">NextJS</MenuItem>
                            <MenuItem value="Nest">NestJS</MenuItem>
                            <MenuItem value="Typescript">TypeScript</MenuItem>
                            <MenuItem value="Html">HTML</MenuItem>
                            <MenuItem value="Css">CSS</MenuItem>
                            <MenuItem value="Javascript">JavaScript</MenuItem>
                        </Select>
                    </FormControl>
                    <div className="submit-btn">                        
                            <Button type="button" color="secondary" variant="outlined" onClick={handleCancel}>Reset</Button>
                            <Button type="button" color="secondary" variant="outlined" onClick={props.cancelEdit}>Cancel</Button>
                            <Button type="submit" variant="contained" color="secondary">{btnText}</Button>                        
                    </div>
                </form>
            </Box>
        </Container>
    )
}