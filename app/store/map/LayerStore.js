Ext.define("DgEv.store.map.LayerStore", {
    extend : 'Ext.data.Store',
    //extend : 'Ext.data.BufferedStore', 
    /* {name: 'OUT_FLOW_SUM', type 'number'}*/
    
	listeners: {
		load: function(store) {
			
			var coreMap = Ext.getCmp("_mapDiv_");
			
			var	proxy = "./resources/Proxy.jsp?url="
			
			/*
			--GUBUN 코드--  
			01 = 충전중
			02 = 사용가능
			03 = 운영정지
			04 = 점검중
			05 = 타기관*/
				
			for(var i = 1 ; i < 6 ;i++){
				
				var color = "";
				
				if(i == 1){
					src = "./resources/images/maker/m"+i+"_s_fast.png";
				}else if(i == 2){
					src = "./resources/images/maker/m"+i+"_s_fast.png";
				}else if(i == 3){
					src = "./resources/images/maker/m"+i+"_s_fast.png";
				}else if(i == 4){
					src = "./resources/images/maker/m"+i+"_s_fast.png";
				}else{
					src = "./resources/images/maker/m"+i+"_s_fast.png";
				}
				/*var fill = new ol.style.Fill({
	        	      color: color
	        	    });
	    	    var stroke = new ol.style.Stroke({
	    	      color: color,
	    	      width: 1.25
	    	    });*/
				
				var vectorSource = new ol.source.Vector({
			        format: new ol.format.GeoJSON(),
			        url: './resources/Proxy.jsp?url=http://112.217.167.123:38080/geoserver/EV/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=EV:EV_point&maxFeatures=50&outputFormat=application/json&CQL_FILTER=GUBUN=0'+i
			      });
				
				var vector = new ol.layer.Vector({
			        source: vectorSource,
			        style: new ol.style.Style({
			        	image: new ol.style.Icon({
			        		size: [29,26],
			        		src: src
			        	})
			        })
				})
				
				
				/*var vector = new ol.layer.Vector({
			        source: vectorSource,
			        style: new ol.style.Style({
	        	        image: new ol.style.Circle({
		        	          fill: fill,
		        	          stroke: stroke,
		        	          radius: 5
		        	        }),
		        	        fill: fill,
		        	        stroke: stroke
		        	      })
				})*/
				vector.TITLE = i;
				vector.setVisible(true);
				
				
				coreMap.map.addLayer(vector);
			
			}
				
				
			/*var featureRequest = new ol.format.WFS().writeGetFeature({
                srsName : "EPSG:4326",
                featureTypes : ['EV_point'],
                outputFormat : 'application/json',
                geometryName : 'SHAPE',
                maxFeatures : 300
            });
            
            $.ajax({
                url : proxy+'http://112.217.167.123:38080/geoserver/wfs',
                type : 'POST',
                data : new XMLSerializer().serializeToString( featureRequest ),
                async : false,
                contentType : 'text/xml',
                success : function(response_) {
                	var features = new ol.format.GeoJSON().readFeatures( response_ );   
                	
                	var vector = new ol.layer.Vector({
                	    source: features,
                	    style: new ol.style.Style({
                	        stroke: new ol.style.Stroke({
                	            color: 'rgba(0, 0, 255, 1.0)',
                	            width: 2
                	        })
                	    })
                	});
                	
                	
				}
            })*/
			
			
			/*var fill = new ol.style.Fill({color: 'rgba(237, 26, 170, 0.82)'});
			var stroke = new ol.style.Stroke({color: '#4A12ED',width: 1.25});
			var text = new ol.style.Text({color: '#F21A6C'});
			
			var styles = [new ol.style.Style({
                image: new ol.style.Circle({
                    fill: fill,
                    stroke: stroke,
                    radius: 5
                }),
                fill: fill,
                stroke: stroke,
            })];
			
			for(var i = 1 ; i < 6 ;i++){
				
				
				var layer = new ol.layer.Tile({
					source: new ol.source.TileWMS({
						url: _serviceUrl + "wms",
						params : {
							 LAYERS : "EV:EV_point",
			            	 CQL_FILTER: "GUBUN = '0"+i+"'"
			             },
			            
					}),
					style: styles
				});
				layer.TITLE = i
				
				console.info(layer);
				console.info(layer.getProperties());
				coreMap.map.addLayer(layer);
				layer.setVisible(false);
			}*/
			
		}
    }
});