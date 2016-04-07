/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};


/*
* 检测输入是否为中文
*/
function isChi(a){
	//var reg = /[\u4e00-\u9fa5]/;
	var reg = /[\u4e00-\u9fa5]|[a-zA-Z]/;
	var chr = a.split("");
	for (var i=0;i<chr.length;i++){
		if(!reg.test(chr[i])){
			return false;
		}
	}
	return true;
}

/*
* 检测输入是否为整数
*/
function isInt(b){
	var reg = /\D/;
	if (reg.test(b)){
		return false;
	}
	return true;
}
/**
 * 检测用户输入数据，
 * 城市名(a)是否为中英文字符； 空气质量指数(b)是否是整数;
 * 若不合规格，alert提示
 */
function testInputError(a,b){
	// 还没写那哈哈！
	var error = 0;
	if (!isChi(a)){
		alert("城市名仅限中英文字符！请重新输入");
		error = 1;
	}
	if (!isInt(b)){
		alert("空气质量指数请输入整数！请重新输入");
		error = 1;
	}
	return error;
}
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	// “城市名称”、“空气指数” 输入框内容
	var cityInput = document.getElementById("aqi-city-input");
	var weatherInput = document.getElementById("aqi-value-input");
	// trim data
	cityInput = (cityInput.value.trim().toString());
	weatherInput = weatherInput.value.trim();
	if (testInputError(cityInput,weatherInput) == 0){
		aqiData[cityInput] = weatherInput;
	}
}

/**
 * 渲染aqi-table表格
 * data from variable aqiData
 * every change in btn events causes rendering
 */
function renderAqiList() {
	// create table and add style
	var table = document.getElementById("aqi-table");
	table.style.textAlign = "center";
	table.style.fontFamily = "Microsoft Yahei, sans-serif";
	table.style.marginTop = "20px";

	/*render aqiData into nodes
	"北京": 90,
	into "<tr>
    <td>北京</td><td>90</td><td><button>删除</button></td>
    </tr>"*/
	table.innerHTML = "<thead><tr><td>城市</td><td>空气质量</td><td>操作</td></tr></thead><tbody></tbody>";
	
	var tbNode = document.getElementsByTagName("tbody")[0];
	var keyList = Object.keys(aqiData);
	for (var i=0;i<keyList.length; i++){
		var key = keyList[i];
		var rowNode = document.createElement("tr");
		tbNode.appendChild(rowNode);
		var cityNode = document.createElement("td");
		var cityText = document.createTextNode(key);
		cityNode.appendChild(cityText);
		rowNode.appendChild(cityNode);
		var weatherNode = document.createElement("td");
		var weatherText = document.createTextNode(aqiData[key]);
		weatherNode.appendChild(weatherText);
		rowNode.appendChild(weatherNode);
		var btnNode = document.createElement("td");
		// 删除按钮绑定点击事件，直接在行内完成
		btnNode.innerHTML = "<button class=delBtn, id= button"+ i +" onclick=delBtnHandle("+i+")>删除</button>";
		rowNode.appendChild(btnNode);
	}	
	init();
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(index) {
	var key = (Object.keys(aqiData))[index];
	delete aqiData[key];
	renderAqiList();
}

function init() {
	// “确认添加”按钮
	var addBtn = document.getElementById("add-btn");
	// 给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	addBtn.onclick = function(){
	  	addBtnHandle();
	};
}

init();

