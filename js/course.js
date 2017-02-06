
//课程数据获取

//pageNo页码 type课程分类 psize总条数
function contentAjax(pageNo, type, psize) {
	ajax: ajax({
		method: "get", //传输方式
		url: "http://study.163.com/webDev/couresByCategory.htm", //url地址
		data: { //传的参数
			"pageNo": pageNo, //页数
			"psize": psize, //条数
			"type": type //课程类型	10设计 20编程
		},
		success: function(text) {
			contentObj = JSON.parse(text);
			JsonObj = contentObj.list;
			//储存课程下标
			var jsonArr = [],
				contentHtml = '';
			for(var i = 0; i < JsonObj.length; i++) {
				jsonArr = [i];
				//遍历下标
				for(var j = 0; j < jsonArr.length; j++) {
					//免费价格处理
					JsonObj[i].price == 0 ? JsonObj[i].price = '免费' : JsonObj[i].price = JsonObj[i].price.toFixed(2);
					contentHtml += '<li class="course-contentI">\
								<a href="' + JsonObj[i].providerLink + '">\
									<div class="course">\
										<div class="contentI-img"><img src="' + JsonObj[i].middlePhotoUrl + '" alt="' + JsonObj[i].name + '" /></div>\
										<div class="contentI-txtBox">\
											<h3 class="contentI-tit">' + JsonObj[i].name + '</h3>\
											<h4 class="contentI-author">' + JsonObj[i].provider + '</h4>\
											<span class="span-1"><i class="contentI-num">' + JsonObj[i].learnerCount + '</i></span>\
											<span class="span-2">￥<i class="contentI-price">' + JsonObj[i].price + '</i></span>\
										</div>\
									</div>\
									<div class="course-hover" >\
										<div class="course-hover-top">\
											<div class="course-hover-img"><img src="' + JsonObj[i].middlePhotoUrl + '" alt="' + JsonObj[i].name + '" /></div>\
											<dl>\
												<h3 class="hover-tit">' + JsonObj[i].name + '</h3>\
												<dt><p><span class="hover-num">' + JsonObj[i].learnerCount + '</span>在学</p></dt>\
												<dd>\
													<p>发布者：<span class="hover-pro">' + JsonObj[i].provider + '</span></p>\
												</dd>\
												<dd>\
													<p>分类：<span class="">' + JsonObj[i].provider + '</span></p>\
												</dd>\
											</dl>\
										</div>\
										<div class="course-hover-txt">\
											<p class="description">' + JsonObj[i].description + '</p>\
										</div>\
									</div>\
								</a>\
							</li>';
					contentList.innerHTML = contentHtml;
					contentMove();
				}
			}
			function contentMove(){
				//课程鼠标悬停弹出课程详情
			var contentLi = getElementsByClassName(contentList, 'course-contentI'),
				contentHover = getElementsByClassName(contentList, 'course-hover'),
				 hoverindex = 0;				
			for(var i = 0; i < contentLi.length; i++) {
				contentLi[i].index = i;
				//鼠标移入
				contentLi[i].onmouseenter = function() {
						hoverindex = this.index;
						for(var i = 0; i < contentLi.length; i++) {
							contentHover[i].style.display = 'none';
						}
						//课程弹出延时
						setTimeout(function() {
							contentHover[hoverindex].style.display = 'block';
						}, 500);
					}
					//鼠标移开
				contentLi[i].onmouseleave = function() {
					contentHover[hoverindex].style.display = 'none';
				}
			}
			}
		},
		async: true //同步方式，true异步, false不是异步
	});
}

//翻页
var contentList = document.getElementById('mainContent'),
	pageDiv = document.getElementById('page'),
	pageLi = pageDiv.getElementsByTagName('li'),
	pageUp = document.getElementById('page-up'),
	pageDown = document.getElementById('page-down');
function coursePage(page, type) {
	var now = 0;
	for(var i = 0; i < pageLi.length; i++) {
		pageLi[i].index = i;
		//默认进来是第一页码
		pageLi[now].className = 'active-page';
		//切换课程分类页码重置
		var page = pageLi[i].className = '';
		pageLi[i].onclick = function() {
			var type = 10,
				psize = 20;
			now = this.index;
			for(var i = 0; i < pageLi.length; i++) {
				pageLi[i].className = '';
			}
			//选中class
			pageLi[now].className = 'active-page';
			//判断当前停留在哪个分类
			design.className == 'tab-checked' ? type = 10 : type = 20;
			document.body.offsetWidth < 1205 ? psize = 15 : psize = 20;
			contentAjax(now + 1, type, psize);
			return pageNow = now;
		}
		var pageNow = '';
		//下一页
		pageDown.onclick = function() {
			pageNow++;
			for(var i = 0; i < pageLi.length; i++) {
				pageLi[i].className = '';
			}
			if(pageNow >= 7) {
				pageLi[7].className = 'active-page';
			} else {
				pageLi[pageNow].className = 'active-page';
			}
			//判断当前停留在哪个分类
			design.className == 'tab-checked' ? type = 10 : type = 20;
			document.body.offsetWidth < 1205 ? psize = 15 : psize = 20;
			contentAjax(pageNow + 1, type, psize);
			return pageNow;
		}
		//上一页
		pageUp.onclick = function() {
			pageNow--;
			for(var i = 0; i < pageLi.length; i++) {
				pageLi[i].className = '';
			}
			if(pageNow <= 0) {
				pageLi[0].className = 'active-page';
				pageNow = 0;
			} else {
				pageLi[pageNow].className = 'active-page';
			}
			//判断当前停留在哪个分类
			design.className == 'tab-checked' ? type = 10 : type = 20;
			document.body.offsetWidth < 1205 ? psize = 15 : psize = 20;
			contentAjax(pageNow + 1, type, psize);
			return pageNow;
		}
	}
}
coursePage();

//切换课程
var design = document.getElementById('tab1'),
	programme = document.getElementById('tab2');
function contentTab() {
	var psize = 20;
	design.onclick = function() {
		document.body.offsetWidth < 1205 ? psize = 15 : psize = 20;
		//切换课程类型
		contentAjax(1, 10, psize);
		//调整页码相关
		// 1为初始化页码位置 10设计分类
		coursePage(1, 10);
		design.className = 'tab-checked';
		programme.className = '';
	}
	programme.onclick = function() {
		document.body.offsetWidth < 1205 ? psize = 15 : psize = 20;
		//切换课程类型
		contentAjax(1, 20, psize);
		//调整页码相关
		// 1为初始化页码位置 20编程分类
		coursePage(1, 20);
		design.className = '';
		programme.className = 'tab-checked';
	}
}
contentTab();

//热销课程列表
function contentHot() {
	hotAjax: ajax({
		method: "get", //传输方式
		url: "http://study.163.com/webDev/hotcouresByCategory.htm", //url地址
		success: function(text) {
			//成功后进这里
			var hotList = JSON.parse(text)
			var hotHmtl = '',
				//节点
				hotListHtml = document.getElementById('sideContent');
			var indexLength = 10,
				hotIndex = 0;
			function hotHmtlFun() {
				for(var i = hotIndex; i < indexLength; i++) {
					hotHmtl += '<li class="contentI">\
								<a href="' + hotList[i].providerLink + '">\
									<img class="side-img" src="' + hotList[i].smallPhotoUrl + '" alt="' + hotList[i].name + '" />\
									<div class="side-txtBox">\
										<h3 class="side-txtBox-tit">' + hotList[i].name + '</h3>\
										<p class="side-txtBox-num">\
											<span class="side-txtBox-icon"></span>\
											<span class="num">' + hotList[i].learnerCount + '</span>\
										</p>\
									</div>\
								</a>\
							</li>';
					//插入到hmtl
					hotListHtml.innerHTML = hotHmtl;
				}
				hotIndex++;
				indexLength++;
			}
			hotHmtlFun();
			//热门课程循环
			setInterval(function() {
				if(hotIndex > 10) {
					hotIndex = 0;
					indexLength = 10;
				}
				hotHmtl = '';
				hotHmtlFun();
			}, 5000);
		},
		async: true, //同步方式，true异步, false不是异步
	});
}
contentHot();

//检测大小屏幕

var minCss = document.getElementById('minW');
if(document.body.offsetWidth <= 1205) {
	minCss.href = 'css/min-1025.css';
	//课程加载每页15条
	contentAjax(1, 10, 15);
} else {
	//默认加载课程列表，1为页码 10课程分类
	//课程加载每页20条
	contentAjax(1, 10, 20);
}
var timerBody;
timerBody = setInterval(function() {
	if(document.body.offsetWidth <= 1205) {
		minCss.href = 'css/min-1025.css';
	} else {
		minCss.href = '';
	}
}, 500);
window.onresize = function() {
	if(document.body.offsetWidth <= 1205) {
		//			console.log('小屏');
		minCss.href = 'css/min-1025.css';
		contentAjax(1, 10, 15);
	} else {
		minCss.href = '';
		contentAjax(1, 10, 20);
	}
}

