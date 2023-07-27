import router from '../router';
import axios from 'axios';
import { SendInfoMessage, SendErrorMessage, SendWarningMessage, SendSuccessMessage } from './message.js'
var baseurl = import.meta.env.VITE_V1_API
export const addmessage = async (user, token, post) => {
    try { //http://127.0.0.1:5000/app/lovewall/add
        var url = baseurl + "/app/lovewall/add"
        // {
        //     "user": "test",
        //     "post": "王宇航哥哥~",
        //     "token": "07421f8b4f869dac7a1ca44b04a56d7e"
        // }
        var body_json = JSON.stringify({
            "user": user,
            "token": token,
            "post": post
        });
        var Headers = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let data = await axios.post(url, body_json, Headers)
        if (data.data.code == 200) {
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
export const getmessage = async (user, token) => {
    try {
        //http://127.0.0.1:5000/app/lovewall/get
        var url = baseurl + "/app/lovewall/get"
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
        return (data.data)

    } catch (error) {
        console.error(error.code)
        SendErrorMessage(error.code)
        return ('[ { "Fid": -1, "Nickname": "万墙之主——墙长", "Post": "亲爱的云，当你看到这篇帖子的时候就证明墙的后端炸了\n你可以尝试联系我们让我们修复\n邮箱：littttt87@hotmail.com", "tag": "炸了", "Time": "1609291836" }]')
        
    }
}
export const getstatus = async (user, token) => {
    try {
        //http://127.0.0.1:5000/app/lovewall/status
        var url = baseurl + "/app/lovewall/status"
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
        return (data.data)

    } catch (error) {
        console.error(error.code)
        SendErrorMessage(error.code)
        return ('{"next_action": "LoveWallGSD-BOMB!","now_action": "LoveWallGSD-BOMB!"}')
        
    }
}

