import { useState, useEffect } from "react";
import axios from "axios";

const useAuth = () => {
  const [response, setResponse] = useState<any>();
  const [error, setError] = useState("");
  const [loading, setloading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_HOST}/user`,
        withCredentials: true,
      })
        .then((res) => {
          setResponse(res.data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setloading(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { response, error, loading };
};

export default useAuth;
