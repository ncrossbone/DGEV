<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
try{
	
	String lat = request.getParameter("lat");
	String lng = request.getParameter("lng");
	String radius = request.getParameter("radius");
	
	sql = " SELECT KO_STAT_NM,  ADDR_1, STAT_ID, ";
	sql += " 	(6371*acos(cos(radians("+lat+"))*cos(radians(substring_index(GPS_LAT_LNG,',',+1)))*cos(radians(substring_index(GPS_LAT_LNG,',',-1)) ";
	sql += " 	-radians("+lng+"))+sin(radians("+lat+"))*sin(radians(substring_index(GPS_LAT_LNG,',',+1))))) ";
	sql += " 	AS distance ";
	sql += " FROM EVCS_STATION ";
	sql += " HAVING distance <= "+radius+" ";
	sql += " ORDER BY distance  ";
	sql += " LIMIT 0,1000 ";
		
		
   //out.print(sql);
   stmt = con.createStatement();   
   rs = stmt.executeQuery(sql);
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();

		jsonRecord.put("KO_STAT_NM"	, rs.getString("KO_STAT_NM"));
		jsonRecord.put("STAT_ID"	, rs.getString("STAT_ID"));
		jsonRecord.put("ADDR"	, rs.getString("ADDR_1"));
  	
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