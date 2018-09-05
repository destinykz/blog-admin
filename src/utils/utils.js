window.cdj = {};
// 获取元素父级
cdj.parent = function(el, className) {
    if( cdj.hasClass(el, className) ) return el;
    let parent = el.parentNode;
    while( !cdj.hasClass(parent, className) ) {
        parent = parent.parentNode;
    }
    return parent;
};
// 获取元素样式
cdj.getStyle = function(el, style) {
    if( el.currentStyle ) return el.currentStyle[style];
    else return window.getComputedStyle(el, null)[style];
}
// 运动形式
cdj.Tween = {
    linear: function (t, b, c, d){  //匀速
        return c*t/d + b;
    },
    easeIn: function(t, b, c, d){  //加速曲线
        return c*(t/=d)*t + b;
    },
    easeOut: function(t, b, c, d){  //减速曲线
        return -c *(t/=d)*(t-2) + b;
    },
    easeBoth: function(t, b, c, d){  //加速减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t + b;
        }
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInStrong: function(t, b, c, d){  //加加速曲线
        return c*(t/=d)*t*t*t + b;
    },
    easeOutStrong: function(t, b, c, d){  //减减速曲线
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t*t*t + b;
        }
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
        if (t === 0) { 
            return b; 
        }
        if ( (t /= d) == 1 ) {
            return b+c; 
        }
        if (!p) {
            p=d*0.3; 
        }
        if (!a || a < Math.abs(c)) {
            a = c; 
            const s = p/4;
        } else {
            const s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            const s = p / 4;
        } else {
            const s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },    
    elasticBoth: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d/2) == 2 ) {
            return b+c;
        }
        if (!p) {
            p = d*(0.3*1.5);
        }
        if ( !a || a < Math.abs(c) ) {
            a = c; 
            const s = p/4;
        }
        else {
            const s = p/(2*Math.PI) * Math.asin (c/a);
        }
        if (t < 1) {
            return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
                    Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        }
        return a*Math.pow(2,-10*(t-=1)) * 
                Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    },
    backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
        if (typeof s == 'undefined') {
           s = 1.70158;
        }
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    backOut: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 3.70158;  //回缩的距离
        }
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    }, 
    backBoth: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 1.70158; 
        }
        if ((t /= d/2 ) < 1) {
            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        }
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
        return c - Tween['bounceOut'](d-t, 0, c, d) + b;
    },       
    bounceOut: function(t, b, c, d){
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
        }
        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    },      
    bounceBoth: function(t, b, c, d){
        if (t < d/2) {
            return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
    }
}
// 元素运动函数
cdj.animate = function(el, obj, time, fn) {
    const initVal = {};
    for (const style in obj) {
        if( style === 'opacity' ) initVal[style] = cdj.getStyle(el, style) * 100;
        else initVal[style] = parseFloat( cdj.getStyle(el, style) );
    }
    const startTime = now();
    clearInterval(el.timer);
    el.timer = setInterval(function() {
        const changeTime = now();

        let t = changeTime - startTime;
        if( t >= time ) {
            t = time;
            clearInterval(el.timer);
            fn && fn();
        }
        for (const style in obj) {
            const val = cdj.Tween.linear(t, initVal[style], parseInt(obj[style]) - initVal[style], time);
            el.style[style] = val + 'px';
        }
        // if( t >= time )
    }, 0);  

    function now() {
        return ( new Date() ).getTime();
    }
}
// 展开或折叠
cdj.slideToggle = function(el, time) {
    if( el.state === 'show' ) cdj.slideUp(el, time);
    else cdj.slideDown(el, time);
}
// 展开
cdj.slideDown = function(el, time) {
    el.state = 'show';
    el.style.display = 'block';
    el.style.overflow = 'hidden';
    el.style.height = '0';

    const targetHeight = el.scrollHeight;

    cdj.animate(el, {
        height: targetHeight
    }, time, function() {
        el.style.overflow = 'inherit';
    });

}
// 折叠
cdj.slideUp = function(el, time) {
    el.state = '';
    el.style.overflow = 'hidden';
    const targetHeight = el.scrollHeight;
    cdj.animate(el, {
        height: 0
    }, time, function() {
        el.style.display = 'none';
    });

};
// 是否包含类
cdj.hasClass = function(el, cls) {
    if( el.className ) return el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    else return false;
}
// 增加类
cdj.addClass = function(el, cls) {
    if( !cdj.hasClass(cls) ) el.className += ' ' + cls;
}
// 删除类
cdj.removeClass = function(el, cls) {
    el.className = el.className.replace(new RegExp('(\\s|^)' + cls + '(\\s|$)'), ' ');
}
// 添加或删除
cdj.toggleClass = function(el, cls) {
    if( cdj.hasClass(el, cls) ) cdj.removeClass(el, cls);
    else cdj.addClass(el, cls);
}