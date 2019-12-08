
import VueProgressBar from 'vue-progressbar';
import Vue from 'vue';
Vue.use(VueProgressBar, {
    // color: 'rgb(143, 255, 199)',
    color: 'green',
    failedColor: 'red',
    height: '2px',
    failedColor: '#874b4b',
    thickness: '3px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
}); 