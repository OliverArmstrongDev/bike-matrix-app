import { useEffect, useState } from "react";
import { IUser } from "../models/User";

interface IError {
  type: string;
  message: string;
}

export const useData = () => {
  const initialError: IError = { type: "", message: "" };

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<IError>(initialError);
  const [data, setData] = useState<any>(null);

  // Simulate login...
  const [token, setToken] = useState<string>("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQ3ZmRhM2Y1ZDY1MzkwODI2Y2M4YTYiLCJuYW1lIjoiSmltIiwiZW1haWwiOiJqaW1AaGVyZS5jb20iLCJpYXQiOjE3MjU0OTQ4MTAsImV4cCI6MTcyODA4NjgxMH0.cyTYitg_vzmvsTGRy6uGhtjdOIuwKvTNsx101Q97iJQ");

  // Hardcoding to make it easier to run as this is only for a test project
  const url = "http://localhost:4000/api/bikes";
  

  const niceErrors = (err: any): IError => {
    if (err?.message?.includes('Access denied')) {
      return { type: "auth", message: "Please log in again" };
    }
    return { type: "generic", message: err?.message || "An unexpected error occurred" };
  };

  const fetchAllBikes = async () => {
    setLoading(true);
    try {
      if (!token) throw new Error("Invalid auth token");

      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();
      if (result?.errors) throw new Error(result?.message);

      setData(result);
      setError(initialError);
    } catch (err: any) {
      if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        setError({ type: 'network', message: 'Failed to connect to the server. Please check your network connection.' });
      } else {
        setError(niceErrors(err));
      }
    } finally {
      setLoading(false);
    }
  };

  const saveBike = async (values: any) => {
    setLoading(true);
    try {
      if (!token) throw new Error("Invalid auth token");

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (result?.errors) throw new Error(result?.message);

      setData(result);
      setError(initialError);
    } catch (err: any) {
     if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        setError({ type: 'network', message: 'Failed to connect to the server. Please check your network connection.' });
      } else {
        setError(niceErrors(err));
      }
    } finally {
      setLoading(false);
    }
  };

  const editBike = async (values: any) => {
    setLoading(true);
    try {
      if (!token) throw new Error("Invalid auth token");

      const response = await fetch(`${url}/${values._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (result?.errors) throw new Error(result?.message);

      setData({ ...result, edited: true });
      setError(initialError);
    } catch (err: any) {
     if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        setError({ type: 'network', message: 'Failed to connect to the server. Please check your network connection.' });
      } else {
        setError(niceErrors(err));
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteBike = async (id: number) => {
    setLoading(true);
    try {
      if (!token) throw new Error("Invalid auth token");

      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result?.errors) throw new Error(result?.message);

      console.log("🚀 ~ deleted: ", result);
      setData(result);
      setError(initialError);
    } catch (err: any) {
     if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        setError({ type: 'network', message: 'Failed to connect to the server. Please check your network connection.' });
      } else {
        setError(niceErrors(err));
      }
    } finally {
      setLoading(false);
    }
  };

  // Load bikes from DB...
  useEffect(() => {
    token?.length && fetchAllBikes();
  }, [token]);

  return {
    saveBike,
    editBike,
    deleteBike,
    setToken,
    token,
    error,
    data,
    loading
  };
};
