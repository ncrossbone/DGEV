$(document).ready(function () {
	
	// 탭 메뉴
	$(".tab_area h4").click(function () {
		$(this).parent().addClass("over");
		$(this).parent().siblings().removeClass("over");
	});
	$(".tab_area h4").focusin(function () {
		$(this).parent().parent().addClass("over");
		$(this).parent().parent().siblings().removeClass("over");
	});
	// 탭 메뉴 끝
	
	$(document).on('click','#data_list ul li',function () {
		$(this).find(".ev_add_info").toggle("fast");
		$(this).toggleClass("over");
		$(this).siblings().find(".ev_add_info").slideUp("fast");
		$(this).siblings().removeClass("over");
	});
	
	$(".btn_info_view").click(function () {
		$("div.ev_corp_list").toggle("fast");
		$(this).toggleClass("over");
	});

	

	$(".option_tool_top_btn img").click(function(){
		$(".option_tool_top").toggleClass("off");
			var newSrc = "";
			if($(".option_tool_top").hasClass('off')){
				newSrc = $(".option_tool_top_btn img").attr("src").replace("_off", "_on");
			} else {
				newSrc = $(".option_tool_top_btn img").attr("src").replace("_on", "_off");
			}
			$(".option_tool_top_btn img").attr("src", newSrc);
	});
	
	
	$(".option_tool_bottom_btn img").click(function(){
		$(".option_tool_bottom").toggleClass("off");
			var newSrc = "";
			if($(".option_tool_bottom").hasClass('off')){
				newSrc = $(".option_tool_bottom_btn img").attr("src").replace("_off", "_on");
			} else {
				newSrc = $(".option_tool_bottom_btn img").attr("src").replace("_on", "_off");
			}
			$(".option_tool_bottom_btn img").attr("src", newSrc);
	});

	window.addEventListener('load', function(){   
	setTimeout(scrollTo, 0, 0, 1);
	}, false)
	
	
	$(".head_cont a.view").click(function () {
		$(this).parent().find(".sub_search").slideToggle("on");
	});
	
});

var divHight = 147;  //A=빼야할 고정 높이값
var bOpen =true;;
function upfix(){
	var divMove = innerHeight+document.body.scrollTop-divHight;    //B=브라우저 높이값에서 A(고정높이값)를 뺀 값
	var divStr = "min-height:"+divMove+"px";   // C div 에 B값을 부여
	$("section,.min_height").attr("style",divStr); // C div의 이름
		setTimeout("upfix()",0); // 속도
}
window.onload=upfix;

