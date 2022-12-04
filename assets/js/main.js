/**
* Template Name: MyResume - v4.9.2 (修改 BY LITECAT)
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";
  console.log("  ,------.,--------.,-----.    ,--.   ,--.      ,--. \n  |  .--. '--.  .--'  .--.\/    |  |   |  |,---. |  |-. \n  |  '--'.'  |  |  |  |        |  |.'.|  | .-. :| .-. ' \n  |  |\\  \\   |  |  '  '--'\\    |   ,'.   \\   --.| `-' | \n  `--' '--'  `--'   `-----'    '--'   '--'`----' `---' \n 当前WEB版本：1.0.9  ");                           
                                                        
  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();
  
  document.addEventListener('DOMContentLoaded', function() {
    gg(),
    fish();
});
})()
function JoinQQGroup(){
  window.open("https://jq.qq.com/?_wv=1027&k=2lpTM8KM");
  Swal.fire({"text":"已跳转链接",showCloseButton: false,
  showCancelButton: false,showConfirmButton: false});
}
function OpenAfdian(){
  window.open("https://afdian.net/a/litecat");
  Swal.fire({"text":"已跳转链接",showCloseButton: false,
  showCancelButton: false,showConfirmButton: false});
}
function OpenDoc(){
  window.open("https://thoughts.teambition.com/share/631abea5da92850041d26753#title=前言");
  Swal.fire({"text":"已跳转链接",showCloseButton: false,
  showCancelButton: false,showConfirmButton: false});
}
function cimiaolitecat(){
  Swal.fire({"text":"偷偷告诉你 华喵、LiteCat、CiMiao 都是一个人",showCloseButton: false,
  showCancelButton: false,showConfirmButton: false});
}
function gameip(){
  Swal.fire({"text":"JAVA服务器地址：  \nJava版本 1.19.2  【mc.RTCRAFT.cn:22497】   \n基岩版 1.19.0/1.19.2+ \n服务器地址：  \n【bedrock.RTCRAFT.cn】  \n服务器端口：\n 【44639】",showCloseButton: false,
  showCancelButton: false,showConfirmButton: false});
}
function OpenBook(){
  window.open("https://www.bilibili.com/read/cv20147517");
}
function gg(){
  //时间
  var tp;
  var d = new Date();
  var t = d.getFullYear() +"/" +(d.getMonth()+1).toString()+"/"+d.getDate().toString();
  var month = d.getMonth()+1;
  var day = d.getDate();
  //var t= "2022/10/20";
  //公告初始化
  var ifmt = "今天没什么大事呢···";
  var tr = 5000;
  pos = "top"
  tos = true
  tp = "success"
  showbtn = false
  btntext = "关闭"
  titleYuan = t + '\n' + ifmt
  //特殊日期公告
  if (t=="2022/11/24" || t=="2022/11/25" || t=="2022/11/26" || t=="2022/11/27" || t=="2022/11/28" || t=="2022/11/29"){ //什么你问我为什么这么写？因为我懒得更新~
    ifmt = '    ✊\n                                    唉呵！任何邪恶😠终将绳之以法！\n        👊    ';
    tr = 1000000;
    tp = "info";
  }
  if (t=="2022/12/31"){
    ifmt = "✨冒险家,今天是2022年的最后一天了，\n你是否也达成了你今天的最后一个成就了呢？♥";
    tr = "100000"
  }
  if (t=="2023/1/1"){
    ifmt = "🎆冒险家,欢迎你来到2023年！";
    tr = "10000"
  }
  if(month=='12' && day=='13'){
    $("html").css({"filter":"progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)","-webkit-filter":"grayscale(100%)"});
    ifmt = "昭昭前事，惕惕后人，铭记历史，吾辈奋进。此刻，南京！";
    tr = "10000"
    tp = "info";
  }
  if(month=='12' && day=='1' || month=='12' && day=='2' || month=='12' && day=='3' || month=='12' && day=='4' || month=='12' && day=='5' || month=='12' && day=='6'){
    $("html").css({"filter":"progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)","-webkit-filter":"grayscale(100%)"});
    ifmt = '<div class="link" onclick="OpenBook()"><h3>《告全党全军全国各族人民书》</h3></div>';
    tr = "100000"
    tp = "info"
    pos = "top"
    tos = true
    showbtn = false
    btntext = "前往"
    titleYuan = ifmt
}
//启动公告
  Swal.fire({
    type:  tp,
    timer: tr,
    title: titleYuan,
    position: pos,
    toast: tos,
    showConfirmButton: showbtn,
    confirmButtonText: btntext,
  })
}
