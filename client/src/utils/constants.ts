export const HOST = process.env.SERVER_URL;
export const API_URL = `${HOST}/api`;
export const IMAGES_URL = `${HOST}/uploads`;

export const AUTH_ROUTES = `${API_URL}/auth`;
export const GIG_ROUTES = `${API_URL}/gigs`;

export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const SOCIAL_LOGIN_ROUTE = `${AUTH_ROUTES}/social-login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/get-user-info`;

export const ADD_GIG_ROUTE = `${GIG_ROUTES}/add`;
export const GET_USER_GIGS_ROUTE = `${GIG_ROUTES}/get-user-gigs`;
export const GET_GIG_DATA = `${GIG_ROUTES}/get-gig-data`;
export const EDIT_GIG_DATA = `${GIG_ROUTES}/edit-gig`;
