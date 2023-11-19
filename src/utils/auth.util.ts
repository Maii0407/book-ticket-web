export const authStorage = {
  token: {
    get: () => {
      const data = window.localStorage.getItem('application');

      if (data) {
        const parsedData = JSON.parse(data);

        return parsedData.state.token;
      }

      return '';
    },
  },
};
