/**
 * Created by niuhuaide on 2016/4/5.
 */
// direction值表示方向 top:1 right:2 bottom:3 left:4
var direction = 1;
var rot = 0;
var row = 0;
var line = 0;
var div = document.getElementById('cell');
// 初始化位置
function init() {
    var r = Math.floor(Math.random()*9+1);
    var l = Math.floor(Math.random()*9+1);
    row = r;
    line = l;
    div.style.top = getTop(r, l);
    div.style.left = getLeft(r, l);
}
// 返回top
function getTop(r, l) {
    return 41*r + 'px';
}
// 返回left
function getLeft(r,l) {
    return 41*l + 'px';
}

// 移动
function tran() {
    switch (direction) {
        case 1 :
            if (row>1) {
                row = row - 1;
                div.style.top = getTop(row,line);
            }
            break;
        case 2 :
            if (line<10) {
                line = line + 1;
                div.style.left = getLeft(row, line);
            }
            break;
        case 3 :
            if (row<10) {
                row = row + 1;
                div.style.top = getTop(row, line);
            }
            break;
        case 4 :
            if (line>1) {
                line = line - 1;
                div.style.left = getLeft(row, line);
            }
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
        case 'rig':
            if(direction == 4) {
                direction = 1;
            } else {
                direction+=1;
            }
            rot =rot + 90;
            changeRot();
            div.style.transform="rotate(" + rot +"deg)";
            break;
        case 'bac':
            if(direction == 3) {
                direction = 1;
            }  else if(direction == 4) {
                direction = 2;
            } else {
                direction += 2;
            }
            rot =rot - 180;
            changeRot();
            div.style.transform="rotate(" + rot +"deg)";
            break;
        case 'lef':
            if(direction == 1) {
                direction = 4;
            } else {
                direction-=1;
            }
            rot =rot - 90;
            changeRot();
            div.style.transform="rotate(" + rot +"deg)";
            break;
        default :
            alert('指令错误，请重新输入');
    }
}
(function() {
    init();
    var goBtn = document.getElementById('go'),
        lefBtn = document.getElementById('lef'),
        rigBtn = document.getElementById('rig'),
        bacBtn = document.getElementById('bac');
    var btn = document.getElementById('btn');


    goBtn.onclick = function() {
        tran();
    }
    lefBtn.onclick = function() {
        rotate('lef');
    }
    rigBtn.onclick = function() {
        rotate('rig');
    }
    bacBtn.onclick = function() {
        rotate('bac');
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
        } else {
            rotate(inputText);
        }
        document.getElementById('input').value = '';
    }
})(window)

