/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 16/4/22
 * Time: 10:56
 */
'use strict';
import "./vendor/bootstrap/dist/css/bootstrap.min.css";
import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './routers/router';
import App from "./app.vue";

Vue.use(VueRouter);

let vueRouter = new VueRouter();
vueRouter.map(router);

document.addEventListener('DOMContentLoaded', () => {
    vueRouter.start(App, '#app');
}, false);