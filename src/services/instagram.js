const INSTA_TOKEN = 'apsidal_instagram_account_token';
const INSTA_ID = 'apsidal_instagram_account_id';
const INSTA_BUSINESS = 'apsidal_instagram_account_business';

export const setInstagram = (token, id, bussinessId) => {
  localStorage.setItem(INSTA_TOKEN, token);
  localStorage.setItem(INSTA_ID, id);
  localStorage.setItem(INSTA_BUSINESS, bussinessId);
};

export const getInstagram = () => {
  return {
    token: localStorage.getItem(INSTA_TOKEN),
    id: localStorage.getItem(INSTA_ID),
    bussinessId: localStorage.getItem(INSTA_BUSINESS)
  };
};
