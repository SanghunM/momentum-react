const quoteApi = (): Promise<any> => {
  const URL = (proxyUrl: string) =>
    `${proxyUrl}http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json`;
  return fetch(URL("https://cors-anywhere.herokuapp.com/")).then((res) => {
    if (res.status === 403) {
      console.log("error");
      throw new Error("Auote Api is not avaibale at this moment ");
    }
    return res.json();
  });
};

export default quoteApi;
