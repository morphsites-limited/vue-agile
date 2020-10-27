/**
 * All not public methods doesn't classified elsewhere
 */
var mixin = {
  methods: {
    clearAutoPlayPause: function clearAutoPlayPause() {
      clearTimeout(this.autoplayTimeout);
      this.autoplayRemaining = null;
    },
    disableAutoPlay: function disableAutoPlay() {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    },
    disableScroll: function disableScroll() {
      document.ontouchmove = function (e) {
        return e.preventDefault();
      };
    },
    enableScroll: function enableScroll() {
      document.ontouchmove = function () {
        return true;
      };
    },
    restartAutoPlay: function restartAutoPlay() {
      this.disableAutoPlay();
      this.toggleAutoPlay();
    },
    toggleAutoPlay: function toggleAutoPlay() {
      var _this = this;

      var enabled = !this.settings.unagile && this.settings.autoplay;

      if (!this.autoplayInterval && enabled) {
        this.autoplayInterval = setInterval(function () {
          if (!document.hidden) {
            if (!_this.canGoToNext) {
              _this.disableAutoPlay();
            } else {
              _this.goToNext();
            }
          }
        }, this.settings.autoplaySpeed);
      } else {
        this.disableAutoPlay();
      }
    },
    toggleFade: function toggleFade() {
      var enabled = !this.settings.unagile && this.settings.fade;

      for (var i = 0; i < this.countSlides; i++) {
        this.slides[i].style.transition = enabled ? 'opacity ' + this.settings.timing + ' ' + this.settings.speed + 'ms' : 'none';
        this.slides[i].style.transform = enabled ? "translate(-".concat(i * this.widthSlide, "px)") : 'none';
      }
    }
  }
};
export default mixin;