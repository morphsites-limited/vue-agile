import "core-js/modules/es7.object.get-own-property-descriptors";
import "core-js/modules/es6.object.keys";
import "core-js/modules/web.dom.iterable";
import _defineProperty from "@babel/runtime-corejs2/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime-corejs2/helpers/esm/objectWithoutProperties";
import "core-js/modules/es6.number.constructor";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Component settings
 */
import orderBy from 'lodash.orderby';
var mixin = {
  props: {
    /**
     * Set the carousel to be the navigation of other carousels
     */
    asNavFor: {
      type: Array,
      default: function _default() {
        return [];
      }
    },

    /**
     * Enable autoplay
     */
    autoplay: {
      type: Boolean,
      default: false
    },

    /**
     * Autoplay interval in milliseconds
     */
    autoplaySpeed: {
      type: Number,
      default: 3000
    },

    /**
     * Enable centered view when slidesToShow > 1
     */
    centerMode: {
      type: Boolean,
      default: false
    },

    /**
     * Slides padding in center mode
     */
    centerPadding: {
      type: String,
      default: '15%'
    },

    /**
     * Slide change delay in milliseconds
     */
    changeDelay: {
      type: Number,
      default: 0
    },

    /**
     * Enable dot indicators/pagination
     */
    dots: {
      type: Boolean,
      default: true
    },

    /**
     * Enable fade effect
     */
    fade: {
      type: Boolean,
      default: false
    },

    /**
     * Infinite loop sliding
     */
    infinite: {
      type: Boolean,
      default: true
    },

    /**
     * Index of slide to start on
     */
    initialSlide: {
      type: Number,
      default: 0
    },

    /**
     * Enable mobile first calculation for responsive settings
     */
    mobileFirst: {
      type: Boolean,
      default: true
    },

    /**
     * Enable prev/next navigation buttons
     */
    navButtons: {
      type: Boolean,
      default: true
    },

    /**
     * All settings as one object
     */
    options: {
      type: Object,
      default: function _default() {
        return null;
      }
    },

    /**
     * Pause autoplay when a dot is hovered
     */
    pauseOnDotsHover: {
      type: Boolean,
      default: false
    },

    /**
     * Pause autoplay when a slide is hovered
     */
    pauseOnHover: {
      type: Boolean,
      default: true
    },

    /**
     * Object containing breakpoints and settings objects
     */
    responsive: {
      type: Array,
      default: function _default() {
        return null;
      }
    },

    /**
     * Enable right-to-left mode
     */
    rtl: {
      type: Boolean,
      default: false
    },

    /**
     * Number of slides to scroll
     */
    slidesToScroll: {
      type: Number,
      default: 1
    },

    /**
     * Number of slides to show
     */
    slidesToShow: {
      type: Number,
      default: 1
    },

    /**
     * Slide animation speed in milliseconds
     */
    speed: {
      type: Number,
      default: 300
    },

    /**
    * Swipe distance
    */
    swipeDistance: {
      type: Number,
      default: 50
    },

    /**
     * Throttle delay in milliseconds
     */
    throttleDelay: {
      type: Number,
      default: 500
    },

    /**
     * Transition timing function
     * Available: ease, linear, ease-in, ease-out, ease-in-out
     */
    timing: {
      type: String,
      default: 'ease',
      validator: function validator(value) {
        return ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out'].indexOf(value) !== -1;
      }
    },

    /**
     * Disable Agile carousel
     */
    unagile: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // Initial settings based on props and options object
    initialSettings: function initialSettings() {
      // options prop is excluded
      var _this$$props = this.$props,
          options = _this$$props.options,
          initialSettings = _objectWithoutProperties(_this$$props, ["options"]); // Join settings from options


      if (options) {
        initialSettings = _objectSpread(_objectSpread({}, initialSettings), options);
      } // Sort breakpoints


      if (initialSettings.responsive) {
        initialSettings.responsive = orderBy(initialSettings.responsive, 'breakpoint');
      }

      return initialSettings;
    },
    // Settings for current breakpoint
    settings: function settings() {
      var _this = this;

      var _this$initialSettings = this.initialSettings,
          responsive = _this$initialSettings.responsive,
          settings = _objectWithoutProperties(_this$initialSettings, ["responsive"]);

      if (responsive) {
        responsive.forEach(function (option) {
          if (settings.mobileFirst ? option.breakpoint < _this.widthWindow : option.breakpoint > _this.widthWindow) {
            for (var key in option.settings) {
              settings[key] = option.settings[key];
            }
          }
        });
      }

      return settings;
    }
  }
};
export default mixin;