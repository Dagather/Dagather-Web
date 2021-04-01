import React from 'react';

import PropTypes from 'prop-types';

import warn from 'Assets/img/icon/warn.svg';

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

function WarnModal(props) {
  const { isOpen, toggle, confirm } = props;

  const sendConfirm = () => {
    confirm(true);
    toggle();
  };

  return (
    <Modal className="warnModal" isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        삭제
      </ModalHeader>
      <ModalBody>
        <div className="warnModal__main">게시글을 삭제하시겠습니까?</div>
        <div className="warnModal__content">
          <img src={warn} alt="warnIcon" />
          <span className="warnModal__content__text">삭제 시 해당 게시글의 복구는 불가능합니다.</span>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggle}>취소</Button>
        <Button onClick={sendConfirm} color="danger">삭제</Button>
      </ModalFooter>
    </Modal>
  );
}

WarnModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default WarnModal;
