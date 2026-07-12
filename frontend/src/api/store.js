import api from "./axios";

export const registerStore = (formData) =>
  api.post("/stores/register", formData);

export const loginStore = (data) =>
  api.post("/stores/login", data);

export const logoutStore = () =>
  api.post("/stores/logout");

export const refreshStoreToken = () =>
  api.post("/stores/refresh-token");

export const changeStorePassword = (data) =>
  api.post("/stores/change-password", data);