import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './Certificates.scss'
import { Button, Col, Glyphicon, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import * as actions from "./CertificatesApi";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

class Certificates extends Component {
    state = { certificates: null, page: 1, sizePerPage: 10 };


    componentDidMount() {
        this.reload();
    }



    reload(page = this.state.page, sizePerPage = this.state.sizePerPage) {
        const { userId } = this.props;
        this.props.actions.loadCertificates({ page: page, per_page: sizePerPage, userId },
            certificates => this.setState({ certificates, page, sizePerPage }));
    }

    delete(id) {
        this.props.actions.deleteCertificate(id, () => {
            this.reload();
        });
    }

    render() {
   
        const { certificates, page, sizePerPage } = this.state;
        return (<div >
            <Row className="vertical-middle breadcrumbs">
                <Col xs={8}>
                    <h5>
                        <Glyphicon
                            glyph="glyphicon glyphicon-list-alt" /> Certificates {'>'} Users certificates
                    </h5>
                </Col>
                <Col xs={4} className="text-right">
                    <h4>
                        <LinkContainer exact to={`/certificate`}>
                            <Button bsStyle={'success'}><Glyphicon
                                glyph="plus" /> Add</Button>
                        </LinkContainer>
                    </h4>
                </Col>
            </Row>
            {certificates &&
                <BootstrapTable
                    data={certificates}
                    fetchInfo={{ dataTotalSize: certificates.length }}
                    striped
                    hover
                    //remote
                    pagination
                    bordered={false}
                    options={{
                        onPageChange: (page, sizePerPage) => {
                            this.reload(page, sizePerPage);
                        },
                        onSizePerPageList: sizePerPage => {
                            this.reload(1, sizePerPage);
                        },
                        page,
                        sizePerPage,
                    }
                    }
                >
                    <TableHeaderColumn width="10" isKey dataField='id'>Certificate ID</TableHeaderColumn>
                    <TableHeaderColumn width="30" dataField='name'>Name</TableHeaderColumn>
                    <TableHeaderColumn width="30" dataField='description'>Description</TableHeaderColumn>
                    <TableHeaderColumn width="20" dataField='id' dataFormat={(cell, row) => {
                        return <div>
                            <LinkContainer exact to={`/certificate/${row.id}`}>
                                <OverlayTrigger placement="top" overlay={
                                    <Tooltip id="tooltip">
                                        Edit
                                    </Tooltip>
                                }>
                                    <span className="text-success pointer"> <i
                                        className="fas fa-edit" /></span>
                                </OverlayTrigger>
                            </LinkContainer>
                            <span> </span>

                            <LinkContainer to={`/certificates`}>
                                <OverlayTrigger placement="top" overlay={
                                    <Tooltip id="tooltip">
                                        Delete
                                    </Tooltip>
                                }>
                                    <span className="text-danger pointer"
                                        onClick={() => this.delete(row.id)}> <i
                                            className="fas fa-trash-alt" /></span>
                                </OverlayTrigger>
                            </LinkContainer>

                            <LinkContainer exact to={`/certificateDetails/${row.id}`}>
                                <OverlayTrigger placement="top" overlay={
                                    <Tooltip id="tooltip">
                                        Check details
                                    </Tooltip>
                                }>
                                    <span className="text-info pointer"> <i
                                        className="fas fa-info-circle" /></span>
                                </OverlayTrigger>
                            </LinkContainer>





                        </div>
                    }}>Actions
                    </TableHeaderColumn>
                </BootstrapTable >
            }
        </div>
        );
    }
}



const mapStateToProps = ({ appState }) => ({
    userId: appState.userId,
})




const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        actions,
        dispatch)
});





export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Certificates)






