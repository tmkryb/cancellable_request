import axios from "axios";

export const getAbortController = () => {
  return new AbortController();
};

export const getAxiosCancelSource = () => {
  return axios.CancelToken.source();
};

export const fetchSwapiPlanet = async (planetIndex, abortController) => {
  const result = await fetch(
    `https://www.swapi.tech/api/planets/${planetIndex}`,
    { signal: abortController?.signal }
  );

  const json = await result.json();
  return json.result.properties;
};

export const axiosSwapiPlanet = async (planetIndex, cancelSource) => {
  const result = axios.get(
    `https://www.swapi.tech/api/planets/${planetIndex}`,
    { cancelToken: cancelSource.token }
  );

  return (await result).data.result.properties;
};
