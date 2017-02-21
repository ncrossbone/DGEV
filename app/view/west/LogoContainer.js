Ext.define("DgEv.view.west.LogoContainer", {
	
	extend: "Ext.Panel",
	
	xtype: "dgev-logocontainer",
	
	//bodyStyle: "background:url('./resources/images/design/top_left_bg.gif') !important",
	border:false,
	height:65,
	width:350,
	id:"logocontainer",
	items:[{
		xtype:"image",
		cls:"logocontainer",
		src:"./resources/images/top_logo.gif",
		width:342
	}]
});