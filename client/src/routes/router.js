import affichePage from '@/pages/affichePage'
import filmPage from '@/pages/filmPage'
import filmsLayout from '@/pages/filmsLayout'
import {createRouter, createWebHistory} from "vue-router"

const routes = [
    { 
        path: '/',
        name: 'affiche',
        component: filmsLayout,
        children: [
            {
                path: '/',
                component: affichePage,
                name: 'affiche',
            },
            {
                path: 'films/:id',
                component: filmPage,
                name: 'filmPage',
            }

        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router;