
_proxyUrl = "./resources/Proxy.jsp?url=";
_serviceUrl = "http://112.217.167.123:38080/geoserver/";

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
	
}

getSgg = function(sidoCd,con){
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
			html += "<dl class='list_add'><span>" +
						"<dl style='padding: 10px;' class='922496' tabindex='0'>" +
						"<dt>"+data.places[i].title+"</dt>" +
						"<dd class='tel'>"+data.places[i].phone +
						"<span class='cate'>"+data.places[i].category +"</span></dd>" +
						"<dd class='new_addr'>" + data.places[i].newAddress+"</dd>" +
						"<dd class='old_addr'><span>지번</span>&nbsp"+data.places[i].address +"</dd></dl>" +
						"<span></span>" +
						"<span></span>" +
						"</span></dl>"
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