export const HOST = process.env.SERVER_URL;
export const API_URL = `${HOST}/api`;

export const AUTH_ROUTES = `${API_URL}/auth`;

export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const SOCIAL_LOGIN_ROUTE = `${AUTH_ROUTES}/social-login`;
