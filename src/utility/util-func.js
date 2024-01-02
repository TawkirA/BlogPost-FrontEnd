export const formatDate = (input) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(input.split('T')[0])    
    return date.getDay() + " " + months[date.getMonth()] + ", " + date.getFullYear();
}

export const sortData = (data) => {
    data.sort(function (a, b) {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
    return data;
}

