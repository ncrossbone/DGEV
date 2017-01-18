
_proxyUrl = "./resources/Proxy.jsp?url=";
_serviceUrl = "http://112.217.167.123:38080/geoserver/";
_searchArr = [];
_searchAddressArr = [];
getSido = function(val){
	var westSido = Ext.ComponentQuery.query("#westSido")[0];
	
	
	var bindArr = [];
	
	
	var params = "tmdl/wfs?service=wfs&version=1.1.0";
	params += "&request=getfeature";
	params += "&typename=tmdl:2sido";
	params += "&PROPERTYNAME=ADM_CD,DO_NM";
	params += "&outputformat=application/json";
	
	$.ajax({
    	url: _proxyUrl + _serviceUrl + params,
    	
        type : 'GET',
        async : false,
        
        contentType : 'text/xml',
        success : function(response_) {
        	//test = {NAME:response_.features[0].properties.DO_NM,CODE:""};
        	bindArr.push({NAME:"전체",CODE:'all'});
        	for(var i = 0; i < response_.features.length; i++){
        		if(response_.features[i].properties.DO_NM!="대구광역시"){
        			$('#sidoSelect').append('<option value='+response_.features[i].properties.ADM_CD +'>' + response_.features[i].properties.DO_NM + '</option>');
        			bindArr.push({NAME:response_.features[i].properties.DO_NM,CODE:response_.features[i].properties.ADM_CD});
        		}else{
        			$('#sidoSelect').append('<option selected value='+response_.features[i].properties.ADM_CD +'>' + response_.features[i].properties.DO_NM + '</option>');
        			bindArr.push({NAME:response_.features[i].properties.DO_NM,CODE:response_.features[i].properties.ADM_CD});
        		}
        	}
        	
        }
    });
	
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
	//console.info(coreMap.map.getView().calculateExtent(coreMap.map.getSize()));
	coreMap.map.getView().fit(extent, coreMap.map.getSize());
	//coreMap.map.getView().setZoom(14);
	
}

getSgg = function(paramSidoCd,con){
	//console.info(paramSidoCd);
	var sidoCd = paramSidoCd.toString().substring(0, 2);
	if(con!="west"){
		var featureRequest = new ol.format.WFS().writeGetFeature({
			srsName : "EPSG:4326",
			featureTypes : ['tmdl:2sigungu'],
			outputFormat : 'application/json',
			geometryName : 'SHAPE',
			maxFeatures : 300,
			filter: ol.format.filter.like('ADM_CD',sidoCd+'*')
		});

		$.ajax({
			url : _proxyUrl + _serviceUrl + "tmdl/wfs?",
			type : 'POST',
			data : new XMLSerializer().serializeToString( featureRequest ),
			async : true,
			contentType : 'text/xml',
			success : function(response_) {

				var features = new ol.format.GeoJSON().readFeatures( response_ );
				$('#sggSelect *').remove();
				$('#sggSelect').append('<option selected disabled>시군구</option>');
				for(var i = 0; i < features.length; i++){
					$('#sggSelect').append('<option value='+response_.features[i].properties.ADM_CD +'>' + response_.features[i].properties.CTY_NM + '</option>');	
				}

			}
		});
	}else{
		var westSgg = Ext.ComponentQuery.query("#westSgg")[0];
		westSgg.value = '';
		var bindArr = [];
		
		var featureRequest = new ol.format.WFS().writeGetFeature({
			srsName : "EPSG:4326",
			featureTypes : ['tmdl:2sigungu'],
			outputFormat : 'application/json',
			geometryName : 'SHAPE',
			maxFeatures : 300,
			filter: ol.format.filter.like('ADM_CD',sidoCd+'*')
		});
		

		$.ajax({
			url : _proxyUrl + _serviceUrl + "tmdl/wfs?",
			type : 'POST',
			data : new XMLSerializer().serializeToString( featureRequest ),
			async : true,
			contentType : 'text/xml',
			success : function(response_) {
				var features = new ol.format.GeoJSON().readFeatures( response_ );
				bindArr.push({NAME:"전체",CODE:'all'});
				for(var i = 0; i < features.length; i++){
					
					bindArr.push({NAME:response_.features[i].properties.CTY_NM,CODE:response_.features[i].properties.ADM_CD});
				}
				
				var storeBind = Ext.create('Ext.data.Store', {
					fields: ['CODE', 'NAME'],
					data: bindArr
				});
				
				westSgg.bindStore(storeBind);
			}
		});
		
		
	}
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
			html += "<dl class='list_add' style='cursor:pointer;' onclick=onClickAddress('"+ i +"');><span>" +
						"<dl style='padding: 10px;' class='922496' tabindex='0'>" +
						"<dt>"+data.places[i].title+"</dt>" +
						"<dd class='tel'>"+data.places[i].phone +
						"<span class='cate'>"+data.places[i].category +"</span></dd>" +
						"<dd class='new_addr'>" + data.places[i].newAddress+"</dd>" +
						"<dd class='old_addr'><span>지번</span>&nbsp"+data.places[i].address +"</dd></dl>" +
						"<span></span>" +
						"<span></span>" +
						"</span></dl>";
			_searchAddressArr.push({data:data.places[i]});
		}
		addressSearch.setHtml(html);

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
	var searchX = _searchArr[paramIdx].data.X;
	var searchY = _searchArr[paramIdx].data.Y;
	var isCenterCon = Ext.ComponentQuery.query("#centercontainer")[0];
	var stationInfo = Ext.ComponentQuery.query("#stationInfo")[0];

	var html = "<div id='wrap' style='width: 390px; position: relative; padding: 3px; min-width: 0px;'>" +
	"<div class='wrap_content' style='width: 384px; overflow: hidden;'>" +
	"<section>"+
	"<div id='sub_tits'>" +
	"<form id='form' action='' name='form' method='post'>" +
	/*"<input type='hidden' id='stat_id' name='stat_id' value='45130001'>" +
	"<input type='hidden' id='stat_nm' name='stat_nm' value='"+_searchArr[paramIdx].data.NM +"'>" +
	"<input type='hidden' id='stat_addr' name='stat_addr' value='전라북도 군산시 오식도동 1010'>" +
	"<input type='hidden' id='mode' name='mode' value=''>" +*/
	"<a href='#' onclick='addBookMark();' class='like_ch'><span class='hidden'>즐겨찾기</span></a><h2>"+_searchArr[paramIdx].data.NM +"<em id='distant'></em></h2>" +
	"</form></div><div id='sub_cont'><div class='sub_info_area' style='margin-top: 0px;'><span class='corp_info'>" +
	"<img src='./resources/images/test/logo_keco.png' width='20' alt='환경부 로고' style='float: left'> <span>환경부(한국자동차환경협회)</span></span><div class='time_info'><span>" +
	"<em>24시간 이용가능</em></span></div></div><table class='table_01'><tbody><tr><th>구분</th><th>충전기 타입</th><th>운전 상태</th></tr><tr><td><dl>" +
	"<dt class='fast'>01</dt><dd style='margin-left: 0px;'>급속</dd></dl></td><td class='td2'>" +
	"<span class='ev_type t01'>DC차데모</span>" +
	"<span class='ev_type t02'>AC3상</span>" +
	"<span class='ev_type t03'>DC콤보</span></td><td class='td3'>	<span class='ev_char c01'>사용가능</span></td></tr></tbody></table></div>" +
	"<div class='middle_line'></div><div class='sub_group'><h3 class='tit3_info'>상세정보</h3><table class='table_02'>" +
	"<tbody><tr><th style='width: 70px;'>주소</th><td>"+_searchArr[paramIdx].data.JUSO +"</td></tr><tr><th>운영기관</th>" +
	"<td>환경부(한국자동차환경협회)</td></tr><tr><th>연락처</th><td>1661-9408</td></tr><tr><th>이용요금</th><td>유료</td></tr>" +
	"<tr><th>최근 충전일</th><td>2017-01-04 14:28</td></tr><tr>" +
	"<th>참고사항</th><td>없음 </td></tr></tbody></table></div>" +
	"<div class='middle_line'></div>" +
	"<div class='sub_group'>" +
	"<h3 class='tit3_pic'>위치사진</h3>" +
	"<div class='pic_area'>" +
	"<img src='/mobile/images/common/pic_noimg.jpg' height='100' alt='충전소 사진'>" +
	"<img src='/mobile/images/common/pic_noimg.jpg' height='100' alt='충전소 사진'>" +
	"<img src='/mobile/images/common/pic_noimg.jpg' height='100' width='110'>" +
	"</div>" +
	"</div>" +
	"</section></div></div>";


	coreMap.map.getView().setCenter([searchX,searchY]);
	coreMap.map.getView().setZoom(17);


	if(isCenterCon == undefined){
		var centerContainer = Ext.create("DgEv.view.center.CenterContainer");
		stationInfo = Ext.ComponentQuery.query("#stationInfo")[0];
		centerContainer.show(); 
		stationInfo.setHtml(html);
	}else{
		stationInfo.setHtml(html);
	}

}

onClickAddress=function(val){
	var paramIdx = val;
	var coreMap = Ext.getCmp("_mapDiv_");
	//console.info(_searchAddressArr[paramIdx].data);
	var searchX = parseFloat(_searchAddressArr[paramIdx].data.longitude);
	var searchY = parseFloat(_searchAddressArr[paramIdx].data.latitude);
	
	coreMap.map.getView().setCenter([searchX,searchY]);
	coreMap.map.getView().setZoom(17);
}



ChargChkBox = function(data,check){
	
	var coreMap = Ext.getCmp("_mapDiv_");
	var layers = coreMap.map.getLayers();
	for(var i = 0 ; i < layers.array_.length; i++){
		console.info();
		if(layers.array_[i].values_.TITLE != undefined){
			if(layers.array_[i].values_.TITLE.substring(0,1) == data.layerId){
				layers.array_[i].setVisible(check);
			}
		}
	}
}



layerIconChange = function(zoomLevel){
	
var coreMap = Ext.getCmp("_mapDiv_");

	for(var i = 0 ; i < coreMap.map.getLayers().array_.length  ; i++){
		if(coreMap.map.getLayers().array_[i].style_ != undefined){
			console.info(coreMap.map.getLayers().array_[i]);
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
}