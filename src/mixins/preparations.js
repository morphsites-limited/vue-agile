import "core-js/modules/web.dom.iterable";
import "core-js/modules/es7.symbol.async-iterator";
import "core-js/modules/es6.symbol";
import "core-js/modules/es6.string.iterator";
import "core-js/modules/es6.array.from";
import "core-js/modules/es6.function.name";
import "core-js/modules/es6.regexp.to-string";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Carousel preparation methods
 */
var mixin = {
  methods: {
    /**
     * Prepare slides classes and styles
     */
    prepareSlides: function prepareSlides() {
      this.slides = this.htmlCollectionToArray(this.$refs.slides.children); // Probably timeout needed

      if (this.slidesCloned) {
        this.slidesClonedBefore = this.htmlCollectionToArray(this.$refs.slidesClonedBefore.children);
        this.slidesClonedAfter = this.htmlCollectionToArray(this.$refs.slidesClonedAfter.children);
      }

      var _iterator = _createForOfIteratorHelper(this.slidesAll),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var slide = _step.value;
          slide.classList.add('agile__slide');
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },

    /**
     *  Prepare slides active/current classes
     */
    prepareSlidesClasses: function prepareSlidesClasses() {
      var _this = this;

      if (this.currentSlide === null) {
        return false;
      } // Remove active & current classes


      for (var i = 0; i < this.countSlides; i++) {
        this.slides[i].classList.remove('agile__slide--active');
        this.slides[i].classList.remove('agile__slide--current');
      } // Add active & current class for current slide


      setTimeout(function () {
        return _this.slides[_this.currentSlide].classList.add('agile__slide--active');
      }, this.changeDelay);
      var start = this.slidesCloned ? this.countSlides + this.currentSlide : this.currentSlide;

      if (this.centerMode) {
        start -= Math.floor(this.settings.slidesToShow / 2) - +(this.settings.slidesToShow % 2 === 0);
      } // To account for the combination of infinite = false and centerMode = true, ensure we don't overrun the bounds of the slide count.


      for (var _i = Math.max(start, 0); _i < Math.min(start + this.settings.slidesToShow, this.countSlides); _i++) {
        this.slidesAll[_i].classList.add('agile__slide--current');
      }
    },

    /**
     * Prepare carousel styles
     */
    prepareCarousel: function prepareCarousel() {
      // Prepare track
      if (this.settings.unagile) {
        this.translateX = 0;
      } else {
        if (this.currentSlide === null && this.countSlides) {
          this.currentSlide = this.settings.initialSlide;
        }

        if (this.currentSlide > this.countSlides) {
          this.currentSlide = this.countSlides - 1;
        }

        this.goTo(this.currentSlide, false, false);
      }
    }
  }
};
export default mixin;