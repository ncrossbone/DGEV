<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	request.setCharacterEncoding("UTF-8");
	response.setCharacterEncoding("UTF-8");
	
	// 충전소 id param
	String stationId = request.getParameter("stationId");
	
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="../../../resources/jsp/windowpop/jquery-impromptu.css">
<link rel="stylesheet" type="text/css" href="../../../common.css">
<link rel="stylesheet" type="text/css" href="../../../tooltip.css">
<link rel="stylesheet" type="text/css" href="../../../BasicSet.css">
<style>
html { overflow-x: hidden !important; }
section { min-height: auto !important; }


</style>
<script src="../../../resources/js/jquery-1.7.2.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui2.js"></script>
<script type="text/javascript" src="../../../resources/jsp/windowpop/ui2.js"></script>
<script type="text/javascript" src="../../../resources/jsp/windowpop/jquery-impromptu.js"></script>
<script type="text/javascript" src="../../../ext-6.2.0/build/ext-all.js"></script>


<script>

$(document).ready(function() { 


	window._chargerList = [];
	getCmntList();
	getRegCargerList();
	
	
	var coreMap = window.parent.Ext.getCmp("_mapDiv_");
	var stationId =  <%=stationId%>;
	
	chargerList = "";
	chargerList += 
		"<thead><tr><th>구분</th><th>충전기 타입</th><th>운전 상태</th><th style='border-right: 0px;'>장애 신고</th></tr></thead> " +
		"<tbody>" ;
	
	//충전기 리스트
	var stationList = [];
	//해당 충전소에 충전기 정보 담기
	for(var i = 0; i < coreMap.chargerList.items.length;i++){
		if(coreMap.chargerList.items[i].data.C_STAT_ID == stationId){
			stationList.push(coreMap.chargerList.items[i].data);
		}
	}
	
	for(var j = 0; j < stationList.length ; j++){
		//급속 완속 구분
		var GUBUN = "";
		var CHGER_TYPE = "";
		if(stationList[j].C_CHGER_TYPE_CD == "01"){
			GUBUN = "급속";
			CHGER_TYPE = "<span class='ev_type t01'>DC차데모</span>";
		}else if(stationList[j].C_CHGER_TYPE_CD == "02"){
			GUBUN = "완속";
			CHGER_TYPE = "<span class='ev_type t01'>승용차 AC완속</span>" +
						 "<span class='ev_type t02'>AC3상</span>" ;
		}else if(stationList[j].C_CHGER_TYPE_CD == "03"){
			GUBUN = "급속";
			CHGER_TYPE = "<span class='ev_type t01'>DC차데모</span>" +
			 			 "<span class='ev_type t02'>AC3상</span>" ;
		}else{
			GUBUN = "급속";
			CHGER_TYPE ="<span class='ev_type t01'>DC차데모</span>" +
						"<span class='ev_type t02'>AC3상</span>" +
						"<span class='ev_type t03'>DC콤보</span>";
		}
		
		var mainStat = "";
		if(stationList[j].MAIN_STAT == "1"){
			mainStat = "<b class='use01'>통신이상</b>";
		}else if(stationList[j].MAIN_STAT == "2"){
			mainStat = "<b class='use02'>충전대기</b>";
		}else if(stationList[j].MAIN_STAT == "3"){
			mainStat = "<b class='use03'>충전중</b>";
		}else if(stationList[j].MAIN_STAT == "4"){
			mainStat = "<b class='use04'>운영중지</b>";
		}else if(stationList[j].MAIN_STAT == "5"){
			mainStat = "<b class='use05'>점검중</b>";
		}else if(stationList[j].MAIN_STAT == "0"){
			mainStat = "<b class='use00'>알수없음</b>";
		}
		
		console.info(stationList[j]);
		
		chargerList +=
		"<tr> <th class='AC'>"+stationList[j].C_CHGER_ID+GUBUN+"</th>	"+
		"<td>" +
		CHGER_TYPE+
		"</td><td>	" +
		mainStat+
		"</td>" +
		"<td class='borR0'>	" +
		"<span class='phone'>전화</span><span class='message'>문자</span></td></tr>" ;
	}
	chargerList += "</tbody>";
	
	//충전기
	var chgerWindow = document.getElementById('chagerInfo');
	
	document.getElementById('table_03').innerHTML = chargerList;
	//chgerWindow.document.getElementById('table_03').innerHTML = chargerList;
	
	
	
	var addr = "";
	var busi_name = "";
	var name = "";
	var phon = "";
	var useTime = "";
	var etc = "";
	//stationId
	for(var a = 0 ; a < coreMap.stationList.items.length ; a++){
		if(coreMap.stationList.items[a].data.STAT_ID == stationId){
			addr = coreMap.stationList.items[a].data.ADDR_1;
			busi_name = coreMap.stationList.items[a].data.BUSI_NAME;
			busi_cd = coreMap.stationList.items[a].data.BUSI_KIND_CD;
			name = coreMap.stationList.items[a].data.KO_STAT_NM;
			phone = coreMap.stationList.items[a].data.PHONE_NO;
			useTime = coreMap.stationList.items[a].data.USE_TIME;
			etc = coreMap.stationList.items[a].data.ETC;
			if(phone == null){
				phone = "없음";
			}
			if(etc == null){
				etc = "없음";
			}
			console.info(coreMap.stationList.items[a].data);
			
		}
	}
	
	
	
	
	var stationHtml = "";
	stationHtml += 
		"			<div class='sub_group'>               "+
		
		
		"  <table class='table_03 MgT10'>																													"+
		"      <colgroup>                                                                   "+
		"          <col width='90' />                                                       "+
		"          <col />                                                                  "+
		"      </colgroup>                                                                  "+
		"      <tbody>                                                                      "+
		"          <tr>                                                                     "+
		"              <th class='PdL10 AL'>도로명주소</th>                                    "+
		"              <td class='PdL10 AL'>"+addr+"</td>       "+
		"          </tr>                                                                    "+
		"          <tr>                                                                     "+
		"              <th class='PdL10 AL'>운영기관</th>                                      "+
		"              <td class='PdL10 AL'>"+busi_name+"</td>                   "+
		"          </tr>                                                                    "+
		"          <tr>                                                                     "+
		"              <th class='PdL10 AL'>연락처</th>                                        "+
		"              <td class='PdL10 AL L0'>"+phone+"</td>                            "+
		"          </tr>                                                                    "+
		"          <tr>                                                                     "+
		"              <th class='PdL10 AL'>참고사항</th>                                      "+
		"              <td class='PdL10 AL'>"+etc+"</td>                                 "+
		"          </tr>                                                                    "+
		"      </tbody>                                                                     "+
		"  </table>                                                                         "+
		
		"			</div>   ";
		
		
	
	
	//상세정보
	//var stationInfo = chgerWindow.document.getElementById('tab_01');
	var stationInfo = document.getElementById('tab_01');
	stationInfo.innerHTML = stationHtml;
	console.info(useTime);
	var work_time = document.getElementById('work_time');
	if(useTime == "00-23"){
		work_time.innerHTML = "24시간 이용가능";	
	}else{
		work_time.innerHTML = useTime+"시 이용가능";
	}
	
	
	
	
	//var titleInfo = chgerWindow.document.getElementById('sub_tits');
	var titleInfo = document.getElementById('sub_tits');
	var titleBookMark = "";
	$.ajax({
	async: false,
	type: 'POST',
	url : '../../../resources/jsp/bookMarkList.jsp',
	data : {
		STAT_ID:stationId,
		MEMBER_ID:"test"
	},
	dataType : 'json',
	success:function(data){
		
		var timerObj = window.setInterval(function(){

			
			if(data.data.length == 0){
				titleBookMark += "<a href='#' id='bookMark_"+stationId+"' onclick='addBookMark(\""+stationId+"\",\""+name+"\",\""+busi_cd+"\")' class='like_ch'><span class='hidden'>즐겨찾기</span></a>";
			}else{
				titleBookMark += "<a href='#' id='bookMark_"+stationId+"' onclick='delBookMark(\""+stationId+"\",\""+name+"\",\""+busi_cd+"\")' class='like_ch_on'><span class='hidden'>즐겨찾기</span></a>";
				
			}
			titleBookMark +="<h2>"+name+"<em id='distant'></em></h2>";
			titleInfo.innerHTML = titleBookMark;
			window.clearInterval(timerObj);
			}, 300);
		//$('#cmnt_list').html(html);
		}
	});
	
	
	
});



function getRegCargerList(){
	
	var stationId =  <%=stationId%>;
	
	$.ajax({
		async: false,
		type: 'POST',
		url : '../../../resources/jsp/ChargerList.jsp',
		data : {
			stationId : stationId
		},
		dataType : 'json',
		success:function(data){
			
			var timerObj = window.setInterval(function(){
			
				var clHtml='';
				var date=getDate();
				$('#charger_resev').html('');
				
				//var chargerList = [];
				
				for(var j=1;j<data.data.length+1;j++){
					
					var type2=data.data[j-1].C_CHGER_TYPE_CD == '02' ? '완속' : '급속';
					//전역변수 설정
					window._chargerList.push({chargerId:<%=stationId%>+'_0'+j,type:type2,order:data.data[j-1].C_CHGER_ID});
					
					
				}
				for(var i=0;i<data.data.length;i++){
					
					if(i == 0){
						clHtml+="<div id=\'"+ <%=stationId%> + '_' +data.data[i].C_CHGER_ID + "\'>"; 					
						clHtml+="</div>";	
					}else{
						clHtml+="<div id=\'"+ <%=stationId%> + '_' +data.data[i].C_CHGER_ID + "\' style='display:none'>"; 					
						clHtml+="</div>";
					}
					
					
					document.getElementById('charger_resev').innerHTML = clHtml;
					//$('#reg_chargerList').append(clHtml);
					
					var type=data.data[i].C_CHGER_TYPE_CD == '02' ? '완속' : '급속';
					getBookingInfo(stationId,date,data.data[i].C_CHGER_ID, 0, type, data.data[i].S_USE_TIME);
					
					
				}
			
			window.clearInterval(timerObj);
			}, 300);		
			
		}
	});
	
	
	
}


function zeroPad(target){
	return target < 10 ? '0' + target : target;
}


function getDate(date, day){
	if( typeof( date ) !== 'undefined' ) {
		date = date.split('/');
		date[1] = date[1] - 1;
		date = new Date(date[0], date[1], date[2]);
	} else {
		var date = new Date();
	}
	
	if( typeof( day ) !== 'undefined' ) {
		date.setDate(date.getDate()+day);
	}
	
	var newDate=date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate();
	return newDate;
	
}

function getBookingInfo(stat_id,date,order, day, type,usetime){
	var chargerList = window._chargerList;
	console.info(chargerList);
	if( typeof( day ) !== 'undefined' ) {
		date = date.split('/');
		date[1] = date[1] - 1;
		date = new Date(date[0], date[1], date[2]);
		if(day==1){
			date.setDate(date.getDate()+1);
		}else if(day==-1){
			date.setDate(date.getDate()-1);
		}else{
			
		}
		
		date=date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate();
	}
	
	
	
	
	var resv_date=date.split('/');
	resv_date=resv_date[0]+zeroPad(resv_date[1])+zeroPad(resv_date[2]);
	
	
	$.ajax({
		async: false,
		type: 'POST',
		url : '../../../resources/jsp/bookingInfo.jsp',
		data : {
			STAT_ID:stat_id
			,RESV_DATE:resv_date
			,CHGER_ID:order
			,TYPE:type
		},
		dataType : 'json',
		success:function(data){
			
			var timerObj = window.setInterval(function(){
				//chargerList
				var chagerOption = "";
				for(var a=0;a < chargerList.length;a++){
					if(stat_id+"_"+order == chargerList[a].chargerId){
						chagerOption += " <option selected='selected' value="+chargerList[a].chargerId+">"+ chargerList[a].order+chargerList[a].type +"</option>"
					}else{
						chagerOption += " <option value="+chargerList[a].chargerId+">"+ chargerList[a].order+chargerList[a].type +"</option>"	
					}
					
					
				}
				
				var html=" <div class='line_info'>"//_chargerList
						+ "    	<a href=\"javascript:getBookingInfo(\'"+ stat_id +"\',\'"+date +"\',\'"+ order +"\',\'-1\',\'"+ type + "\',\'"+ usetime + "\')\" style='margin-right: 10px;'><img src='../../../resources/images/btn_pre.png' /></a>"
						+ "    	"+ date +""
						+ "      <a class=\"next\" href=\"javascript:getBookingInfo(\'"+ stat_id +"\',\'"+date +"\',\'"+ order +"\',\'1\',\'"+ type + "\',\'"+ usetime + "\')\" style='margin-left: 10px;'><img src='../../../resources/images/btn_next.png' /></a>"
						+ "    </div>";
						
									
				
			     	html+='    <div>								' 
			     	+'        <p class="tit"><span>'+order+type+'</span>　예약 시간 선택</p>           ' 
			     	+'        <div class="divi_sel">                      ' 
			     	+'            <select id="divi_'+stat_id+"_"+order+'" onchange="change1(this.value,'+ stat_id +','+ order +')" style="width: 98px">  ' 
			     	//+'                <option>'+ order+type +'</option>             ' 
			     	+ chagerOption
			     	+'            </select>                               ' 
			     	+'        </div>                                      ' 
			     	+'    </div>                                          ';

		     	var open=Number(usetime.split('-')[0]);
				var close=Number(usetime.split('-')[1]);
				close = close+1;
				var opens=[];
				for(var i=open;i<=close;i++){
					opens.push(i);
				}
				var list=data;
				var times=[];
				
				for(var k=0;k < list.data.length;k++){
					var start=Number(list.data[k].RESV_DATE.substring(8,10));
					var end=Number(list.data[k].EXPR_DATE.substring(8,10));
					for(var j=start;j<=end;j++){
						times.push({time:j,member:list.data[k].MEMBER_ID});
					}
				}
				
				
				html+='<ul class="opinion_search MgT3">  ';
				for(var i=1;i<25;i++){
					if(i%12==1) html+='<li class="rev">';
					var booked=false;
					var mine=false;
					var opened=false;
					for(var j=0;j<opens.length;j++){
						if(i==opens[j]){
							opened=true;
						}
					}
					for(var j=0;j<times.length;j++){
						if(times[j]['time']==i){
							//if($("#member_id").val()==times[j]['member']){
							console.info(times[j]['member']);	
							if("test22"==times[j]['member']){
								mine=true;
							}
							booked=true;
						}
					}
					if(!opened){
						html+='<a class="rev03" href="#" onclick="javascript:alert(\'사용시간이 아닙니다\')" >' + i + '</a>';
					}else if(mine){
						html+='<a class="rev02" href="#" onclick="javascript:alert(\'내 예약되었습니다\')" >' + i + '</a>';
					}else if(booked){
						html+='<a class="rev04" href="#" onclick="javascript:alert(\'다른사람 예약되었습니다\')">' + i + '</a>';
						
					}else{
						if(type=='급속'){//chargerList
							html+='<a href="#" onclick="javascript:resvCharger(\''+ stat_id +'\',\''+ order +'\',\''+ date +'\',\''+ i +'\',\'0\',\''+ type +'\',\''+ usetime + '\',\''+ chargerList + '\')\" >' + i + '</a>';
							
						}else{
							html+='<a href="#" onclick="javascript:resvCharger2(\''+ stat_id +'\',\''+ order +'\',\''+ date +'\',\''+ i +'\',\''+ type +'\',\''+ usetime + '\',\''+ chargerList + '\')\" >' + i + '</a>';
								
						}
						
					}
					if(i%12==0) html+='</li>';
				}
					
				html += "</ul>";
				
				document.getElementById(stat_id+"_"+order).innerHTML = html;
				//$("#"+stat_id+"_"+order).html(html);
			
			window.clearInterval(timerObj);
			}, 300);
			
		}
	});
	
}

function change1(value,a,b){
	
	$("#divi_"+a+'_0'+b).val(a+'_0'+b).attr("selected","selected");
	var selectDiv = document.getElementById('charger_resev');
	
	for(var i=0;i < selectDiv.childNodes.length;i++){
		if(selectDiv.childNodes[i].id != value){
			document.getElementById(selectDiv.childNodes[i].style.display= "none")
		}else{
			document.getElementById(selectDiv.childNodes[i].style.display= "")
		}
		
	}
	
	
}
	
	
function getCmntList(){
	var stat_id=<%=stationId%>;
	var memberId = "dongjin";
	$.ajax({
		async: false,
		type: 'POST',
		url : '../../../resources/jsp/stationCmnt.jsp',
		data : {
			STAT_ID:stat_id
		},
		dataType : 'json',
		success:function(data){
			 var list=data.data;
			var html='';
			for(var i=0;i<list.length;i++){
				var cmnt_type ;
				var chager_id = "";
				if(list[i].CMNT_TYPE=='01'){
					cmnt_type='충전후기';
				}else if(list[i].CMNT_TYPE=='02'){
					cmnt_type='불편사항';
				}else if(list[i].CMNT_TYPE=='03'){
					cmnt_type='장애사항';
				}else if(list[i].CMNT_TYPE=='04'){
					cmnt_type='개선요청';
				}else if(list[i].CMNT_TYPE=='05'){
					cmnt_type='기타';
				}
				
				
				if(list[i].CHARGER_ID=='01'){
					chager_id='01(급속)';
				}else if(list[i].CHARGER_ID=='02'){
					chager_id='02(완속)';
				}else if(list[i].CHARGER_ID=='03'){
					chager_id='03(급속)';
				}else if(list[i].CHARGER_ID=='04'){
					chager_id='04(급속)';
				}else if(list[i].CHARGER_ID=='05'){
					chager_id='05(급속)';
				}else if(list[i].CHARGER_ID=='06'){
					chager_id='06(급속)';
				}
				
				var charger_id = (list[i].CHARGER_ID == '00' ? '전체' : list[i].CHARGER_ID);
				
				//list[i].CMNT_TYPE
				var memberHtml = '';
				if(memberId == list[i].INS_ID){
					memberHtml+= '<a class="post_del" onclick="delCmnt(\''+list[i].CMNT_ID+'\')"></a>';
				}
				
				html+= ' <dl class="post">  '
				
				+ memberHtml
				+ ' 	<dt>   '
				+ '     	<span class="divi'+list[i].CMNT_TYPE+'">'+ cmnt_type +'</span><b>' + list[i].INS_ID +'</b><em>'+chager_id+'</em> '
				//+ '<a onclick="delCmnt(\''+list[i].CMNT_ID+'\')">del</a>  '
				
				+ '         <time datetime="2017-02-15">'+list[i].INS_DT+'</time>    	      '
				+ '     </dt>                                                                   '
				+ '     <dd>'+ list[i].CMNT +'</dd>              '
				+ ' </dl>                                                                       ';
				
			}
			
			var timerObj = window.setInterval(function(){
				
				document.getElementById('cmnt_list').innerHTML = html;
				
				window.clearInterval(timerObj);
				}, 300);
			//$('#cmnt_list').html(html);
		}
	});

}


function resvCharger(stat_id,order,date,time,expr,type,usetime,chargerList){
	//var mem = $("#member_id").val();
	var mem = "test22";
	if(mem == '' || mem == null){
			var con = confirm("로그인 후에 사용 하실 수 있습니다. 로그인 페이지로 이동 하시겠습니까?");
			if (con) {
				window.location.href = "/mobile/login";
			}
		return;
	}
	
	if(!confirm(date+ " " +time+ "시에\n" + order + "(" + type + ") 충전기를 예약하시겠습니까")){return false;}
			
	var resvDate = date.split('/');
	resvDate[1] =zeroPad(resvDate[1]);
	resvDate[2] =zeroPad(resvDate[2]);
	resvDate=(resvDate[0]+ resvDate[1]+ resvDate[2]);
	time=zeroPad(time);	
	var expr_time=Number(time)+Number(expr);
	expr_time=zeroPad(expr_time);
	$.ajax({
		async: false,
		type: 'POST',
		url : '../../../resources/jsp/bookingInsert.jsp',
		data : {
			RESV_DATE: resvDate+time+'0000'
			,EXPR_DATE: resvDate+expr_time+'0000'
			,CHGER_ID: order
			,STAT_ID: stat_id
			,MEMBER_ID: mem
		},
		dataType : 'json',
		success : function(data){
			alert("예약완료");
			//getBookingInfo(stat_id,date,order,0,type,usetime,chargerList);
			getRegCargerList();
			
		}
	});

}



function resvCharger2(stat_id,order,date,time,type,usetime,chargerList){
	var statesdemo = {
			state0: {
				title: '완속 충전기 예약',
				html:'<label>예약<select name="reserv">'+
						'<option value="1" selected>1시간</option>'+
						'<option value="2">2시간</option>'+
						'<option value="3">3시간</option>'+
						'<option value="4">4시간</option>'+
						'<option value="5">5시간</option>'+
						'<option value="6">6시간</option>'+
						'<option value="7">7시간</option>'+
						'<option value="8">8시간</option>'+
					'</select></label>',
				buttons: { Back: -1, Done: 1 },
				focus: 1,
				submit:function(e,v,m,f){
					console.log(f);

					e.preventDefault();
					if(v==1) {
						resvCharger(stat_id,order,date,time,Number(f.reserv)-1,type);
						$.prompt.close();
					}
					if(v==-1) $.prompt.close();
				}
			},
		};

	$.prompt(statesdemo);
	
	getRegCargerList();
}



function setCmnt(){
	 //var mem = $("#member_id").val();
	 var mem = <%=stationId%>;
	 
	 if(mem == '' || mem == null){
			var con = confirm("로그인 후에 사용 하실 수 있습니다. 로그인 페이지로 이동 하시겠습니까?");
			if (con) {
				window.close();
				opener.location.href = "/mobile/login";
			}
		return;
	}

	var charger_id=$('#tool_charger option:selected').val();
	if(charger_id == "1"){
		charger_id = "01";
	}else if(charger_id == "2"){
		charger_id = "02";
	}
	var cmnt_type=$('#divi option:selected').val();
	
	if(cmnt_type == "1"){
		cmnt_type = "01";
	}else if(cmnt_type == "2"){
		cmnt_type = "02";
	}else if(cmnt_type == "3"){
		cmnt_type = "03";
	}else if(cmnt_type == "4"){
		cmnt_type = "04";
	}
	
	
	var cmnt=$('#cmnt').val();
	var stat_id=<%=stationId%>;
	
	
	if(cmnt_type=='' || cmnt_type=='undefined' || cmnt_type==null){
		alert('구분을 선택해주세요');
		return;
	}
	
	if(cmnt=='' || cmnt=='undefined' || cmnt==null){
		alert('입력해주세요');
		return;
	}
	
	
	
	$.ajax({
		async: false,
		type: 'POST',
		url : '../../../resources/jsp/stationCmntInsert.jsp',
		data : {
			CHARGER_ID:charger_id
			,CMNT_TYPE:cmnt_type
			,CMNT:cmnt
			,STAT_ID:stat_id
			,MODE:'insert'
			,MEMBER_ID:mem
		},
		dataType : 'json',
		success:function(data){
			alert("입력완료");
			getCmntList();
			
		}
	});
	
	
}


function delCmnt(CMNT_ID,STAT_ID){
	
	 var mem = "test";
	 
	 if(mem == '' || mem == null){
			var con = confirm("로그인 후에 사용 하실 수 있습니다. 로그인 페이지로 이동 하시겠습니까?");
			if (con) {
				window.close();
				opener.location.href = "/mobile/login";
			}
		return;
	}
	
	
	
	$.ajax({
		async: false,
		type: 'POST',
		url : '../../../resources/jsp/stationCmntDelete.jsp',
		data : {
			CMNT_ID: CMNT_ID
			,MEMBER_ID:mem
		},
		dataType : 'json',
		success:function(data){
			alert("삭제완료");
			getCmntList();
			
		}
	});
	
	
	
}


reLoadFavList = function(){
	console.info("!");

	  
	var favorStation = window.parent.Ext.ComponentQuery.query("#favorStation")[0];
    var fvHtml = "";
    var coreMap = window.parent.Ext.getCmp("_mapDiv_");
    $.ajax({
		async: false,
		type: 'POST',
		url : '../../../resources/jsp/bookMarkList.jsp',
		data : {
			MEMBER_ID:"test"
		},
		dataType : 'json',
		success:function(data){
				
			var timerObj = window.setInterval(function(){
				console.info(data);
				var fvStationList = [];
				
				for(var i=0;i < data.data.length;i++){
					
					for(var j=0;j<coreMap.stationList.items.length;j++){
						
						if(data.data[i].STAT_ID == coreMap.stationList.items[j].data.STAT_ID){
							
							console.info(coreMap.stationList.items[j].data);
							
							var stationCount = "";
							$.ajax({
								async: false,
								type: 'POST',
								url : '../../../resources/jsp/stationCount.jsp',
								data : {
									STAT_ID : coreMap.stationList.items[j].data.STAT_ID
								},
								dataType : 'json',
								success:function(data){
									for(var k=0;k < data.data.length;k++){
										if(data.data[k].STAT_ID == coreMap.stationList.items[j].data.STAT_ID){
											stationCount +="<img src='./resources/images/icon_03.gif'>"+data.data[k].Y01+"/"+data.data[k].A01+" " +
											"<img src='./resources/images/icon_02.gif' style='margin-left: 10px'>"+data.data[k].Y02+"/"+data.data[k].Y02+" " +
											"<img src='./resources/images/icon_01.gif' style='margin-left: 10px'>"+data.data[k].YA+"/"+data.data[k].AA+"";
										}
									}
									
								}
							});
							
							//Name,Addr,stationId
							//KO_STAT_NM ,ADDR_1 ,STAT_ID
							
							//openWindowCharg
							//fvStationList.push({stationId:data.data[i].STAT_ID});
							fvHtml += "<div class='aabb'>" +
							"   <div class='fw_path' id='fav_"+coreMap.stationList.items[j].data.STAT_ID+"' onclick='openWindowCharg(\""+coreMap.stationList.items[j].data.KO_STAT_NM+"\",\""+coreMap.stationList.items[j].data.ADDR_1+"\",\""+coreMap.stationList.items[j].data.STAT_ID+"\")'>" +
							"<div class='thumb'><img src='./resources/images/test/02.png'></div>" +
							"<div class='state'><p class='st_a'><strong>" + coreMap.stationList.items[j].data.KO_STAT_NM + "</strong></p>" +
							"<p class='st_b'>" +
							coreMap.stationList.items[j].data.ADDR_1 +
							"<p class='st_c'>" +
							stationCount +
							"</p>" +
							"</div></div>" +
							"<em id='delBtn_"+coreMap.stationList.items[j].data.STAT_ID+"' onclick='deleteMark(\""+coreMap.stationList.items[j].data.STAT_ID+"\",\""+coreMap.stationList.items[j].data.KO_STAT_NM+"\",\""+coreMap.stationList.items[j].data.BUSI_KIND_CD+"\")' class='post_del' ></em> </div>";
							
						}
					}
					
					
				}
				favorStation.setHtml(fvHtml);
				
				
				window.clearInterval(timerObj);
			}, 500);
			
			
			
				
			}
	});
	  

	
}



addBookMark = function(stationId,name,busiCd){
	var stationId = <%=stationId%>;
	
	var titleInfo = document.getElementById('sub_tits');
	$("#sub_tits").empty();
	var titleBookMark = ""
	$.ajax({
		async: false,
		type: 'POST',
		url : '../../../resources/jsp/bookMarkInsert.jsp',
		data : {
			STAT_ID:stationId,
			MEMBER_ID:"test",
			BUSI_CD:busiCd
		},
		dataType : 'json',
		success:function(data){
				console.info("success");
			}
	});
	
	titleBookMark += "<a href='#' id='bookMark_"+stationId+"' onclick='delBookMark(\""+stationId+"\",\""+name+"\",\""+busiCd+"\")' class='like_ch_on'><span class='hidden'>즐겨찾기</span></a>";
	titleBookMark +="<h2>"+name+"<em id='distant'></em></h2>";
	titleInfo.innerHTML = titleBookMark;
	

	reLoadFavList();
}

delBookMark = function(stationId,name,busiCd){
	var stationId = <%=stationId%>;
	
	var titleInfo = document.getElementById('sub_tits');
	$("#sub_tits").empty();
	
	var titleBookMark = ""
	$.ajax({
	async: false,
	type: 'POST',
	url : '../../../resources/jsp/bookMarkDelete.jsp',
	data : {
		STAT_ID:stationId,
		MEMBER_ID:"test",
		BUSI_CD:busiCd
	},
	dataType : 'json',
	success:function(data){
			alert("삭제 완료");
		}
	});
	
	titleBookMark += "<a href='#' id='bookMark_"+stationId+"' onclick='addBookMark(\""+stationId+"\",\""+name+"\",\""+busiCd+"\")' class='like_ch'><span class='hidden'>즐겨찾기</span></a>";
	titleBookMark +="<h2>"+name+"<em id='distant'></em></h2>";
	titleInfo.innerHTML = titleBookMark;
	

	reLoadFavList();
	
}
</script>


</head>
<div id="wrap" style="position: relative; min-width: 0px;">
			<div class="wrap_content" style="overflow: hidden;">
			<section>
			<div id="sub_tits">
			</div>
			
			
			<div style="margin: 0px 8px 0px 5px;">
			
			
			
			<div id="tool_top">
				<div class="oper">
					<img src="../../../resources/images/test/logo_keco.png" width="15" alt="환경부 로고" /><span>환경부 (한국자동차환경협회)</span>
				</div>
				
				<div class="work_time" id="work_time">
					
				</div>
			</div>
			
			
				<table class="table_03" id="table_03">
				</table>
				
				</div>
				
		</div>
		
		<div class="gis_tab" style="margin-left: 5px; margin-right: 8px;">
                	 <div class="tab_area">
                        <div class="over">
                            <h4 class="wtt1"><a href="javascript:;">충전소 상세정보</a></h4>
                            <div id="tab_01">
                                
                            </div>
                        </div>
                        <div>
                            <h4 class="wtt2"><a href="javascript:;">충전소 이모저모</a></h4>
                            <div id="tab_02">
                               
                                <div class="opinion_search">
                                	<p>
										<label for="divi">구분</label>
									    <select id="divi" style="width: 110px; height: 30px; ">
									        <option>선택</option>
							    				<option value='01'>충전후기</option>
							    				<option value='02'>불편사항</option>
							    				<option value='03'>장애사항</option>
							    				<option value='04'>개선요청</option> 
							    				<option value='05'>기타</option>
									    </select>
									    <label for="tool_charger" style="margin-left: 25px;">충전기</label>
									    <select id="tool_charger" style="width: 110px; height: 30px; ">
									        	<option>선택</option>
							    				<option value='01'>01(급속)</option>
							    				<option value='02'>02(완속)</option>
									    </select>
									</p>
									<p style="margin-top: 5px;">
										<input type="text" id="cmnt" style="margin-left: 42px; width: 250px;" placeholder="내용 입력" /><a href="#" onclick="javascript:setCmnt();" class="btn_write">등록</a>
									</p>
								</div>
                                <div id="cmnt_list">
                                	
                                </div>
                                
                            </div>                            
                        </div>
                        <div>
                            <h4 class="wtt3"><a href="javascript:;">충전기 예약</a></h4>
                            <div id="tab_03">
                            	<div id="charger_resev">
                            	
                            	</div>
                              	 <ul class="model_ex">
							    	<li><span class="rev01"></span>예약가능</li>
							        <li><span class="rev02"></span>예약선택</li>
							        <li><span class="rev04"></span>예약불가</li>
							        <li><span class="rev03"></span>운영안함</li>
							    </ul> 
							    <ul class="refer">
							    	<li>충전기를 예약하시려면 해당 충전기의 시간 버튼을 클릭하세요.</li>
							        <li>급속 충전기는 1회 예약시 1시간만 가능합니다.</li>
							        <li class="MgB0">완속충전기는 1회 예약시 최장 8시간까지 설정 가능합니다.</li>
							    </ul>
							                              	
                            </div>
                        </div>
                    </div>
           	</div>
		
	</section>
</div>
</div>

</html>