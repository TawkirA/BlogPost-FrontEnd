import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import "./PostList.css";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPosts } from '../services/Post.service';
import { formatDate, sortData } from '../utility/util-func';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    paddingBottom: theme.spacing(3),
    margin: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const PostList = (props) => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();    

    useEffect( () => {
        const posts = async () => {
            const data = await getPosts();
            const result = await sortData(data);
            setPosts(result);
        };
        posts()        
    }, [])

    const filteredData = posts.filter((item) => {
        if (props.input === '') {
            return item;
        } else {
            return item.tags.toLowerCase().includes(props.input) || item.title.toLowerCase().includes(props.input) || item.description.toLowerCase().includes(props.input)
        }
    })

    const navToDetails = (data) => {        
        navigate(`/post/${data.id}`)
    }

    return (
        <Box sx={{ flexGrow: 1 }} style={{ margin: 'auto' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {filteredData.map((i, index) => (
                        <Grid xs={2} sm={4} item md={4} key={index}>
                            <Item>
                                <header className='item-header'>
                                    <span className='header-text'>{i.tags}</span>
                                </header>
                                <main>
                                    <p>{i.title}</p>
                                    <div className='desc'>
                                        {i.description.substring(0, 150).concat('...')}
                                    </div>
                                </main>
                                <footer className='item-footer'>
                                    <Stack direction="row" spacing={16}>
                                        <p>Date - {formatDate(i.createdAt)}</p>
                                        <p>By - {i.createdBy}</p>
                                    </Stack>
                                    <Button className="learn-more" size="small" variant="outlined" onClick={() => navToDetails(i)}>Learn More</Button>
                                </footer>
                            </Item>
                        </Grid>
                    ))}
                </Grid>
            </Box>
    )
}