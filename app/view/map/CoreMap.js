Ext.define('DgEv.view.map.CoreMap', {
	extend: 'Ext.Component',

	xtype: 'dgev-coremap',

	id: '_mapDiv_',
	map:null,
	baseMapLayers: [],



	width: "100%",
	height: "100%",
	html:"<div style='position:absolute; right:30px; top: 50px; z-index:20000;'>" +
			"<span id='mapSelect'>" +
		 	"<a class='mapClick' onclick=Ext.getCmp('_mapDiv_').onclickMapSelect(this); id='map0'>&nbsp&nbsp위성사진&nbsp&nbsp</a>" +
		 	"<a class='mapDefault' onclick=Ext.getCmp('_mapDiv_').onclickMapSelect(this); id='map1'>&nbsp&nbsp일반지도&nbsp&nbsp</a>" +
		 "</span></div>",
	initComponent: function() {
		this.on('render', this.mapRendered, this);
		this.callParent();
	},

	mapRendered: function(p){
		var me = this;   

		var timerId = window.setInterval(function(){

			me.initBaseMap();
			window.clearInterval(timerId);

		}, 1);


	},

	initBaseMap: function(val){
		var me = this; 
		
		
		me.baseMapLayers.push(new ol.layer.Tile({
    		title : '브이월드 (위성)',
    		visible : true,
    		type : 'base',
    		source : new ol.source.XYZ(
    				{
    					attributions : [ new ol.Attribution(
    							{
    								html : 'Tiles &copy; <a href="http://www.vworld.kr/"> <img src="./img/vworldlogo.png" /> </a>'
    							}) ],
    							url : 'http://xdworld.vworld.kr:8080/2d/Satellite/201301/{z}/{x}/{y}.jpeg'
    				})
    	})
    	)

    	me.baseMapLayers.push(new ol.layer.Tile({
    		title : '브이월드',
    		type : 'base',
    		visible : false,
    		source : new ol.source.XYZ(
    				{
    					// attribuions : 'Data by <a
    					// href="http://map.vworld.kr/">VWORLD
    					// MAP',
    					attributions : [ new ol.Attribution(
    							{
    								html : 'Tiles &copy; <a href="http://www.vworld.kr/"> <img src="./img/vworldlogo.png" /> </a>'
    							}) ],
    							url : 'http://xdworld.vworld.kr:8080/2d/Base/201411/{z}/{x}/{y}.png'
    				})
    	})
    	)
    	
    	
		me.map = new ol.Map({
	        target: '_mapDiv_',
	        layers: this.baseMapLayers,
	        view: new ol.View({
	          projection : "EPSG:4326",
	          center: [128.55, 35.87],
	          zoom:12
	        })
	      });
		me.map.getView().getCenter();
		
		var layer = new ol.layer.Tile({
			source: new ol.source.TileWMS({
				url: _serviceUrl + "wms",
				params : {
	            	 LAYERS : "EV:EV_point"
	             }
				//serverType: 'geoserver'
			})
		});
		me.map.addLayer(layer);
		layer.setVisible(true);
	},
	
	onclickMapSelect: function(val){
    	var me = this;

    	if(val.id=="map0"){
    		$("#map0").removeClass("mapDefault");
    		$("#map1").removeClass("mapClick");
    		$("#map0").addClass("mapClick");
    		$("#map1").addClass("mapDefault");
    	}else{
    		$("#map1").removeClass("mapDefault");
    		$("#map0").removeClass("mapClick");
    		$("#map1").addClass("mapClick");
    		$("#map0").addClass("mapDefault");
    	}
    	
    	var result = parseInt(val.id.split('map')[1]);
    	me.baseMapLayers[result].setVisible(true);
    	
    	for(var i =0; i<me.baseMapLayers.length; i++){
    		if(result != i){
    			me.baseMapLayers[i].setVisible(false);
    		}
    	}
    	
    }
});