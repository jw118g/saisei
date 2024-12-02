gsap.registerPlugin(ScrollTrigger);

$('#header .menu-btn').click(function(){
    $(".menu-area").addClass('on')
    $("main#container").css('--visibility', 'visible')
    $("main#container").css('--opacity', '.7')
})
$('.menu-area .close-btn').click(function(){
    $('.menu-area').removeClass('on')
    $("main#container").css('--visibility', 'hidden')
    $("main#container").css('--opacity', '0')
})

// const textSplit = new SplitType(`[data-split="line"]`, {type: 'lines'});
// $('.line').wrap('<div class="line-wrap">')

// let textSplit;

// function initializeSplitType() {
//     // 이전 SplitType 인스턴스가 있다면 제거
//     if (textSplit) {
//         textSplit.revert(); // SplitType 인스턴스 초기화
//     }

//     // 새로운 SplitType 인스턴스 생성
//     textSplit = new SplitType(`[data-split="line"]`, {type: 'lines'});
    
//     // 기존의 line을 감싸는 작업
//     $('.line').wrap('<div class="line-wrap">');
// }

// // 처음 로드 시 SplitType 초기화
// initializeSplitType();

// // 윈도우 사이즈가 변경될 때마다 SplitType 초기화
// $(window).resize(function() {
//     initializeSplitType();
// });




/* textSplit 효과 */

let textSplit;

// SplitType 초기화 함수
function initializeSplitType() {
    // 이전 SplitType 인스턴스가 있다면 제거
    if (textSplit) {
        textSplit.revert(); // SplitType 인스턴스 초기화
    }

    // 새로운 SplitType 인스턴스 생성
    textSplit = new SplitType(`[data-split="line"]`, {type: 'lines'});

    // 기존의 line을 감싸는 작업
    $('.line').each(function() {
        if (!$(this).parent().hasClass('line-wrap') && !$(this).parents().hasClass('sc-precision')) {
            $(this).wrap('<div class="line-wrap"></div>');
        }
    });
}

// text에 애니메이션을 적용하는 함수
function applyGSAPAnimation() {
    $(`[data-trigger="text-line"]`).each(function () {
        const el = this;

        // GSAP 애니메이션 설정
        const textTl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: "0% 30%",
                once: true // 한 번 실행 후 더 이상 실행하지 않음
            }
        });
        textTl.to($(el).find('.line-wrap .line'), {
            yPercent: -100,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.15
        });
    });
}

function applyGSAPAnimationIntro() {

// path에 대해 애니메이션
const paths = document.querySelectorAll(".group-home .svg-wrap svg path");

paths.forEach((path) => {
    const pathLength = path.getTotalLength();
    
    gsap.set(path, { 
        strokeDasharray: pathLength, 
        strokeDashoffset: pathLength,
        stroke: "rgb(251, 240, 218)",
    });

    const introTl = gsap.timeline({
        defaults: {
            ease: "power1.out",
        },
        delay: 0.5
    });
    
    introTl
    .to(path,{
        strokeDashoffset: 0,
        duration: 4,
    })
    .to(path,{
        fill: "rgb(251, 240, 218)",
        duration: 3,
    },"<+=0.5")
    .to('#header',{
        "--scale" : 1,
    },"<+=1")
    .to('.est',{
        yPercent : -100,
    },"<+=1") 
    .to('.menu-btn .bar',{
        "clip-path": "inset(0% 0% 0% 0%)"
    },"<+=0.5") 

});
    //텍스트효과
    $(`[data-trigger="text-line-intro"]`).each(function() {
        const el = this;

        // GSAP 애니메이션 실행
        const textTl = gsap.timeline();
        textTl.to($(el).find('.line-wrap .line'), {
            yPercent: -100,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.15,
            delay: 2,
        })
        .from($('.group-home .desc svg'),{
            opacity:0
        },"<")
        
    })

}

function applyGSAPAnimationFooter() {
    $(`[data-trigger="text-line-footer"]`).each(function () {
        const el = this;

        // GSAP 애니메이션 설정
        const textTlFooter = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: "0% 80%", // 원하는 시작 지점으로 설정
                once: true
            }
        });
        textTlFooter.to($(el).find('.line-wrap .line'), {
            yPercent: -100,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.15
        });
    });
}


// 페이지 로드 시 SplitType 초기화 및 GSAP 애니메이션 적용
$(document).ready(function() {
    initializeSplitType();
    applyGSAPAnimation();
    applyGSAPAnimationIntro();
    applyGSAPAnimationFooter();
});

// 윈도우 사이즈가 변경될 때마다 SplitType 초기화
$(window).resize(function() {
    initializeSplitType();
    //ScrollTrigger.update();

    // 리사이즈 후 yPercent를 -100으로 유지
    $(`[data-trigger="text-line"]`).each(function () {
        const el = this;
        gsap.set($(el).find('.line-wrap .line'), {yPercent: -100});
    });
    $(`[data-trigger="text-line-intro"]`).each(function () {
        const el = this;
        gsap.set($(el).find('.line-wrap .line'), {yPercent: -100});
    });
    $(`[data-trigger="text-line-footer"]`).each(function () {
        const el = this;
        gsap.set($(el).find('.line-wrap .line'), {yPercent: -100});
    });
    $(`[data-trigger="text-line-menu"]`).each(function () {
        const el = this;
        gsap.set($(el).find('.line-wrap .line'), {yPercent: -100});
    });
    $(".contact-wrap dl dt").each(function () {
        const el = this;
        gsap.set($(el), {yPercent: -100});
    });
    $(".contact-wrap dl dd").each(function () {
        const el = this;
        gsap.set($(el), {yPercent: -100});
    });
});

//메뉴 열때
$('#header .menu-btn').click(function() {
    $(`[data-trigger="text-line-menu"]`).each(function() {
        const el = this;

        // GSAP 애니메이션 실행
        const textTl2 = gsap.timeline();
        textTl2.to($(el).find('.line-wrap .line'), {
            yPercent: -100,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.15,
            delay: 0.8,
        })
        .to($(el).find('.contact-wrap .svg-box'), {
            opacity:1,
            duration:1,
        },"<")
        .to($(el).find('.contact-wrap dl dt'), {
            opacity:1,
            yPercent: -100,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.15,
            delay: 0.3,
        },"<")
        .to($(el).find('.contact-wrap dl dd'), {
            yPercent: -100,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.15,
            delay: 0.3,
        },"<")
        
    });
});

// 메뉴 닫을 때
$('.menu-area .close-btn').click(function() {
    $(`[data-trigger="text-line-menu"]`).each(function() {
        const el = this;

        // GSAP 애니메이션으로 초기화
        const textTl2 = gsap.timeline();
        textTl2.to($(el).find('.line-wrap .line'), {
            yPercent: 100,
            ease: "power2.out",
            stagger: 0.15,
        })
        .to($(el).find('.contact-wrap .svg-box'), {
            opacity:0,
            //duration:1,
        },"<")
        .to($(el).find('.contact-wrap dl dt'), {
            opacity:0,
            yPercent: 100,
            ease: "power2.out",
            stagger: 0.15,
        },"<")
        .to($(el).find('.contact-wrap dl dd'), {
            yPercent: 100,
            ease: "power2.out",
            stagger: 0.15,
        },"<");
    });
});



// landingTl = gsap.timeline({
//     onComplete:function(){
//         // alert();
//         $('.landing').remove();
//     }
// })

// landingTl.to('.landing .line1',{
//     scaleY:0
// })
// landingTl.to('.landing svg circle',{
//     'stroke-dashoffset': '470.48px'
// })
// landingTl.to('.landing svg path',{
//     autoAlpha:0
// })


/* 헤더 */

let lastScrollTop = 0; 

$(window).scroll(function() {
    let currentScrollTop = $(this).scrollTop(); // 현재 스크롤 위치

    if (currentScrollTop >= 50) {
        if (currentScrollTop > lastScrollTop) {
            $('#header').addClass('moveUp'); // 아래로 스크롤
        } else if (currentScrollTop < lastScrollTop) {
            $('#header').removeClass('moveUp'); // 위로 스크롤
        }
    }

    lastScrollTop = currentScrollTop; 
    // 스크롤 위치 업데이트
});



/* 헤더 색상변경 */

$(`[data-header="dark"]`).each(function(i,el){
    ScrollTrigger.create({
        trigger:el,
        start:"0% 0%",
        end:"100% 0%",
        toggleClass:{
            targets:"header",
            className:"headerBlack"
        },
        
        //markers:true
    })
})



/* 전체 텍스트 효과  */

//const textSplit = new SplitType(`[data-split="line"]`, {type: 'lines'});




// $(document).ready(function() {
//     gsap.registerPlugin(ScrollTrigger);

//     $(`[data-trigger="text-line"]`).each(function () {
//         const el = this;

//         textTl = gsap.timeline({
//             scrollTrigger: {
//                 trigger: el,
//                 start: "0% 30%",
//                 once: true // 한 번 실행 후 더 이상 실행하지 않음
//             }
//         })
//         textTl.to($(el).find('.line-wrap .line'), { //line에 each문 사용하는것 x
//             yPercent: -100,
//             duration: 0.7,
//             ease: "power2.out",
//             stagger: 0.15
//         });
//     });
// });



// $(`[data-trigger="text-line"]`).each(function (i,el) {
//     const textLineTl = gsap.timeline({
//         scrollTrigger: {
//             trigger: el, // jQuery 객체에서 DOM 요소로 변환
//             start: "0% 0%",
//             scrub: 0,
//             // markers: true,
//         },
//     });

//     $('.line-wrap .line').each(function(i,text) {
//         textLineTl.to(text, {
//             yPercent: -100,
//             duration: 1,
//             stagger: 0.1
//         });
//     });
// });


/* 이미지 배경 updown */

$('[data-scroll="updown"]').each(function(i,el){

    gsap.to($(this).find('img'),{
        scrollTrigger:{
            trigger:el,
            start:"0% 90%",
            end:"100% 50%",
            scrub:2,
            //markers:true,
        },
        yPercent:-5,
    })
})



/* 이미지 clip-path  */
$(`[data-clip-path="inset"]`).each(function(i,el){

    gsap.to(el, {
        scrollTrigger:{
            trigger:el,
            start:"0% 75%",
            ease: "power2.out",
            once: true,
            //markers:true,
        },
        duration: 1.2,
        delay: 0.5,
        "clip-path": "inset(0% 0% 0% 0%)"
    })

})





// imgMoveUp2 = gsap.timeline({
//     scrollTrigger:{
//         trigger:'.group-about .bottom-area .img-wrap2',
//         start:"0% 80%",
//         end:"100% 0%",
//         scrub:0,
//         //markers:true,
//     }
// })
// imgMoveUp2
// .to('.group-about .bottom-area .img-wrap2 .img-box',{
//     yPercent:-100
// })


// gsap.to('.group-about .innovation-text .char', {
//   
//     transform: "rotateX(0deg) scale(1)",
//     stagger: {
//         amount: 1,
//         from: "random",
//     },
//     transformOrigin: "center", // 변환 기준점을 설정
// });


/* sc-project 배경 효과 */

$('.project-item').each(function(i,el){
    gsap.to(el,{
        scrollTrigger: {
            trigger: '.sc-project',
            start: "0% 90%",
            end: "100% 100%",
            scrub: 0,
            //markers: true,
            
        },
        backgroundPosition : 'center -5%'
    })

})



/* footer */

//contact dl 나타나기
gsap.timeline({
    scrollTrigger: {
        trigger: '#footer',
        start: "0% 80%",
        once: true,
        //markers:true,
    }
}).from($('#footer').find('dl'), {
    yPercent: 50,
    opacity:0,
    duration: 0.7,
    ease: "power2.out",
    stagger: 0.3,
    delay: 1.3,
});

//푸터 svg 
const footerPaths = document.querySelectorAll("#footer svg path");

footerPaths.forEach((path) => {
    const footerPathLength = path.getTotalLength();
    
    gsap.set(path, { 
        strokeDasharray: footerPathLength, 
        strokeDashoffset: footerPathLength,
        stroke: "rgb(251, 240, 218)",
    });

    const footerTl = gsap.timeline({
        scrollTrigger: {
            trigger: '#footer',
            start: "0% 80%", 
            once: true
        },
        defaults: {
            ease: "power1.out",
        },
        delay: 1,
    });
    
    footerTl
    .to(path,{
        strokeDashoffset: 0,
        duration: 3,
    })
    .to(path,{
        fill: "rgb(251, 240, 218)",
        duration: 2,
    },"<+=0.5")

});


ScrollTrigger.matchMedia({
    "(max-width: 768px)": function() {
        /* sc-intro .group-about 이미지 위로 이동 */

    imgMoveUp = gsap.timeline({
        scrollTrigger:{
            trigger:'.sc-intro .group-about .bottom-area',
            start:"0% 0%",
            end:"100% 0%",
            scrub:1,
            //invalidateOnRefresh:true,
            //markers:true,
        }
    })
    imgMoveUp
    .to('.group-about .bottom-area .img-wrap1',{
        yPercent:-200
    },'a')
    .to('.group-about .bottom-area .img-wrap1 .img-box:last-child',{
        y:-50
    },'a')
    .to('.group-about .bottom-area .img-wrap1 .img-box:first-child',{
        y:-30
    },'a')
    .from('.group-about .bottom-area .title-box',{
        opacity:0
    },'a')
    .to('.group-about .bottom-area .img-wrap2',{
        yPercent:-120
    })

    /* innovation 텍스트 회전효과 */

    const innovationTxt = new SplitType('.innovation-text .text-line', { types: 'words, chars', });

    imgMoveUp.from('.group-about .innovation-text .char', {
        // transform: "rotateX(0deg) scale(1)",
        scale:0,
        rotateX:"random(-180,180)deg",
        rotateY:"random(-180,180)deg",
        stagger: {
            from: "random",
            amount:.3
        },
        transformOrigin: "center", // 변환 기준점을 설정
    },'a')
    .to('.group-about .bottom-area .img-wrap2',{
        top:0
    },'a+=0.5')
        },

    "(min-width: 769px)": function() {
        /* sc-intro .group-about 이미지 위로 이동 */

    imgMoveUp = gsap.timeline({
        scrollTrigger:{
            trigger:'.sc-intro .group-about .bottom-area',
            start:"0% 0%",
            end:"100% 0%",
            scrub:1,
            //invalidateOnRefresh:true,
            //markers:true,
        }
        })
    imgMoveUp
    .to('.group-about .bottom-area .img-wrap1',{
        yPercent:-150
    },'a')
    .to('.group-about .bottom-area .img-wrap1 .img-box:last-child',{
        y:-50
    },'a')
    .to('.group-about .bottom-area .img-wrap1 .img-box:first-child',{
        y:-30
    },'a')
    .from('.group-about .bottom-area .title-box',{
        opacity:0
    },'a')
    .to('.group-about .bottom-area .img-wrap2',{
        yPercent:-120
    })

    /* innovation 텍스트 회전효과 */

    const innovationTxt = new SplitType('.innovation-text .text-line', { types: 'words, chars', });

    imgMoveUp.from('.group-about .innovation-text .char', {
        // transform: "rotateX(0deg) scale(1)",
        scale:0,
        rotateX:"random(-180,180)deg",
        rotateY:"random(-180,180)deg",
        stagger: {
            from: "random",
            amount:.3
        },
        transformOrigin: "center", // 변환 기준점을 설정
    },'a')
    .to('.group-about .bottom-area .img-wrap2',{
        top:0
    },'a+=0.5')
    },

    
});