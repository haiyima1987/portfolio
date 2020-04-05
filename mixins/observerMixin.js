export const observerMixin = {
  data: () => ({
    observer: null
  }),
  destroyed() {
    if (this.observer) {
      this.observer.disconnect();
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
      }
    }
  }
}
