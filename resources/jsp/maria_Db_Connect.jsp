<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
try{

	
	sql = "	select distinct c_stat_id 																			";
	sql += "	             , substring_index(S_GPS_LAT_LNG,',',1) as lat      ";
	sql += "	             , substring_index(S_GPS_LAT_LNG,',',-1) as lng     ";
	sql += "	             , s_ko_stat_nm                                     ";
	sql += "	             , s_addr_1                                         ";
	sql += "	             , c_stat_id                                        ";
	sql += "	             , main_stat                                        ";
	sql += "	             , c_chger_type_cd                                        ";
	sql += "	             from EV_V_CHARGER                                  ";
		
		
   //out.print(sql);
   stmt = con.createStatement();   
   rs = stmt.executeQuery(sql);
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();

		jsonRecord.put("KO_STAT_NM"	, rs.getString("s_ko_stat_nm"));
		jsonRecord.put("STAT_ID"	, rs.getString("c_stat_id"));
		jsonRecord.put("CHGER_TYPE"	, rs.getString("c_chger_type_cd"));
		jsonRecord.put("ADDR"	, rs.getString("s_addr_1"));
		jsonRecord.put("ULAT"	, rs.getString("lat"));
		jsonRecord.put("ULNG"	, rs.getString("lng"));
		jsonRecord.put("GUBUN"	, rs.getString("main_stat"));
  	
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