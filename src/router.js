import Vue from "vue"
import VueRouter from "vue-router"

import Home from "./pages/home/Index"
import Contact from "./pages/contact/Index"

Vue.use(VueRouter)

export const router = new VueRouter({
    routes: [
        {
            path: "/",
            component: Home,
        },
        {
            path: "/contact",
            component: Contact,
        }
    ],
    mode: "history",
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
})