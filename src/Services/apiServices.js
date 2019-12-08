import Vue from "vue";

import Notifications from 'vue-notification';
import Axios from "axios";
import router from "../router";
import store from "../store";
Vue.use(Notifications)

export default {
    /**
    * For Notification Toast
    */
    notify(type = "s", title, body = null, duration = 5000) {

        let message_type = "success"

        switch (type) {
            case "s":
                message_type = "success"
                break;
            case "w":
                message_type = "warn"
                break;
            case "i":
                message_type = "info"
                break;
            case "e":
                message_type = "error"
                break;
            default:
                message_type = "success"
                break;
        }

        /**
         * Run Notification
         */
        Vue.notify({
            group: 'foo',
            title: title,
            type: message_type,
            text: body ? body : '',
            duration: duration,
        })
        // Vue.toasted.show(title, {
        //     theme: "toasted-primary",
        //     position: "top-right",
        //     duration: duration
        // });
    },

    /**
     * API Call
     */
    call(object) {
        var headers = {};
        if (object && object.headers) {
            headers = object.headers;
        }

        return {
            // post: async (request) => { return await Axios.post(object.url, request, headers).then(response => response.data); },
            // get: async () => { return await Axios.get(object.url).then(response => response.data); },
            // getOne: async (id) => { return await Axios.get(object.url + id).then(response => response.data); },
            // getAll: async () => { return await Axios.put(object.url).then(response => response.data); },
            // update: async (toUpdate) => { return await Axios.put(object.url, toUpdate, headers).then(response => response.data); },
            // create: async (toCreate) => await Axios.put(object.url, toCreate, headers).then(response => response.data),
            // delete: async (id) => { return await Axios.delete(object.url + id).then(response => response.data); },
            // deleteMany: async (request) => { return await Axios.post(object.url, request).then(response => response.data) },

            post: async (request) => { return await this.callAPIService("post", object.url, request, headers) },
            get: async () => { return await this.callAPIService("get", object.url) },
            getOne: async (id) => { return await this.callAPIService("get", object.url + id) },
            getAll: async () => { return await this.callAPIService("put", object.url) },
            update: async (request) => { return await this.callAPIService("put", object.url, request, headers) },
            create: async (request) => { return await this.callAPIService("put", object.url, request, headers) },
            delete: async (id) => { return await this.callAPIService("delete", object.url + id) },
            deleteMany: async (request) => { return await this.callAPIService("post", object.url, request) },

        }
    },

    callAPIService: async (method, url, req = null, headers = null) => {
        //  pass
        return await Axios[method](url, req, headers).
            then((res) => {
                // console.log("Response ", res);

                if (res.status == 200) {
                    /** code is 401 means unauthenticated user need to login */
                    if (res.data.status == 401) {
                        // pass
                        console.log("Removed Auth Details");

                        store.getters.removeAuthDetails()
                        // this.$store.getters.removeAuthDetails()

                        router.go('login')
                        this.$router.go('login')

                    }
                }
                return res.data
            })/* .catch((e) => {
                console.log("Custom Exception", e);
            }) */;
    }

} 