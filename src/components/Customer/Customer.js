import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Moment from "react-moment";
import Select from "react-select";
import Axios from 'axios';
import { FaEdit, FaPlus } from 'react-icons/fa'
import NoteForm from './../NoteForm/NoteForm';
import "./Customer.css";


const options = [
  { value: 'current', label: 'current' },
  { value: 'prospective', label: 'prospective' },
  { value: 'non-active', label: 'non-active' }
];


class Customer extends Component {
  state = {
    loading: false,
    notes: [],
    creationDate: null,
    selectedStatus: null,
    generalInfo: [],
    showSelect: false,
    showForm: false
  };

  componentDidMount() {
    this.setState({ loading: true });
    Axios.get(`http://localhost:8000/customer/${this.props.match.params.id}`).then(res => {
      if (res.status === 200 && res.data[0].creationDate) {
        this.setState({
          creationDate: res.data[0].creationDate,
          notes: res.data[0].notes,
          generalInfo: res.data[0].generalInfo,
          selectedStatus: res.data[0].status,
          loading: false
        });
      }
    });
  }

  toggleShowSelect = () => {
    this.setState({
      showSelect: !this.state.showSelect
    })
  }
  toggleShowForm = () => {
    this.setState({
      showForm: !this.state.showForm
    })
  }
  handleChange = (selectedStatus) => {
    this.setState({ loading: true });
    Axios.put(`http://localhost:8000/customer/${this.props.match.params.id}`, { "status": selectedStatus.value }).then(res => {
      if (res.status === 200 && res.data.length) {
        this.setState({ selectedStatus: selectedStatus.value, loading: false, showSelect: false });
      }
    })
  }

  handleSubmitNewNote = (title, body) => {
    this.setState({ loading: true });
    const payload = {
      user_id: this.props.match.params.id,
      title: title,
      body: body
    }
    Axios.post(`http://localhost:8000/note`, payload).then(res => {
      if (res.status === 200 && res.data._id) {
        this.setState({
          notes: [
            {
              _id: res.data._id,
              title: title,
              body: body,
            },
            ...this.state.notes,
          ],
          loading: false,
          showForm: false
        })
      }
    })
  }

  handleSubmitUpdateNote = (title, body, id) => {
    this.setState({ loading: true });
    const payload = {
      title: title,
      body: body
    }
    Axios.put(`http://localhost:8000/note/${id}`, payload).then(res => {
      console.log(res);
      if (res.status === 200 && res.data) {
        this.setState({
          loading: false
        })
      }
    })
  }

  render() {
    const { selectedStatus, creationDate, generalInfo, notes, showSelect, showForm } = this.state;

    return (
      <div className="Customer">
        <Link to="/" className="BackLink">Back to the list</Link>
        {creationDate && (
          <div className="CustomerWrapper">
            <div className="LeftWrapper">
              <h3>Name: {generalInfo.name}</h3>
              <span className="InfoLine"><b>Email:</b> {generalInfo.email}</span>
              <span className="InfoLine"><b>Phone:</b> {generalInfo.phone}</span>
              <span className="InfoLine"><b>Creation date:</b> <Moment format="YYYY-MM-DD HH:mm">{creationDate}</Moment>
              </span>
              <div className="StatusWrapper">
                <span className="InfoLine"><b>Status: </b> {selectedStatus} <FaEdit className="Icon" onClick={this.toggleShowSelect} /></span>
                {showSelect && (<Select
                  className="Select"
                  value={selectedStatus}
                  onChange={this.handleChange}
                  options={options}
                  placeholder="Change status..."
                />)}
              </div>
            </div>
            <div className="RightWrapper">
              <span className="Line"><b>Add new note: </b><FaPlus className="Icon" onClick={this.toggleShowForm} /></span>
              {showForm && (
                <NoteForm
                  callback={this.handleSubmitNewNote}
                  showSubmit />
              )}
              <div className="NotesListWrapper">
                <h3>Notes list:</h3>
                <p className="Info">(to change any note just start typing in the input)</p>
                <ul>{notes.map((note) =>
                  <NoteForm
                    key={note._id}
                    id={note._id}
                    title={note.title}
                    body={note.body}
                    callbackBlur={this.handleSubmitUpdateNote} />
                )}</ul>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Customer;
