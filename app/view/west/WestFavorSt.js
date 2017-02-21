Ext.define("DgEv.view.west.WestFavorSt", {

	extend: "Ext.Panel",
	xtype: "dgev-westfavorst",
	border:false,
	title:"자주찾는 충전소",
	bodyStyle:"background-color:#f6f6f6;",
	items:[{
		xtype:"panel",
		height:863,
		itemId:"favorStation",
		autoScroll:true,
		style:"top: 5px;",
		html:""
	}],
	initComponent: function() {
        this.callParent(arguments);
        
    }
});