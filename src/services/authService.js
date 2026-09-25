import api from "../lib/axios";

export async function login(username, password) {
  const response = await api.post("/auth/login", {
    username: username,
    password: password,
  });

  return response.data;
}