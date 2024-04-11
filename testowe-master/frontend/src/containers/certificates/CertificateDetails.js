import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from "./CertificatesApi";
import { Grid, Row, Col, Button, Table } from "react-bootstrap";
import './CertificateDetails.scss'

class CertificateDetails extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            resource: {},
        }
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        if (id != null) {
            this.loadCertificate(id, organizer => this.setState({ resource: organizer }));

        } else {
            this.setState({ resource: {} });
        }

    };

    formatDate = (dateString) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        return date.toLocaleString();
    };

    loadCertificate(id) {
        this.props.actions.loadCertificate(id,
            resource => this.setState({ resource: resource }));
    };

    render() {
        const { resource } = this.state;
        return (<div>
            <h1>Certificate details</h1>
            <Table bordered striped hover responsive>
                <thead>
                    <tr>
                        <th>Certificate ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Created date</th>
                        <th>Updated date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{resource.id}</td>
                        <td>{resource.name}</td>
                        <td className='CertificateDetail'>{resource.description}</td>
                        <td>{this.formatDate(resource.created_at)}</td>
                        <td>{this.formatDate(resource.updated_at)}</td>
                    </tr>
                </tbody>
            </Table>

            <Button
                bsStyle={'warning'}
                onClick={() => this.context.router.history.push(`/Certificates`)}
            >
                Cancel
            </Button>

        </div>
        );
    }
}

CertificateDetails.contextTypes = {
    router: PropTypes.object
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        actions,
        dispatch)
});

export default connect(
    undefined,
    mapDispatchToProps
)(CertificateDetails)
