import {SET_ERROR_MESSAGE} from "~/store/mutations";
import LocalDataHandler from "~/utils/LocalDataHandler";

export const observerMixin = {
  data: () => ({
    observer: null
  }),
  destroyed() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  mounted() {
    if (!LocalDataHandler.getLocalData(LocalDataHandler.KEY_WARNING)) {
      this.checkInternetExplorer();
    }
  },
  methods: {
    initializeObserver: function () {
      const lazyElements = document.querySelectorAll(`.lazy`)
      if ("IntersectionObserver" in window) {
        this.observer = new IntersectionObserver(function (entries, observer) {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              let element = entry.target
              let transition = element.dataset.transition
              element.classList.remove(`${transition}-start`)
              element.classList.add(`${transition}-end`)
            }
          }
        })
        // observe images
        for (const lazyImage of lazyElements) {
          this.observer.observe(lazyImage)
        }
      } else {
        this.$store.commit(SET_ERROR_MESSAGE, {
          error: `Intersection observer is not supported`,
          isPersistent: true
        })
      }
    },
    checkInternetExplorer: function () {
      const agent = window.navigator.userAgent;
      const isInternetExplorer = agent.includes("MSIE ");
      // If Internet Explorer, return version number
      if (isInternetExplorer > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        this.$store.commit(SET_ERROR_MESSAGE, {
          error: `You're using an old-fashioned browser. The styling might not be displayed properly`,
          isPersistent: true
        })
        LocalDataHandler.saveLocalData(LocalDataHandler.KEY_WARNING, 1)
      }
    }
  }
}
