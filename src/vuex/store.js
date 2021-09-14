import Vue from 'vue';
import Vuex from 'vuex';
import ui from "./ui";
import domain from './domain';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        ui,
        domain,
    },
});
