Ext.define("DgEv.view.west.WestContainer", {

	extend: "Ext.TabPanel",
	xtype: "dgev-westcontainer",
	style:"border-bottom:solid 5px #445676;",
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
//onclick='deleteMark(\""+coreMap.stationList.items[j].data.STAT_ID+"\",\""+coreMap.stationList.items[j].data.KO_STAT_NM+"\",\""+coreMap.stationList.items[j].data.BUSI_KIND_CD+"\")'
		this.callParent();
		this.setHeight(Ext.getBody().getHeight());
		
	},

	listeners:{
		/*collapse:{
			fn: function(el){
				Ext.get("westcontainer_header-innerCt").setStyle("background","url('./resources/images/button/btn_arrow_open.png') no-repeat");
			}
		},
		expand:{
			fn: function(el){

				Ext.get("westcontainer_header-innerCt").setStyle("background","url('./resources/images/button/btn_arrow_close.png') no-repeat");
			}
		},*/
		tabchange : function (panel, tab) {
	          if(tab.xtype == "dgev-westfavorst"){
	        	  
	        	  var favorStation = Ext.ComponentQuery.query("#favorStation")[0];
	              var fvHtml = "";
	              var coreMap = Ext.getCmp("_mapDiv_");
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
	          				console.info(data);
	          				var fvStationList = [];
	          				
	          				for(var i=0;i < data.data.length;i++){
	          					
	          					for(var j=0;j<coreMap.stationList.items.length;j++){
	          						
	          						if(data.data[i].STAT_ID == coreMap.stationList.items[j].data.STAT_ID){
	          							
	          							console.info(coreMap.stationList.items[j].data);
	          							
	          							var stationCount = "";
	        							$.ajax({
	        								async: false,
	        								type: 'POST',
	        								url : './resources/jsp/stationCount.jsp',
	        								data : {
	        									STAT_ID : coreMap.stationList.items[j].data.STAT_ID
	        								},
	        								dataType : 'json',
	        								success:function(data){
	        									for(var k=0;k < data.data.length;k++){
	        										if(data.data[k].STAT_ID == coreMap.stationList.items[j].data.STAT_ID){
	        											stationCount +="<img src='./resources/images/icon_03.gif'>"+data.data[k].Y01+"/"+data.data[k].A01+" " +
	        											"<img src='./resources/images/icon_02.gif' style='margin-left: 10px'>"+data.data[k].Y02+"/"+data.data[k].Y02+" " +
	        											"<img src='./resources/images/icon_01.gif' style='margin-left: 10px'>"+data.data[k].YA+"/"+data.data[k].AA+"";
	        										}
	        									}
	        									
	        								}
	        							});
	          							
	          							//Name,Addr,stationId
	          							//KO_STAT_NM ,ADDR_1 ,STAT_ID
	          							
	          							//openWindowCharg
	          							//fvStationList.push({stationId:data.data[i].STAT_ID});
	          							fvHtml += "<div class='aabb'>" +
	          							"   <div class='fw_path' id='fav_"+coreMap.stationList.items[j].data.STAT_ID+"' onclick='openWindowCharg(\""+coreMap.stationList.items[j].data.KO_STAT_NM+"\",\""+coreMap.stationList.items[j].data.ADDR_1+"\",\""+coreMap.stationList.items[j].data.STAT_ID+"\")'>" +
	          							"<div class='thumb'><img src='./resources/images/test/02.png'></div>" +
	      								"<div class='state'><p class='st_a'><strong>" + coreMap.stationList.items[j].data.KO_STAT_NM + "</strong></p>" +
	      								"<p class='st_b'>" +
	      								coreMap.stationList.items[j].data.ADDR_1 +
	      								"<p class='st_c'>" +
	      								stationCount +
	      								"</p>" +
	      								"</div></div>" +
	      								"<em id='delBtn_"+coreMap.stationList.items[j].data.STAT_ID+"' onclick='deleteMark(\""+coreMap.stationList.items[j].data.STAT_ID+"\",\""+coreMap.stationList.items[j].data.KO_STAT_NM+"\",\""+coreMap.stationList.items[j].data.BUSI_KIND_CD+"\")' class='post_del' ></em> </div>";
	          							
	          						}
	          					}
	          					
	          					
	          				}
	          				favorStation.setHtml(fvHtml);
	          				
	          				
	          				window.clearInterval(timerObj);
	          			}, 500);
	          			
	          			
	          			
	          				
	          			}
	          	});
	        	  
	          }
	          
	     }
	}

});