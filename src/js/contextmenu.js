class ContextMenu {
  constructor(player) {
    this.player = player;
    this.shown = false;

    this.player.template.menuItem.forEach((item, index) => {
      if (this.player.options.contextmenu[index].click) {
        item.addEventListener("click", () => {
          this.player.options.contextmenu[index].click(this.player);
          this.hide();
        });
      }
    });

    this.player.template.videoWrap.addEventListener("contextmenu", (e) => {
      const event = e || window.event;
      event.preventDefault();
      if (!this.player.videoLoaded) {
        return;
      }
      if (this.shown) {
        this.hide();
        return;
      }
      this.player.isShowMenu = true;

      const clientRect = this.player.template.videoWrap.getBoundingClientRect();
      this.show(event.clientX - clientRect.left, event.clientY - clientRect.top);

      this.player.template.mask.addEventListener("click", (e) => {
        this.hide();
      });
    });
  }

  show(x, y) {
    this.player.template.menu.classList.add("mfunsPlayer-menu-show");

    const clientRect = this.player.template.videoWrap.getBoundingClientRect();
    if (x + this.player.template.menu.offsetWidth >= clientRect.width) {
      this.player.template.menu.style.right = clientRect.width - x + "px";
      this.player.template.menu.style.left = "initial";
    } else {
      this.player.template.menu.style.left = x + "px";
      this.player.template.menu.style.right = "initial";
    }
    if (y + this.player.template.menu.offsetHeight >= clientRect.height) {
      this.player.template.menu.style.bottom = clientRect.height - y + "px";
      this.player.template.menu.style.top = "initial";
    } else {
      this.player.template.menu.style.top = y + "px";
      this.player.template.menu.style.bottom = "initial";
    }

    this.player.template.mask.classList.add("mfunsPlayer-mask-show");

    this.shown = true;
    this.player.events.trigger("contextmenu_show");
  }

  hide() {
    this.player.template.mask.classList.remove("mfunsPlayer-mask-show");
    this.player.template.menu.classList.remove("mfunsPlayer-menu-show");

    this.shown = false;
    this.player.events.trigger("contextmenu_hide");
  }
}

export default ContextMenu;
