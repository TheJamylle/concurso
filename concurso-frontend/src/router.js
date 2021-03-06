import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Components from "./views/Components.vue";
import Candidato from "./views/Candidato.vue";
import Contest from "./views/Contest.vue";
import Area from "./views/Area.vue";
import Avaliador from "./views/Avaliador.vue";
import Avaliacao from "./views/Avaliacao.vue";
import Login from "./views/Login.vue";
import Premio from "./views/Premio.vue";
import Projeto from "./views/Projeto.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";

Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "contest",
      components: {
        header: AppHeader,
        default: Contest,
        footer: AppFooter
      }
    },
    {
      path: "/components",
      name: "components",
      components: {
        header: AppHeader,
        default: Components,
        footer: AppFooter
      }
    },
    {
      path: "/avaliacao",
      name: "avaliacao",
      components: {
        header: AppHeader,
        default: Avaliacao,
        footer: AppFooter
      }
    },
    {
      path: "/area",
      name: "area",
      components: {
        header: AppHeader,
        default: Area,
        footer: AppFooter
      }
    },
    {
      path: "/avaliador",
      name: "avaliador",
      components: {
        header: AppHeader,
        default: Avaliador,
        footer: AppFooter
      }
    },
    {
      path: "/projeto",
      name: "projeto",
      components: {
        header: AppHeader,
        default: Projeto,
        footer: AppFooter
      }
    },
    {
      path: "/premio",
      name: "premio",
      components: {
        header: AppHeader,
        default: Premio,
        footer: AppFooter
      }
    },
    {
      path: "/candidato",
      name: "candidato",
      components: {
        header: AppHeader,
        default: Candidato,
        footer: AppFooter
      }
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
        footer: AppFooter
      }
    },
    {
      path: "/register",
      name: "register",
      components: {
        header: AppHeader,
        default: Register,
        footer: AppFooter
      }
    },
    {
      path: "/profile",
      name: "profile",
      components: {
        header: AppHeader,
        default: Profile,
        footer: AppFooter
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
