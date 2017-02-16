Ext.define("DgEv.view.west.WestContainer", {

	extend: "Ext.TabPanel",
	xtype: "dgev-westcontainer",
	collapsible: true,
	collapseDirection: 'left',
	headerPosition: 'right',
	y:65,
	style:"border-bottom:solid 5px #445676;",
	header:{
		width:8,
		style:"background-color : #445676;",
		titlePosition:1
	},
	id: "westcontainer",
	width: 350,
	border:false,
	tabBarPosition: 'top',

	defaults: {
		styleHtmlContent: true
	},
	requires: [
			   "DgEv.view.west.WestStSearch",
	           "DgEv.view.west.WestFavorSt"],
    items:[{
		xtype:"dgev-weststsearch"
		},{
		xtype:"dgev-westfavorst"
	}],
	
	
	/*{
		xtype:"dgev-weststsearch"
	},{
		xtype:"dgev-westfavorst"
	}*/
	initComponent: function(){

		this.callParent();
		this.setHeight(Ext.getBody().getHeight());
	},

	listeners:{
		collapse:{
			fn: function(el){
				Ext.get("westcontainer_header-innerCt").setStyle("background","url('./resources/images/button/btn_arrow_open.png') no-repeat");
			}
		},
		expand:{
			fn: function(el){

				Ext.get("westcontainer_header-innerCt").setStyle("background","url('./resources/images/button/btn_arrow_close.png') no-repeat");
			}
		}
	}

});