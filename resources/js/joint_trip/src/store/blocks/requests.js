import axios from 'axios';

export default {

  /**
     * Загрузка файла на сервер
     * @param {string} url
     * @param {object} formData
     * @returns
     */
  async uploadFile(url, formData) {
    try {
      const { data } = await axios.post(
        url,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
        // console.log(data);
      if (data.success === true) {
        return { success: true };
      }
      return { success: false, error: data.message };
      //
    } catch (error) {
      console.log(error);
      return { success: false, error };
    }
  },
  async getJson(url) {
    try {
      const { data } = await axios.get(url);

      if (data.success === true) {
        return { success: true, data };
      }
      return { success: false, error: data.message };
    } catch (error) {
      console.log(error);
      return { success: false, error };
    }
  },

};
