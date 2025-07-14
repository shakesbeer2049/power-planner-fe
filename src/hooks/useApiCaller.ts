import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

type UseApiCallerReturnType<T> = {
  data: T | null;
  isLoading: boolean;
  isError: Error | null;
  refetch: () => Promise<void>;
};

export default function useApiCaller<T = unknown>(
  url: string,
  callType: "GET" | "POST" | "PUT" | "DELETE",
  body?: Record<string, unknown>
): UseApiCallerReturnType<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<Error | null>(null);

  const handleUnauthorized = () => {
    window.location.href =
      import.meta.env.VITE_ENV === "development"
        ? import.meta.env.VITE_DEV_FE_URL
        : import.meta.env.VITE_PROD_FE_URL;
  };

  const apiCaller = async () => {
    if (!url) {
      setIsError(new Error("URL is required"));
      setIsLoading(false);
      return;
    }

    const jwt = localStorage.getItem("token");
    if (!jwt) {
      setIsError(new Error("Unauthorized"));
      handleUnauthorized();
      return;
    }

    try {
      setIsLoading(true);

      const config: AxiosRequestConfig = {
        method: callType,
        url,
        data: callType !== "GET" ? body : undefined,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      };
      const response = await axios(config);
      setData(response.data.data as T);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      setIsError(err);

      if (err.message.includes("401") || err.message === "Unauthorized") {
        handleUnauthorized();
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    apiCaller();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, callType, JSON.stringify(body)]);

  const refetch = async () => {
    setIsLoading(true);
    await apiCaller();
  };

  return { data, isLoading, isError, refetch };
}
