Ext.define("DgEv.view.main.Main", {

	extend: "Ext.panel.Panel",

	requires: ["DgEv.view.west.West",
	           "DgEv.view.map.CoreMap",
	           "DgEv.view.north.NorthContainer"],
	xtype: "dgev-main",
	title: "",
	layout: {
		type: "absolute"
	},

	items: [{
		xtype: "dgev-coremap",
	},{
		xtype: "dgev-northcontainer"
	},{
		xtype: "dgev-west"
	}],
	initComponent: function(){
		
		this.callParent();
		this.setWidth(Ext.getBody().getWidth());
		this.setHeight(Ext.getBody().getHeight());
		
	}
});