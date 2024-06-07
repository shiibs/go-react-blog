import { useParams } from "react-router-dom";
import axios from "axios";

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "./Spinner";

export default function BlogDetail() {
  const params = useParams();
  const [apiData, setApiData] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:8000/" + params.id;
        const response = await axios.get(url);

        if (response.status === 200) {
          if (response?.data.statusText == "OK") {
            setApiData(response?.data?.blog_detail);
            setLoading(flase);
          }
        }
      } catch (error) {
        setLoading(false);
        console.log(error.response);
      }
    };

    fetchData();
    return () => {};
  }, []);
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div>
        <div>
          <h1>{apiData.title}</h1>
          <p>{apiData.post}</p>
        </div>
      </div>
    );
  }
}
