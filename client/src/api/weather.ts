const weatherApi = (): Promise<any> => {
  const getPosition = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  return getPosition().then((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const URL = () =>
      `http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&limit=5&appid=${process.env.REACT_APP_OPEN_WEATHER_PI}`;
    return fetch(URL()).then((res) => res.json());
  });
};

export const getImage = (icon: string) => {
  return `http://api.openweathermap.org/img/w/${icon}.png`;
};

export default weatherApi;
