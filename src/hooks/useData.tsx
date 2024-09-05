import { useEffect, useState } from "react";
import { useApp } from "./useApp";
import { IUser } from "../models/User";

export const useData = () => {
  const [saving, setSaving] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  
  const [saveError, setSaveError] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const [data, setData] = useState<any>(null);
  const [authData, setAuthData] = useState<IUser | null>(null);

  // Simulate login...
  const [token, setToken] = useState<string>("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQ3ZmRhM2Y1ZDY1MzkwODI2Y2M4YTYiLCJuYW1lIjoiSmltIiwiZW1haWwiOiJqaW1AaGVyZS5jb20iLCJpYXQiOjE3MjU0OTQ4MTAsImV4cCI6MTcyODA4NjgxMH0.cyTYitg_vzmvsTGRy6uGhtjdOIuwKvTNsx101Q97iJQ");

  const url = "http://bikematrix-api:4000/api/bikes";

  // Could also check for status code 403 instead
  const niceErrors = (err: any) => (err?.message as string).includes('Access denied') ? "Please log in again" : err;

  const fetchLoggedInUser = async () => {
    setAuthLoading(true);
    try {
      if(!token) {throw new Error("Invalid auth token");}
      const response = await fetch("http://bikematrix-api:4001/api/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result?.errors) {
        throw new Error(result?.message);
      }
      setAuthData(result);
      setAuthError(null);
    } catch (err: any) {
      setAuthError(niceErrors(err));
    } finally {
      setAuthLoading(false);
    }
  };

  const fetchAllBikes = async () => {
    setLoading(true);
    try {
      if(!token) {throw new Error("Invalid auth token");}
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      const result = await response.json();
      if (result?.errors) {
        throw new Error(result?.message);
      }
      setData(result);
      setFetchError(null);
    } catch (err: any) {
      setSaveError(niceErrors(err));
    } finally {
      setLoading(false);
    }
  };

  
  const saveBike = async (values: any) => {
    setSaving(true);
    try {
      if(!token) {throw new Error("Invalid auth token");}
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (result?.errors) {
        throw new Error(result?.message);
      }
      setData(result);
      setSaveError(null);
    } catch (err: any) {
      setSaveError(niceErrors(err));
    } finally {
      setSaving(false);
    }
  };

  const editBike = async (values: any) => {
    setSaving(true);
    try {
      if(!token) {throw new Error("Invalid auth token");}
      const response = await fetch(`${url}/${values._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (result?.errors) {
        throw new Error(result?.message);
      }
      setData({...result, edited: true});
      setSaveError(null);
    } catch (err: any) {
      setSaveError(niceErrors(err));
    } finally {
      setSaving(false);
    }
  };

  const deleteBike = async (id: number) => {
    setSaving(true);
    try {
      if(!token) {throw new Error("Invalid auth token");}
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result?.errors) {
        throw new Error(result?.message);
      }
      console.log("🚀 ~ deleted: ", result);
      setData(result);
      setDeleteError(null);
    } catch (err: any) {
      setDeleteError("Delete Error: " + err);
    } finally {
      setSaving(false);
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
    fetchLoggedInUser,
    setToken,
    token,
    authError,
    saving,
    fetchError,
    saveError,
    deleteError,
    data,
    authData,
    loading,
    authLoading,
  };
};
