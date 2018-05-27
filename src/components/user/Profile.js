import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

import PiecesShow from '../pieces/Show';

class Profile extends React.Component {
  state = {
    createdMode: false,
    newPiece: null,
    pieceShow: null,
    pieces: [],
    user: null
  }

  componentDidMount() {
    axios
      .get(`/api/users/${Auth.getPayload().sub}`, { headers: { Authorization: `Bearer ${Auth.getToken()}` }})
      .then(res => {
        this.setState({ user: res.data });
      });
    axios
      .get(`/api/users/${Auth.getPayload().sub}/pieces`, { headers: { Authorization: `Bearer ${Auth.getToken()}` }})
      .then(res => {
        this.setState({ pieces: res.data });
      });
  }

  handlePieceShow = ({ target: { value } }) => {
    this.setState({ createMode: false, pieceShow: value });
  }

  handlePieceShowClose = () => {
    axios
      .get(`/api/users/${Auth.getPayload().sub}/pieces`, { headers: { Authorization: `Bearer ${Auth.getToken()}` }})
      .then(res => {
        this.setState({ pieces: res.data, pieceShow: null });
      });
  }

  toggleCreateMode = () => {
    this.setState({ createMode: !this.state.createMode, pieceShow: null });
  }

  handleCreateChange = ({ target: { name, value }}) => {
    this.setState({ newPiece: { ...this.state.newPiece, [name]: value }});
  }

  handleCreateSubmit = () => {
    axios
      .post(`/api/users/${Auth.getPayload().sub}/pieces`, this.state.newPiece, { headers: { Authorization: `Bearer ${Auth.getToken()}` }})
      .then(res => {
        this.setState({ createMode: false, pieces: res.data.pieces });
      });
  }

  render() {
    return (
      <div>
        { this.state.user &&
          <div>
            <h1>Profile for {this.state.user.username}</h1>
            <h2>{this.state.user.totalPracticed} total minutes practiced</h2>
          </div>
        }
        { !this.state.createMode &&
          <button onClick={this.toggleCreateMode}>Create a new piece</button>
        }
        { this.state.createMode &&
          <div>
            <input name="title" onChange={this.handleCreateChange}></input>
            <input name="composer" onChange={this.handleCreateChange}></input>
            <input name="description" onChange={this.handleCreateChange}></input>
            <button onClick={this.handleCreateSubmit}>Submit new piece</button>
            <button onClick={this.toggleCreateMode}>Close without saving</button>
          </div>
        }
        { this.state.pieceShow &&
          <div>
            <h2>Currently shown piece:</h2>
            <button onClick={this.handlePieceShowClose}>Close shown piece</button>
            <PiecesShow
              handlePieceShowClose={this.handlePieceShowClose}
              piece={this.state.pieceShow}
            />
          </div>
        }
        { this.state.pieces.map(piece =>
          <div key={piece._id}>
            <h2>{piece.title}</h2>
            <h2>{piece.composer}</h2>
            <button value={piece._id} onClick={this.handlePieceShow}>Show this piece</button>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
