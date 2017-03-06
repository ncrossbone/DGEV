Ext.define("DgEv.view.west.West", {

	extend: "Ext.Panel",
	xtype: "dgev-west",
	collapsible: true,
	collapseDirection: 'left',
	headerPosition: 'right',
	style:"border-bottom:solid 5px #445676;",
	header:{
		width:8,
		style:"background-color : #445676;",
		titlePosition:1
	},
	id: "west",
	width: 350,
	border:false,
	tabBarPosition: 'top',

	defaults: {
		styleHtmlContent: true
	},
	requires: ["DgEv.view.west.WestContainer",
	           "DgEv.view.west.LogoContainer"],
    items:[{
		xtype:"dgev-logocontainer"
	},{
		xtype:"dgev-westcontainer"
	}],
	
	initComponent: function(){
//onclick='deleteMark(\""+coreMap.stationList.items[j].data.STAT_ID+"\",\""+coreMap.stationList.items[j].data.KO_STAT_NM+"\",\""+coreMap.stationList.items[j].data.BUSI_KIND_CD+"\")'
		this.callParent();
		this.setHeight(Ext.getBody().getHeight());
		
	},

	listeners:{
		collapse:{
			fn: function(el){
				Ext.get("west_header-innerCt").setStyle("background","url('./resources/images/button/btn_arrow_open.png') no-repeat");
			}
		},
		expand:{
			fn: function(el){

				Ext.get("west_header-innerCt").setStyle("background","url('./resources/images/button/btn_arrow_close.png') no-repeat");
			}
		}
	}
});