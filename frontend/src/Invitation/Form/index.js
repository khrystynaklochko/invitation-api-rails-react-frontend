import React, { Component } from 'react';
import axiosClient from '../../axiosClient';
import './Index.css';
import textLogo from '../../text.svg'

class InvitationForm extends Component {
  state = {
    selectedInvitationCustomerListFiles: [],
    submitFormProgress: 0,
    isSubmittingForm: false,
    didFormSubmissionComplete: false,
    invitation: {
      id: this.props.match.params.id,
      title: '',
      errors: {}
    }
  };

  componentWillMount() {
    if (this.props.match.params.id) {
      axiosClient.get(`/invitations/${this.props.match.params.id}`).then(response => {
        this.setState({
          selectedInvitationCustomerListFiles: response.data.customer_lists,
          invitation: {
            id: response.data.id,
            title: response.data.title,
            errors: {}
          }
        });
      });
    }
  }

  getNumberOfSelectedFiles() {
    return this.state.selectedInvitationCustomerListFiles.filter(el => {
      return el._destroy !== true;
    }).length;
  }

  render() {
    return (
      <div className="InvitationForm">
        <form>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              onChange={e => this.handleInvitationTitleChange(e)}
              value={this.state.invitation.title}
              className="form-control"
            />
            {this.renderInvitationTitleInlineError()}
          </div>
          <div className="form-group">
            <label>Customer List</label>
            {this.renderUploadCustomerListsButton()}
            {this.renderSelectedInvitationCustomerListFiles()}
          </div>
          {this.renderUploadFormProgress()}
          <button
            disabled={this.state.isSubmittingForm}
            onClick={e => this.handleFormSubmit()}
            className="btn btn-primary">
            {this.state.isSubmittingForm ? 'Saving...' : 'Save'}
          </button>
          &nbsp;
          <button
            disabled={this.state.isSubmittingForm}
            onClick={e => this.handleCancel()}
            className="btn btn-default">
            Cancel
          </button>
          &nbsp;
          <button
            onClick={e => this.handleBackToIndex()}
            className="btn btn-default">
            Back To Invitations
          </button>
          {this.renderInvitationApiError()}
        </form>
      </div>
    );
  }

  handleBackToIndex() {
    this.props.history.push('/invitations');
  }
  renderUploadCustomerListsButton() {
    let numberOfSelectedCustomerLists = this.getNumberOfSelectedFiles();
    return (
      <div>
        <input
          name="customerLists[]"
          ref={field => (this.invitationCustomerListsField = field)}
          type="file"
          disabled={this.state.isSubmittingForm}
          multiple={true}
          accept="txt/*"
          style={{
            width: 0.1,
            height: 0.1,
            opacity: 0,
            overflow: 'hidden',
            position: 'absolute',
            zIndex: -1
          }}
          id="invitation_customerLists"
          onChange={e => this.handleInvitationCustomerListsChange(e)}
          className="form-control"
        />
        <label
          disabled={this.state.isSubmittingForm}
          className="btn btn-success"
          htmlFor="invitation_customerLists">
          <span className="glyphicon glyphicon-cloud-upload" />
          &nbsp; &nbsp;
          {numberOfSelectedCustomerLists === 0
            ? 'Upload Files'
            : `${numberOfSelectedCustomerLists} file${numberOfSelectedCustomerLists !== 1
                ? 's'
                : ''} selected`}
        </label>
      </div>
    );
  }

  renderSelectedInvitationCustomerListFiles() {
    let fileDOMs = this.state.selectedInvitationCustomerListFiles.map((el, index) => {
      if (el._destroy) {
        return null;
      }

      return (
        <li key={index}>
          <div className="document">
            <img
              width={100}
              src={ textLogo }
              style={{ alignSelf: 'center' }}
            />
            <div
              className="remove"
              onClick={() => this.removeSelectedInvitationCustomerListFile(el, index)}>
              <span style={{ top: 2 }} className="glyphicon glyphicon-remove" />
            </div>
          </div>
          <div className="file-name">
            {el.name}
          </div>
        </li>
      );
    });

    return (
      <ul className="selected-customerLists">
        {fileDOMs}
      </ul>
    );
  }

  renderUploadFormProgress() {
    if (this.state.isSubmittingForm === false) {
      return null;
    }

    return (
      <div className="progress">
        <div
          className={
            'progress-bar progress-bar-info progress-bar-striped' +
            (this.state.submitFormProgress < 100 ? 'active' : '')
          }
          role="progressbar"
          aria-valuenow={this.state.submitFormProgress}
          style={{ width: this.state.submitFormProgress + '%' }}>
          {this.state.submitFormProgress}% Complete
        </div>
      </div>
    );
  }

  removeSelectedInvitationCustomerListFile(customerList, index) {
    let { selectedInvitationCustomerListFiles } = this.state;
    if (customerList.id) {
      selectedInvitationCustomerListFiles[index]._destroy = true;
    } else {
      selectedInvitationCustomerListFiles.splice(index, 1);
    }

    this.setState({
      selectedInvitationCustomerListFiles: selectedInvitationCustomerListFiles
    });
  }

  handleInvitationCustomerListsChange() {
    let selectedFiles = this.invitationCustomerListsField.files;
    let { selectedInvitationCustomerListFiles } = this.state;
    for (let i = 0; i < selectedFiles.length; i++) {
      selectedInvitationCustomerListFiles.push(selectedFiles.item(i));
    } //end for

    this.setState(
      {
        selectedInvitationCustomerListFiles: selectedInvitationCustomerListFiles
      },
      () => {
        this.invitationCustomerListsField.value = null;
      }
    );
  }

  handleInvitationTitleChange(e) {
    let { invitation } = this.state;
    invitation.title = e.target.value;
    this.setState({ invitation: invitation });
  }

  renderInvitationTitleInlineError() {
    if (this.state.invitation.errors.title) {
      return (
        <div className="inline-error alert alert-danger">
          {this.state.invitation.errors.title.join(', ')}
        </div>
      );
    } else {
      return null;
    }
  }

  renderInvitationApiError() {
    if (this.state.invitation.errors.message) {
      return (
        <div className="inline-error alert alert-danger">
          {this.state.invitation.errors.message}
        </div>
      );
    } else {
      return null;
    }
  }

  handleCancel() {
    this.props.history.push('/invitations');
  }

  buildFormData() {
    let formData = new FormData();
    formData.append('invitation[title]', this.state.invitation.title);

    let { selectedInvitationCustomerListFiles } = this.state;
    for (let i = 0; i < selectedInvitationCustomerListFiles.length; i++) {
      let file = selectedInvitationCustomerListFiles[i];
      if (file.id) {
        if (file._destroy) {
          formData.append(`invitation[customer_lists_attributes][${i}][id]`, file.id);
          formData.append(`invitation[customer_lists_attributes][${i}][_destroy]`, '1');
        }
      } else {
        formData.append(
          `invitation[customer_lists_attributes][${i}][document]`,
          file,
          file.name
        );
      }
    }
    return formData;
  }

  submitForm() {
    let submitMethod = this.state.invitation.id ? 'patch' : 'post';
    let url = this.state.invitation.id
      ? `/invitations/${this.state.invitation.id}.json`
      : '/invitations.json';

    axiosClient
      [submitMethod](url, this.buildFormData(), {
        onUploadProgress: progressEvent => {
          let percentage = progressEvent.loaded * 100.0 / progressEvent.total;
          this.setState({
            submitFormProgress: percentage
          });
        }
      })
      .then(response => {
        this.setState({
          didFormSubmissionComplete: true
        });
        this.props.history.push('/invitations');
      })
      .catch(error => {
        let { invitation } = this.state;
        invitation.errors = error.response.data;
        this.setState({
          isSubmittingForm: false,
          submitFormProgress: 0,
          invitation: invitation
        });
      });
  }

  handleFormSubmit() {
    let { invitation } = this.state;
    invitation.errors = {};
    this.setState(
      {
        isSubmittingForm: true,
        invitation: invitation
      },
      () => {
        this.submitForm();
      }
    );
  }
}

export default InvitationForm;
