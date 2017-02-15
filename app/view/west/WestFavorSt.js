Ext.define("DgEv.view.west.WestFavorSt", {

	extend: "Ext.Panel",
	xtype: "dgev-westfavorst",
	border:false,
	title:"자주찾는 충전소",
	bodyStyle:"background-color:#f6f6f6;",
	items:[{
		xtype:"panel",
		height:517,
		itemId:"favorStation",
		autoScroll:true,
		html:""
	}],
	initComponent: function() {
        this.callParent(arguments);
        
        var favorStation = Ext.ComponentQuery.query("#favorStation")[0];
        var fvHtml = "";
        var coreMap = Ext.getCmp("_mapDiv_");
        console.info(coreMap);
        $.ajax({
    		async: false,
    		type: 'POST',
    		url : './resources/jsp/bookMarkList.jsp',
    		data : {
    			MEMBER_ID:"test"
    		},
    		dataType : 'json',
    		success:function(data){
    				
    			var timerObj = window.setInterval(function(){
    				
    				var fvStationList = [];
    				for(var i=0;i < data.data.length;i++){
    					
    					for(var j=0;j<coreMap.stationList.items.length;j++){
    						
    						if(data.data[i].STAT_ID == coreMap.stationList.items[j].data.STAT_ID){
    							//fvStationList.push({stationId:data.data[i].STAT_ID});
    							fvHtml += "<div class='fw_path' onclick=onclickStation();><div class='thumb'><img src='./resources/images/test/02.png'></div>" +
								"<div class='state'><p class='st_a'><strong>" + coreMap.stationList.items[j].data.KO_STAT_NM + "</strong></p>" +
								"<p class='st_b'>" +
								coreMap.stationList.items[j].data.ADDR +
								"</p>" +
								"<p class='st_c'><img src='./resources/images/icon_03.gif'>01/01 <img src='./resources/images/icon_02.gif' style='margin-left: 10px'>01/01 <img src='./resources/images/icon_01.gif' style='margin-left: 10px'>01/01" +
								"</p>" +
								"</div></div>";
    							
    						}
    					}
    					
    					
    				}
    				favorStation.setHtml(fvHtml);
    				
    				
    				window.clearInterval(timerObj);
    			}, 500);
    			
    			
    			
    				
    			}
    	});
        
        
        //
        
        
    }
});