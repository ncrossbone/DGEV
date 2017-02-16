Ext.define("DgEv.view.north.NorthContainer", {

	extend: "Ext.Panel",

	xtype: "dgev-northcontainer",

	layout:{
		type:"hbox"
	},
	bodyStyle: "margin-left:350px; background:url('./resources/images/design/top_right_bg.gif') !important;",
	border:false,
	height:36,
	
	items:[{
		xtype:"container",
		width:10
	},{
		xtype:"container",
		width:"55%"
	},{
		xtype:"panel",
		html:"<a class='mapClick' onclick=\"javascript:;\"; id='map0'>&nbsp&nbsp전체&nbsp&nbsp</a>"
	},{
		xtype:"panel",
		html:"<a class='mapClick' onclick=\"\"; id='map0'>&nbsp&nbsp급속&nbsp&nbsp</a>"
	},{
		xtype:"panel",
		html:"<a class='mapClick' onclick=\"\"; id='map0'>&nbsp&nbsp완속&nbsp&nbsp</a>"
	},{
		xtype:"panel",
		html:"<a class='mapClick' onclick=\"\"; id='map0'>&nbsp&nbsp기관&nbsp&nbsp</a>"
	}/*,{
		xtype:"checkbox",
		labelSeparator: '',
		hideLabel: true,
		checked:true,
		style:"margin-right:10px;",
		boxLabel: '충전중',
		layerId: '1',
		fieldLabel: 'text',
		handler: function(data,check){
			ChargChkBox(data,check);
		}
	},{
		xtype:"checkbox",
		labelSeparator: '',
		hideLabel: true,
		checked:true,
		style:"margin-right:10px;",
		boxLabel: '사용가능',
		fieldLabel: 'text',
		layerId: '2',
		handler: function(data,check){
			ChargChkBox(data,check);
		}
	},{
		xtype:"checkbox",
		labelSeparator: '',
		hideLabel: true,
		checked:true,
		style:"margin-right:10px;",
		boxLabel: '운영중지',
		layerId: '3',
		fieldLabel: 'text',
		handler: function(data,check){
			ChargChkBox(data,check);
		}
	},{
		xtype:"checkbox",
		labelSeparator: '',
		hideLabel: true,
		checked:true,
		style:"margin-right:10px;",
		boxLabel: '점검중',
		fieldLabel: 'text',
		layerId: '4',
		handler: function(data,check){
			ChargChkBox(data,check);
		}
	},{
		xtype:"checkbox",
		labelSeparator: '',
		hideLabel: true,
		checked:true,
		boxLabel: '타기관',
		fieldLabel: 'text',
		layerId: '5',
		handler: function(data,check){
			ChargChkBox(data,check);
		}
	}*/]
});

Ext.onReady(function(){ 
	getSido();
	getDemo();
	//getSgg(27);
	getSgg(27,"west");
	
	$('#sidoSelect').change(function() {
	    var val = $("#sidoSelect option:selected");
	    sidoZoom(val[0].value);
	    //console.info(val[0].value);
	    getSgg(val[0].value);
	});
	
	
	$('#sggSelect').change(function() {
	    var val = $("#sggSelect option:selected");
	    sggZoom(val[0].value);
	});
	
	$('#demonLocation').change(function() {
		var val = $("#demonLocation option:selected");
		
		var coreMap = Ext.getCmp("_mapDiv_");
		
		var parseX = parseFloat(val[0].value.split(",")[0]);
		var parseY = parseFloat(val[0].value.split(",")[1]);
		
		coreMap.map.getView().setCenter([parseX,parseY]);
        coreMap.map.getView().setZoom(17);
	});
});