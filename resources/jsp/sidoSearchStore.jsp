<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
try{
	
	
	String sidoValue = request.getParameter("sidoValue");
	String sggValue = request.getParameter("sggValue");
	String carValue = request.getParameter("carValue");
	String chargValue = request.getParameter("chargValue");
	String searchText = request.getParameter("searchText");
	
	System.out.println("sidoValue::"+sidoValue);
	System.out.println("sggValue::"+sggValue);
	System.out.println("carValue::"+carValue);
	System.out.println("chargValue::"+chargValue);
	System.out.println("searchText::"+searchText);
	System.out.println("==============");
	
	sql = "select DISTINCT CHR.C_STAT_ID																								";
	sql += "     , CHR.S_ADDR_1                                                         ";
	sql += "     ,  CHR.S_KO_STAT_NM                                                    ";
	sql += "     , substring_index(CHR.S_GPS_LAT_LNG,',',-1) as lat                     ";
	sql += "     , substring_index(CHR.S_GPS_LAT_LNG,',',1) as lng                      ";
	sql += "  from (                                                                    ";
	sql += "        SELECT CASE WHEN C_CHGER_TYPE_CD = '02' THEN '02'                   ";
	sql += "                                                ELSE '01' END AS CHRTYPECD  ";
	sql += "             , EV_V_CHARGER.*                                               ";
	sql += "          FROM EV_V_CHARGER                                                 ";
	sql += "       ) CHR                                                                ";
	sql += "     , (                                                                    ";
	sql += "        SELECT DISTINCT *                                                   ";
	sql += "          FROM (                                                            ";
	sql += "                SELECT CASE WHEN CODE = '02' THEN '02'                      ";
	sql += "                                             ELSE '01' END AS CHRTYPECD     ";
	sql += "                  FROM EVCS_CODE_DETAIL                                     ";
	sql += "                 WHERE CODE_ID = 'CHGE_TYPE'                                ";
	sql += "               ) A                                                          ";
	sql += "       ) CHRTYPE                                                            ";
	sql += "     , (                                                                    ";
	sql += "        SELECT '01' AS CHRTYPECD, '0007' AS CARTYPECD                       ";
	sql += "        UNION                                                               ";
	sql += "        SELECT '01' AS CHRTYPECD, '0009' AS CARTYPECD                       ";
	sql += "        UNION                                                               ";
	sql += "        SELECT '01' AS CHRTYPECD, '0002' AS CARTYPECD                       ";
	sql += "        UNION                                                               ";
	sql += "        SELECT '01' AS CHRTYPECD, '0003' AS CARTYPECD                       ";
	sql += "        UNION                                                               ";
	sql += "        SELECT '01' AS CHRTYPECD, '0010' AS CARTYPECD                       ";
	sql += "        UNION                                                               ";
	sql += "        SELECT '01' AS CHRTYPECD, '0008' AS CARTYPECD                       ";
	sql += "        UNION                                                               ";
	sql += "        SELECT '01' AS CHRTYPECD, '0005' AS CARTYPECD                       ";
	sql += "        UNION                                                               ";
	sql += "        SELECT '02' AS CHRTYPECD, '0001' AS CARTYPECD                       ";
	sql += "        UNION                                                               ";
	sql += "        SELECT '02' AS CHRTYPECD, '0004' AS CARTYPECD                       ";
	sql += "        UNION                                                               ";
	sql += "        SELECT '02' AS CHRTYPECD, '0006' AS CARTYPECD                       ";
	sql += "       ) CARTYPE                                                            ";
	sql += " WHERE CHR.CHRTYPECD = CHRTYPE.CHRTYPECD                                    ";
	sql += "   AND CHR.CHRTYPECD = CARTYPE.CHRTYPECD                                    ";
	sql += "   AND CHRTYPE.CHRTYPECD = CARTYPE.CHRTYPECD                                ";
	
	if(sggValue != ""){
		sql += "   AND CHR.C_STAT_ID LIKE '"+sggValue+"%'                                          ";	
	}else{
		sql += "   AND CHR.C_STAT_ID LIKE '"+sidoValue+"%'                                          ";
	}
	
	if(chargValue != ""){
		sql += "   AND CHRTYPE.CHRTYPECD = '"+chargValue+"'                                             ";	
	}
	if(carValue != ""){
		sql += "   AND CARTYPE.CARTYPECD = '"+carValue+"'                                           ";	
	}
	if(searchText != ""){
		sql += "   AND  S_KO_STAT_NM LIKE '%"+searchText+"%'" ;
	}
	
	
	
	
		
		
   //out.print(sql);
   stmt = con.createStatement();   
   rs = stmt.executeQuery(sql);
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();

		jsonRecord.put("KO_STAT_NM"	, rs.getString("S_KO_STAT_NM"));
		jsonRecord.put("ADDR_1"	, rs.getString("S_ADDR_1"));
		jsonRecord.put("STAT_ID"	, rs.getString("C_STAT_ID"));
		jsonRecord.put("LNG"	, rs.getString("lng"));
		jsonRecord.put("LAT"	, rs.getString("lat"));
		
		
		
		
		
  	
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