import router from '../router';
import axios from 'axios';
import { SendInfoMessage, SendErrorMessage, SendWarningMessage, SendSuccessMessage } from './message.js'
import { Windows } from '@vicons/fa';
var baseurl = import.meta.env.VITE_V1_API
export const dologin = async (user, password) => {
    try {
        var url = baseurl + "/auth/login"
        var body_json = JSON.stringify({
            "user": user,
            "password": password
        });
        var Headers = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let data = await axios.post(url, body_json, Headers)
        if (data.data.code == 200) {
            var message_ = data.data.msg
            getuserdata(user,data.data.token)
            sessionStorage.setItem("token", data.data.token);
            sessionStorage.setItem("user", user);
            router.push("/app")
            SendSuccessMessage(message_)
        }
        else {
            var message__ = data.data.msg
            SendWarningMessage(message__)
        }

    } catch (error) {
        console.error(error.code)
        SendErrorMessage(error.code)
    }
}
export const doregister = async (user, password) => {
    try {
        var url = baseurl + "/auth/register"
        var body_json = JSON.stringify({
            "user": user,
            "password": password
        });
        var Headers = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let data = await axios.post(url, body_json, Headers)
        if (data.data.code == 200) {
            var message_ = data.data.msg
            SendSuccessMessage(message_)
            router.push("/auth/login")
        }
        else {
            var message__ = data.data.msg
            SendWarningMessage(message__)
        }

    } catch (error) {
        console.error(error.code)
        SendErrorMessage(error.code)
    }
}
export const dologinout = async (user, token) => {
    try {
        var url = baseurl + "/auth/loginout"
        var body_json = JSON.stringify({
            "user": user,
            "token": token
        });
        var Headers = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let data = await axios.post(url, body_json, Headers)
        if (data.data.code == 200) {
            sessionStorage.clear();
            router.push("/")
            SendSuccessMessage(data.data.msg)
        }
        else {
            var message__ = data.data.msg
            SendWarningMessage(message__)
        }

    } catch (error) {
        console.error(error.code)
        SendErrorMessage(error.code)
    }
}
export const editnickname = async (user, token, nickname) => {
    try {
        var url = baseurl + "/auth/edit/nickname"
        var body_json = JSON.stringify({
            "user": user,
            "token": token,
            "nickname": nickname
        });
        var Headers = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let data = await axios.post(url, body_json, Headers)
        if (data.data.code == 200) {
            sessionStorage.setItem("nickname", nickname);
            SendSuccessMessage("修改成功" + "\n『" + data.data.oldnickname + "=>" + data.data.newnickname + "』")
        }
        else {
            var message__ = data.data.msg
            SendWarningMessage(message__)
        }

    } catch (error) {
        console.error(error.code)
        SendErrorMessage(error.code)
    }
}

export const getuserdata = async (user, token) => {
    try {
        var url = baseurl + "/auth/userdata"
        var body_json = JSON.stringify({
            "user": user,
            "token": token
        });
        var Headers = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let data = await axios.post(url, body_json, Headers)
        if (data.data.code == 200) {
            sessionStorage.setItem("nickname", data.data.nickname);
            sessionStorage.setItem("uid", data.data.uid);
        }
        else {
            var message__ = data.data.msg
            SendWarningMessage(message__)
        }

    } catch (error) {
        console.error(error.code)
        SendErrorMessage(error.code)
    }
}
export function havetoken () {
    if (sessionStorage.getItem('token')){
        return true;
    }else{
        return false;
    }
}
