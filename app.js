Ext.application({
    name   : 'DgEv',
           
    launch : function() {

    	var main = Ext.create("DgEv.view.main.Main", {
    		renderTo: Ext.getBody()
    	});

    }
});