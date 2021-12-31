const unsplahshApi = (keyword: string): Promise<any> => {
  const URL = (keyword: string) =>
    `https://api.unsplash.com/search/photos?page=1&query=${keyword}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESSKEY}`;
  return fetch(URL(keyword)).then((res) => res.json());
};

export default unsplahshApi;
