import React from 'react';
import { motion } from 'framer-motion';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import API from '../helpers/Api';
import updateListImage from '../actions/index';

const Modal = (props) => {
  const { setSelectedImg, selectedImg } = props;

  const handleClick = (e) => {
    if (e.target.classList.contains('modalImg')) {
      setSelectedImg(null);
    }
  };

  const deleteImage = async (event) => {
    event.preventDefault();

    await API.deleteImages(selectedImg.key);

    setSelectedImg(null);
    props.dispatch(updateListImage(!props.updateList));
  };

  return (
    <motion.div
      className="modalImg"
      onClick={handleClick}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      <motion.img
        src={selectedImg.base64}
        alt="upload"
        initial={{ y: '-50vh' }}
        animate={{ y: 1 }}
      />
      <Button
        type="primary"
        danger
        size="large"
        icon={<DeleteOutlined />}
        style={{
          display: 'block',
          margin: '60px auto',
        }}
        onClick={deleteImage}
      >
        Deletar imagem
      </Button>
    </motion.div>
  );
};

export default connect((store) => ({
  updateList: store.updateList,
}))(Modal);
