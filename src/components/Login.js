import React from 'react'
import axios from 'axios'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { Link } from 'react-router-dom'

import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class UserLogin extends React.Component {
    state = {
        credentials: {
            username: '',
            password: ''
        },
        open: false
    }

    // Close Snackbar
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            ...this.state,
            open: false
        })
    };

    // onChange handler
    handleChange = e => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        })
    }

    // onSubmit handler
    login = e => {
        e.preventDefault()
        axios
            .post("http://localhost:8000/api/login/", this.state.credentials)
            .then(res => {
                localStorage.setItem("token", res.data.key)
                this.props.setIsLoggedIn(true)
                this.props.history.push('/')
            })
            .catch(err => {
                // Display Snackbar
                this.setState({
                    ...this.state,
                    open: true
                })
                console.log(err.response)
            })
    }

    render() {
        return (
            <div className="login-form">
                <div style={{ backgroundColor: "white", maxWidth: "350px", margin: "auto", padding: "30px", borderRadius: "4px" }}>
                    <h2>User Login</h2>
                    <form>
                        <FormControl>
                            <TextField
                                name="username"
                                label="Username"
                                variant="outlined"
                                value={this.state.credentials.username}
                                onChange={this.handleChange}
                                style={{ marginBottom: "10px" }}
                            />
                            <TextField
                                name="password"
                                label="password"
                                type="password"
                                variant="outlined"
                                value={this.state.credentials.password}
                                onChange={this.handleChange}
                                style={{ marginBottom: "10px" }}
                            />
                            <Button variant="contained" onClick={this.login} style={{ marginBottom: "20px" }} color="secondary" type="submit">Log In</Button>
                            <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                                <Alert onClose={this.handleClose} severity="error">
                                    Username not found, try again or sign up here
                                </Alert>
                            </Snackbar>
                        </FormControl>
                    </form>
                </div>
            </div>
        )
    }
}

export default UserLogin