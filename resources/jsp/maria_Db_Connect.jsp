<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
try{

	
	sql = "SELECT * FROM EVCS_STATION";
		
		
   //out.print(sql);
   stmt = con.createStatement();   
   rs = stmt.executeQuery(sql);
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();

		jsonRecord.put("KO_STAT_NM"	, rs.getString("KO_STAT_NM"));
		jsonRecord.put("EN_STAT_NM"	, rs.getString("EN_STAT_NM"));
		jsonRecord.put("ADDR_1"	, rs.getString("ADDR_1"));
		jsonRecord.put("ADDR_2"	, rs.getString("ADDR_2"));
		jsonRecord.put("ULAT"	, rs.getString("ULAT"));
		jsonRecord.put("ULNG"	, rs.getString("ULNG"));
  	
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