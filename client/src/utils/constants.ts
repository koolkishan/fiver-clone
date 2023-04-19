export const HOST = process.env.SERVER_URL;
export const API_URL = `${HOST}/api`;

export const AUTH_ROUTES = `${API_URL}/auth`;
export const GIG_ROUTES = `${API_URL}/gigs`;

export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const SOCIAL_LOGIN_ROUTE = `${AUTH_ROUTES}/social-login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/get-user-info`;

export const ADD_GIG_ROUTE = `${GIG_ROUTES}/add`;
