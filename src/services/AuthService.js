import ApiService from './ApiService'
import { PERSIST_STORE_NAME } from 'constants/app.constant';
import deepParseJson from 'utils/deepParseJson';

async function signInReq(user) {
    try {
        console.log("user", user);
        const resp = await fetch(`${process.env.REACT_APP_API_URL}api/v1/api-token-auth/`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const data = resp.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function apiSignIn(data) {
    const user = {
        username: data.userName,
        password: data.password
    }

    return signInReq(user);
}

export async function apiSignUp(data) {
    return ApiService.fetchData({
        url: '/sign-up',
        method: 'post',
        data,
    })
}

export async function apiSignOut(data) {
    return ApiService.fetchData({
        url: '/sign-out',
        method: 'post',
        data,
    })
}

export async function apiForgotPassword(data) {
    return ApiService.fetchData({
        url: '/forgot-password',
        method: 'post',
        data,
    })
}

export async function apiResetPassword(data) {
    return ApiService.fetchData({
        url: '/reset-password',
        method: 'post',
        data,
    })
}
