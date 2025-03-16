import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { TaskDetailsType } from "../types/types";

interface UseApiCallerReturnType {
  data: TaskDetailsType[] | null;
  isLoading: boolean;
  isError: Error | null;
  refetch: () => Promise<void>;
}

export default function useApiCaller(
  url: string,
  callType: "GET" | "POST" | "PUT" | "DELETE",
  body: Record<string, any> = {}
): UseApiCallerReturnType {
  const [data, setData] = useState<TaskDetailsType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<Error | null>(null);

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
      setData(response.data.data);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      console.error(err, "Error in fetching data");
      setIsError(err);

      if (err.message.includes("401") || err.message === "Unauthorized") {
        handleUnauthorized();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnauthorized = () => {
    window.location.href =
      import.meta.env.VITE_ENV === "development"
        ? import.meta.env.VITE_DEV_FE_URL
        : import.meta.env.VITE_PROD_FE_URL;
  };

  useEffect(() => {
    apiCaller();
  }, [url, callType, JSON.stringify(body)]);

  const refetch = async () => {
    setIsLoading(true);
    await apiCaller();
  };

  return { data, isLoading, isError, refetch };
}
