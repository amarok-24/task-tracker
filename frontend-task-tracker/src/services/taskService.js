import { apiUrl } from "../config.json";
import http from "./httpService";

const apiEndpoint = apiUrl + "tasks/";

const taskUrl = (taskId) => {
  return apiEndpoint + taskId + "/";
};

export const getTasks = async () => {
  return http.get(apiEndpoint);
};

export const getTask = async (taskId) => {
  return http.get(taskUrl(taskId));
};

export const saveTask = async (task) => {
  if (task.pk) {
    const taskBody = { ...task };
    delete taskBody.pk;
    return http.put(taskUrl(task.pk), taskBody);
  }

  return http.post(apiEndpoint, task);
};

export const deleteTask = async (taskId) => {
  return http.delete(taskUrl(taskId));
};
