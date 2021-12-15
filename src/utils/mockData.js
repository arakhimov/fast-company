import { useEffect, useState } from "react";
import professions from "../mockData/professions.json";
import qualities from "../mockData/qualities.json";
import users from "../mockData/users.json";
import httpServices from "../services/http.service";

const useMockData = () => {
  const statusConsts = {
    idle: "Not started",
    pending: "In process",
    successed: "Ready",
    error: "Error occured"
  };

  const [status, setStatus] = useState(statusConsts.idle);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const summaryCount = users.length + professions.length + qualities.length;

  function incrementCount() {
    setCount((prevState) => prevState + 1);
  }

  function updateProgress() {
    const newProgress = Math.floor((count / summaryCount) * 100);
    if (newProgress !== 0 && status === statusConsts.idle) {
      setStatus(statusConsts.pending);
    }
    if (progress < newProgress) {
      setProgress(newProgress);
    }
    if (newProgress === 100) {
      setStatus(statusConsts.successed);
    }
  }

  useEffect(() => {
    updateProgress();
  }, [count]);

  async function initialize() {
    try {
      for (const prof of professions) {
        httpServices.put("profession/" + prof._id, prof);
        incrementCount();
      }
      for (const user of users) {
        httpServices.put("user/" + user._id, user);
        incrementCount();
      }
      for (const qual of qualities) {
        httpServices.put("quality/" + qual._id, qual);
        incrementCount();
      }
    } catch (error) {
      setError(error);
      setStatus(statusConsts.error);
    }
  }

  return { error, initialize, status, progress };
};

export default useMockData;
