<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
try{
	
	String stationId = request.getParameter("STAT_ID");
	String memberId = request.getParameter("MEMBER_ID");
	
	sql = "	DELETE FROM  EVCS_MOBILE_BOOKMARK ";
	sql += "   where MEMBER_ID = '"+memberId+"' and STAT_ID = '"+stationId+"' ";
	
	
	stmt = con.createStatement();   
	rs = stmt.executeQuery(sql);
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
   //out.print("success");
}catch(Exception ex){
	//throw;
	System.out.println(ex);
	System.out.println(sql);
	out.print("error");
} 
%>
<%@ include file="dbClose.jsp" %>