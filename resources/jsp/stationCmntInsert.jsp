<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
try{

	String STAT_ID = request.getParameter("STAT_ID");
	String CMNT = request.getParameter("CMNT");
	String MEMBER_ID = request.getParameter("MEMBER_ID");
	String CMNT_TYPE = request.getParameter("CMNT_TYPE");
	String CHARGER_ID = request.getParameter("CHARGER_ID");
	
	
	
	
	sql = "	INSERT INTO EVCS_STATION_CMNT	(		";
	sql += "	    		STAT_ID                   ";
	sql += "	    		,CMNT                     ";
	sql += "	    		,INS_ID                   ";
	sql += "	    		,INS_DT                   ";
	sql += "	    		,CMNT_TYPE                ";
	sql += "	    		,CHARGER_ID               ";
	sql += "	    		,BUSI_KIND_CD               ";
	sql += "	    	)                           ";
	sql += "	    	VALUES                      ";
	sql += "	    	(                           ";
	sql += "	    		"+STAT_ID+"                 ";
	sql += "	    		,'"+CMNT+"'                   ";
	sql += "	    		,'"+MEMBER_ID+"'              ";
	sql += "	    		,SYSDATE()                ";
	sql += "	    		,'"+CMNT_TYPE+"'              ";
	sql += "	    		,'"+CHARGER_ID+"'     ";
	sql += "	    		,'DE'		)       ";
	
	
	stmt = con.createStatement();
	stmt.executeUpdate(sql);
	//stmt = con.createStatement();
	 
	//rs = stmt.executeUpdate(sql);
	   
	   
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
		
	   
    out.print(jsonObj);
    
}catch(Exception ex){
	//throw;
	System.out.println(ex);
	System.out.println(sql);
	out.print("error");
} 
%>
<%@ include file="dbClose.jsp" %>