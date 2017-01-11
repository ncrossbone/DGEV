Ext.define("DgEv.view.center.CenterContainer", {

	extend: "Ext.window.Window",
	xtype: "dgev-centercontainer",
	itemId:"centercontainer",
	border:false,
	title:"충전소 운영 현황",
	layout:{
		type:"hbox"
	},
	height:700,
	width:410,
	x:1400,
	y:100,
	items:[{
		xtype:"panel",
		itemId:"stationInfo",
		border:false,
		autoScroll:true,
		width:405,
		html:"<div id='wrap' style='width: 390px; position: relative; padding: 3px; min-width: 0px;'>" +
			"<div class='wrap_content' style='width: 384px; overflow: hidden;'>" +
			"<section>"+
			"<div id='sub_tits'>" +
			"<form id='form' action='' name='form' method='post'>" +
			"<input type='hidden' id='stat_id' name='stat_id' value='45130001'>" +
			"<input type='hidden' id='stat_nm' name='stat_nm' value='새만금경제자유구역사업단'>" +
			"<input type='hidden' id='stat_addr' name='stat_addr' value='전라북도 군산시 오식도동 1010'>" +
			"<input type='hidden' id='mode' name='mode' value=''>" +
			"<a href='#' onclick='addBookMark();' class='like_ch'><span class='hidden'>즐겨찾기</span></a><h2>새만금경제자유구역사업단<em id='distant'></em></h2>" +
			"</form></div><div id='sub_cont'><div class='sub_info_area' style='margin-top: 0px;'><span class='corp_info'>" +
			"<img src='./resources/images/test/logo_keco.png' width='20' alt='환경부 로고' style='float: left'> <span>환경부(한국자동차환경협회)</span></span><div class='time_info'><span>" +
			"<em>24시간 이용가능</em></span></div></div><table class='table_01'><tbody><tr><th>구분</th><th>충전기 타입</th><th>운전 상태</th></tr><tr><td><dl>" +
			"<dt class='fast'>01</dt><dd style='margin-left: 0px;'>급속</dd></dl></td><td class='td2'>" +
			"<span class='ev_type t01'>DC차데모</span>" +
			"<span class='ev_type t02'>AC3상</span>" +
			"<span class='ev_type t03'>DC콤보</span></td><td class='td3'>	<span class='ev_char c01'>사용가능</span></td></tr></tbody></table></div>" +
			"<div class='middle_line'></div><div class='sub_group'><h3 class='tit3_info'>상세정보</h3><table class='table_02'>" +
			"<tbody><tr><th style='width: 70px;'>도로명주소</th><td>전라북도 군산시 오식도동 1010 (오식도동 1010)</td></tr><tr><th>운영기관</th>" +
			"<td>환경부(한국자동차환경협회)</td></tr><tr><th>연락처</th><td>1661-9408</td></tr><tr><th>이용요금</th><td>유료</td></tr>" +
			"<tr><th>최근 충전일</th><td>2017-01-04 14:28</td></tr><tr>" +
			"<th>참고사항</th><td>없음 </td></tr></tbody></table></div>" +
			"<div class='middle_line'></div>" +
			"<div class='sub_group'>" +
			"<h3 class='tit3_pic'>위치사진</h3>" +
			"<div class='pic_area'>" +
			"<img src='/file/viewImage/?atch_id=10969' height='100' alt='충전소 사진' onclick='javascript:detailImage(this);'>" +
			"<img src='/file/viewImage/?atch_id=10971' height='100' alt='충전소 사진' onclick='javascript:detailImage(this);'>" +
			"<img src='/mobile/images/common/pic_noimg.jpg' height='100' width='110'>" +
			"</div>" +
			"</div>" +
			"</section></div></div>"
	}]
});