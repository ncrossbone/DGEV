<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
try{
	
	String stationId = request.getParameter("STAT_ID");
	
	
	sql = " SELECT ADMCODE, SGG_NM, C_STAT_ID, S_KO_STAT_NM, S_GPS_LAT_LNG																																						";
	sql += "      , IFNULL(MAX(CASE WHEN CHGER_TYPE = '01' AND USE_YN = 'Y' THEN CNT END), 0) AS 'Y01'                                                ";
	sql += "      , IFNULL(MAX(CASE WHEN CHGER_TYPE = '01' AND USE_YN = 'N' THEN CNT END), 0) AS 'N01'                                                ";
	sql += "      , IFNULL(MAX(CASE WHEN CHGER_TYPE = '02' AND USE_YN = 'Y' THEN CNT END), 0) AS 'Y02'                                                ";
	sql += "      , IFNULL(MAX(CASE WHEN CHGER_TYPE = '02' AND USE_YN = 'N' THEN CNT END), 0) AS 'N02'                                                ";
	sql += "      , IFNULL(MAX(CASE WHEN CHGER_TYPE = '01' AND USE_YN = 'A' THEN CNT END), 0) AS 'A01'                                                ";
	sql += "      , IFNULL(MAX(CASE WHEN CHGER_TYPE = '02' AND USE_YN = 'A' THEN CNT END), 0) AS 'A02'                                                ";
	sql += "      , IFNULL(MAX(CASE WHEN CHGER_TYPE = 'A' AND USE_YN = 'Y' THEN CNT END), 0) AS 'YA'                                                  ";
	sql += "      , IFNULL(MAX(CASE WHEN CHGER_TYPE = 'A' AND USE_YN = 'N' THEN CNT END), 0) AS 'NA'                                                  ";
	sql += "      , IFNULL(MAX(CASE WHEN CHGER_TYPE = 'A' AND USE_YN = 'A' THEN CNT END), 0) AS 'AA'                                                  ";
	sql += "   FROM (                                                                                                                                 ";
	sql += "         SELECT ADMCODE, SGG_NM, C_STAT_ID, S_KO_STAT_NM, CHGER_TYPE, USE_YN, COUNT(1) AS CNT, S_GPS_LAT_LNG                              ";
	sql += "           FROM (                                                                                                                         ";
	sql += "                 SELECT ADM.ADMCODE                                                                                                       ";
	sql += "                      , ADM.SGG AS SGG_NM                                                                                                 ";
	sql += "                      , CHR.C_STAT_ID                                                                                                     ";
	sql += "                      , CHR.S_KO_STAT_NM                                                                                                  ";
	sql += "                      , CASE WHEN CHR.C_CHGER_TYPE_CD = '02' THEN '02'                                                                    ";
	sql += "                             ELSE '01' END AS CHGER_TYPE                                                                                  ";
	sql += "                      , CASE WHEN CHR.MAIN_STAT = '2' THEN 'Y'                                                                            ";
	sql += "                             ELSE 'N' END AS USE_YN                                                                                       ";
	sql += "                      , CHR.S_GPS_LAT_LNG                                                                                                 ";
	sql += "                   FROM EV_V_CHARGER CHR                                                                                                  ";
	sql += "                      , CM_ADM_CODE ADM                                                                                                   ";
	sql += "                  WHERE CONCAT(SUBSTRING(C_STAT_ID, 1, 5), '00000') = ADM.ADMCODE                                                         ";
	sql += "                ) CHRCNT                                                                                                                  ";
	sql += "          GROUP BY ADMCODE, SGG_NM, C_STAT_ID, S_KO_STAT_NM, CHGER_TYPE, USE_YN, S_GPS_LAT_LNG                                            ";
	sql += "          UNION ALL                                                                                                                       ";
	sql += "          SELECT ADMCODE, SGG_NM, C_STAT_ID, S_KO_STAT_NM, CHGER_TYPE, USE_YN, COUNT(1) AS CNT, S_GPS_LAT_LNG                             ";
	sql += "           FROM (                                                                                                                         ";
	sql += "                 SELECT ADM.ADMCODE                                                                                                       ";
	sql += "                      , ADM.SGG AS SGG_NM                                                                                                 ";
	sql += "                      , CHR.C_STAT_ID                                                                                                     ";
	sql += "                      , CHR.S_KO_STAT_NM                                                                                                  ";
	sql += "                      , CHR.S_GPS_LAT_LNG                                                                                                 ";
	sql += "                      , CASE WHEN CHR.C_CHGER_TYPE_CD = '02' THEN '02'                                                                    ";
	sql += "                             ELSE '01' END AS CHGER_TYPE                                                                                  ";
	sql += "                      , 'A' AS USE_YN                                                                                                     ";
	sql += "                   FROM EV_V_CHARGER CHR                                                                                                  ";
	sql += "                      , CM_ADM_CODE ADM                                                                                                   ";
	sql += "                  WHERE CONCAT(SUBSTRING(C_STAT_ID, 1, 5), '00000') = ADM.ADMCODE                                                         ";
	sql += "                ) CHRCNT                                                                                                                  ";
	sql += "          GROUP BY ADMCODE, SGG_NM, C_STAT_ID, S_KO_STAT_NM, CHGER_TYPE, USE_YN, S_GPS_LAT_LNG                                            ";
	sql += "          UNION ALL                                                                                                                       ";
	sql += "          SELECT ADMCODE, SGG_NM, C_STAT_ID, S_KO_STAT_NM, CHGER_TYPE, USE_YN, COUNT(1) AS CNT, S_GPS_LAT_LNG                             ";
	sql += "           FROM (                                                                                                                         ";
	sql += "                 SELECT ADM.ADMCODE                                                                                                       ";
	sql += "                      , ADM.SGG AS SGG_NM                                                                                                 ";
	sql += "                      , CHR.C_STAT_ID                                                                                                     ";
	sql += "                      , CHR.S_KO_STAT_NM                                                                                                  ";
	sql += "                      , 'A' AS CHGER_TYPE                                                                                                 ";
	sql += "                      , CHR.S_GPS_LAT_LNG                                                                                                 ";
	sql += "                      , CASE WHEN CHR.MAIN_STAT = '2' THEN 'Y'                                                                            ";
	sql += "                             ELSE 'N' END AS USE_YN                                                                                       ";
	sql += "                   FROM EV_V_CHARGER CHR                                                                                                  ";
	sql += "                      , CM_ADM_CODE ADM                                                                                                   ";
	sql += "                  WHERE CONCAT(SUBSTRING(C_STAT_ID, 1, 5), '00000') = ADM.ADMCODE                                                         ";
	sql += "                ) CHRCNT                                                                                                                  ";
	sql += "          GROUP BY ADMCODE, SGG_NM, C_STAT_ID, S_KO_STAT_NM, CHGER_TYPE, USE_YN, S_GPS_LAT_LNG                                            ";
	sql += "          UNION ALL                                                                                                                       ";
	sql += "          SELECT ADMCODE, SGG_NM, C_STAT_ID, S_KO_STAT_NM, CHGER_TYPE, USE_YN, COUNT(1) AS CNT, S_GPS_LAT_LNG                             ";
	sql += "           FROM (                                                                                                                         ";
	sql += "                 SELECT ADM.ADMCODE                                                                                                       ";
	sql += "                      , ADM.SGG AS SGG_NM                                                                                                 ";
	sql += "                      , CHR.C_STAT_ID                                                                                                     ";
	sql += "                      , CHR.S_KO_STAT_NM                                                                                                  ";
	sql += "                      , 'A' AS CHGER_TYPE                                                                                                 ";
	sql += "                      , 'A' AS USE_YN                                                                                                     ";
	sql += "                      , CHR.S_GPS_LAT_LNG                                                                                                 ";
	sql += "                   FROM EV_V_CHARGER CHR                                                                                                  ";
	sql += "                      , CM_ADM_CODE ADM                                                                                                   ";
	sql += "                  WHERE CONCAT(SUBSTRING(C_STAT_ID, 1, 5), '00000') = ADM.ADMCODE                                                         ";
	sql += "                ) CHRCNT                                                                                                                  ";
	sql += "          GROUP BY ADMCODE, SGG_NM, C_STAT_ID, S_KO_STAT_NM, CHGER_TYPE, USE_YN, S_GPS_LAT_LNG                                            ";
	sql += "        ) RSTTBL                                                                                                                          ";
	sql += "        where C_STAT_ID in ("+stationId+")                                                                                                   ";
	sql += "  GROUP BY ADMCODE, SGG_NM, C_STAT_ID, S_KO_STAT_NM, S_GPS_LAT_LNG                                                                        ";
	
	//System.out.print(sql);	
   stmt = con.createStatement();   
   rs = stmt.executeQuery(sql);
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();

		jsonRecord.put("STAT_ID"	, rs.getString("C_STAT_ID"));
		jsonRecord.put("Y01"	, rs.getString("Y01"));
		jsonRecord.put("N01"	, rs.getString("N01"));
		jsonRecord.put("A01"	, rs.getString("A01"));
		jsonRecord.put("Y02"	, rs.getString("Y02"));
		jsonRecord.put("N02"	, rs.getString("N02"));
		jsonRecord.put("A02"	, rs.getString("A02"));
		jsonRecord.put("YA"		, rs.getString("YA"));
		jsonRecord.put("NA"		, rs.getString("NA"));
		jsonRecord.put("AA"		, rs.getString("AA"));
		
		
  	
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