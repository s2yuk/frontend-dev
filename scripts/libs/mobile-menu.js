class MobileMenu{
  constructor(){
    this.DOM = {};
    this.DOM.btn = document.querySelector('.mobile-menu__btn');
    this.DOM.cover = document.querySelector('.mobile-menu__cover');
    this.DOM.container = document.querySelector('#global-container');
    this.eventType = this._getEventType();//特定の処理は切り出して呼び出し
    this._addEvent(); //呼び出し

  }
  _getEventType(){
    return window.ontouchstart ? 'touchstart' : 'click';
  }
  _toggle(){
    this.DOM.container.classList.toggle('menu-open');
  }
  _addEvent(){
    this.DOM.btn.addEventListener(this.eventType,this._toggle.bind(this));
    this.DOM.cover.addEventListener(this.eventType,this._toggle.bind(this));
  }
}
