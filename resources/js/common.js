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
	coreMap.map.getView().fit(extent, coreMap.map.getSize());
	
}

getSgg = function(paramSidoCd,con){
	var sidoCd = paramSidoCd.toString().substring(0, 2);
	
	
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
			////console.info("if");
			$('#sggSelect *').remove();
			$('#sggSelect').append('<option selected disabled>시군구</option>');
			for(var i = 0; i < sggStore.data.items.length; i++){
				$('#sggSelect').append('<option value='+sggStore.data.items[i].data.code +'>' + sggStore.data.items[i].data.name + '</option>');	
			}
			
		}else{
			////console.info("else");
			
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
	
	if (status === daum.maps.services.Status.OK) {
		var addressSearch = Ext.ComponentQuery.query("#addressSearch")[0];
		var html = "";
		for(var i = 0; i<data.places.length; i++){
			
			var phone = "";
			if(data.places[i].phone != ""){
				phone+= "<span class='list_num'>"+data.places[i].phone +"</span>";
			}
			
			
			html += "<dl class='list_add' id='list_"+i+"' style='cursor:pointer;' onclick=onClickAddress('"+ i +"','"+data.places[i].addressBCode+"','addr_"+data.places[i].addressBCode+"');><span>" +
					"<dl style='padding: 15px 10px; font-size: 12px !important;' class='922496' tabindex='0'>" +
					"<dt>"+data.places[i].title+"</dt><a class='addr_opner' id='addr_"+data.places[i].addressBCode+"'><img src='./resources/images/view_open.gif'></a>" +
					"<dd class='tel'>" +
					
					phone+
					
					"<span class='cate'>"+data.places[i].category +"</span></dd>" +
					"<dd class='new_addr'>" + data.places[i].newAddress+"</dd>" +
					"<dd class='old_addr'><span>지번</span>&nbsp"+data.places[i].address +"</dd></dl>" +
					"</span></dl>"+
					"<dl id = '"+data.places[i].addressBCode+"'></dl>" ;
					
					
					
			
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
	
	
	var paramIdx = val;
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

onClickAddress=function(val,stationId,addrId){

	
	document.getElementById(addrId).innerHTML = "<img src='./resources/images/view_close.gif'>";
	
	//다시 클릭시 child remove
	if(document.getElementById(stationId).children.length != 0){
//		$("#"+addrId).innerHTML = "<img src='./resources/images/view_open.gif'>";
		document.getElementById(addrId).innerHTML = "<img src='./resources/images/view_open.gif'>";
		$("#"+stationId).empty();
		
		return;
	}
	
	
	var paramIdx = val;
	var coreMap = Ext.getCmp("_mapDiv_");
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
		
		
		
		for(var j=0; j < addressRadiusData.length;j++){
			radiusAdd += "<div class='fw_path_addr' id='fw_path_addr_"+addressRadiusData[j].STAT_ID+"' onclick='openWindowCharg(\""+addressRadiusData[j].KO_STAT_NM+"\",\""+addressRadiusData[j].ADDR+"\",\""+addressRadiusData[j].STAT_ID+"\");'><div class='thumb'><img src='./resources/images/test/02.png'></div>" +
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
	    // 정상적으로 검색이 완료됐으면 
	     if (status === daum.maps.services.Status.OK) {

	        var coords = new daum.maps.LatLng(result.addr[0].lat, result.addr[0].lng);

	        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
	        coreMap.map.setCenter(coords);
	    } 
	});    
},



LayerSymbol = function(select){
	
	
	
	var coreMap = Ext.getCmp("_mapDiv_");
	var store = coreMap.layerInfo;
	
	var x = "";
	var y = "";

	var positions = [];
	
	_markers = [];
	
	var timerObj = window.setInterval(function(){
		for(var i = 0 ; i < store.data.items.length; i++){
			var  cord = store.data.items[i].data.S_GPS_LAT_LNG.split(",");
			x = cord[1];
			y = cord[0];
			
			/*var addr = "";
			for(var j=0;j < coreMap.stationList.items.length;j++){
				if(coreMap.stationList.items[j].data.STAT_ID == store.data.items[i].data.STAT_ID){
					addr = coreMap.stationList.items[j].data.ADDR_1;
				}
			}*/
			
			
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
							//Rapid: store.data.items[i].data.CHGER_TYPE
							});	
		}
		
		
		for (var i = 0; i < positions.length; i ++) {
		    // 마커 이미지의 이미지 크기 입니다
		    var imageSize = new daum.maps.Size(34, 43); 
		    
		    
		    var PARID = "";
		    
		    // 마커 이미지를 생성합니다
		    
		    
		    var markerImage = "";
		    if(select==undefined||select=="all"){
				if(positions[i].AA!="10"){
					markerImage = new daum.maps.MarkerImage("./resources/images/maker_numbering/m1_num0" + positions[i].YA + ".png", imageSize);
				}else{
					markerImage = new daum.maps.MarkerImage("./resources/images/maker_numbering/m1_num00.png", imageSize);
				}
			}else if(select=="rap"){
				
				if(positions[i].AA!="10"){
					markerImage = new daum.maps.MarkerImage("./resources/images/maker_numbering/m1_num0" + positions[i].Y01 + ".png", imageSize);
				}else{
					markerImage = new daum.maps.MarkerImage("./resources/images/maker_numbering/m1_num00.png", imageSize);
				}
			}else if(select=="slow"){
				if(positions[i].AA!="10"){
					markerImage = new daum.maps.MarkerImage("./resources/images/maker_numbering/m1_num0" + positions[i].Y02 + ".png", imageSize);
				}else{
					markerImage = new daum.maps.MarkerImage("./resources/images/maker_numbering/m1_num00.png", imageSize);
				}
			}
		    // 마커를 생성합니다
		    var marker = new daum.maps.Marker({
		        //map: coreMap.map, // 마커를 표시할 지도
		        clickable: true,
		        stationId: positions[i].STAT_ID,
		        data: positions[i],
		        position: positions[i].latlng, // 마커를 표시할 위치
		        title : "", // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
		        image : markerImage // 마커 이미지 
		    });
		    marker.data = positions[i];
		    
		    coreMap.marker.push(marker);
		    marker.setMap(coreMap.map);
		    
		    //_markers.push(marker);
			// 마커에 클릭이벤트를 등록합니다
		    
		    daum.maps.event.addListener(marker, 'click', function() {
		    	
		    	openWindowCharg(this.data.NM, this.data.ADDR, this.data.STAT_ID);
				
			});
			
		    
		}
		
		window.clearInterval(timerObj);
	}, 500);

	
},





openWindowCharg = function(Name,Addr,stationId){
	
		
		
	var isCenterCon ="";
	isCenterCon = Ext.ComponentQuery.query("#centercontainer")[0];
	var coreMap = Ext.getCmp("_mapDiv_");
	chargerList = "";
	
	//충전기 리스트
	//var stationList = [];
	chargerList += 
		"<thead><tr><th>구분</th><th>충전기 타입</th><th>운전 상태</th><th style='border-right: 0px;'>장애 신고</th></tr></thead> " +
		"<tbody>" ;
	//해당 충전소에 충전기 정보 담기
	/*for(var i = 0; i < coreMap.chargerList.items.length;i++){
		if(coreMap.chargerList.items[i].data.C_STAT_ID == stationId){
			stationList.push(coreMap.chargerList.items[i].data);
		}
	}*/
	
	
	var  stationWindow = Ext.getCmp("stationWindow");
	
	
	if(stationWindow != undefined){
		stationWindow.close();
	}
	
	
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

	  
	var timerObj = window.setInterval(function(){
		
		window.clearInterval(timerObj);
		}, 1000);

	  
},

deleteMark = function(stationId,name,busiCd){
	//var stationId = <%=stationId%>;
	//delBtn_
	
	var favStation = document.getElementById('fav_'+stationId);
	var favDelButton = document.getElementById('delBtn_'+stationId);
	
	favStation.remove();
	favDelButton.remove();
	//$("#sub_tits").empty();
	
	var titleBookMark = ""
	$.ajax({
	async: false,
	type: 'POST',
	url : './resources/jsp/bookMarkDelete.jsp',
	data : {
		STAT_ID:stationId,
		MEMBER_ID:"test",
		BUSI_CD:busiCd
	},
	dataType : 'json',
	success:function(data){
			alert("삭제 완료")
		}
	});
}
