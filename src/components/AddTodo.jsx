import React, { Component } from "react";
import axios from "axios";
export default class AddTodo extends Component {
  state = {
    title: "",
    description: "",
  };

  onchangeHandeler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitHandeler = (e) => {
    // e.preventDefault();
    axios
      .post("http://localhost:3030/", {
        title: this.state.title,
        description: this.state.description,
      })
      .then((res) => {
        alert(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    return (
      <div className="m-auto w-50">
        <form onSubmit={this.submitHandeler} className="form-group">
          <label htmlFor="name">Enter your Title :</label>
          <input
            className="form-control"
            value={this.state.title}
            type="text"
            name="title"
            placeholder="Enter your Title"
            onChange={this.onchangeHandeler}
          />

          <br />
          <label htmlFor="description">Enter your description :</label>
          <input
            className="form-control"
            value={this.state.description}
            type="text"
            name="description"
            placeholder="Enter your description"
            onChange={this.onchangeHandeler}
          />
          <br />
          <button type="submit" className="btn btn-info">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
