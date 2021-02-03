import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import API from '../helpers/Api';
import updateListImage from '../actions/index';

const ImageGrid = (props) => {
  const [listImages, setListImages] = useState([]);
  const { setSelectedImg, updateList } = props;

  const requestList = async () => {
    if (updateList) {
      props.dispatch(updateListImage(!updateList));
    }

    const list = await API.listImages();
    setListImages(list.values);
  };

  useEffect(() => {
    requestList();
  }, [updateList]);

  return (
    <div className="img-grid">
      {listImages &&
        listImages.map((img) => (
          <motion.div
            className="img-wrap"
            key={img.key}
            layout
            whileHover={{ opacity: 1, scale: 1.2 }}
            onClick={() => setSelectedImg(img)}
          >
            <motion.img
              src={img.base64}
              alt="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
          </motion.div>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  updateList: state.clickRequestList.updateList,
});

export default connect(mapStateToProps, null)(ImageGrid);
