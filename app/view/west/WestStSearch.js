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
				fieldLabel: 'text' 
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
				fieldLabel: 'text' 
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
				store: Ext.create('DgEv.store.west.CarKindStore'),
				value:"==전체==",
				editable:false,
				displayField: 'name',
				valueField: 'code',
				/*,
				displayField: 'name',
				valueField: 'code',
				store: Ext.create('Ext.data.Store', {
				    fields: ['code', 'name'],
				    data : [
				        {"code":"all","name":"==전체=="},
				        {"code":"01", "name":"SM3"},
				        {"code":"02", "name":"스파크"},
				        {"code":"03", "name":"레이"},
				        {"code":"04", "name":"BMW I3"},
				        {"code":"05", "name":"Nissan LEAF"},
				        {"code":"06", "name":"SOUL"},
				        {"code":"07", "name":"아이오닉"}
				    ]
				}),*/
				width:150
			},{
				xtype:"container",
				width:10
			},{
				xtype:"combobox",
				itemId:"chargStore",
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
					
					var carValue = Ext.ComponentQuery.query("#carStore")[0].value;
					var chargValue = Ext.ComponentQuery.query("#chargStore")[0].value;
					//console.info(carStore);
					//console.info(chargStore);
					
					if(areaChk.checked == true){
						
					}else{
						
					}
					
					if(carChk.checked == true){
						carValue = Ext.ComponentQuery.query("#carStore")[0].value;
						if(carValue == "==전체=="){
							carValue = "";
						}
					}else{
						carValue ="";
					}
					
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
					console.info(westSgg.value);
					
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
						chargValue : chargValue
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
							
							html += "<div class='fw_path' onclick=onclickStation("+i+");><div class='thumb'><img src='./resources/images/test/02.png'></div>" +
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
						
						
						/**/
						
						
						
						
						var searchParam = westSido.rawValue+westSgg.rawValue+serachValue.lastValue;
						////console.info(html);
						stationSearch.setHtml(html);
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
				handler:function(){
					Ext.MessageBox.confirm('급속 충전기 예약', '2016/12/31 03:00에 <br/> 01(급속)충전기를 예약하시겠습니까?', function(btn){
						   if(btn === 'yes'){
						       //some code
						   }
						   else{
						      //some code
						   }
						 });
				}
			}]
		}]
	},{
		xtype:"container",
		height:20
	},{
		xtype:"tabpanel",
		hidden:true,
		itemId:"searchResult",
		title:"<img src='./resources/images/design/blit_st_02_02.png' style='margin-bottom:-3px; margin-right: 3px;'/> 검색결과",
		width:340,
		border:false,
		cls: "navigationTabPanel",
		id:"navigationTabPanel",
		bodyCls: "navigationTabPanelBody",
		items:[{
			xtype:"panel",
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
				fieldLabel: 'text'
			},{
				xtype:"panel",
				height:517,
				itemId:"stationSearch",
				autoScroll:true,
				html:""
			}]
		},{
			xtype:"panel",
			title:"주소 검색",
			border:false,
			items:[{
				xtype:"checkbox",
				labelSeparator: '',
				hideLabel: true,
				style:"margin-left:10px;",
				boxLabel: '24시간 운영 충전소',
				fieldLabel: 'text'
			},{
				xtype:"radiogroup",
				fieldLabel: '검색반경',
				id:"radiusItems",
				style:"margin-left:10px;",
				labelSeparator: '',
				items: [{
					boxLabel:"5km",
					inputValue: '5',
					checked:true
				},{
					boxLabel:"10km",
					style:"margin-left:10px;",
					inputValue: '10'
				},{
					boxLabel:"20km",
					style:"margin-left:10px;",
					inputValue: '20'
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
