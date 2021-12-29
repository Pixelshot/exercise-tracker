import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
    };

    // console.log("user: ", user);

    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => console.log(res.data));

    // To set multiple usernames, reset username to empty string
    this.setState({
      username: "",
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
