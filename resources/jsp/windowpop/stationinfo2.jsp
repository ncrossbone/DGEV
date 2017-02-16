<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	request.setCharacterEncoding("UTF-8");
	response.setCharacterEncoding("UTF-8");
	
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


<script>

getCmntList();
getRegCargerList();
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
			//////console.info(data);
			
			var timerObj = window.setInterval(function(){
				
			
				var clHtml='';
				var date=getDate();
				$('#charger_resev').html('');
				for(var i=0;i<data.data.length;i++){
					<%-- clHtml+="<div id=\'"+ <%=stationId%> + '_' +data.data[i].C_CHGER_ID + "\'>"; 					
					clHtml+="</div>"; --%>
					
					clHtml+="<div id=\'"+ <%=stationId%> + '_' +data.data[i].C_CHGER_ID + "\'>"; 					
					clHtml+="</div>";
					
					document.getElementById('charger_resev').innerHTML = clHtml;
					//$('#reg_chargerList').append(clHtml);
					
					
					
					
					var type=data.data[i].C_CHGER_TYPE_CD == '02' ? '완속' : '급속';
					getBookingInfo(stationId,date,data.data[i].C_CHGER_ID, 0, type);
					
					
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

function getBookingInfo(stat_id,date,order, day, type){
	//console.info("day"+day);
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
				console.info(date);
				var html=" <div class='line_info'>"
						+ "    	<a href=\"javascript:getBookingInfo(\'"+ stat_id +"\',\'"+date +"\',\'"+ order +"\',\'-1\',\'"+ type + "\')\" style='margin-right: 10px;'><img src='../../../resources/images/btn_pre.png' /></a>"
						+ "    	"+ date +""
						+ "      <a class=\"next\" href=\"javascript:getBookingInfo(\'"+ stat_id +"\',\'"+date +"\',\'"+ order +"\',\'1\',\'"+ type + "\')\" style='margin-left: 10px;'><img src='../../../resources/images/btn_next.png' /></a>"
						+ "    </div>";
						
				
				
			     	html+='    <div>								' 
			     	+'        <p class="tit">예약 시간 선택</p>           ' 
			     	+'        <div class="divi_sel">                      ' 
			     	+'            <select id="divi" style="width: 98px">  ' 
			     	+'                <option>'+ order+type +'</option>             ' 
			     	+'            </select>                               ' 
			     	+'        </div>                                      ' 
			     	+'    </div>                                          ';

				
				
				var list=data;
				var times=[];
				//console.info(list);
				
				for(var k=0;k < list.data.length;k++){
					var start=Number(list.data[k].RESV_DATE.substring(8,10));
					//console.info(start);
					var end=Number(list.data[k].EXPR_DATE.substring(8,10));
					//console.info(end);
					for(var j=start;j<=end;j++){
						times.push({time:j,member:list.data[k].MEMBER_ID});
					}
				}
				//console.info(times);
				
				html+='<ul class="opinion_search MgT3">  ';
				for(var i=1;i<25;i++){
					if(i%12==1) html+='<li class="rev">';
					var booked=false;
					var mine=false;
					for(var j=0;j<times.length;j++){
						if(times[j]['time']==i){
							//if($("#member_id").val()==times[j]['member']){
							if("11"==times[j]['member']){
								mine=true;
							}
							booked=true;
						}
					}
					if(mine){
						html+='<a class="on" href="#" onclick="javascript:alert(\'이미 예약되었습니다\')" >' + i + '</a>';
					}else if(booked){
						html+='<a class="on" href="#" onclick="javascript:alert(\'이미 예약되었습니다\')">' + i + '</a>';
						
					}else{
						if(type=='급속'){
							html+='<a href="#" onclick="javascript:resvCharger(\''+ stat_id +'\',\''+ order +'\',\''+ date +'\',\''+ i +'\',\'0\',\''+ type +'\')\" >' + i + '</a>';
							
						}else{
							html+='<a href="#" onclick="javascript:resvCharger2(\''+ stat_id +'\',\''+ order +'\',\''+ date +'\',\''+ i +'\',\''+ type +'\')\" >' + i + '</a>';
								
						}
						
					}
					if(i%12==0) html+='</li>';
				}
					
				html += "</ul>";
				console.info(document.getElementById(stat_id+"_"+order));
				document.getElementById(stat_id+"_"+order).innerHTML = html;
				//$("#"+stat_id+"_"+order).html(html);
			
			window.clearInterval(timerObj);
			}, 300);
			
			
		}
	});
	
	
	
	
	
	
}


function getCmntList(){
	var stat_id=<%=stationId%>;
	////console.info(stat_id);
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
				var cmnt_type;
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
				
				var charger_id = (list[i].CHARGER_ID == '00' ? '전체' : list[i].CHARGER_ID);
				
				if(i==0){
					//html+='<div class="reply_box mt10">';
				}else if(i==list.length-1){
					//html+='<div class="reply_box last">';
				}else{
					//html+='<div class="reply_box">';
				}
				 
				
				html+= ' <dl class="post borB0">  '
				+ ' 	<a href="#" class="post_del"></a> '
				+ ' 	<dt>   '
				+ '     	<span class="divi'+list[i].CMNT_TYPE+'">'+ cmnt_type +'</span><b>' + list[i].INS_ID +'</b><em>01(급속)</em>  '
				+ '         <time datetime="2017-02-15">'+list[i].INS_DT+'</time>    	      '
				+ '     </dt>                                                                   '
				+ '     <dd>'+ list[i].CMNT +'</dd>              '
				+ ' </dl>                                                                       ';
				
				
				/* html+='<dl class="reple_info">'
					+'<dt><span class="userName">' + list[i].INS_ID +'</span>'
					+'<em class="infoType">'+ cmnt_type +'</em><em>'+ charger_id +'</em>'
					+'<em>'+list[i].INS_DT+'</em></dt>'
					+'<dl>'+ list[i].CMNT +'</dl>'
					+'</dl>'
				if(list[i].INS_ID==$('#member_id').val()){
					html+='<span class="btn_re_zone"><a href="javascript:deleteCmnt(\''+ list[i].CMNT_ID +'\')" class="btn_close"><em class="none">닫기</em></a></span>';
				}
					+'<span class="btn_re_zone"><a href="#" class="btn_close"><em class="none">닫기</em></a></span>' */
				//html+='</div>';
			}
			
			//////console.info(html);
			////console.info($('#cmnt_list'));
			
			
			var timerObj = window.setInterval(function(){
				
				document.getElementById('cmnt_list').innerHTML = html;
				
				window.clearInterval(timerObj);
				}, 300);
			//$('#cmnt_list').html(html);
		}
	});

}


function resvCharger(stat_id,order,date,time,expr,type){
	//var mem = $("#member_id").val();
	var mem = "test";
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
			,MEMBER_ID: "test"
		},
		dataType : 'json',
		success : function(data){
			if(data.errorMsg==''){
				
			}else{
				alert(data.errorMsg);
			}
			getBookingInfo(stat_id,date,order,0,type);
		}
	});

}



function resvCharger2(stat_id,order,date,time,type){
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



addBookMark = function(stationId,name){
	var stationId = <%=stationId%>;
	console.info(name);
	var titleInfo = document.getElementById('sub_tits');
	$("#sub_tits").empty();
	var titleBookMark = ""
	$.ajax({
		async: false,
		type: 'POST',
		url : '../../../resources/jsp/bookMarkInsert.jsp',
		data : {
			STAT_ID:stationId,
			MEMBER_ID:"test"
		},
		dataType : 'json',
		success:function(data){
				console.info("success");
			}
	});
	
	titleBookMark += "<a href='#' onclick='delBookMark(\""+stationId+"\",\""+name+"\")' class='like_ch_on'><span class='hidden'>즐겨찾기</span></a>";
	titleBookMark +="<h2>"+name+"<em id='distant'></em></h2>";
	titleInfo.innerHTML = titleBookMark;
}

delBookMark = function(stationId,name){
	var stationId = <%=stationId%>;
	console.info(name);
	var titleInfo = document.getElementById('sub_tits');
	$("#sub_tits").empty();
	console.info(titleInfo);
	var titleBookMark = ""
	$.ajax({
	async: false,
	type: 'POST',
	url : '../../../resources/jsp/bookMarkDelete.jsp',
	data : {
		STAT_ID:stationId,
		MEMBER_ID:"test"
	},
	dataType : 'json',
	success:function(data){
			console.info("success");
		}
	});
	
	
	titleBookMark += "<a href='#' onclick='addBookMark(\""+stationId+"\",\""+name+"\")' class='like_ch'><span class='hidden'>즐겨찾기</span></a>";
	titleBookMark +="<h2>"+name+"<em id='distant'></em></h2>";
	titleInfo.innerHTML = titleBookMark;
	
}
</script>


</head>
<div id="wrap" style="position: relative; min-width: 0px;">
			<div class="wrap_content" style="overflow: hidden;">
			<section>
			<div id="sub_tits">
				<!-- <a href='#' class='like_ch'><span class='hidden'>즐겨찾기</span></a>
				<h2>새만금경제자유구역사업단<em id='distant'></em></h2> -->
			</div>
			
			
			<div style="margin: 0px 8px 0px 5px;">
			
			
			
			<div id="tool_top">
				<div class="oper">
					<img src="../../../resources/images/test/logo_keco.png" width="15" alt="환경부 로고" /><span>환경부 (한국자동차환경협회)</span>
				</div>
				
				<div class="work_time">
					24시간 이용가능
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
                                <!-- <div class="inp_form">
                                	<p class="txt_input">
                                    	<label class="w70">구분</label>
                                    	<select id="cmnt_type">
						    				<option>:::선택:::</option>
						    				<option value='01'>충전후기</option>
						    				<option value='02'>불편사항</option>
						    				<option value='03'>장애사항</option>
						    				<option value='04'>개선요청</option> 
						    				<option value='05'>기타</option>
						    			</select>
									</p>
									<p class="txt_input">
                                        <label class="w70">충전기</label>
                                    	<select id="charger_id">
                                        	<option>:::선택:::</option>
						    				<option value='01'>01(급속)</option>
						    				<option value='02'>02(완속)</option>
                                        </select>
                                    </p>
                                    <p class="txt_input last">
                                    	<span class="inp_box bg_w fl per75"><input type="text" id="cmnt" placeholder="내용 입력" class="bg_w per90" /></span><a href="#" onclick="javascript:setCmnt();" class="btn_01_2 fl ml10" style="width:10%">등록</a>
                                    </p>
                                </div> -->
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
                            	<!-- <div id="reg_chargerList"> -->
                            	<div id="charger_resev">
                            	
                            	</div>
                              	 <ul class="model_ex">
							    	<li><span class="rev01"></span>예약가능</li>
							        <li><span class="rev02"></span>예약가능</li>
							        <li><span class="rev03"></span>예약가능</li>
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