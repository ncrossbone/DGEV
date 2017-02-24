<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
try{

	String CMNT_ID = request.getParameter("CMNT_ID");
	String MEMBER_ID = request.getParameter("MEMBER_ID");
		
	
	
	
	sql = "	DELETE FROM  EVCS_STATION_CMNT WHERE CMNT_ID = '"+CMNT_ID+"'";
	
	
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