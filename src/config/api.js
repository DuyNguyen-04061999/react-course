import interceptorsRequest from "@/utils/interceptorsRequest";
import { interceptorsResponse } from "@/utils/interceptorsResponse";
import axios from "axios";

export const COURSE_API = import.meta.env.VITE_COURSE_API;
export const ORGANIZATION_API = import.meta.env.VITE_ORGANIZATION_API;
export const USER_API = import.meta.env.VITE_USER_API;
export const AUTHENTICATION_API = import.meta.env.VITE_AUTH_API;

// GENERAL
export const api = axios.create();
interceptorsResponse(api);
interceptorsRequest(api);
