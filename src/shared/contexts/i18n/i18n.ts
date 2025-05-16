import type { PolyglotOptions } from "node-polyglot";
import { translationsAuth } from "../../../features/auth/Auth.translation";
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
      auth: translationsAuth.es,
      navbar: translationsNavBar.es,
      post: translationsPost.es,
      profile: translationsProfile.es,
      favorite_users: translationsFavoriteUsers.es,
    },
    en: {
      ...common.en,
      auth: translationsAuth.en,
      navbar: translationsNavBar.en,
      post: translationsPost.en,
      profile: translationsProfile.en,
      favorite_users: translationsFavoriteUsers.en,
    },
  },
};

export type LOCALE = "es" | "en";

export default polyglot;
