import type { PolyglotOptions } from "node-polyglot";
import { translationsLogin } from "../../../features/login/Login.translation";
import { translationsSignUp } from "../../../features/signUp/SignUp.translation";
import { translationsNavBar } from "../../components/Navbar/Navbar.translation";
import { translationsPost } from "../../../features/post/Post.translation";
import { translationsProfile } from "../../../features/profile/Profile.translation";
import { translationsFavoriteUsers } from "../../../features/favoriteUsers/FavoriteUsers.translation";

const common = {
  es: {
    form: {
      required: "Requerido",
    },
    error: {
      unexpected: "Ha ocurrido un error inesperado",
    },
  },
  en: {
    form: {
      required: "Required",
    },
    error: {
      unexpected: "An unexpected error has occurred",
    },
  },
};

const polyglot: PolyglotOptions = {
  locale: "es",
  phrases: {
    es: {
      ...common.es,
      login: translationsLogin.es,
      signup: translationsSignUp.es,
      navbar: translationsNavBar.es,
      post: translationsPost.es,
      profile: translationsProfile.es,
      favorite_users: translationsFavoriteUsers.es,
    },
    en: {
      ...common.en,
      login: translationsLogin.en,
      signup: translationsSignUp.en,
      navbar: translationsNavBar.en,
      post: translationsPost.en,
      profile: translationsProfile.en,
      favorite_users: translationsFavoriteUsers.en,
    },
  },
};

export type LOCALE = "es" | "en";

export default polyglot;
