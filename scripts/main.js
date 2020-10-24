document.addEventListener('DOMContentLoaded',function(){
  
  // //ヒーロースライダー
  // const hero = new HeroSlider('.swiper-container'); 
  // hero.start( {delay : 2000} );  
  // setTimeout(()=>{
  //   hero.stop();
  // },12000); 

  //scroll  text animation
  // const cb = function(el, isIntersecting){
  //   if(isIntersecting){
  //       const ta = new TweenTextAnimation(el);
  //       ta.animate();
  //   }
  // }
  // const so = new ScrollObserver('.tween-animate-title', cb); 

  // // scroll cover-slide
  // const _inviewAnimation = function(el, inview){
  //   if(inview){
  //     el.classList.add('inview');
  //   }else{
  //     el.classList.remove('inview');
  //   }
  // }
  // const so2 = new ScrollObserver('.cover-slide', _inviewAnimation ); 


  // //nav box-shadow
  // const header = document.querySelector('.header');
  // const _navAnimation = function(el, inview){
  //   if(inview){
  //     header.classList.remove('triggered');
  //   }else{
  //     header.classList.add('triggered');  //外に出た時に付与
  //   }
  // }
  // const so3 = new ScrollObserver('.nav-trigger', _navAnimation, {once:false} ); 

  // //mobile-menuのインスタンス
  // new MobileMenu(); 

  const main = new Main();
  // main.destory(); 
});

class Main{
  constructor(){
    this.header = document.querySelector('.header');
    // _がついてる変数はset/getメソッドの中で使われていることが多い
    // asideが出てくるときのアニメーション
    this.sides = document.querySelectorAll('.side');

    this._observers = [];  

    // this._scrollInit();
    this._init();
  }
  // セッターメソッド no　_
  set setObservers(val){  
    this._observers.push(val);
    // 配列にvalを格納する
  }
  // ゲッターメソッド
  get getObservers(){
    return this._observers;
  }
  _init(){
    new MobileMenu(); 
    this.hero = new HeroSlider('.swiper-container'); 

    Pace.on('done', this._paceDone.bind(this));
    // this._scrollInit();
  }
  _paceDone(){
    this._scrollInit();
  }
  _navAnimation(el, inview){
    if(inview){
      this.header.classList.remove('triggered');
    }else{
      this.header.classList.add('triggered');  //外に出た時に付与
    }
  }
  // 116 aside animation
  _sideAnimation(el, inview){
    if(inview){
      this.sides.forEach(side => side.classList.add('inview'));
    }else{
      this.sides.forEach(side => side.classList.remove('inview'));
    }
  }
  _inviewAnimation(el, inview){
    if(inview){
      el.classList.add('inview');
    }else{
      el.classList.remove('inview');
    }
  }
  _tweenTextAnimation(el, isIntersecting){   //cb
    if(isIntersecting){
        const ta = new TweenTextAnimation(el);
        ta.animate();
    }
  }
  // sliderが画面から出た時にオートアニメーションを停止する
  _toggleSlideAnimation(el, inview){
    if(inview){
      this.hero.start();
    }else{
      this.hero.stop();  //外に出た時にストップ
    }
  }
  // _destoryObservers(){
  //   this.observers.forEach(ob => {
  //       ob.destory();
  //   });
  // }
  // パブリックメソッド
  // destory(){
  //   this._destoryObservers();
  // }

  _scrollInit(){
    // push()格納するメソッド
    // this._observers.push(
    //   new ScrollObserver('.nav-trigger', this._navAnimation.bind(this), {once:false})
    //   // _navAnimation内でthis.~を使っているので、thisをbindする
    // );
    // ↓
    this.setObservers = new ScrollObserver('.nav-trigger', this._navAnimation.bind(this), {once:false});

    // this._observers.push(
    //   new ScrollObserver('.cover-slide', this._inviewAnimation)
    // );
    this.setObservers = new ScrollObserver('.cover-slide', this._inviewAnimation);
        
    // セッターメソッドに渡す値を代入(代入分が続けば代入->set )
    this.setObservers = new ScrollObserver('.tween-animate-title', this._tweenTextAnimation, {rootMargin: "-150px 0px"});
    // ゲッターメソッドの使い方（代入文がなければ->get）
    // console.log(this.getObservers);

    // new ScrollObserver('.swipper-container',this._toggleSlideAnimation.bind(this), {once:false});
    this.setObservers =new ScrollObserver('.swiper-container',this._toggleSlideAnimation.bind(this), {once:false});
    // this.hero.start(); //->_toggle

    // console.log(this.getObservers);

    // 115追加
    this.setObservers = new ScrollObserver('.appear', this._inviewAnimation);

    // 116 aside
    this.setObservers = new ScrollObserver('#main-content', this._sideAnimation.bind(this),{once:false, rootMargin:"-300px 0px"});

  }
}