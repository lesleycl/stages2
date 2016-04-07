/**
 * Created by niuhuaide on 2016/4/5.
 */
// direction值表示方向 top:1 right:2 bottom:3 left:4
var direction = 1;
var rot = 0;
var row = 0;
var line = 0;
var timerId;
var timerold;
var div = document.getElementById('cell');
// 初始化位置
function init() {
    var r = Math.floor(Math.random()*9+1);
    var l = Math.floor(Math.random()*9+1);
    row = r;
    line = l;
    div.style.top = getTop(r, l) + 'px';
    div.style.left = getLeft(r, l) + 'px';
}
// 返回top
function getTop(r, l) {
    return 41*r;
}
// 返回left
function getLeft(r,l) {
    return 41*l;
}

// 移动动画
function animate(start, end, str) {
    var createTime = function() {
        return (+new Date);
    }
    var startTime = createTime();
    function tick() {
        var remaining = Math.max(0, startTime+500-createTime());
        var temp = remaining/500 || 0;
        var percent = 1 - temp;
        function stop() {
            clearInterval(timerId);
            timerId = null;
        }
        function setStyle(value) {
            div.style[str] = value + 'px';
        }
        var now = (end-start)*percent + start;
        if (percent === 1) {
            setStyle(now);
            stop();
        } else {
            setStyle(now);
        }
    }

    timerId = setInterval(tick, 13);
}

// 角度动画
function angle(an,rot) {
    var value = an/10;
    var num = 0;
    function tick() {
        function stop() {
            clearInterval(timerold);
            timerold = null;
        }
        function setStyle() {
            rot = rot + value;
            div.style.transform = "rotate(" + rot +"deg)";
        }
        if (num === 10) {
            stop();
        } else {
            setStyle();
            num = num + 1;
        }
    }
    timerold = setInterval(tick, 13);
}

// 移动
function tran() {
    switch (direction) {
        case 1 :
            if (row>1) {
                row = row - 1;
                clearInterval(timerId);
                animate(getTop(row+1, line), getTop(row, line), 'top');
            }
            break;
        case 2 :
            if (line<10) {
                line = line + 1;
                clearInterval(timerId);
                animate(getLeft(row, line-1), getLeft(row, line), 'left');
            }
            break;
        case 3 :
            if (row<10) {
                row = row + 1;
                clearInterval(timerId);
                animate(getTop(row-1, line), getTop(row, line), 'top');
            }
            break;
        case 4 :
            if (line>1) {
                line = line - 1;
                clearInterval(timerId);
                animate(getLeft(row, line+1), getLeft(row, line), 'left');
            }
            break;
    }
}

// 角度限制在-360~360
function changeRot() {
    if (rot > 360) {
        rot -= 360;
    } else if(rot < -360) {
        rot += 360;
    }
}

// 旋转
function rotate(str) {
    switch (str) {
        case 'tunrig':
            if(direction == 4) {
                direction = 1;
            } else {
                direction+=1;
            }
            changeRot();
            rot =rot + 90;
            clearInterval(timerId);
            angle(90, rot-90);
            break;
        case 'tunbac':
            if(direction == 3) {
                direction = 1;
            }  else if(direction == 4) {
                direction = 2;
            } else {
                direction += 2;
            }
            rot =rot - 180;
            changeRot();
            clearInterval(timerId);
            angle(180, rot+180);
            break;
        case 'tunlef':
            if(direction == 1) {
                direction = 4;
            } else {
                direction-=1;
            }
            rot =rot - 90;
            changeRot();
            clearInterval(timerId);
            angle(-90, rot+90);
            break;
        default :
            alert('指令错误，请重新输入');
    }
}
// 移动一格
function moveOne(oldRow, oldLine, row, line, str) {
    clearInterval(timerId);
    if (str === 'left') {
        animate(getLeft(oldRow, oldLine), getLeft(row, line), str);
    } else {
        animate(getTop(oldRow, oldLine), getTop(row, line), str);
    }
}

// 移动方向
function orientation(num, deg) {
    direction = num;
    clearInterval(timerold);
    angle(deg-rot, rot);
    rot = deg;
    changeRot();
}

function getEle(id) {
    return document.getElementById(id);
}
(function() {
    init();
    var goBtn = getEle('go'),
        tunLefBtn = getEle('tun-lef'),
        tunRigBtn = getEle('tun-rig'),
        tunBacBtn =getEle('tun-bac'),
        traLefBtn = getEle('tra-lef'),
        traTopBtn = getEle('tra-top'),
        traRigBtn = getEle('tra-rig'),
        traBotBtn = getEle('tra-bot'),
        movLefBtn = getEle('mov-lef'),
        movTopBtn = getEle('mov-top'),
        movRigBtn = getEle('mov-rig'),
        movBotBtn = getEle('mov-bot');
    var btn = document.getElementById('btn');

    goBtn.onclick = function() {
        tran();
    }
    tunLefBtn.onclick = function() {
        rotate('tunlef');
    }
    tunRigBtn.onclick = function() {
        rotate('tunrig');
    }
    tunBacBtn.onclick = function() {
        rotate('tunbac');
    }
    traLefBtn.onclick = function() {
        if (line>1) {
            line = line - 1;
            moveOne(row, line+1, row, line, 'left');
        }
    }
    traTopBtn.onclick = function() {
        if (row>1) {
            row = row - 1;
            moveOne(row+1, line, row, line, 'top');
        }
    }
    traRigBtn.onclick = function() {
        if (line<10) {
            line = line + 1;
            moveOne(row, line-1, row, line, 'left');
        }
    }
    traBotBtn.onclick = function() {
        if (row<10) {
            row = row + 1;
            moveOne(row-1, line, row, line, 'top');
        }
    }
    movLefBtn.onclick = function() {
        if (line>1) {
            line = line - 1;
            moveOne(row, line+1, row, line, 'left');
            orientation(4, -90);
        }
    }
    movTopBtn.onclick = function() {
        if (row>1) {
            row = row - 1;
            moveOne(row+1, line, row, line, 'top');
            orientation(1, 0);
        }
    }
    movRigBtn.onclick = function() {
        if (line<10) {
            line = line + 1;
            moveOne(row, line-1, row, line, 'left');
            orientation(2, 90);
        }
    }
    movBotBtn.onclick = function() {
        if (row<10) {
            row = row + 1;
            moveOne(row-1, line, row, line, 'top');
            orientation(3, 180);
        }
    }
    btn.onclick = function() {
        var inputText = document.getElementById('input').value.replace(/^\s|\s+$/g, '').toLowerCase();
        if (inputText == "tun lef") {
            rotate('lef');
        } else if(inputText == "tun rig") {
            rotate('rig');
        } else if(inputText == "tun bac") {
            rotate('bac');
        } else if(inputText == "go") {
          tran();
        } else if(inputText == "tra lef") {
            if (line>1) {
                line = line - 1;
                moveOne(row, line+1, row, line, 'left');
            }
        } else if(inputText == "tra top") {
            if (row>1) {
                row = row - 1;
                moveOne(row+1, line, row, line, 'top');
            }
        } else if(inputText == "tra rig") {
            if (line<10) {
                line = line + 1;
                moveOne(row, line-1, row, line, 'left');
            }
        } else if(inputText == "tra bot") {
            if (row<10) {
                row = row + 1;
                moveOne(row-1, line, row, line, 'top');
            }
        } else if(inputText == "mov lef") {
            if (line>1) {
                line = line - 1;
                moveOne(row, line+1, row, line, 'left');
                orientation(4, -90);
            }
        } else if(inputText == "mov top") {
            if (row>1) {
                row = row - 1;
                moveOne(row+1, line, row, line, 'top');
                orientation(1, 0);
            }
        } else if(inputText == "mov rig") {
            if (line<10) {
                line = line + 1;
                moveOne(row, line-1, row, line, 'left');
                orientation(2, 90);
            }
        } else if(inputText == "mov bot") {
            if (row<10) {
                row = row + 1;
                moveOne(row-1, line, row, line, 'top');
                orientation(3, 180);
            }
        } else {
            rotate(inputText);
        }
        document.getElementById('input').value = '';
    }
})(window)