import React from 'react'
import axios from 'axios'

import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class SignUp extends React.Component {
    state = {
        credentials: {
            username: '',
            password: ''
        }
    }

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
            .post("http://localhost:5000/api/login/", this.state.credentials)
            .then(res => {
                this.props.setIsLoggedIn(true)
                localStorage.setItem("token", res.data.payload)
                this.props.history.push('/')
            })
            .catch(err => console.log(err.response))
    }

    render() {
        return (
            <div className="signup-form">
                <div style={{ backgroundColor: "white", maxWidth: "350px", margin: "auto", padding: "30px", borderRadius: "4px" }}>
                    <h2>Sign Up</h2>
                    <form>
                        <FormControl>
                            <TextField
                                name="username"
                                label="Username"
                                variant="outlined"
                                required
                                value={this.state.credentials.username}
                                onChange={this.handleChange}
                                style={{ marginBottom: "10px" }}
                            />
                            <TextField
                                name="password"
                                label="password"
                                type="password"
                                variant="outlined"
                                required
                                value={this.state.credentials.password}
                                onChange={this.handleChange}
                                style={{ marginBottom: "10px" }}
                            />
                            <Button variant="contained" onClick={this.login} style={{ marginBottom: "20px" }}>Sign Up</Button>
                        </FormControl>
                    </form>
                </div>
            </div>
        )
    }
}

export default SignUp