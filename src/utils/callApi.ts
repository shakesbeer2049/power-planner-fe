import axios, { AxiosError } from "axios";

export const callApi = async (url: string, method: string, body: unknown) => {
  const jwt = localStorage.getItem("token");
  const baseURL =
    import.meta.env.VITE_ENV === "development"
      ? import.meta.env.VITE_DEV_BE_URL
      : import.meta.env.VITE_PROD_BE_URL;
  if (!url) {
    throw new Error("URL is required");
  }

  try {
    const config = {
      method: method,
      url: baseURL + url,
      data: body || {},
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt ? `Bearer ${jwt}` : "",
      },
    };
    // console.log("axios config", config);
    const response = await axios(config);
    // console.log("axios response", response);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error, "error in fetching data");
    if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      (error as { message?: string }).message ===
        "Request failed with status code 401"
    ) {
      return (error as AxiosError).response?.data;
    }
    return error;
  }
};
