import { useCallback, useRef, useState, useEffect } from "react";
import Err from "../util/Err";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>();

  const activeHttpRequests = useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async (
      url: string,
      method: string = "GET",
      body: any = null,
      headers = {}
    ) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) throw new Error(responseData.message);

        setIsLoading(false);
        return responseData;
      } catch (e) {
        const error = e as Err;
        if (!httpAbortCtrl.signal.aborted) {
          setError(error.message || "Something went wrong, please try again");
          setIsLoading(false);
          throw error;
        }
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
    clearError,
  };
};
