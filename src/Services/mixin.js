import Vue from "vue";

export default {
    /** 
     *  for show notifications
     * @param {string} type 
     * @param {string} title 
     * @param {string} body 
     * @param {integer} duration 
     */
    (type = "s", title, body = null, duration = 5000) {

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
};




Vue.mixin({
    methods: {
        /** for capitalize first character */
        capitalized: str => str.charAt(0).toUpperCase() + str.slice(1),



    }
})
