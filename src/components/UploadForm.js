import React, { useState } from 'react';
import { Form, Button, Upload, Modal, Alert } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import API from '../helpers/Api';
import updateListImage from '../actions/index';

const { Dragger } = Upload;

const UploadForm = (props) => {
  const [files, setFiles] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [showError, setShowError] = useState();

  function handleUpload({ fileList }) {
    setFiles(fileList);
    setShowError(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (files.length) {
      const formData = new FormData();

      formData.append('base64', files[0].thumbUrl);
      formData.append('name', files[0].name);
      formData.append('type', files[0].type);

      API.saveImages(formData);

      setFiles([]);
      setShowError(false);
      props.dispatch(updateListImage(!props.updateList));
    } else {
      setShowError(true);
    }
  };

  function handlePreview(file) {
    setPreviewImage(file.thumbUrl);
    setPreviewVisible(true);
  }

  function handleCancel() {
    setPreviewVisible(false);
  }

  return (
    <div className="formUpload">
      <Form>
        <Form.Item className="draggerUpload">
          <Dragger
            listType="picture"
            fileList={files}
            onChange={handleUpload}
            onPreview={handlePreview}
            beforeUpload={() => false}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Clique ou arraste o arquivo para esta área para fazer o upload
            </p>
          </Dragger>
        </Form.Item>

        <Form.Item style={!showError ? { display: 'none' } : {}}>
          <Alert message="Aviso" description="Insira uma imagem" type="error" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Envie sua foto
          </Button>
        </Form.Item>
      </Form>

      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default connect((store) => ({
  updateList: store.updateList,
}))(UploadForm);
