<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
try{
	//stationId
	
	String stationId = request.getParameter("stationId");
	
	
	sql = "	SELECT 								";
	sql += "			S_KO_STAT_NM	,   ";
	sql += "			S_EN_STAT_NM	,   ";
	sql += "			S_ZIP_CODE	,     ";
	sql += "			S_ADDR_1	,       ";
	sql += "			S_ADDR_2	,       ";
	sql += "			C_STAT_ID	,       ";
	sql += "			C_CHGER_ID	,     ";
	sql += "			C_CHGER_TYPE_CD	, ";
	sql += "			C_CHGER_TYPE_NM	, ";
	sql += "			C_CHGE_PRD_CD	,   ";
	sql += "			C_CHGE_PRD_NM	,   ";
	sql += "			C_CHGE_MODEL_CD	, ";
	sql += "			C_CHGE_MODEL_NM	, ";
	sql += "			C_RECV_DATE	,     ";
	sql += "			S_GPS_LAT_LNG	,   ";
	sql += "			S_ULAT	,         ";
	sql += "			S_ULNG	,         ";
	sql += "			ALM_STAT	,       ";
	sql += "			CHRG_STAT	,       ";
	sql += "			COM_STAT	,       ";
	sql += "			DOOR_STAT	,       ";
	sql += "			EBTN_STAT	,       ";
	sql += "			RMODE_STAT	,     ";
	sql += "			MAIN_STAT	,       ";
	sql += "			C_MASK_STAT	,     ";
	sql += "			C_MDN	,           ";
	sql += "			C_SECRET_AREA	,   ";
	sql += "			C_M2M_PRD_CD	,   ";
	sql += "			C_RF_PRD_CD	,     ";
	sql += "			C_SN	,           ";
	sql += "			C_COM_SYS	,       ";
	sql += "			C_COM_WAY	,       ";
	sql += "			C_STAT	,         ";
	sql += "			C_REG_DATE	,     ";
	sql += "			C_COUNT_YN	,     ";
	sql += "			S_USE_TIME	,     ";
	sql += "			S_PARKING_FREE	, ";
	sql += "			CHGE_MANAGE_GUBUN,	";
	sql += "			S_USE_TIME	";
	sql += "		FROM EV_V_CHARGER   ";
	if(stationId != null){
		sql += "WHERE C_STAT_ID ='"+stationId+"'";
	}
	
		
   stmt = con.createStatement();   
   rs = stmt.executeQuery(sql);
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();
		
		jsonRecord.put("S_EN_STAT_NM",rs.getString("S_EN_STAT_NM"));
		jsonRecord.put("S_ZIP_CODE",rs.getString("S_ZIP_CODE"));
		jsonRecord.put("S_ADDR_1",rs.getString("S_ADDR_1"));
		jsonRecord.put("S_ADDR_2",rs.getString("S_ADDR_2"));
		jsonRecord.put("C_STAT_ID",rs.getString("C_STAT_ID"));
		jsonRecord.put("C_CHGER_ID",rs.getString("C_CHGER_ID"));
		jsonRecord.put("C_CHGER_TYPE_CD",rs.getString("C_CHGER_TYPE_CD"));
		jsonRecord.put("C_CHGER_TYPE_NM",rs.getString("C_CHGER_TYPE_NM"));
		jsonRecord.put("C_CHGE_PRD_CD",rs.getString("C_CHGE_PRD_CD"));
		jsonRecord.put("C_CHGE_PRD_NM",rs.getString("C_CHGE_PRD_NM"));
		jsonRecord.put("C_CHGE_MODEL_CD",rs.getString("C_CHGE_MODEL_CD"));
		jsonRecord.put("C_CHGE_MODEL_NM",rs.getString("C_CHGE_MODEL_NM"));
		jsonRecord.put("C_RECV_DATE",rs.getString("C_RECV_DATE"));
		jsonRecord.put("S_GPS_LAT_LNG",rs.getString("S_GPS_LAT_LNG"));
		jsonRecord.put("S_ULAT",rs.getString("S_ULAT"));
		jsonRecord.put("S_ULNG",rs.getString("S_ULNG"));
		jsonRecord.put("ALM_STAT",rs.getString("ALM_STAT"));
		jsonRecord.put("CHRG_STAT",rs.getString("CHRG_STAT"));
		jsonRecord.put("COM_STAT",rs.getString("COM_STAT"));
		jsonRecord.put("DOOR_STAT",rs.getString("DOOR_STAT"));
		jsonRecord.put("EBTN_STAT",rs.getString("EBTN_STAT"));
		jsonRecord.put("RMODE_STAT",rs.getString("RMODE_STAT"));
		jsonRecord.put("MAIN_STAT",rs.getString("MAIN_STAT"));
		jsonRecord.put("C_MASK_STAT",rs.getString("C_MASK_STAT"));
		jsonRecord.put("C_MDN",rs.getString("C_MDN"));
		jsonRecord.put("C_SECRET_AREA",rs.getString("C_SECRET_AREA"));
		jsonRecord.put("C_M2M_PRD_CD",rs.getString("C_M2M_PRD_CD"));
		jsonRecord.put("C_RF_PRD_CD",rs.getString("C_RF_PRD_CD"));
		jsonRecord.put("C_SN",rs.getString("C_SN"));
		jsonRecord.put("C_COM_SYS",rs.getString("C_COM_SYS"));
		jsonRecord.put("C_COM_WAY",rs.getString("C_COM_WAY"));
		jsonRecord.put("C_STAT",rs.getString("C_STAT"));
		jsonRecord.put("C_REG_DATE",rs.getString("C_REG_DATE"));
		jsonRecord.put("C_COUNT_YN",rs.getString("C_COUNT_YN"));
		//jsonRecord.put("S_STAT_KIND_CD",rs.getString("S_STAT_KIND_CD"));
		jsonRecord.put("S_USE_TIME",rs.getString("S_USE_TIME"));
		jsonRecord.put("S_PARKING_FREE",rs.getString("S_PARKING_FREE"));
		jsonRecord.put("CHGE_MANAGE_GUBUN",rs.getString("CHGE_MANAGE_GUBUN"));
		jsonRecord.put("S_USE_TIME",rs.getString("S_USE_TIME"));

  	
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