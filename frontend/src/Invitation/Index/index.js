import React, { Component } from 'react';
import axiosClient from '../../axiosClient';

class InvitationIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { invitations: [] };
  }

  componentWillMount() {
    axiosClient.get('/invitations.json').then(response => {
      this.setState({ invitations: response.data });
    });
  }

  render() {
    return (
      <div className="InvitationIndex col-md-12" style={{ marginTop: 10 }}>
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTableBody()}
          </tbody>
        </table>
        <div className="clearfix">
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <button
              onClick={e => this.handleNewinvitation()}
              className="btn btn-success">
              Upload Customer Lists
            </button>
          </div>
        </div>
      </div>
    );
  }

  handleNewinvitation() {
    this.props.history.push('/invitations/new');
  }

  renderTableBody() {
    return this.state.invitations.map(invitation => {
      return (
        <tr key={invitation.id}>
          <td>
            {invitation.id}
          </td>
          <td>
            {invitation.title}
          </td>
          <td>
            <button
              onClick={e => this.handleEdit(invitation.id)}
              className="btn btn-primary">
              Edit
            </button>
            &nbsp;
            <button
              onClick={e => this.handleRemove(invitation.id)}
              className="btn btn-danger">
              Remove
            </button>
          </td>
        </tr>
      );
    });
  }

  handleEdit(invitationId) {
    this.props.history.push(`/invitations/${invitationId}/edit`);
  }

  handleRemove(invitationId) {
    let invitations = this.state.invitations;
    invitations = invitations.filter(invitation => {
      return invitation.id !== invitationId;
    });
    this.setState({ invitations: invitations });
    axiosClient.delete(`/invitations/${invitationId}`);
  }
}

export default InvitationIndex;
