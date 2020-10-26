/**
 * Component watchers
 */
var mixin = {
  watch: {
    // Recalculate settings
    currentBreakpoint: function currentBreakpoint() {
      // this.prepareSettings()
      this.$emit('breakpoint', {
        breakpoint: this.currentBreakpoint
      });
    },
    // Watch current slide change
    currentSlide: function currentSlide() {
      this.prepareSlidesClasses(); // Set start time of slide

      this.autoplayStartTimestamp = this.settings.autoplay ? +new Date() : null;
      this.$emit('after-change', {
        currentSlide: this.currentSlide
      });
    },
    // Watch drag distance change
    dragDistance: function dragDistance() {
      if (this.isMouseDown) {
        var rtl = this.settings.rtl;
        var dragDistance = this.dragDistance * (rtl ? -1 : 1);

        if (dragDistance > this.swipeDistance && this.canGoToPrev) {
          this.goToPrev();
          this.handleMouseUp();
        }

        if (dragDistance < -1 * this.swipeDistance && this.canGoToNext) {
          this.goToNext();
          this.handleMouseUp();
        }
      }
    },
    isAutoplayPaused: function isAutoplayPaused(nevValue) {
      var _this = this;

      if (nevValue) {
        // Store current slide remaining time and disable auto play mode
        this.remaining = this.settings.autoplaySpeed - (+new Date() - this.autoplayStartTimestamp);
        this.disableAutoPlay();
        this.clearAutoPlayPause();
      } else {
        // Go to next after remaining time and rerun auto play mode
        this.autoplayTimeout = setTimeout(function () {
          _this.clearAutoPlayPause();

          _this.goToNext();

          _this.toggleAutoPlay();
        }, this.remaining);
      }
    },
    'settings.autoplay': function settingsAutoplay() {
      this.toggleAutoPlay();
    },
    'settings.fade': function settingsFade() {
      this.toggleFade();
    },
    'settings.unagile': function settingsUnagile() {// this.prepareSlides()
      // this.prepareCarousel()
    },
    widthSlide: function widthSlide() {
      for (var i = 0; i < this.countSlidesAll; i++) {
        // console.log(this.widthSlide)
        // console.log(this.settings)
        this.slidesAll[i].style.width = "".concat(this.widthSlide).concat(this.widthSlide !== 'auto' ? 'px' : '');
      }
    },
    // Watch window width change
    widthWindow: function widthWindow(newValue, oldValue) {
      if (oldValue) {
        this.prepareCarousel();
        this.toggleFade();
      }
    }
  }
};
export default mixin;