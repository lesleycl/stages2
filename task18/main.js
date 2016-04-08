/*
* 验证input输入是否为数字
*/
function testInput(str){
	var re = /\d+(\.)?\d/;
	return re.test(str);
}

/*
* 点击"左侧入"，将input中输入的数字从左侧插入队列中；
* 点击"右侧入"，将input中输入的数字从右侧插入队列中；
* 点击"左侧出"，读取并删除队列左侧第一个元素，并弹窗显示元素中数值；
* 点击"右侧出"，读取并删除队列又侧第一个元素，并弹窗显示元素中数值；
*/
function btnHandle(i){
	var input = document.getElementById("input");
	var boxList = document.getElementById("boxList");
	var redBoxList = document.getElementsByClassName("redbox");
	switch(i){
		// 左侧入 
		case 0:
			var newBox = document.createElement("div");
			newBox.className = "redbox";
			if (testInput(input.value)){
				newBox.innerHTML = input.value.trim();
			} else {
				alert("请输入数字！");
				break;
			}
			boxList.insertBefore(newBox, boxList.childNodes[0]);
			newBox.id = redBoxList.length;
			newBox.onclick = function(){
				redBoxHandle(this.id);
			}
			break;
		// 右侧入
		case 1:
			var newBox = document.createElement("div");
			newBox.className = "redbox";
			newBox.innerHTML = input.value.trim();
			boxList.appendChild(newBox);
			break;
		// 左侧出
		case 2:
			var delBox = redBoxList[0];
			alert(delBox.innerHTML);
			boxList.removeChild(boxList.childNodes[0]);
			break;
		// 右侧出
		case 3:
			var delBox = redBoxList[redBoxList.length-1];
			alert(delBox.innerHTML);
			boxList.removeChild(boxList.childNodes[redBoxList.length-1]);
			break;
	}
}

/* 点击队列中任何一个元素，则该元素会被从队列中删除 */
function redBoxHandle(id){
	var boxList = document.getElementById("boxList");
	boxList.removeChild(boxList.childNodes[id-1]);
}
