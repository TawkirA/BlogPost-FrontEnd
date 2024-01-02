const baseURL = 'http://localhost:3001/blog-post';

export const getPosts = async () => {    
    const response = await fetch(`${baseURL}`);
    const data = await response.json();    
    return data;
}

export const getPostById = async (id) => {
    const response = await fetch(`${baseURL}/${id}`);
    const data = await response.json();    
    return data;
}

export const updatePost = async (id, req) => {
    const response = await fetch(`${baseURL}/${id}`, { 
        method: 'PATCH',
        body: JSON.stringify({
            title: req.title,
            description: req.description,            
            tags: req.tags
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
     });
    const data = await response.json();    
    return data;
}

export const addPost = async (body) => {
    const response = await fetch(`${baseURL}`, { 
        method: 'POST',
        body: JSON.stringify({
            title: body.title,
            description: body.description,            
            tags: body.tags,
            createdBy: body.createdBy
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
     });
    const data = await response.json();    
    return data;
}