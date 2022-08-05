class Thumbnails {
  constructor(options) {
    this.container = options.container;
    this.barWidth = options.barWidth;
    this.events = options.events;
    this.isShow = true;
    if (options.url) this.container.style.backgroundImage = `url('${options.url}')`;
    else this.hide();
  }
  reload(url) {
    if (url) {
      this.container.style.backgroundImage = `url('${url}')`;
    } else {
      this.container.style.backgroundImage = null;
      this.hide();
    }
  }
  resize(width, height, barWrapWidth) {
    this.container.style.width = `${width}px`;
    this.container.style.height = `${height}px`;
    this.container.style.top = `${-height - 10}px`;
    if (barWrapWidth) {
      this.barWidth = barWrapWidth;
    }
  }

  show() {
    if (this.container.style.backgroundImage) {
      this.container.style.display = "block";
      this.isShow = true;
      this.events && this.events.trigger("thumbnails_show");
    }
  }

  move(position) {
    if (this.container.style.backgroundImage) {
      this.show();
      this.container.style.backgroundPosition = `-${(Math.ceil((position / this.barWidth) * 50) - 1) * 160}px 0`;
      this.container.style.left = `${Math.min(
        Math.max(position - this.container.offsetWidth / 2, 0),
        this.barWidth - 160
      )}px`;
    }
  }

  hide() {
    this.container.style.display = "none";
    this.isShow = false;
    this.events && this.events.trigger("thumbnails_hide");
  }
}

export default Thumbnails;
