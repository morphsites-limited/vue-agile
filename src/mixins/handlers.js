/**
 * Handlers methods for mouse/touch events
 */
var mixin = {
  methods: {
    handleMouseDown: function handleMouseDown(e) {
      this.isMouseDown = true;

      if (e.type.indexOf('touch') !== -1) {
        this.dragStartX = e.touches[0].clientX;
        this.dragStartY = e.touches[0].clientY;
      }

      if (e.type.indexOf('mouse') !== -1) {
        this.dragStartX = e.clientX;
        this.dragStartY = e.clientY;
      }
    },
    handleMouseMove: function handleMouseMove(e) {
      var positionX;
      var positionY;

      if (e.type.indexOf('touch') !== -1) {
        positionX = e.touches[0].clientX;
        positionY = e.touches[0].clientY;
      }

      if (e.type.indexOf('mouse') !== -1) {
        positionX = e.clientX;
        positionY = e.clientY;
      }

      var dragDistanceX = Math.abs(positionX - this.dragStartX);
      var dragDistanceY = Math.abs(positionY - this.dragStartY);

      if (dragDistanceX > 3 * dragDistanceY) {
        this.disableScroll();
        this.dragDistance = positionX - this.dragStartX;
      }
    },
    handleMouseUp: function handleMouseUp() {
      this.isMouseDown = false;
      this.enableScroll();
    },
    handleMouseOver: function handleMouseOver(element) {
      if (this.settings.autoplay) {
        if (element === 'dot' && this.settings.pauseOnDotsHover || element === 'track' && this.settings.pauseOnHover) {
          this.isAutoplayPaused = true;
        }
      }
    },
    handleMouseOut: function handleMouseOut(element) {
      if (this.settings.autoplay) {
        if (element === 'dot' && this.settings.pauseOnDotsHover || element === 'track' && this.settings.pauseOnHover) {
          this.isAutoplayPaused = false;
        }
      }
    }
  }
};
export default mixin;