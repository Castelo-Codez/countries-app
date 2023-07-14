import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/HomePage.vue";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: Home,
        },
        {
            path: "/deepInfo/:id",
          component: () => import("../views/deepinfo.vue"),
            name: "deepinfo"
        },
    ],
});

export default router;
