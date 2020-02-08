import LocalDataHandler from "~/utils/LocalDataHandler";

export default function (context) {
  // isAuthenticated is set in nuxtServerInit of the root action
  if (context.server && !context.store.getters['auth/isAuthenticated']
    // if it's browser then check document cookie (available at client side)
    || context.browser && LocalDataHandler.getAccessToken() == null) {
    return context.redirect('/')
  }
}
