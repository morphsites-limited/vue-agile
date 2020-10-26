/**
 * Throttle methods by lodash
 */
import throttle from 'lodash.throttle';
var mixin = {
  created: function created() {
    this.goTo = throttle(this.goTo, this.throttleDelay);
    this.getWidth = throttle(this.getWidth, 500);
  }
};
export default mixin;