import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Col, ControlLabel, FormControl, FormGroup, Glyphicon, Row, Form } from "react-bootstrap";
import * as actions from "./CertificatesApi";
import { loadUsers } from '../users/UsersApi';

class NewCertificate extends Component {


    handleNameChange = (e) => {
        const { resource } = this.state;
        this.setState({ resource: { ...resource, name: e.target.value } });
    };
    handleDescriptionChange = (e) => {
        const { resource } = this.state;
        this.setState({ resource: { ...resource, description: e.target.value } });
    };
    handleSelectedUserChange = (e) => {
        const { resource } = this.state;
        this.setState({ resource: { ...resource, user_id: e.target.value } });
    };




    saveCertificate = (e) => {
        e.preventDefault();
        const { resource } = this.state;
        const validationErrors = {};
        if (Object.keys(resource).length >= 0) {
            if (!resource.name || resource.name.length < 3)
                validationErrors.name = "Invalid name or name is too short";
            if (!resource.description || resource.description.length < 6)
                validationErrors.description = "Description is not valid";
            if (!resource.user_id || resource.user_id === '')
                validationErrors.user_id = "You have to choose user";
        }
        if (Object.keys(validationErrors).length > 0) {
            this.setState({ validationErrors });

        } else {
            this.setState({ validationErrors: {} });

            this.props.actions.checkIfUserHasThisCertificate(resource, (exists) => {
                if (exists) {
                    this.setState({ certificateExistsError: "This user already has this certificate." });
                }
                else {
                    this.props.actions.saveCertificate(resource, () => {
                        this.context.router.history.push('/Certificates');
                    });
                }
            });
        }

    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            resource: {},
            validationErrors: {},
            previousCertificateName: '',
            certificateExistsError: null,
        }
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        if (id != null) {
            this.loadCertificate(id, organizer => this.setState({ resource: organizer }));
        } else {
            this.setState({ resource: {} });
        }
        this.loadUsers(users => this.setState({ users }));

    };

    loadCertificate(id) {
        this.props.actions.loadCertificate(id,
            resource => this.setState({ resource: resource, previousCertificateName: resource.name }));
    };

    loadUsers() {
        this.props.actions.loadUsers({},
            users => this.setState({ users }));
    }

    getValidationState(id) {
        const { validationErrors } = this.state;
        if (validationErrors.name && id === 'name') {
            // console.log(validationErrors.name);
            return 'error';
        }
        if (validationErrors.description && id === 'description') {
            // console.log(validationErrors.description);
            return 'error';
        }
        if (validationErrors.user_id && id === 'user_id') {
            //console.log(validationErrors.user_id);
            return 'error';
        }
        return null;
    }

    render() {
        const { resource, validationErrors, previousCertificateName, users, certificateExistsError } = this.state;
        return (
            <div>
                {resource && <Row className="vertical-middle breadcrumbs">
                    <Col xs={8}>
                        <h5>
                            <Glyphicon
                                glyph="cog" /> Admin {'>'} Certificates {'>'} {resource.id ?
                                    <span><b>{previousCertificateName}</b> - edit</span> :
                                    <span>New </span>}
                        </h5>
                    </Col>
                </Row>
                }
                {resource &&
                    <Row id='form'>
                        <Col xs={12} md={6}>
                            <Form horizontal onSubmit={this.saveCertificate}>
                                <FormGroup
                                    controlId="name"
                                    validationState={this.getValidationState('name')}
                                >
                                    <Col componentClass={ControlLabel} sm={2}>Name</Col>
                                    <Col sm={10}>
                                        <FormControl
                                            type="name"
                                            defaultValue={resource.id ? previousCertificateName : ''}
                                            value={resource.name}
                                            placeholder="Enter text"
                                            onChange={this.handleNameChange}
                                        />
                                        {
                                            Object.keys(validationErrors).length > 0 && validationErrors.name &&
                                            <ControlLabel>{validationErrors.name}</ControlLabel>
                                        }
                                    </Col>
                                    <FormControl.Feedback />
                                </FormGroup>
                                <FormGroup
                                    controlId="description"
                                    validationState={this.getValidationState('description')}
                                >
                                    <Col componentClass={ControlLabel} sm={2}>Description</Col>
                                    <Col sm={10}>
                                        <FormControl
                                            componentClass="textarea"
                                            value={resource.description}
                                            placeholder="Enter certificate description"
                                            onChange={this.handleDescriptionChange}
                                        />
                                        {
                                            Object.keys(validationErrors).length > 0 && validationErrors.description &&
                                            <ControlLabel>{validationErrors.description}</ControlLabel>
                                        }
                                    </Col>
                                    <FormControl.Feedback />
                                </FormGroup>

                                <FormGroup
                                    controlId="user_id"
                                    validationState={this.getValidationState('user_id')}
                                >
                                    <Col componentClass={ControlLabel}
                                        sm={2}>Users list</Col>
                                    <Col sm={10}>
                                        <FormControl onChange={this.handleSelectedUserChange} componentClass="select" placeholder="select" >
                                            <option hidden>Select user</option>
                                            {users && users.map((user) => {
                                                return <option key={user.id} value={user.id}>{user.email}</option>
                                            })}
                                        </FormControl>
                                        {
                                            Object.keys(validationErrors).length > 0 && validationErrors.user_id &&
                                            <ControlLabel>{validationErrors.user_id}</ControlLabel>
                                        }
                                    </Col>
                                    <FormControl.Feedback />
                                </FormGroup>
                                {certificateExistsError && (
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <p style={{ color: 'red' }}>{certificateExistsError}</p>
                                        </Col>
                                    </Row>
                                )}

                                <Col xsOffset={2} xs={10} className='form-buttons margin10'>
                                    <Button type="submit" bsStyle={'success'}>Save</Button>
                                    <Button
                                        bsStyle={'warning'}
                                        onClick={() => this.context.router.history.push(`/Certificates`)}
                                    >
                                        Cancel
                                    </Button>
                                </Col>
                            </Form>
                        </Col>
                    </Row>
                }

            </div>
        );
    }
}

NewCertificate.contextTypes = {
    router: PropTypes.object
};




const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        {
            ...actions,
            loadUsers: loadUsers,
        },
        dispatch,)
});

export default connect(
    undefined,
    mapDispatchToProps
)(NewCertificate)
