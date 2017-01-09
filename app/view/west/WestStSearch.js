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
			listeners:{
	    		select: function(){
	    			var westSido = Ext.ComponentQuery.query("#westSido")[0];
	    			sidoZoom(westSido.lastValue);
	    			getSgg(westSido.lastValue,"west");
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
			width:150,
			itemId:"westSgg",
			width:150,
			listeners:{
	    		select: function(){
	    			var westSgg = Ext.ComponentQuery.query("#westSgg")[0];
	    			sggZoom(westSgg.lastValue);
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
		width:310,
		value:"검색어를 입력하세요.",
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
			handler:function(){
				/*var test = Ext.create("DgEv.view.center.CenterContainer");
				test.show();*/
				
				var westSgg = Ext.ComponentQuery.query("#searchResult")[0];
				westSgg.show();
				
				var stationSearch = Ext.ComponentQuery.query("#stationSearch")[0];
				var params = "EV/wfs?service=wfs&version=1.1.0";
				params += "&request=getfeature";
				params += "&typename=EV:EV_point";
				//params += "&PROPERTYNAME=NM";
				params += "&outputformat=application/json";
				
				var html = "";
				$.ajax({
			    	url: _proxyUrl + _serviceUrl + params,
			    	
			        type : 'GET',
			        async : false,
			        
			        contentType : 'text/xml',
			        success : function(response_) {
			        	for(var i = 0; i < response_.features.length; i++){
			        		
			        		html += "<div class='fw_path'><div class='thumb'><img src='./resources/images/test/01.png'></div>" +
			        			"<div class='state'><p><strong>" + response_.features[i].properties.NM + "</strong><em><span class='L0'></span></em></p>" +
								"<p class='MgT5 borB0'><span class='condition03'>사용가능</span>" +
								"<img alt='급속충전 이미지' src='./resources/images/test/icon_fast.png' width='20px' height='20px' style='margin-left:140px;'>" +
								"<em style='margin-top:5px;'>급속</em></p></div></div>";
			        	}
			        	
			        }
			    });
				
				stationSearch.setHtml(html);
				var ps = new daum.maps.services.Places();; 
				 ps.keywordSearch("대구광역시", placesSearchCB); 
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