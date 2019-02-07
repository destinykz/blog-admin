window.c = {};
c.width = document.documentElement.clientWidth || document.body.clientWidth;
c.height = document.documentElement.clientHeight || document.body.clientHeight;
import Vue from 'vue'
// 获取元素父级
c.parent = function (el, className) {
    if (c.hasClass(el, className)) return el;
    let parent = el.parentNode;
    while (!c.hasClass(parent, className)) {
        parent = parent.parentNode;
    }
    return parent;
}
// 获取元素样式
c.getStyle = function (el, style) {
    if (el.currentStyle) return el.currentStyle[style];
    else return window.getComputedStyle(el, null)[style];
}
// 运动形式
c.Tween = {
    linear: function (t, b, c, d) {  //匀速
        return c * t / d + b;
    },
    easeIn: function (t, b, c, d) {  //加速曲线
        return c * (t /= d) * t + b;
    },
    easeOut: function (t, b, c, d) {  //减速曲线
        return -c * (t /= d) * (t - 2) + b;
    },
    easeBoth: function (t, b, c, d) {  //加速减速曲线
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t + b;
        }
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInStrong: function (t, b, c, d) {  //加加速曲线
        return c * (t /= d) * t * t * t + b;
    },
    easeOutStrong: function (t, b, c, d) {  //减减速曲线
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeBothStrong: function (t, b, c, d) {  //加加速减减速曲线
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t * t + b;
        }
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    elasticIn: function (t, b, c, d, a, p) {  //正弦衰减曲线（弹动渐入）
        if (t === 0) {
            return b;
        }
        if ((t /= d) == 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            const s = p / 4;
        } else {
            const s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    elasticOut: function (t, b, c, d, a, p) {    //正弦增强曲线（弹动渐出）
        if (t === 0) {
            return b;
        }
        if ((t /= d) == 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            const s = p / 4;
        } else {
            const s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    elasticBoth: function (t, b, c, d, a, p) {
        if (t === 0) {
            return b;
        }
        if ((t /= d / 2) == 2) {
            return b + c;
        }
        if (!p) {
            p = d * (0.3 * 1.5);
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            const s = p / 4;
        }
        else {
            const s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if (t < 1) {
            return - 0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
                Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        }
        return a * Math.pow(2, -10 * (t -= 1)) *
            Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
    },
    backIn: function (t, b, c, d, s) {     //回退加速（回退渐入）
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    backOut: function (t, b, c, d, s) {
        if (typeof s == 'undefined') {
            s = 3.70158;  //回缩的距离
        }
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    backBoth: function (t, b, c, d, s) {
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d / 2) < 1) {
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        }
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    bounceIn: function (t, b, c, d) {    //弹球减振（弹球渐出）
        return c - Tween['bounceOut'](d - t, 0, c, d) + b;
    },
    bounceOut: function (t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
        }
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
    },
    bounceBoth: function (t, b, c, d) {
        if (t < d / 2) {
            return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    }
}
// 运动函数
c.animate = function (el, obj, time, fn) {
    const initVal = {};
    for (const style in obj) {
        if (style === 'opacity') initVal[style] = c.getStyle(el, style) * 100;
        else initVal[style] = parseFloat(c.getStyle(el, style));
    }
    const startTime = now();
    clearInterval(el.timer);
    el.timer = setInterval(function () {
        let t = now() - startTime;
        if (t >= time) {
            t = time;
            clearInterval(el.timer);
            fn && fn();
        }
        for (const style in obj) {
            const val = c.Tween.linear(t, initVal[style], parseInt(obj[style]) - initVal[style], time);
            el.style[style] = val + 'px';
        }
    }, 0);

    function now() {
        return (new Date()).getTime();
    }
}
// 展开或折叠
c.slideToggle = function (el, time) {
    if (el.state === 'show') c.slideUp(el, time);
    else c.slideDown(el, time);
}
// 展开
c.slideDown = function (el, time) {
    el.state = 'show';
    el.style.display = 'block';
    el.style.overflow = 'hidden';
    el.style.height = '0';

    const targetHeight = el.scrollHeight;

    c.animate(el, {
        height: targetHeight
    }, time, function () {
        el.style.overflow = 'inherit';
    });

}
// 折叠
c.slideUp = function (el, time) {
    el.state = '';
    el.style.overflow = 'hidden';
    c.animate(el, {
        height: 0
    }, time, function () {
        el.style.display = 'none';
    });

};
// 是否包含类
c.hasClass = function (el, cls) {
    if (el.className) return el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    else return false;
}
// 增加类
c.addClass = function (el, cls) {
    if (!c.hasClass(cls)) el.className += ' ' + cls;
}
// 删除类
c.removeClass = function (el, cls) {
    el.className = el.className.replace(new RegExp('(\\s|^)' + cls + '(\\s|$)'), ' ');
}
// 添加或删除
c.toggleClass = function (el, cls) {
    if (c.hasClass(el, cls)) c.removeClass(el, cls);
    else c.addClass(el, cls);
};
// loading...
; (function () {
    const Loading = function (text) {
        const loading = document.createElement('div');
        this.loading = loading;
        loading.className = 'cdl-loading';
        loading.style.height = (document.documentElement.clientHeight || document.body.clientHeight) + 'px';
        const loadingCnt = document.createElement('div');
        loadingCnt.className = 'cdl-loading-cnt';
        // loadingIcon
        const loadingIcon = document.createElement('i');
        loadingIcon.className = 'loading-icon fa fa-cog';
        // loadingText
        const loadingText = document.createElement('strong');
        loadingText.className = 'loading-text';
        loadingText.innerText = text;
        loadingCnt.appendChild(loadingIcon);
        loadingCnt.appendChild(loadingText);
        loading.appendChild(loadingCnt);
        document.body.appendChild(loading);
    }
    Loading.prototype.close = function () {
        this.loading.parentNode.removeChild(this.loading);
    };
    c.Loading = Loading;
})();
// 消息提示
; (function () {
    function msg(obj) {
        obj = obj || {};
        this.config = {
            content: '这是一段默认的消息提示文字',
            type: 'success'
        };
        // 当前定时器
        this.timeout = null;
        this.config = Object.assign(this.config, obj);
        // 调用初始化方法
        this.init();
    };
    // 提示框初始化
    msg.prototype.init = function () {
        let icon = '';
        switch (this.config.type) {
            case 'success':
                icon = 'fa-check-circle';
                break;
            case 'warning':
                icon = 'fa-exclamation-circle';
                break;
            case 'info':
                icon = 'fa-info-circle';
                break;
            case 'error':
                icon = 'fa-times-circle';
        };
        // 创建msgbox
        const msgBox = document.createElement('div');
        msgBox.className = `cdl-msg ${this.config.type} hide`;
        // 创建图标
        const msgIcon = document.createElement('i');
        msgIcon.className = `fa ${icon} cdl-msg-icon`;
        // 创建提示文字
        const msgText = document.createElement('p');
        msgText.className = `cdl-msg-content`;
        msgText.innerHTML = this.config.content;
        // 添加图标
        msgBox.appendChild(msgIcon);
        // 添加文字
        msgBox.appendChild(msgText);
        document.body.appendChild(msgBox);
        setTimeout(function () {
            c.addClass(msgBox, 'show');
            setTimeout(() => {
                c.removeClass(msgBox, 'show');
                setTimeout(() => {
                    document.body.removeChild(msgBox);
                }, 400);
            }, 4000);
        }, 50);
    };
    // 注册提示框组件
    c.msg = function (obj) {
        new msg(obj);
    };
})();
// 图片压缩
; (function () {
    c.compress = function (src, w) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = function () {
                const canvas = document.createElement('canvas');
                // 如果传递了大小，就压缩
                let imgWidth = img.width;
                let imgHeight = img.height;
                if (w) {
                    const scale = imgWidth / w;
                    imgWidth = w;
                    imgHeight /= scale;
                }
                canvas.width = imgWidth;
                canvas.height = imgHeight;
                const draw = canvas.getContext('2d');
                draw.drawImage(img, 0, 0, imgWidth, imgHeight);

                const base64 = canvas.toDataURL('image/png', 0.1);

                resolve(base64);
            };
            img.onerror = function (err) {
                reject(err);
            };
            img.src = src;
        });
    };
})();
// 登录背景canvas
; (function () {
    const Heart = function (box) {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.left = '0';
        canvas.style.top = '0';
        canvas.width = c.width;
        canvas.height = c.height;
        box.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        this.canvas = canvas;
        this.ctx = ctx;
        this.len = 10;
        this.heartArr = [];
        var oStyle = box.currentStyle ? box.currentStyle : window.getComputedStyle(box, null);
        this.color = oStyle.color;

        this.init();
        requestAnimationFrame(() => {
            this.startAni();
        })
    };
    Heart.prototype.init = function () {
        for (let i = 0; i < this.len; i++) {
            this.heartArr.push({
                x: Math.random() * c.width,
                y: Math.random() * c.height,
                speedY: Math.random() * 0.5,
                r: Math.random(),
                opacity: Math.random(),
                opacitySpeed: Math.random() * 0.02
            })
        }
    }
    Heart.prototype.getX = function (r, t) {
        return r * (16 * Math.pow(Math.sin(t), 3));
    }
    Heart.prototype.getY = function (r, t) {
        return -r * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    }
    Heart.prototype.startAni = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.heartArr.map(heartItem => {
            heartItem.y -= heartItem.speedY;
            heartItem.opacity -= heartItem.opacitySpeed;
            heartItem.r += 0.01;
            if (heartItem.opacity <= 0) {
                heartItem.opacity = 1;
                heartItem.x = Math.random() * c.width;
                heartItem.y = Math.random() * c.height;
                heartItem.r = Math.random() * 1 + 1;
            }
            this.draw(heartItem.x, heartItem.y, heartItem.r, heartItem.opacity, heartItem.vertices);
        });
        setTimeout(() => {
            requestAnimationFrame(() => {
                this.startAni();
            })
        }, 20);
    }
    Heart.prototype.draw = function (x, y, r, opacity) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.getX(r, 0) + x, this.getY(r, 0) + y); //移动绘图游标至原点
        let radian = 0;

        while (radian <= (Math.PI * 2)) {
            radian += Math.PI / 180;
            this.ctx.lineTo(this.getX(r, radian) + x, this.getY(r, radian) + y);
        }
        this.ctx.fillStyle = this.color;
        this.ctx.globalAlpha = opacity;
        this.ctx.fill();
    };
    c.Heart = Heart;
})();
// 后端返回日期格式化
; (function () {
    c.toZero = function (num) {
        return num < 10 ? '0' + num : num;
    };
    // 增加八个小时
    c.add_hour8 = function (hour) {
        const new_hour = parseInt(hour);
        return c.toZero(new_hour + 8 < 24 ? new_hour + 8 : new_hour - 24);
    };
    c.formattedDate = (date = '') => {
        // 2018-10-12 02:06:06
        date = date.substr(0, date.length - 5);
        const hour = date.match(/T(\d+)/)[1];
        date = date.replace(/T(\d+)/, ' ' + c.add_hour8(hour));
        return date;
    }
})();
// Vue自定义指令
; (function () {
    // 注册一个全局自定义指令 `v-focus`
    Vue.directive('focus', {
        // 当被绑定的元素插入到 DOM 中时……
        inserted: function (el) {
            // 聚焦元素
            setTimeout(() => {
                el.focus();
            }, 0);
        }
    });
})();