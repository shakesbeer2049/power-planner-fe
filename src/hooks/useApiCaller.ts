import { useEffect, useState } from "react";
import axios from "axios";
import { TaskDetailsType } from "../types/types";
export default function useApiCaller(url:string, callType:string, body:{}) {
  const [data, setData] = useState<TaskDetailsType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<Error|null>(null);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (!jwt) throw "Unauthorized";
    const apiCaller = async () => {
      if (!url) {
        setIsError(new Error("URL is required"));
        setIsLoading(false);
        return;
      }

      try {
        const config = {
          method: callType,
          url: url || "",
          data: body || {},
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        };
        const response = await axios(config);
        const data = response.data.data;
        setData(data);
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        console.log(error, "error in fetching data");
        setIsError(err);
        if (
          err.message == "Request failed with status code 401" ||
          error == "Unauthorized"
        )
          window.location.href = "https://power-planner-fe-rpuw.onrender.com";
      } finally {
        setIsLoading(false);
      }
    };

    apiCaller();
  }, [url]);

  const refetch = async () => {
    if (!url) {
      setIsError(new Error("URL is required"));
      setIsLoading(false);
      return;
    }

    try {
      const config = {
        method: callType,
        url: url || "",
        data: body || {},
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios(config);
      const data = response.data.data;
      setData(data);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      console.log(err, "error in fetching data");
      setIsError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, isError, refetch };
}
