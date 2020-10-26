/**
 * Helpers methods
 */
var mixin = {
  methods: {
    /**
     * Set window & container width
     */
    getWidth: function getWidth() {
      if (this.isSSR) {
        return false;
      }

      this.widthWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      this.widthContainer = this.$refs.list.clientWidth;
    },

    /**
     * Convert HTML Collection to JS Array
     */
    htmlCollectionToArray: function htmlCollectionToArray(collection) {
      return Array.prototype.slice.call(collection, 0);
    }
  }
};
export default mixin;