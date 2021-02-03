import axios from 'axios';
import { message } from 'antd';

const baseUrl = 'http://localhost:3333/api/v1';

const API = {
  listImages: async () => {
    const resp = await axios.get(`${baseUrl}/attachments`);

    return resp.data;
  },

  saveImages: (formData) => {
    axios
      .post(`${baseUrl}/attachments`, formData)
      .then((resp) => {
        message.success(resp.data.message);
      })
      .catch((err) => {
        message.error(err);
      });
  },

  deleteImages: (key) => {
    axios
      .delete(`${baseUrl}/attachments/${key}`)
      .then((resp) => {
        message.success(resp.data.message);
      })
      .catch((err) => {
        message.error(err);
      });
  },
};

export default API;
