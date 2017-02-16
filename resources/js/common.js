_proxyUrl = "./resources/Proxy.jsp?url=";
_serviceUrl = "http://112.217.167.123:38080/geoserver/";
_searchArr = [];
_searchAddressArr = [];
_markers= [];
getSido = function(val){
	var westSido = Ext.ComponentQuery.query("#westSido")[0];
	
	var bindArr = [];
	
	var sidoStore = Ext.create('DgEv.store.west.SidoStore');
	sidoStore.load();
	
	var timerObj = window.setInterval(function(){
		
		//console.info(sidoStore);
		for(var i = 0; i < sidoStore.data.items.length; i++){
    		if(sidoStore.data.items[i].data.name !="대구광역시"){
    			$('#sidoSelect').append('<option value='+sidoStore.data.items[i].data.code +'>' + sidoStore.data.items[i].data.name + '</option>');
    			bindArr.push({NAME:sidoStore.data.items[i].data.name,CODE:sidoStore.data.items[i].data.code});
    		}else{
    			$('#sidoSelect').append('<option selected value='+sidoStore.data.items[i].data.code +'>' + sidoStore.data.items[i].data.name + '</option>');
    			bindArr.push({NAME:sidoStore.data.items[i].data.name,CODE:sidoStore.data.items[i].data.code});
    		}
    	}
		
		window.clearInterval(timerObj);
	}, 100);
	
	
	
	
	
	var storeBind = Ext.create('Ext.data.Store', {
		fields: ['CODE', 'NAME'],
		data: bindArr
	});
	
	westSido.bindStore(storeBind);
}

sidoZoom = function(val){
	var coreMap = Ext.getCmp("_mapDiv_");
	var extent = 0;
	var featureRequest = new ol.format.WFS().writeGetFeature({
        srsName : "EPSG:4326",
        featureTypes : ['tmdl:2sido'],
        outputFormat : 'application/json',
        geometryName : 'SHAPE',
        maxFeatures : 300,
        filter: ol.format.filter.like('ADM_CD',val+'*')
    });
	
	
	$.ajax({
        url : _proxyUrl + _serviceUrl + "tmdl/wfs?",
        type : 'POST',
        data : new XMLSerializer().serializeToString( featureRequest ),
        async : false,
        contentType : 'text/xml',
        success : function(response_) {
        	 var features = new ol.format.GeoJSON().readFeatures( response_ );
	        Ext.each(features, function(media, index) {
	            
	        	//media.values_.geometry.getExtent();
	        	extent = media.values_.geometry.getExtent();
	        	
			});
        }
    
    });	
	//////console.info(coreMap.map.getView().calculateExtent(coreMap.map.getSize()));
	coreMap.map.getView().fit(extent, coreMap.map.getSize());
	//coreMap.map.getView().setZoom(14);
	
}

getSgg = function(paramSidoCd,con){
	//console.info(con);
	//////console.info(paramSidoCd);
	var sidoCd = paramSidoCd.toString().substring(0, 2);
	
	//console.info(sidoCd);
	
	var sggStore = Ext.create('DgEv.store.west.SggStore',
			{sidoCd : sidoCd});
	sggStore.load();
	
	
	var timerObj = window.setInterval(function(){
		
		var westSgg = Ext.ComponentQuery.query("#westSgg")[0];
		westSgg.value = '';
		var bindArr = [];
		
		//bindArr.push({NAME:"전체",CODE:'all'});
		
		for(var i = 0; i < sggStore.data.items.length; i++){
			bindArr.push({NAME:sggStore.data.items[i].data.name,CODE:sggStore.data.items[i].data.code})
		}
		
		var storeBind = Ext.create('Ext.data.Store', {
			fields: ['CODE', 'NAME'],
			data: bindArr
		});
		
		westSgg.bindStore(storeBind);
		
		/*if(con!="west"){
			//console.info("if");
			$('#sggSelect *').remove();
			$('#sggSelect').append('<option selected disabled>시군구</option>');
			for(var i = 0; i < sggStore.data.items.length; i++){
				$('#sggSelect').append('<option value='+sggStore.data.items[i].data.code +'>' + sggStore.data.items[i].data.name + '</option>');	
			}
			
		}else{
			//console.info("else");
			
			var westSgg = Ext.ComponentQuery.query("#westSgg")[0];
			westSgg.value = '';
			var bindArr = [];
			
			bindArr.push({NAME:"전체",CODE:'all'});
			
			var storeBind = Ext.create('Ext.data.Store', {
				fields: ['CODE', 'NAME'],
				data: bindArr
			});
			
			westSgg.bindStore(storeBind);
			
			
		}*/
		
		
		
		window.clearInterval(timerObj);
	}, 500);
	
	
	
	
}

sggZoom = function(sggCd){
	var coreMap = Ext.getCmp("_mapDiv_");
	var extent = 0;
	var featureRequest = new ol.format.WFS().writeGetFeature({
        srsName : "EPSG:4326",
        featureTypes : ['tmdl:2sigungu'],
        outputFormat : 'application/json',
        geometryName : 'SHAPE',
        maxFeatures : 300,
        filter: ol.format.filter.like('ADM_CD',sggCd+'*')
    });
	
	$.ajax({
		url : _proxyUrl + _serviceUrl + "tmdl/wfs?",
		type : 'POST',
		data : new XMLSerializer().serializeToString( featureRequest ),
		async : true,
		contentType : 'text/xml',
		success : function(response_) {

			var features = new ol.format.GeoJSON().readFeatures( response_ );
			Ext.each(features, function(media, index) {

				//media.values_.geometry.getExtent();
				extent = media.values_.geometry.getExtent();

			});
			coreMap.map.getView().fit(extent, coreMap.map.getSize());
			//coreMap.map.getView().setZoom(14);
		}
	});
}

getDemo = function(){
	
	var params = "EV/wfs?service=wfs&version=1.1.0";
	params += "&request=getfeature";
	params += "&typename=EV:EV_point";
	//params += "&PROPERTYNAME=NM";
	params += "&outputformat=application/json";
	
	$.ajax({
    	url: _proxyUrl + _serviceUrl + params,
    	
        type : 'GET',
        async : false,
        
        contentType : 'text/xml',
        success : function(response_) {
        	for(var i = 0; i < response_.features.length; i++){
        		
        		$('#demonLocation').append('<option value='+response_.features[i].properties.X + ',' + response_.features[i].properties.Y+'>' + response_.features[i].properties.NM + '</option>');
        	}
        	
        }
    });
}

placesSearchCB = function(status, data, pagination){
	////console.info(data.places);
	if (status === daum.maps.services.Status.OK) {
		var addressSearch = Ext.ComponentQuery.query("#addressSearch")[0];
		var html = "";
		for(var i = 0; i<data.places.length; i++){
			html += "<dl class='list_add' id='list_"+i+"' style='cursor:pointer;' onclick=onClickAddress('"+ i +"','"+data.places[i].addressBCode+"');><span>" +
					"<dl style='padding: 15px 10px; font-size: 12px !important;' class='922496' tabindex='0'>" +
					"<dt>"+data.places[i].title+"</dt>" +
					"<dd class='tel'>"+data.places[i].phone +
					"<span class='cate'>"+data.places[i].category +"</span></dd>" +
					"<dd class='new_addr'>" + data.places[i].newAddress+"</dd>" +
					"<dd class='old_addr'><span>지번</span>&nbsp"+data.places[i].address +"</dd></dl>" +
					"<dl id = '"+data.places[i].addressBCode+"'></dl>" +
					"</span></dl>" ;
					
					
					
			
			_searchAddressArr.push({data:data.places[i]});
		}
		
		addressSearch.setHtml(html);
		
		/*"<div class='fw_path' onclick=onclickStation();><div class='thumb'><img src='./resources/images/test/02.png'></div>" +
		"<div class='state'><p><strong>가나</strong><em><span class='L0'></span></em></p>" +
		"<p class='MgT5 borB0'><span class='condition01'>충전중</span>" +
		"<img alt='급속충전 이미지' src='./resources/images/test/icon_fast.png' width='20px' height='20px' style='margin-left:140px;'>" +
		"<em style='margin-top:5px;'>급속</em></p></div></div>"*/

    } else if (status === daum.maps.services.Status.ZERO_RESULT) {

        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === daum.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}

onclickStation = function(val){
	
	////console.info(_searchArr);
	
	var paramIdx = val;
	////console.info(_searchArr[paramIdx].data);
	var coreMap = Ext.getCmp("_mapDiv_");
	var searchX = _searchArr[paramIdx].data.LAT;
	var searchY = _searchArr[paramIdx].data.LNG;
	var isCenterCon = Ext.ComponentQuery.query("#centercontainer")[0];
	var stationInfo = Ext.ComponentQuery.query("#stationInfo")[0];
	
	openWindowCharg(_searchArr[paramIdx].data.KO_STAT_NM, _searchArr[paramIdx].data.ADDR_1, _searchArr[paramIdx].data.STAT_ID);
	
	/*coreMap.map.getView().setCenter([searchX,searchY]);
	coreMap.map.getView().setZoom(17);*/
	
	var moveLatLon = new daum.maps.LatLng(searchY, searchX);
    
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    coreMap.map.panTo(moveLatLon);
    coreMap.map.setLevel(4);

}

onClickAddress=function(val,stationId){
	
	//다시 클릭시 child remove
	var clickId = document.getElementById("list_"+val);
	if(document.getElementById(stationId).children.length != 0){
		$("#"+stationId).empty();
		return;
	}
	
	
	var paramIdx = val;
	var coreMap = Ext.getCmp("_mapDiv_");
	//////console.info(_searchAddressArr[paramIdx].data);
	var searchX = parseFloat(_searchAddressArr[paramIdx].data.longitude);
	var searchY = parseFloat(_searchAddressArr[paramIdx].data.latitude);
	
	
	
	var moveLatLon = new daum.maps.LatLng(searchY, searchX);
	coreMap.map.panTo(moveLatLon);
    coreMap.map.setLevel(4);
    
    var radiusItems = Ext.getCmp("radiusItems");
    var params = [];
    params.push(searchX);
    params.push(searchY);
    params.push(_searchAddressArr[paramIdx].data);
    params.push(radiusItems.getValue().radiusItems);
    
    console.info(params);
    
    
    
	var radiusStore = Ext.create('DgEv.store.west.RadiusSearch',
			params);
	radiusStore.load();
	var radiusAdd= "";
	var timerObj = window.setInterval(function(){
		
		var addressRadiusData = [];
		for(var i=0; i < radiusStore.data.length;i++){
			addressRadiusData.push({ADDR:radiusStore.data.items[i].data.ADDR,
				KO_STAT_NM: radiusStore.data.items[i].data.KO_STAT_NM,
				STAT_ID: radiusStore.data.items[i].data.STAT_ID
			})
		}
		
		
		////console.info(addressRadiusData);
		
		for(var j=0; j < addressRadiusData.length;j++){
			radiusAdd += "<div class='fw_path' id='clickTest' onclick='openWindowCharg(\""+addressRadiusData[j].KO_STAT_NM+"\",\""+addressRadiusData[j].ADDR+"\",\""+addressRadiusData[j].STAT_ID+"\");'><div class='thumb'><img src='./resources/images/test/02.png'></div>" +
			"<div class='state'><p><strong>"+addressRadiusData[j].KO_STAT_NM+"</strong><em><span class='L0'></span></em></p>" +
			"<p>" +
			addressRadiusData[j].ADDR +
			"</p></div></div>";
		}
		document.getElementById(radiusStore[2].addressBCode).innerHTML = radiusAdd;
		
		window.clearInterval(timerObj);
	}, 500);
	
	
    
}

ChargChkBox = function(data,check){
	
	var coreMap = Ext.getCmp("_mapDiv_");
	
	for(var i = 0 ; _markers.length ; i++){
		if(_markers[i].data != undefined){
			if(Number(_markers[i].data.GUBUN) == data.layerId){
				_markers[i].setVisible(check);
			}
		}
	}
}



layerIconChange = function(zoomLevel){
	
var coreMap = Ext.getCmp("_mapDiv_");

	for(var i = 0 ; i < coreMap.map.getLayers().array_.length  ; i++){
		if(coreMap.map.getLayers().array_[i].style_ != undefined){
			////console.info(coreMap.map.getLayers().array_[i]);
			if(zoomLevel > 13){
				coreMap.map.getLayers().array_[i].setStyle(
					new ol.style.Style({
			        	image: new ol.style.Icon({
			        		size: [43,43],
			        		src: "./resources/images/maker/m"+coreMap.map.getLayers().array_[i].values_.GUBUN+"_b_"+coreMap.map.getLayers().array_[i].values_.CHARG+".png"
			        	})
			        })
				);
			}else{
				coreMap.map.getLayers().array_[i].setStyle(
					new ol.style.Style({
			        	image: new ol.style.Icon({
			        		size: [29,26],
			        		src: "./resources/images/maker/m"+coreMap.map.getLayers().array_[i].values_.GUBUN+"_s_"+coreMap.map.getLayers().array_[i].values_.CHARG+".png"
			        	})
			        })
				);
		
			}
		}
		
	}
},




SelectZoom = function(value,type){
	var westSido = Ext.ComponentQuery.query("#westSido")[0];
	var westSgg = Ext.ComponentQuery.query("#westSgg")[0];
	
	
	var coreMap = Ext.getCmp("_mapDiv_");
	
	var geocoder = new daum.maps.services.Geocoder();

	// 주소로 좌표를 검색합니다
	
	if(westSgg.getValue() != ""){
		value = westSido.rawValue + westSgg.rawValue;
	}
	
	geocoder.addr2coord(value, function(status, result) {
		////console.info(result);
	    // 정상적으로 검색이 완료됐으면 
	     if (status === daum.maps.services.Status.OK) {

	        var coords = new daum.maps.LatLng(result.addr[0].lat, result.addr[0].lng);

	        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
	        coreMap.map.setCenter(coords);
	    } 
	});    
},



LayerSymbol = function(store){
	console.info(store);
	var coreMap = Ext.getCmp("_mapDiv_");
	
	var x = "";
	var y = "";

	var positions = [];
	
	_markers = [];
	
	var timerObj = window.setInterval(function(){
		
		for(var i = 0 ; i < store.data.items.length; i++){
			var  cord = store.data.items[i].data.S_GPS_LAT_LNG.split(",");
			x = cord[1];
			y = cord[0];
			
			
			
			
			positions.push({latlng: new daum.maps.LatLng(y, x), 
							//GUBUN: store.data.items[i].data.GUBUN,
							STAT_ID: store.data.items[i].data.STAT_ID,
							NM: store.data.items[i].data.S_KO_STAT_NM,
							Y01: store.data.items[i].data.Y01,
							N01: store.data.items[i].data.N01,
							Y02: store.data.items[i].data.Y02,
							N02: store.data.items[i].data.N02,
							A01: store.data.items[i].data.A01,
							A02: store.data.items[i].data.A02,
							YA: store.data.items[i].data.YA,
							NA: store.data.items[i].data.NA,
							AA: store.data.items[i].data.AA
							//ADDR: store.data.items[i].data.ADDR,
							//Rapid: store.data.items[i].data.CHGER_TYPE
							});	
		}
		
		
		for (var i = 0; i < positions.length; i ++) {
		    // 마커 이미지의 이미지 크기 입니다
		    var imageSize = new daum.maps.Size(34, 43); 
		    
		    
		    var GUBUN = "";
		    var PARID = "";
		    // 마커 이미지를 생성합니다
		    GUBUN = positions[i].GUBUN;
		    
		    /*if(positions[i].Rapid == 02){
		    	PARID = "slow";
		    }else{
		    	PARID = "fast";
		    }*/
		    //var markerImage = new daum.maps.MarkerImage("./resources/images/maker/m"+GUBUN+"_s_"+PARID+".png", imageSize); 
		    //var markerImage = new daum.maps.MarkerImage("./resources/images/maker/m1_s_fast.png", imageSize);
		    
		    var markerImage = "";
		    var select=undefined;
		    if(select==undefined||select=="all"){
				if(positions[i].AA!="10"){
					markerImage = new daum.maps.MarkerImage("./resources/images/maker_numbering/m1_num0" + positions[i].YA + ".png", imageSize);
				}else{
					markerImage = new daum.maps.MarkerImage("./resources/images/maker_numbering/m1_num10.png", imageSize);
				}
			}else if(select=="rap"){
				markerImage = new daum.maps.MarkerImage("./resources/images/maker/m2_b_fast.png", imageSize);
			}else if(select=="slow"){
				markerImage = new daum.maps.MarkerImage("./resources/images/maker/m4_b_slow.png", imageSize);
			}
		    
		    
		    // 마커를 생성합니다
		    var marker = new daum.maps.Marker({
		        //map: coreMap.map, // 마커를 표시할 지도
		        clickable: true,
		        data: positions[i],
		        position: positions[i].latlng, // 마커를 표시할 위치
		        title : "", // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
		        image : markerImage // 마커 이미지 
		    });
		    marker.data = positions[i];
		    
		    marker.setMap(coreMap.map);
		    _markers.push(marker);
		    
			// 마커에 클릭이벤트를 등록합니다
			daum.maps.event.addListener(marker, 'click', function() {
				
				openWindowCharg(marker.data.NM, marker.data.ADDR, marker.data.STAT_ID);
				
			});
		    
		}
		
		window.clearInterval(timerObj);
	}, 300);

	
},

openWindowCharg = function(Name,Addr,stationId){
	var isCenterCon ="";
	isCenterCon = Ext.ComponentQuery.query("#centercontainer")[0];
	var coreMap = Ext.getCmp("_mapDiv_");
	chargerList = "";
	//충전기 리스트
	var stationList = [];
	chargerList += 
		"<thead><tr><th>구분</th><th>충전기 타입</th><th>운전 상태</th><th style='border-right: 0px;'>장애 신고</th></tr></thead> " +
		"<tbody>" ;
	//해당 충전소에 충전기 정보 담기
	for(var i = 0; i < coreMap.chargerList.items.length;i++){
		if(coreMap.chargerList.items[i].data.C_STAT_ID == stationId){
			stationList.push(coreMap.chargerList.items[i].data);
		}
	}
	
	if(isCenterCon == undefined){
		
		var centerContainer = Ext.create("Ext.window.Window",{
			itemId:"centercontainer",
			border:false,
			autoScroll:false,
			id:"stationWindow",
			title:"충전소 운영 현황",
			layout:{
				type:"hbox"
			},
			height:700,
			width:410,
			x:800,
			y:100,
			items:[{
				xtype:"panel",
				itemId:"stationInfo",
				border:false,
				height:"100%",
				autoScroll:false,
				width:410,
				html: '<iframe id="chagerInfo" style="overflow:auto; width:100%; height:100%;" frameborder="0" src="./resources/jsp/windowpop/stationinfo2.jsp?stationId='+stationId+'"></iframe>'
			}]
		});
		stationInfo = Ext.ComponentQuery.query("#stationInfo")[0];
		centerContainer.show();
	}

	  
	var timerObj = window.setInterval(function(){
		
		
		for(var j = 0; j < stationList.length ; j++){
			////console.info(stationList[j]);
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
			
			chargerList +=
			"<tr> <th class='AC'>"+stationList[j].C_CHGER_TYPE_CD+GUBUN+"</th>	"+
			"<td>" +
			CHGER_TYPE+
			"</td><td>	" +
			"<span class='use' style='font-size: 11px !important;'>사용가능</span></td>" +
			"<td class='borR0'>	" +
			"<span class='phone'>전화</span><span class='message'>문자</span></td></tr>" ;
		}
		chargerList += "</tbody>";
		
		//충전기
		var chgerWindow = document.getElementById('chagerInfo').contentWindow;
		
		console.info(chgerWindow.document.getElementById('table_03'));
		chgerWindow.document.getElementById('table_03').innerHTML = chargerList;
		
		
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
			"              <td class='PdL10 AL borR0'>"+Addr+"</td>       "+
			"          </tr>                                                                    "+
			"          <tr>                                                                     "+
			"              <th class='PdL10 AL'>운영기관</th>                                      "+
			"              <td class='PdL10 AL borR0'>환경부</td>                   "+
			"          </tr>                                                                    "+
			"          <tr>                                                                     "+
			"              <th class='PdL10 AL'>연락처</th>                                        "+
			"              <td class='PdL10 AL borR0 L0'>1661-9408</td>                            "+
			"          </tr>                                                                    "+
			"          <tr>                                                                     "+
			"              <th class='PdL10 AL'>참고사항</th>                                      "+
			"              <td class='PdL10 AL borR0'>없음</td>                                 "+
			"          </tr>                                                                    "+
			"      </tbody>                                                                     "+
			"  </table>                                                                         "+
			
			"			</div>   ";
			
			
		
		
		//상세정보
		var stationInfo = chgerWindow.document.getElementById('tab_01');
		stationInfo.innerHTML = stationHtml;
		
		
		var titleInfo = chgerWindow.document.getElementById('sub_tits');
		var titleBookMark = ""
		//console.info(Name);
		$.ajax({
		async: false,
		type: 'POST',
		url : './resources/jsp/bookMarkList.jsp',
		data : {
			STAT_ID:stationId,
			MEMBER_ID:"test"
		},
		dataType : 'json',
		success:function(data){
			
			var timerObj = window.setInterval(function(){
				
				//console.info(data);
				
				if(data.data.length == 0){
					titleBookMark += "<a href='#' onclick='addBookMark(\""+stationId+"\",\""+Name+"\")' class='like_ch'><span class='hidden'>즐겨찾기</span></a>";
				}else{
					titleBookMark += "<a href='#' onclick='delBookMark(\""+stationId+"\",\""+Name+"\")' class='like_ch_on'><span class='hidden'>즐겨찾기</span></a>";
					
				}
				titleBookMark +="<h2>"+Name+"<em id='distant'></em></h2>";
				titleInfo.innerHTML = titleBookMark;
				//console.info(titleBookMark);
				window.clearInterval(timerObj);
				}, 300);
			//$('#cmnt_list').html(html);
			}
		});
		
		window.clearInterval(timerObj);
		}, 700);

	  
}
