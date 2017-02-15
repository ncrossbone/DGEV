Ext.define('DgEv.view.map.CoreMap', {
	extend: 'Ext.Component',

	xtype: 'dgev-coremap',

	id: '_mapDiv_',
	map:null,
	baseMapLayers: [],

	_zoomPointerTop:0,
    _zoomBar:0,
    _zoomBar2:0,
    _maxTop : 0,
    _minTop : 0,
    _plusValue : 10,
    _minusValue : 0,
    preValue: 0,

	width: "100%",
	height: "100%",
	html:"<div style='position:absolute; right:30px; top: 50px; z-index:20000;'>" +
			"<span id='mapSelect'>" +
		 	"<a class='mapClick' onclick=Ext.getCmp('_mapDiv_').onclickMapSelect(this); id='map0'>&nbsp&nbsp일반지도&nbsp&nbsp</a>" +
		 	"<a class='mapDefault' onclick=Ext.getCmp('_mapDiv_').onclickMapSelect(this); id='map1'>&nbsp&nbsp위성사진&nbsp&nbsp</a>" +
		 "</span></div>" +
		 "<div style='position:absolute; top:8%; left:96%; width:60px; z-index:20000; height:200px;'>" +
	  "<div class='zoomText'>" +
	  	"<div style='top:75px; background: url(./resources/images/zoom.png) -216px 0px;'></div>" +
	  	"<div style='top:95px; background: url(./resources/images/zoom.png) -245px 0px;'></div>" +
	  	"<div style='top:115px; background: url(./resources/images/zoom.png) -274px 0px;'></div>" +
	  	"<div style='top:135px; background: url(./resources/images/zoom.png) -303px 0px;'></div>" +
	  "</div>" +
	  "<div class='plus' style='position:absolute; top:0px; left:30px; width: 20px; height: 20px; background: url(./resources/images/zoom.png) -80px 0px no-repeat;'></div>" +
	  "<div class='zoomBar' style='top:20px; left:30px; border: solid 1px; margin-left:1px; padding-top:1px; position: absolute; width: 18px; height: 121px; background: url(./resources/images/zoom.png) -140px 0px repeat-y; transition: height 0.1s;'></div>" +
	  "<div class='zoomBar2' style='top:141px; left:30px; border: solid 1px; margin-left:1px; padding-top:1px; position: absolute; width: 18px; height: 11px; background: url(./resources/images/zoom.png) -122px 0px repeat-y; transition: height 0.1s;'></div>" +
	  "<div class='zoomPart'>" +
	  	"<div style='top: 25px;'></div>" +
	  	"<div style='top: 35px;'></div>" +
	  	"<div style='top: 45px;'></div>" +
	  	"<div style='top: 55px;'></div>" +
	  	"<div style='top: 65px;'></div>" +
	  	"<div style='top: 75px;'></div>" +
	  	"<div style='top: 85px;'></div>" +
	  	"<div style='top: 95px;'></div>" +
	  	"<div style='top: 105px;'></div>" +
	  	"<div style='top: 115px;'></div>" +
	  	"<div style='top: 125px;'></div>" +
	  	"<div style='top: 135px;'></div>" +
	  	"<div style='top: 145px;'></div>" +
	  "</div>" +
	  "<div class='zoomPartClick'>" +
	  	"<div class='zoomPartClick_1' style='top: 21px;'></div>" +
	  	"<div class='zoomPartClick_2' style='top: 31px;'></div>" +
	  	"<div class='zoomPartClick_3' style='top: 41px;'></div>" +
	  	"<div class='zoomPartClick_4' style='top: 51px;'></div>" +
	  	"<div class='zoomPartClick_5' style='top: 61px;'></div>" +
	  	"<div class='zoomPartClick_6'style='top: 71px;'></div>" +
	  	"<div class='zoomPartClick_7' style='top: 81px;'></div>" +
	  	"<div class='zoomPartClick_8' style='top: 91px;'></div>" +
	  	"<div class='zoomPartClick_9' style='top: 101px;'></div>" +
	  	"<div class='zoomPartClick_10' style='top: 111px;'></div>" +
	  	"<div class='zoomPartClick_11' style='top: 121px;'></div>" +
	  	"<div class='zoomPartClick_12' style='top: 131px;'></div>" +
	  	"<div class='zoomPartClick_13' style='top: 141px;'></div>" +
	  "</div>" +
	  "<div class='zoomPointer' style='overflow: hidden; position: absolute; margin: -5px 0px 0px; width: 18px; height: 11px; background: url(./resources/images/zoom.png) -157px 0px; transition: top 0.1s; left: 31px; top: 135px;'></div>" +
	  "<div class='minus' style='top:141px; left:30px; position: absolute; width: 20px; height: 20px; background: url(./resources/images/zoom.png) -100px 0px no-repeat;'></div>" +
	  "</div>",
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

		
		me._zoomPointerTop = parseInt($(".zoomPointer").css("top"));
		me._maxTop = me._zoomPointerTop;
		me._minTop = me._maxTop - 110;

		me._zoomBar = parseInt($(".zoomBar").height());
		me._zoomBar2 = parseInt($(".zoomBar2").height());

		$(".plus").click(function(){

			var topPx = $(".zoomPointer").css("top");
			var pxSplit = parseInt(topPx.split('px')[0]);
			var cnt = 0;
			var calc = pxSplit - 10;

			if(pxSplit>me._minTop){
				$(".zoomPointer").css("top",calc);
				me.topCalc(cnt);
				me.zoomEvent(calc);
			}
		});

		$(".minus").click(function(){
			var topPx = $(".zoomPointer").css("top");
			var pxSplit = parseInt(topPx.split('px')[0]);
			var cnt = 0;
			var calc = pxSplit + 10;

			if(pxSplit < me._maxTop){
				$(".zoomPointer").css("top",calc);
				cnt++;
				me.topCalc(cnt);
				me.zoomEvent(calc);
			}
		});

		$(".zoomPartClick div").click(function(val){

			var className = val.target.className;
			var calc = 0;
			var val = 0;
			switch (className) {
			case "zoomPartClick_1":
				val = 100;
				calc = me._minTop;
				$(".zoomPointer").css("top",calc);
				break;
			case "zoomPartClick_2":
				val = 80;
				calc = me._minTop + 10;
				$(".zoomPointer").css("top",calc);
				break;
			case "zoomPartClick_3":
				val = 60;
				calc = me._minTop + 20;
				$(".zoomPointer").css("top",calc);
				break;
			case "zoomPartClick_4":
				val = 40;
				calc = me._minTop + 30;
				$(".zoomPointer").css("top",calc);
				break;
			case "zoomPartClick_5":
				val = 20;
				calc = me._minTop + 40;
				$(".zoomPointer").css("top",calc);
				break;
			case "zoomPartClick_6":
				val = 0;
				calc = me._minTop + 50;
				$(".zoomPointer").css("top",calc);
				break;
			case "zoomPartClick_7":
				val = -20;
				calc = me._minTop + 60;
				$(".zoomPointer").css("top",calc);
				break;
			case "zoomPartClick_8":
				val = -40;
				calc = me._minTop + 70;
				$(".zoomPointer").css("top",calc);
				break;
			case "zoomPartClick_9":
				val = -60;
				calc = me._minTop + 80;
				$(".zoomPointer").css("top",calc);
				break;
			case "zoomPartClick_10":
				val = -80;
				calc = me._minTop + 90;
				$(".zoomPointer").css("top",calc);
				break;
			case "zoomPartClick_11":
				val = -100;
				calc = me._minTop + 100;
				$(".zoomPointer").css("top",calc);
				break;
			case "zoomPartClick_12":
				val = -120;
				calc = me._minTop + 110;
				$(".zoomPointer").css("top",calc);
				break;
			case "zoomPartClick_13":
				calc = me._minTop + 120;
				$(".zoomPointer").css("top",calc);
				break;
			default:
				break;
			}
			$(".zoomBar2").height(calc + val);
			$(".zoomBar2").css("top",calc);
			me.zoomEvent(calc);
		});

		$(".minus").mouseover(function(){
			$('.minus').css( 'cursor', 'pointer' );
		});

		$(".plus").mouseover(function(){
			$('.plus').css( 'cursor', 'pointer' );
		});

		$(".zoomPartClick div").mouseover(function(){
			$(this).css( 'cursor', 'pointer' );
		});

	},
	topCalc: function(cnt){
    	var me = this;
    	var topPx = $(".zoomPointer").css("top");
    	var pxSplit = parseInt(topPx.split('px')[0]);
    	var calc = me._zoomPointerTop - pxSplit;

    		if(cnt!=0){
    			var nowZoombar = $(".zoomBar2").css("top");
    			var splitZoombar = parseInt(nowZoombar.split("px")[0]);
    			me._minusValue = splitZoombar + 10;
    			$(".zoomBar2").height(me._zoomBar2 + calc - 10);
    			$(".zoomBar2").css("top",me._minusValue);
    		}else{
    			var nowZoombar = $(".zoomBar2").css("top");
    			var splitZoombar = parseInt(nowZoombar.split("px")[0]);
    			me._plusValue = splitZoombar - 10;
    			$(".zoomBar2").height(me._zoomBar2 + calc + 10);
    			$(".zoomBar2").css("top",me._plusValue);
    		}

    	
    	
    },
    zoomEvent: function(level){
    	//console.info(level);
    	var me = this;
        var zoomLevel = 0;
    	switch (level) {
		case me._maxTop:
			zoomLevel = 7;
			break;
		case me._maxTop - 10:
			zoomLevel = 8;
			break;
		case me._maxTop - 20:
			zoomLevel = 9;
			break;
		case me._maxTop - 30:
			zoomLevel = 10;
			break;
		case me._maxTop - 40:
			zoomLevel = 11;
			break;
		case me._maxTop - 50:
			zoomLevel = 12;
			break;
		case me._maxTop - 60:
			zoomLevel = 13;
			break;
		case me._maxTop - 70:
			zoomLevel = 14;
			break;
		case me._maxTop - 80:
			zoomLevel = 15;
			break;
		case me._maxTop - 90:
			zoomLevel = 16;
			break;
		case me._maxTop - 100:
			zoomLevel = 17;
			break;
		case me._maxTop - 110:
			zoomLevel = 18;
			break;

		default:
			break;
		}
    	
    	me.map.getView().setZoom(zoomLevel);
    },
    initBaseMap: function(val){
    	var me = this; 
    	
    	//충전기 전체 정보 담기
    	var chargerList =  Ext.create('DgEv.store.map.ChargerList');
    	chargerList.load();
    	me.chargerList = [];
    	me.chargerList = chargerList.data;
    	////console.info(me.chargerList);
    	
    	
    	//충전소 전체 정보 담기
    	var stationList =  Ext.create('DgEv.store.map.StationList');
    	stationList.load();
    	me.stationList = [];
    	me.stationList = stationList.data;
    	//console.info(me.stationList);
    	
    	
    	var container = document.getElementById('_mapDiv_');
		var options = {
			center: new daum.maps.LatLng(35.871380, 128.601805),
			level: 8
		};
		
		me.map = new daum.maps.Map(container, options);
		
		var layerStore = Ext.create('DgEv.store.map.LayerStore');
		layerStore.load();
		//console.info(layerStore);
		
		LayerSymbol(layerStore);


    	
    },
    wheelZoom:function(zoomLevel){
    	var me = this; 
    	//alert("1");
    	var calc = 0;
		var val = 0;
		switch (zoomLevel) {
		case 18:
			val = 100;
			calc = me._minTop;
			$(".zoomPointer").css("top",calc);
			break;
		case 17:
			val = 80;
			calc = me._minTop + 10;
			$(".zoomPointer").css("top",calc);
			break;
		case 16:
			val = 60;
			calc = me._minTop + 20;
			$(".zoomPointer").css("top",calc);
			break;
		case 15:
			val = 40;
			calc = me._minTop + 30;
			$(".zoomPointer").css("top",calc);
			break;
		case 14:
			val = 20;
			calc = me._minTop + 40;
			$(".zoomPointer").css("top",calc);
			break;
		case 13:
			val = 0;
			calc = me._minTop + 50;
			$(".zoomPointer").css("top",calc);
			break;
		case 12:
			val = -20;
			calc = me._minTop + 60;
			$(".zoomPointer").css("top",calc);
			break;
		case 11:
			val = -40;
			calc = me._minTop + 70;
			$(".zoomPointer").css("top",calc);
			break;
		case 10:
			val = -60;
			calc = me._minTop + 80;
			$(".zoomPointer").css("top",calc);
			break;
		case 9:
			val = -80;
			calc = me._minTop + 90;
			$(".zoomPointer").css("top",calc);
			break;
		case 8:
			val = -100;
			calc = me._minTop + 100;
			$(".zoomPointer").css("top",calc);
			break;
		case 7:
			val = -120;
			calc = me._minTop + 110;
			$(".zoomPointer").css("top",calc);
			break;
		default:
			return;
		}
		$(".zoomBar2").height(calc + val);
		$(".zoomBar2").css("top",calc);
		//me.zoomEvent(calc);
    	

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