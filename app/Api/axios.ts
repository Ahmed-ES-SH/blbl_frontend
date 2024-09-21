"use client";
import axios from "axios";
import Cookie from "cookie-universal";

const cookie = Cookie();

const token = cookie.get("token");

export const instance = axios.create({
  baseURL: "https://alrajhost.com/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
