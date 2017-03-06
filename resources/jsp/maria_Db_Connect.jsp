<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
try{

	
	sql = "  SELECT 																									\n\r";
	sql += "    ADMCODE,SGG_NM,C_STAT_ID,S_KO_STAT_NM,S_LAT,S_LNG,                                                        \n\r";
	sql += "    SUM(FAST_USEY) Y01,SUM(FAST_USEN) N01,SUM(SLOW_USEY) Y02,SUM(SLOW_USEN) N02,                              \n\r";
	sql += "    SUM(FAST_CT) A01,SUM(SLOW_CT) A02,                                                                        \n\r";
	sql += "    SUM(FAST_USEY)+SUM(SLOW_USEY) YA,SUM(FAST_USEN)+SUM(SLOW_USEN) NA,                                        \n\r";
	sql += "    SUM(FAST_CT)+SUM(SLOW_CT) AA,                                                                             \n\r";
	sql += "    CASE WHEN SUBSTR(ADMCODE,1,2)='27' THEN 'Y' ELSE 'N' END DAEGU_EV,                                        \n\r";
	sql += "    CASE WHEN SUM(FAST_CT)+SUM(SLOW_CT)>0 THEN                                                                \n\r";
	sql += "      CASE MAX(STAT) WHEN 1 THEN 'GREEN' ELSE 'RED' END                                                       \n\r";
	sql += "    ELSE '' END COLOR,                                                                                        \n\r";
	sql += "    CASE WHEN SUM(FAST_CT)>0 THEN                                                                             \n\r";
	sql += "      CASE MAX(FSTAT) WHEN 1 THEN 'GREEN' ELSE 'RED' END                                                      \n\r";
	sql += "    ELSE '' END FCOLOR,                                                                                       \n\r";
	sql += "    CASE WHEN SUM(SLOW_CT)>0 THEN                                                                             \n\r";
	sql += "      CASE MAX(SSTAT) WHEN 1 THEN 'GREEN' ELSE 'RED' END                                                      \n\r";
	sql += "    ELSE '' END SCOLOR                                                                                        \n\r";
	sql += "  FROM                                                                                                        \n\r";
	sql += "     (                                                                                                        \n\r";
	sql += "     SELECT                                                                                                   \n\r";
	sql += "      B.ADMCODE, B.SGG AS SGG_NM,A.C_STAT_ID, A.S_KO_STAT_NM,A.S_LAT,A.S_LNG,                                 \n\r";
	sql += "      CASE WHEN A.C_CHGER_TYPE_CD = '02' THEN 1 ELSE 0 END AS SLOW_CT,                                        \n\r";
	sql += "      CASE WHEN A.C_CHGER_TYPE_CD != '02' THEN 1 ELSE 0 END AS FAST_CT,                                       \n\r";
	sql += "      CASE WHEN A.C_CHGER_TYPE_CD = '02' AND MAIN_STAT = '2' THEN 1 ELSE 0 END AS SLOW_USEY,                  \n\r";
	sql += "      CASE WHEN A.C_CHGER_TYPE_CD = '02' AND MAIN_STAT != '2' THEN 1 ELSE 0 END AS SLOW_USEN,                 \n\r";
	sql += "      CASE WHEN A.C_CHGER_TYPE_CD != '02' AND MAIN_STAT = '2' THEN 1 ELSE 0 END AS FAST_USEY,                 \n\r";
	sql += "      CASE WHEN A.C_CHGER_TYPE_CD != '02' AND MAIN_STAT != '2' THEN 1 ELSE 0 END AS FAST_USEN,                \n\r";
	sql += "      CASE MAIN_STAT                                                                                          \n\r";
	sql += "        WHEN '2' THEN 1 WHEN '3' THEN 1                                                                       \n\r";
	sql += "      ELSE 0 END AS STAT,                                                                                     \n\r";
	sql += "      CASE                                                                                                    \n\r";
	sql += "        WHEN A.C_CHGER_TYPE_CD != '02' AND MAIN_STAT='2' THEN 1                                               \n\r";
	sql += "        WHEN A.C_CHGER_TYPE_CD != '02' AND MAIN_STAT='3' THEN 1                                               \n\r";
	sql += "      ELSE 0 END AS FSTAT,                                                                                    \n\r";
	sql += "      CASE                                                                                                    \n\r";
	sql += "        WHEN A.C_CHGER_TYPE_CD = '02' AND MAIN_STAT='2' THEN 1                                                \n\r";
	sql += "        WHEN A.C_CHGER_TYPE_CD = '02' AND MAIN_STAT='3' THEN 1                                                \n\r";
	sql += "      ELSE 0 END AS SSTAT,MAIN_STAT                                                                           \n\r";
	sql += "     FROM EV_V_CHARGER A,CM_ADM_CODE B                                                                        \n\r";
	sql += "     WHERE CONCAT(SUBSTRING(C_STAT_ID, 1, 5), '00000') = B.ADMCODE                                            \n\r";
	sql += "     ) A                                                                                                      \n\r";
	sql += "   GROUP BY ADMCODE,SGG_NM,C_STAT_ID,S_KO_STAT_NM,S_LAT, S_LNG                                                \n\r";
	 
	                                                                                                                                        
		
		
   //out.print(sql);
   stmt = con.createStatement();   
   rs = stmt.executeQuery(sql);
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();
		
		jsonRecord.put("ADM_CD"	, rs.getString("ADMCODE"));
		jsonRecord.put("SGG_NM"	, rs.getString("SGG_NM"));
		jsonRecord.put("STAT_ID"	, rs.getString("C_STAT_ID"));
		jsonRecord.put("S_KO_STAT_NM"	, rs.getString("S_KO_STAT_NM"));
		jsonRecord.put("S_LAT"	, rs.getString("S_LAT"));
		jsonRecord.put("S_LNG"	, rs.getString("S_LNG"));
		jsonRecord.put("DAEGU_EV"	, rs.getString("DAEGU_EV"));
		jsonRecord.put("Y01"	, rs.getString("Y01"));
		jsonRecord.put("N01"	, rs.getString("N01"));
		jsonRecord.put("Y02"	, rs.getString("Y02"));
		jsonRecord.put("N02"	, rs.getString("N02"));
		jsonRecord.put("A01"	, rs.getString("A01"));
		jsonRecord.put("A02"	, rs.getString("A02"));
		jsonRecord.put("YA"	, rs.getString("YA"));
		jsonRecord.put("NA"	, rs.getString("NA"));
		jsonRecord.put("AA"	, rs.getString("AA"));
		jsonRecord.put("COLOR"	, rs.getString("COLOR"));
		jsonRecord.put("FCOLOR"	, rs.getString("FCOLOR"));
		jsonRecord.put("SCOLOR"	, rs.getString("SCOLOR"));
  	
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