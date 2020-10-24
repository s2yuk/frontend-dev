
class ScrollObserver{
  constructor(els, cb,options){
      this.els = document.querySelectorAll(els);

      const defaultOptions = {
          root: null,
          rootMargin: "0px",
          threshold: 0,
          once:true //デフォルトはtrue
      };
      this.cb = cb;   //一度this.cbに格納してinit(){if(){ここ}}で呼び出す

      this.options = Object.assign(defaultOptions, options);
      this.once = this.options.once; //設定さればfalseに上書き
      // 
      this._init();
  }

  _init(){
      const callback = function (entries, observer) {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  // const ta = new TextAnimation(entry.target);
                  // ta.animate();
                  // ↓
                  this.cb(entry.target, true);//第一に監視要素、第二に交差判定を渡すcb関数内でも判定できるようにする◎(isIntersectingがtrue/false)
                  if(this.once){
                      observer.unobserve(entry.target);  //１回で止める
                      // once:false->実行されない（止めない）
                  }
              } else {
                  this.cb(entry.target, false);
              }
          });
      };
      //bind(this)=scrollObserver{}のthisを参照するのでthis.cbのthisになる
      this.io = new window.IntersectionObserver(callback.bind(this), this.options); 

      //IntersectionObserverが使えないpolyfill =ブラウザに後方互換を行うライブラリ　スクロールイベントを監視してる
      this.io.POLL_INTERVAL = 100;  //読み込み、100ミリセカンドごとにスクロールを監視

      // thisをつけることでconstructor(){this.elsにアクセス}
      this.els.forEach(el => this.io.observe(el));
  }
  destory(){
      this.io.disconnect();
  }
}