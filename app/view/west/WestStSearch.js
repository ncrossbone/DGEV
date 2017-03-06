Ext.define("DgEv.view.west.WestStSearch", {

	extend: "Ext.Panel",
	xtype: "dgev-weststsearch",
	border:false,
	title:"충전소 조회",
	
	items:[{
		layout:{
			type:"vbox"
		},
		xtype:"panel",
		cls:"stationSearch",
		id:"aaaa",
		items:[{
			xtype:"container",
			height:10
		},{
			xtype:"checkbox",
			itemId:'areaChk',
			labelSeparator: '',
			hideLabel: true,
			checked: true,
			style:"margin-left:10px;",
			boxLabel: '조회 지역 설정',
			fieldLabel: 'text' 
		},{
			xtype:"panel",
			layout:{
				type:"hbox"
			},
			border:false,
			bodyCls:"sidoSggCls",
			items:[{
				xtype:"container",
				width:10
			},{
				xtype:"combobox",
				editable:false,
				displayField: 'NAME',
				valueField: 'CODE',
				itemId:"westSido",
				width:150,
				emptyText:"==시도 전체==",
				//triggerAction: 'all',
				value: '대구광역시',
				selectOnFocus:true,
				listeners:{
		    		select: function(item,store){
		    			
		    			//store.data.NAME
		    			
		    			var westSido = Ext.ComponentQuery.query("#westSido")[0];
		    			var searchBtn = Ext.ComponentQuery.query("#searchBtn")[0];
		    			var serachValue = Ext.ComponentQuery.query("#serachValue")[0];
		    			var westSgg = Ext.ComponentQuery.query("#westSgg")[0];
		    			
		    			if(westSgg.lastValue!=""){
		    				westSgg.setValue("");
		    			}
		    			if(serachValue.lastValue!=""){
		    				serachValue.setValue("");
		    			}
		    			
		    			if(westSido.lastValue!="all"){
		    				getSgg(westSido.lastValue,"west");
		    			}
		    			
		    			//searchBtn.fireHandler();
		    			
		    			SelectZoom(store.data.NAME,"sido");
		    			
		    		}
		    	}
			},{
				xtype:"container",
				width:10
			},{
				xtype:"combobox",
				displayField: 'NAME',
				valueField: 'CODE',
				editable:false,
				emptyText:"==시/군/구 전체==",
				width:150,
				itemId:"westSgg",
				width:150,
				listeners:{
					select: function(item,store){
		    			
		    			
		    			
		    			var searchBtn = Ext.ComponentQuery.query("#searchBtn")[0];
		    			var westSgg = Ext.ComponentQuery.query("#westSgg")[0];
		    			var serachValue = Ext.ComponentQuery.query("#serachValue")[0];
		    			if(serachValue.lastValue!=""){
		    				serachValue.setValue("");
		    			}
		    			//searchBtn.fireHandler();
		    			
		    			SelectZoom(store.data.NAME,"sgg");
		    			
		    		}
		    	}
			}]
		},{
			xtype:"container",
			height:10
		},{
			xtype:"panel",
			border:false,
			bodyCls:"sidoSggCls",
			layout:{
				type:"hbox"
			},
			items:[{
				xtype:"checkbox",
				itemId: "carChk",
				labelSeparator: '',
				hideLabel: true,
				style:"margin-left:10px;",
				boxLabel: '차량 종류 설정',
				fieldLabel: 'text',
				handler:function(obj,checked){
					var carStore = Ext.ComponentQuery.query("#carStore")[0];

					if(checked==true){
						carStore.setDisabled(false);
					}else{
						carStore.setDisabled(true);
					}
				}
			},{
				xtype:"container",
				width:45
			},{
				xtype:"checkbox",
				itemId:"chargChk",
				labelSeparator: '',
				hideLabel: true,
				style:"margin-left:10px;",
				boxLabel: '충전기 구분',
				fieldLabel: 'text',
				handler:function(obj,checked){
					var chargStore = Ext.ComponentQuery.query("#chargStore")[0];

					if(checked==true){
						chargStore.setDisabled(false);
					}else{
						chargStore.setDisabled(true);
					}
				} 
			}]
		},{
			xtype:"panel",
			border:false,
			bodyCls:"sidoSggCls",
			layout:{
				type:"hbox"
			},
			items:[{
				xtype:"container",
				width:10
			},{
				xtype:"combobox",
				itemId:"carStore",
				disabled:true,
				store: Ext.create('DgEv.store.west.CarKindStore'),
				emptyText:"==전체==",
				editable:false,
				displayField: 'name',
				valueField: 'code',
				width:150
			},{
				xtype:"container",
				width:10
			},{
				xtype:"combobox",
				itemId:"chargStore",
				disabled:true,
				value:"00",
				editable:false,
				width:150,
				displayField: 'name',
				valueField: 'code',
				store: Ext.create('Ext.data.Store', {
				    fields: ['code', 'name'],
				    data : [
				        {"code":"00","name":"==전체=="},
				        {"code":"01", "name":"급속"},
				        {"code":"02", "name":"완속"}
				    ]
				})
			}]
		},{
			xtype:"container",
			height:30
		},{
			style:"margin-left:10px;",
			xtype:"textfield",
			itemId:"serachValue",
			width:310,
			emptyText:"검색어를 입력하세요."
		},{
			xtype:"container",
			height:10
		},{
			xtype:"panel",
			border:false,
			bodyCls:"sidoSggCls",
			layout:{
				type:"hbox"
			},
			items:[{
				xtype:"container",
				width:100
			},{
				xtype:"button",
				style:"background : #555; border: 1px solid #303030",
				id: "searchBtnId",
				text:"조회",
				itemId:"searchBtn",
				handler:function(){
					
					
					var westSido = Ext.ComponentQuery.query("#westSido")[0];
					var westSgg = Ext.ComponentQuery.query("#westSgg")[0];
					var serachValue = Ext.ComponentQuery.query("#serachValue")[0];
					
					var areaChk = Ext.ComponentQuery.query("#areaChk")[0];
					var carChk = Ext.ComponentQuery.query("#carChk")[0];
					var chargChk = Ext.ComponentQuery.query("#chargChk")[0];
					
					var carStore = "";
					var chargStore = "";
					var sidoValue="";
					var sggValue="";
					var searchText = "";
					
					var carValue = Ext.ComponentQuery.query("#carStore")[0].value;
					var chargValue = Ext.ComponentQuery.query("#chargStore")[0].value;
					
					
					console.info(serachValue.lastValue);
					if(serachValue.lastValue != ""){
						searchText =serachValue.lastValue;
					}
					
					
					
					//차량종류
					if(carChk.checked == true){
						carValue = Ext.ComponentQuery.query("#carStore")[0].value;
						if(carValue == "==전체==" || carValue == null){
							carValue = "";
						}
					}else{
						carValue ="";
					}
					
					//충전기 구분
					if(chargChk.checked == true){
						chargValue = Ext.ComponentQuery.query("#chargStore")[0].value;
						if(chargValue == "00"){
							chargValue = "";
						}
					}else{
						chargValue = "";
					}
					
					_searchArr = [];
					_searchAddressArr = [];
					
					var ChargerSearchStore = "";
					
					
					if(westSido.value == "대구광역시"){
						sidoValue = "27";
					}else{
						sidoValue = westSido.value.substr(0,2);
					}
					
					if(westSgg.value == null){
						sggValue ="";
					}else{
						sggValue = westSgg.value.substr(0,4);
					}
					
					

					var searchResult = Ext.ComponentQuery.query("#searchResult")[0];
					searchResult.show();

					var stationSearch = Ext.ComponentQuery.query("#stationSearch")[0];
					
					var ChargerSearchStore = Ext.create("DgEv.store.west.ChargerSearchStore",{
						sidoValue:sidoValue,
						sggValue: sggValue,
						carValue : carValue,
						chargValue : chargValue,
						searchText : searchText
					});
					ChargerSearchStore.load();
					
					
					var stationId = "";
					var timerObj = window.setInterval(function(){
						
						
						var rapidity = "";
						var coreMap = Ext.getCmp("_mapDiv_");
						
						
						for(var i = 0; i < ChargerSearchStore.data.length; i++){
							var gubunHtml ="";
							for(var j=0;j<coreMap.chargerList.items.length;j++){
								if(coreMap.chargerList.items[j].data.C_STAT_ID == ChargerSearchStore.data.items[i].data.STAT_ID){
									if(coreMap.chargerList.items[j].data.C_CHGER_TYPE_CD == "02"){
										rapidity = "완속";
									}else{
										rapidity = "급속";
									}
								}
							}
							
							if(i == ChargerSearchStore.data.length-1){
								stationId += "'"+ChargerSearchStore.data.items[i].data.STAT_ID + "'";
							}else{
								stationId += "'"+ChargerSearchStore.data.items[i].data.STAT_ID + "',";
							}
							
							var stationCount = "";
							$.ajax({
								async: false,
								type: 'POST',
								url : './resources/jsp/stationCount.jsp',
								data : {
									STAT_ID : ChargerSearchStore.data.items[i].data.STAT_ID
								},
								dataType : 'json',
								success:function(data){
									for(var k=0;k < data.data.length;k++){
										if(data.data[k].STAT_ID == ChargerSearchStore.data.items[i].data.STAT_ID){
											stationCount +="<img src='./resources/images/icon_03.gif'>"+data.data[k].Y01+"/"+data.data[k].A01+" " +
											"<img src='./resources/images/icon_02.gif' style='margin-left: 10px'>"+data.data[k].Y02+"/"+data.data[k].Y02+" " +
											"<img src='./resources/images/icon_01.gif' style='margin-left: 10px'>"+data.data[k].YA+"/"+data.data[k].AA+"";
										}
									}
									
								}
							});
							//console.info(ChargerSearchStore.data.items[i].data);
							html += "<div class='fw_path' id='fw_path_"+ChargerSearchStore.data.items[i].data.STAT_ID+"' onclick=onclickStation("+i+");><div class='thumb'><img src='./resources/images/test/02.png'></div>" +
							"<div class='state'><p class='st_a'><strong>" + ChargerSearchStore.data.items[i].data.KO_STAT_NM + "</strong></p>" +
							"<p class='st_b'>" +
							ChargerSearchStore.data.items[i].data.ADDR_1 +
							"</p>" +
							"<p class='st_c'>" +
							stationCount +
							"</p>" +
							"</div></div>";
							
							_searchArr.push({data:ChargerSearchStore.data.items[i].data});
							
							
						}
						
						
						stationSearch.setHtml(html);
						
						
						/*  주소 검색    */
						
						var search1, search2, search3;
						search1 = westSido.rawValue;
						search2 = westSgg.rawValue;
						search3 = serachValue.lastValue;
						
						//시군구 기본검색값일때 주소검색
						if(search2 == "==시/군/구 전체=="){
							search2 = "";
						}
						
						var searchParam = "";
						searchParam = search1+search2+search3;
						
						//daum api 주소검색
						var ps = new daum.maps.services.Places();
						ps.keywordSearch(searchParam, placesSearchCB);
						
							window.clearInterval(timerObj);
						}, 300);
						
					
					var html = "";
					
					
					/**/
					

					
				
				}
			},{
				xtype:"container",
				width:10
			},{
				xtype:"button",
				style:"background : #555; border: 1px solid #303030",
				text:"초기화",
				id: "resetBtn",
				handler:function(){
					var stationSearch = Ext.ComponentQuery.query("#stationSearch")[0];
					var addressSearch = Ext.ComponentQuery.query("#addressSearch")[0];
					var searchResult = Ext.ComponentQuery.query("#searchResult")[0];
					
					stationSearch.setHtml("");
					addressSearch.setHtml("");
					searchResult.hide();
				}
			}]
		}]
	},{
		xtype:"container",
		height:20,
		cls:"yamaeStyle"
	},{
		xtype:"tabpanel",
		hidden:true,
		itemId:"searchResult",
		title:"<img src='./resources/images/design/blit_st_02_02.png' style='margin-bottom:-5px; margin-right: 3px;'/> 검색결과",
		width:340,
		border:false,
		cls: "navigationTabPanel",
		id:"navigationTabPanel",
		bodyCls: "navigationTabPanelBody",
		items:[{
			xtype:"panel",
			cls:"stationSearchCls",
			id:"stationSearchPanel",
			title:"충전소 검색",
			border:false,
			//autoScroll:true,
			items:[{
				xtype:"checkbox",
				cls:"pdj-24station",
				labelSeparator: '',
				hideLabel: true,
				style:"margin-left:10px; margin-bottom: 0px !important",
				boxLabel: '<span style="font-size: 11px;font-family: 돋움;color: #465677;">' + '24시간 운영 충전소' + '</span>',
				fieldLabel: 'text',
				listeners: {
                    change: function (checkbox, newVal, oldVal) {
                    	
                    	var coreMap = Ext.getCmp("_mapDiv_"); 

						for(var j=0;j<coreMap.chargerList.items.length;j++){
							if(coreMap.chargerList.items[j].data.S_USE_TIME != "00-23"){
								if(newVal == true){
		                    		document.getElementById("fw_path_"+coreMap.chargerList.items[j].data.C_STAT_ID).style.display= "none";
		                    	}else{
		                    		document.getElementById("fw_path_"+coreMap.chargerList.items[j].data.C_STAT_ID).style.display= "";
		                    	}
							}
						}
                    	//console.info(document.getElementById('fw_path'));
                    	
                    }
                }
			},{
				xtype:"panel",
				height:517,
				itemId:"stationSearch",
				autoScroll:true,
				html:""
			}]
		},{
			xtype:"panel",
			id:"addrSearchPanel",
			title:"주소 검색",
			border:false,
			items:[{
				xtype:"checkbox",
				labelSeparator: '',
				cls:"pdj-24station",
				hideLabel: true,
				style:"margin-left:10px; margin-bottom: 0px !important",
				boxLabel: '<span style="font-size: 11px;font-family: 돋움;color: #465677;">' + '24시간 운영 충전소' + '</span>',
				fieldLabel: 'text',
				listeners: {
                    change: function (checkbox, newVal, oldVal) {
                    	
                    	var coreMap = Ext.getCmp("_mapDiv_"); 

						for(var j=0;j<coreMap.chargerList.items.length;j++){
							if(coreMap.chargerList.items[j].data.S_USE_TIME != "00-23"){
								if(newVal == true){
		                    		document.getElementById("fw_path_addr_"+coreMap.chargerList.items[j].data.C_STAT_ID).style.display= "none";
		                    	}else{
		                    		document.getElementById("fw_path_addr_"+coreMap.chargerList.items[j].data.C_STAT_ID).style.display= "";
		                    	}
							}
						}
                    	//console.info(document.getElementById('fw_path'));
                    	
                    }
                }
			},{
				xtype:"radiogroup",
				fieldLabel: '검색반경',
				id:"radiusItems",
				style:"margin-left:10px;",
				cls:"radiusRadio",
				labelSeparator: '',
				items: [{
					boxLabel:"1km",
					id:"radius5",
					inputValue: '1',
					checked:true
				},{
					boxLabel:"3km",
					id:"radius10",
					inputValue: '3'
				},{
					boxLabel:"5km",
					id:"radius20",
					inputValue: '5'
				}]
			},{
				xtype:"panel",
				height:430,
				autoScroll:true,
				itemId:"addressSearch",
				html:""
			}]
		}]
	}]
	
	
});
