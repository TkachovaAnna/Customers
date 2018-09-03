import React, { Component } from "react";
import propTypes from "prop-types";

import "./NoteForm.css";

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title || '',
      body: this.props.body || ''
    }
  }

  static propTypes = {
    title: propTypes.string,
    body: propTypes.string,
    callback: propTypes.func,
    callbackBlur: propTypes.func,
    showSubmit: propTypes.bool,
    id: propTypes.string
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.callback(this.state.title, this.state.body)
  }

  handleBlur = () => {
    this.props.callbackBlur && this.props.callbackBlur(this.state.title, this.state.body, this.props.id)
  }

  render() {
    const { showSubmit } = this.props
    const { title, body } = this.state;
    return (
      <form className="NoteForm" onSubmit={this.handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={title} onChange={this.handleChange} onBlur={this.handleBlur} />
        <input type="text" name="body" placeholder="Body" value={body} onChange={this.handleChange} onBlur={this.handleBlur} />
        {showSubmit && (<input type="submit" value="Submit" />)}
      </form>
    );
  }
}

export default NoteForm;
