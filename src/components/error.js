import Alert from '@mui/material/Alert';

export const ErrorMessage = (props) => {
    return (
        <Alert severity="error">{props.message}</Alert>
    )
}