<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
try{
	
	String stationId = request.getParameter("STAT_ID");
	
	
	sql = " select * from EVCS_STATION_CMNT WHERE STAT_ID = '"+stationId+"'  ORDER BY INS_DT DESC";
	
		
   stmt = con.createStatement();   
   rs = stmt.executeQuery(sql);
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();

		jsonRecord.put("CMNT_ID"	, rs.getString("CMNT_ID"));
		jsonRecord.put("INS_ID"	, rs.getString("INS_ID"));
		jsonRecord.put("CMNT"	, rs.getString("CMNT"));
		jsonRecord.put("INS_DT"	, rs.getString("INS_DT"));
		jsonRecord.put("CMNT_TYPE"	, rs.getString("CMNT_TYPE"));
		jsonRecord.put("CHARGER_ID"	, rs.getString("CHARGER_ID"));
  	
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