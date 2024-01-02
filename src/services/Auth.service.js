import axios from 'axios';
const baseURL = 'http://localhost:3001/user';

export const SignUp = async (body) => {
    const signUpInfo = await fetch(`${baseURL}/signup`, {
        method: 'POST',
        body: JSON.stringify({
            name: body.name,
            email: body.email,
            password: body.password
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    return signUpInfo;
}

export const SignIn = (email, password) => {
    return axios
        .post(`${baseURL}/signin`, {
            email,
            password                   
        })
        .then((response) => {
            console.log("RESPPP", response);
            localStorage.setItem("user", JSON.stringify({name: response.data.name, email: response.data.email}));            
            return response;
        })    
}

export const getCurrentUser = () => {
    console.log('CHH', localStorage.getItem('user'))
    const User = localStorage.getItem('user');    
    if (!User) {
        return {
            'name': '',
            'email': ''
        }
    }
    return User;
}

export const deleteCurrentUser = () => {
    localStorage.removeItem("user");
    return;
}

