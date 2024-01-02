import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import './PostDetails.css';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { InputForm } from '../components/InputForm';
import { getPostById } from '../services/Post.service';

export const PostDetails = () => {
    const [editPost, setEditPost] = useState(false);
    const [ postDetails, setPostDetails ] = useState({})
    const { id } = useParams();

    useEffect(() => {
        const getById = async (postId) => {            
            const data = await getPostById(postId);            
            setPostDetails(data);
        }
        getById(id);
    }, [])

    const formatDate = (input) => {
        const date = new Date(input)        
        return date.getDay() + " " + date.getMonth() + ", " + date.getFullYear();
    }

    const editItem = () => {
        let editState = !editPost;
        setEditPost(editState);
    } 

    return (
        <>
            {!editPost && <Container maxWidth="md">
                <Box md={{ bgcolor: '#cfe8fc' }}>
                    <div className='header-cont'>
                        <div className='post-title'>{postDetails.title}</div>
                        <div className='edit-btn'>
                            <Button color="secondary" variant="outlined" onClick={editItem}><EditIcon />Edit</Button>
                        </div>
                    </div>
                    <div className='desc-cont'>
                        <div className='post-desc'>{postDetails.description}</div>
                        <div className='post-tag'>{postDetails.tag}</div>
                    </div>
                    <div className='post-footer'>
                        <div><span>Posted On -</span> {formatDate(postDetails.createdAt)}</div>
                        <div className='created-by'><span>Created By -</span> {postDetails.createdBy}</div>
                    </div>
                </Box>
            </Container>}
            { editPost && <InputForm formInput={postDetails} title="Edit Post" btnText="Update" cancelEdit={editItem} /> }
        </>
    )
}