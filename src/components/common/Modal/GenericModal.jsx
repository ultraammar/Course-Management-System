import React, { useState } from "react";
import { Button, Modal } from "antd";

import {useDispatch } from 'react-redux';
import "./GenericModal.scss";


//dispatch(setDataToUpdate(false));
const GenericModal = ({ isModalOpen, setIsModalOpen, title='', okMethod, children }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    okMethod();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Delete"
        okType="danger"
        // cancelButtonProps={{ style: { visibility: 'hidden' } }}
      >

        
        {children}
      </Modal>
    </div>
  );
};

export default GenericModal;
