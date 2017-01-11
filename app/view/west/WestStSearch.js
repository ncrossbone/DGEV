Ext.define("DgEv.view.west.WestStSearch", {

	extend: "Ext.Panel",
	xtype: "dgev-weststsearch",
	border:false,
	title:"충전소 조회",
	layout:{
		type:"vbox"
	},
	items:[{
		xtype:"container",
		height:10
	},{
		xtype:"checkbox",
		labelSeparator: '',
		hideLabel: true,
		style:"margin-left:10px;",
		boxLabel: '조회 지역 설정',
		fieldLabel: 'text' 
	},{
		xtype:"panel",
		layout:{
			type:"hbox"
		},
		border:false,
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
			value: '27',
			selectOnFocus:true,
			listeners:{
	    		select: function(){
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
	    				sidoZoom(westSido.lastValue);
	    				getSgg(westSido.lastValue,"west");
	    			}
	    			
	    			searchBtn.fireHandler();
	    			
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
	    		select: function(){
	    			var searchBtn = Ext.ComponentQuery.query("#searchBtn")[0];
	    			var westSgg = Ext.ComponentQuery.query("#westSgg")[0];
	    			var serachValue = Ext.ComponentQuery.query("#serachValue")[0];
	    			if(serachValue.lastValue!=""){
	    				serachValue.setValue("");
	    			}
	    			if(westSgg.lastValue!="all"){
	    				sggZoom(westSgg.lastValue);
	    			}
	    			searchBtn.fireHandler();
	    			
	    		}
	    	}
		}]
	},{
		xtype:"container",
		height:10
	},{
		xtype:"panel",
		border:false,
		layout:{
			type:"hbox"
		},
		items:[{
			xtype:"checkbox",
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
			labelSeparator: '',
			hideLabel: true,
			style:"margin-left:10px;",
			boxLabel: '충전기 구분',
			fieldLabel: 'text' 
		}]
	},{
		xtype:"panel",
		border:false,
		layout:{
			type:"hbox"
		},
		items:[{
			xtype:"container",
			width:10
		},{
			xtype:"combobox",
			value:"==전체==",
			editable:false,
			width:150
		},{
			xtype:"container",
			width:10
		},{
			xtype:"combobox",
			value:"==전체==",
			editable:false,
			width:150
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
				
				_searchArr = [];
				_searchAddressArr = [];
				
				if(westSido.rawValue=="전체"){
					westSido.rawValue="";
				}

				if(westSgg.rawValue=="전체"){
					westSgg.rawValue="";
				}
				
				if(westSido.rawValue!="" || westSgg.rawValue!="" || serachValue.lastValue!=""){
					var searchResult = Ext.ComponentQuery.query("#searchResult")[0];
					searchResult.show();

					var stationSearch = Ext.ComponentQuery.query("#stationSearch")[0];
					
					if(westSgg.rawValue==""){
						var featureRequest = new ol.format.WFS().writeGetFeature({
							srsName : "EPSG:4326",
							featureTypes : ['EV:EV_point'],
							outputFormat : 'application/json',
							geometryName : 'SHAPE',
							maxFeatures : 300,
							filter: ol.format.filter.and(
									ol.format.filter.like('NM',"*" + serachValue.lastValue + "*"),
									ol.format.filter.like('JUSO',"*" + westSido.rawValue + "*")
							)
						});
					}else{
						var featureRequest = new ol.format.WFS().writeGetFeature({
							srsName : "EPSG:4326",
							featureTypes : ['EV:EV_point'],
							outputFormat : 'application/json',
							geometryName : 'SHAPE',
							maxFeatures : 300,
							filter: ol.format.filter.and(
									ol.format.filter.like('NM',"*" + serachValue.lastValue + "*"),
									ol.format.filter.like('JUSO',"*" + westSido.rawValue + " " + westSgg.rawValue +"*")
							)
						});
					}
					
					
					var html = "";
					$.ajax({
						url: _proxyUrl + _serviceUrl + "EV/wfs?",

						type : 'POST',
						async : false,
						data : new XMLSerializer().serializeToString( featureRequest ),
						contentType : 'text/xml',
						success : function(response_) {
							//console.info(response_.features);
							for(var i = 0; i < response_.features.length; i++){
								var gubunHtml ="";
								switch (response_.features[i].properties.GUBUN) {
								case "01":
									gubunHtml = "<span class='condition01'>충전중</span>";
									break;
								case "02":
									gubunHtml = "<span class='condition03'>사용가능</span>";
									break;
								case "03":
									gubunHtml = "<span class='condition04'>운영중지</span>";
									break;
								case "04":
									gubunHtml = "<span class='condition02'>점검중</span>";
									break;
								case "05":
									gubunHtml = "<span class='condition05'>타기관</span>";
									break;
								default:
									break;
								}
								html += "<div class='fw_path' onclick=onclickStation("+i+");><div class='thumb'><img src='./resources/images/test/01.png'></div>" +
								"<div class='state'><p><strong>" + response_.features[i].properties.NM + "</strong><em><span class='L0'></span></em></p>" +
								"<p class='MgT5 borB0'>" + gubunHtml +
								"<img alt='급속충전 이미지' src='./resources/images/test/icon_fast.png' width='20px' height='20px' style='margin-left:140px;'>" +
								"<em style='margin-top:5px;'>급속</em></p></div></div>";
								
								_searchArr.push({data:response_.features[i].properties});
							}

						}
					});


					

					var searchParam = westSido.rawValue+westSgg.rawValue+serachValue.lastValue;

					stationSearch.setHtml(html);
					var ps = new daum.maps.services.Places(); 
					ps.keywordSearch(searchParam, placesSearchCB);
				}else{
					alert("검색어를 입력하세요.");
				}
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
	},{
		xtype:"container",
		height:20
	},{
		xtype:"tabpanel",
		hidden:true,
		itemId:"searchResult",
		title:"<img src='./resources/images/design/blit_st_02_02.png' style='margin-bottom:-3px;'/> 검색결과",
		width:340,
		border:false,
		items:[{
			xtype:"panel",
			title:"충전소 검색",
			border:false,
			items:[{
				xtype:"checkbox",
				labelSeparator: '',
				hideLabel: true,
				style:"margin-left:10px;",
				boxLabel: '24시간 운영 충전소',
				fieldLabel: 'text'
			},{
				xtype:"panel",
				height:450,
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
				style:"margin-left:10px;",
				labelSeparator: '',
				items: [{
					boxLabel:"10km",
					inputValue: '1'
				},{
					boxLabel:"20km",
					style:"margin-left:10px;",
					inputValue: '2'
				},{
					boxLabel:"30km",
					style:"margin-left:10px;",
					inputValue: '3'
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
