import Vue from 'vue';
import SideBar from './components/SideBar';
import router from './router';
import store from './vuex/store';
import './index.scss';

new Vue({
    el: '#vue-app',
    provide: {
        theme: 'classic',
    },
    components: {
        SideBar,
    },
    router,
    store,
});
