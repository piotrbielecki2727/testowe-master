import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { openModal, closeModal } from './ModalActions';
import { PrintTerms } from './Terms';

class DisplayModal extends Component {
    render() {
        const { modalTitle, modalContent, buttonText, buttonStyle } = this.props;


        return (
            <div>
                <Button style={buttonStyle} type='button' bsStyle="link" onClick={this.props.openModal}>
                    {buttonText}
                </Button>

                <Modal show={this.props.show} onHide={this.props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {modalContent}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = ({ modalState }) => ({
    show: modalState.show
});

const mapDispatchToProps = {
    openModal,
    closeModal
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayModal);