<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
try{
	//stationId
	
	//String stationId = request.getParameter("stationId");
	
	
	sql = "	select           				";
	sql += "        STAT_ID,	        ";
	sql += "        ADDR_1,           ";
	sql += "        KO_STAT_NM,       ";
	sql += "        LAT,              ";
	sql += "        LNG               ";
	sql += "      from EVCS_STATION   ";
	
		
   stmt = con.createStatement();   
   rs = stmt.executeQuery(sql);
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();
		
		jsonRecord.put("STAT_ID",rs.getString("STAT_ID"));
		jsonRecord.put("ADDR",rs.getString("ADDR_1"));
		jsonRecord.put("KO_STAT_NM",rs.getString("KO_STAT_NM"));
		jsonRecord.put("LAT",rs.getString("LAT"));
		jsonRecord.put("LNG",rs.getString("LNG"));
  	
  		jsonArr.add(jsonRecord);
	}
	
	jsonObj.put("data", jsonArr);
   
   out.print(jsonObj);
   //out.print("success");
}catch(Exception ex){
	//throw;
	System.out.println(ex);
	System.out.println(sql);
	out.print("error");
} 
%>
<%@ include file="dbClose.jsp" %>