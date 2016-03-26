
// 左侧添加
function leftIn() {
	var content  = document.getElementById('list'),
		textarea = document.getElementById('textarea'),
		newLi = document.createElement('li'),
		firstLi = document.querySelectorAll('li')[0],
		textareaArr = textarea.value.split(/[\r\n\t\s,.，。；;、!]+/g);
	for (var i=0, length=textareaArr.length; i<length; i++) {
		newLi.innerHTML = textareaArr[i];
		if (newLi.innerHTML == "") {
			textarea.value= "请输入英文、中文、数字！";
		} else if (!firstLi) {
			content.appendChild(newLi);
		} else {
			content.insertBefore(newLi,firstLi);
		}

		firstLi = newLi;
		newLi = document.createElement('li');
	}
};

// 右侧添加
function rightIn() {
	var content = document.getElementById('list'),
		newLi = document.createElement('li'),
		textarea = document.getElementById('textarea'),
		textareaArr = textarea.value.split(/[\r\n\t\s,.，。；;、!]+/g);

	for (var i=0, length=textareaArr.length; i<length; i++) {
		newLi.innerHTML = textareaArr[i];
		if (newLi.innerHTML == "") {
			textarea.value = "请输入英文、中文、数字！";
		} else {
			content.appendChild(newLi);
		}
		newLi = document.createElement('li');
	}
};

// 左侧delete
function leftDel() {
	var content = document.getElementById('list'),
		delLi = content.firstChild;

	if (!delLi) {
		alert('删除完了！');
	} else {
		alert(delLi.innerHTML);
		content.removeChild(delLi);
	}
};

// 右侧delete
function rightDel() {
	var content = document.getElementById('list'),
		delLi = content.lastChild;
	if (!delLi) {
		alert('删除完了！');
	} else {
		alert(delLi.innerHTML);
		content.removeChild(delLi);
	}
};

// Content Delete
function ContentDel(event) {
	var content = document.getElementById('list'),
		delLi = event.target;

	if (!delLi) {
		alert('删除完了！');
	} else {
		alert(delLi.innerHTML);
		content.removeChild(delLi);
	}
};

// 搜索匹配
function searchContent() {
	var liArr = document.querySelectorAll('li'),
		input = document.getElementById('input').value;
		keyContent = new RegExp(input);

	if (!input) {
		return false;
	} 

	for (var i=0, length=liArr.length; i<length; i++) {
		if (keyContent.test(liArr[i].innerHTML)) {
			liArr[i].style.color = "black";
		}
	}
};


function init() {
	document.getElementById('left-insert').addEventListener('click', leftIn);
	document.getElementById('right-insert').addEventListener('click', rightIn);
	document.getElementById('left-del').addEventListener('click', leftDel);
	document.getElementById('right-del').addEventListener('click', rightDel);
	document.getElementById('list').addEventListener('click', function(event) {
		ContentDel(event);
	});
	document.getElementById('search').addEventListener('click', searchContent);
}

init();