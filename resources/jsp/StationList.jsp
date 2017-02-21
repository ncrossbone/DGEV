<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
try{
	//stationId
	
	String stationId = request.getParameter("stationId");
	
	
	sql = "	select A.*, (B.CODE_NM) AS BUSI_NAME from EVCS_STATION A, EVCS_CODE_DETAIL B WHERE A.BUSI_KIND_CD = B.CODE   ";
	
		
   stmt = con.createStatement();   
   rs = stmt.executeQuery(sql);
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();
		
		jsonRecord.put("STAT_ID",rs.getString("STAT_ID"));
		jsonRecord.put("EN_STAT_NM",rs.getString("EN_STAT_NM"));
		jsonRecord.put("BUSI_NAME",rs.getString("BUSI_NAME"));
		jsonRecord.put("ZIP_CODE",rs.getString("ZIP_CODE"));
		jsonRecord.put("ADDR_1",rs.getString("ADDR_1"));
		jsonRecord.put("ADDR_2",rs.getString("ADDR_2"));
		jsonRecord.put("USE_TIME",rs.getString("USE_TIME"));
		jsonRecord.put("GPS_LAT_LNG",rs.getString("GPS_LAT_LNG"));
		jsonRecord.put("STAT_KIND_CD",rs.getString("STAT_KIND_CD"));
		jsonRecord.put("PARKING_FREE",rs.getString("PARKING_FREE"));
		jsonRecord.put("ETC",rs.getString("ETC"));
		jsonRecord.put("ULAT",rs.getString("ULAT"));
		jsonRecord.put("ULNG",rs.getString("ULNG"));
		jsonRecord.put("BUSI_KIND_CD",rs.getString("BUSI_KIND_CD"));
		jsonRecord.put("KO_STAT_NM",rs.getString("KO_STAT_NM"));
		jsonRecord.put("REG_DATE",rs.getString("REG_DATE"));
		jsonRecord.put("PHONE_NO",rs.getString("PHONE_NO"));
		jsonRecord.put("MANAGE_NAME",rs.getString("MANAGE_NAME"));
		jsonRecord.put("MANAGE_TEL",rs.getString("MANAGE_TEL"));
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