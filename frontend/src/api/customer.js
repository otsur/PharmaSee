import api from "./axios";

export const registerCustomer = (formData) =>
  api.post("/customers/register", formData);

export const loginCustomer = (data) =>
  api.post("/customers/login", data);

export const logoutCustomer = () =>
  api.post("/customers/logout");

export const refreshCustomerToken = () =>
  api.post("/customers/refresh-token");

export const changeCustomerPassword = (data) =>
  api.post("/customers/change-password", data);