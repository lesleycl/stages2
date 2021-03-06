/* 数据格式演示
var aqiSourceData = {
	"北京": {
	"2016-01-01": 10,
	"2016-01-02": 10,
	"2016-01-03": 10,
	"2016-01-04": 10
	}
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
	var y = dat.getFullYear();
	var m = dat.getMonth() + 1;
	m = m < 10 ? '0' + m : m;
	var d = dat.getDate();
	d = d < 10 ? '0' + d : d;
	return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
	var returnData = {};
	var dat = new Date("2016-01-01");
	var datStr = '';
	for (var i =1; i < 92; i++) {
		datStr = getDateStr(dat);
		returnData[datStr] = Math.ceil(Math.random() * seed);
		dat.setDate(dat.getDate() + 1);
	} 
	return returnData;
}

var aqiSourceData = {
	"北京": randomBuildData(500),
	"上海": randomBuildData(300),
	"广州": randomBuildData(200),
	"深圳": randomBuildData(100),
	"成都": randomBuildData(300),
	"西安": randomBuildData(500),
	"福州": randomBuildData(100),
	"厦门": randomBuildData(100),
	"沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 城市名对应的数字
var citySelcetName = ["北京", "上海", "广州", "深圳", "成都","西安", "福州", "厦门", "沈阳"];
// 记录当前页面的表单选项
var pageState = {
	nowSelectCity: -1,
	nowGraTime: 0
} 

/**
 *渲染图表
 */
 function renderChart() {

 	// 判断有没有选择城市
 	if (pageState.nowSelectCity == -1) {
 		alert("请选择城市");
 		return false;
 	}

 	var chartWrap = document.getElementById('aqi-chart-wrap');
 	chartWrap.innerHTML = "";

 	var bgColor = ["blue", "red", "yellow", "black", "green", "purple"];

 	for (var cityName in chartData) {
 		if (citySelcetName[parseInt(pageState.nowSelectCity)] == cityName) {
 			var data = chartData[cityName][pageState.nowGraTime];
 			for (var d in data) {
 				var divLabel = document.createElement("div");
 				divLabel.style.height = (data[d]) + "px";

 				if (pageState.nowGraTime == 0) {
 					divLabel.style.width = "10px";
 				} else if (pageState.nowGraTime == 1) {
 					divLabel.style.width = "30px";
 				} else {
 					divLabel.style.width = "50px";
 				}
 				
 				divLabel.style.backgroundColor = bgColor[parseInt(Math.random()*5)];
 				chartWrap.appendChild(divLabel);
 			}
 		}
 	}


 }

 /**
  * 日、周、月的radio事件点击时的处理函数
  */
function graTimeChange(event) {
	// 确定是否选项发生了变化
	if (event.target.tagName.toLowerCase() === "input") {
		if (event.target.value === pageState.nowGraTime) {
			return false;
		}

		// 设置对应的数据
		pageState.nowGraTime = event.target.value;
	}

	// 调用图表渲染函数
	renderChart();
}

/**
 * select 发生变化时的处理函数
 */
function citySelectChange(event) {
	// 确定是否选项发生了变化
	if (event.target.value == pageState.nowSelectCity) {
		return false;
	}
	// 设置对应的数据
	pageState.nowSelectCity = event.target.value;
	// 调用图表渲染函数
	renderChart();
}

  /**
   * 初始化日、周、月的radio事件,当点击时，调用函数graTimeChange
   */
function initGraTimeForm() {
	var graTime = document.getElementById('form-gra-time');
	graTime.addEventListener('click', graTimeChange);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
	// 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
	var citySelect = document.getElementById('city-select');
	var citySelectContent = "<option value='-1'>请选择城市</option>";
	var num = 0;
	for (var city in aqiSourceData) {
		citySelectContent += "<option value =' " + num + "'>" + city + "</option>";
		num++;
	}
	citySelect.innerHTML = citySelectContent;
	// 给select设置事件，当选项发生变化时调用函数citySelectChange
	citySelect.onclick = citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
	// 将原始的源数据处理成图表需要的数据格式
	// 处理好的数据存到 chartData 中

	for (var cityName in aqiSourceData) {
		// chartData里有三个数组，方便存储日、周、年
		chartData[cityName] = [{}, {}, {}];
		var sum = 0;
		var n = 0;
		var week = 1;

		// 存储日数据
		chartData[cityName][0] = aqiSourceData[cityName]; 
	
		// 存储周数据
		for (var x in aqiSourceData[cityName]) {
			n++;
			sum += aqiSourceData[cityName][x];
			if (n%7 == 0) {
				chartData[cityName][1][week] = parseInt(sum/7);
				week++;
				sum = 0;
			} else {
				chartData[cityName][1][week] = parseInt(sum/(n%7));
				sum = 0;
			}
		}

		// 存储月数据
		for (var i=1; i<13; i++) {
			var sum = 0;
			for (var j=1; j<32; j++) {
				if (aqiSourceData[cityName]["2016-" + (((i+'').length == 1) ? ('0'+i) : i) + "-" + (((j+'').length == 1) ? ('0'+j) : j)]) {
					sum += aqiSourceData[cityName]["2016-" + (((i+'').length == 1) ? ('0'+i) : i) + "-" + (((j+'').length == 1) ? ('0'+j) : j)];
					// alert("2016-" + (((i+'').length == 1) ? ('0'+i) : i) + "-" + (((j+'').length == 1) ? ('0'+j) : j));
				}
			}

			chartData[cityName][2][i] = parseInt(sum/j);
					
		}

	}
}

/**
 * 初始化函数
 */
function init() {
	initAqiChartData();
	initGraTimeForm();
	initCitySelector();
}

init();