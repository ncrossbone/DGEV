<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
try{
	
	String stationId = request.getParameter("STAT_ID");
	String resvDate = request.getParameter("RESV_DATE");
	String chgerId = request.getParameter("CHGER_ID");
	String type = request.getParameter("TYPE");
	
	sql = "  select * from EVCS_RESERVATION ";
	sql += "  WHERE STAT_ID = "+stationId +"";
	sql += " AND CHGER_ID = " + chgerId +"";
	sql += " AND DATE_FORMAT(RESV_DATE,'%Y%m%d') = "+resvDate+"";
			
	System.out.print(sql);
   stmt = con.createStatement();   
   rs = stmt.executeQuery(sql);
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();

		jsonRecord.put("MEMBER_ID"	, rs.getString("MEMBER_ID"));
		jsonRecord.put("CHGER_ID"	, rs.getString("CHGER_ID"));
		jsonRecord.put("STAT_ID"	, rs.getString("STAT_ID"));
		jsonRecord.put("RESV_DATE"	, rs.getString("RESV_DATE"));
		jsonRecord.put("EXPR_DATE"	, rs.getString("EXPR_DATE"));
		jsonRecord.put("REG_DATE"	, rs.getString("REG_DATE"));
  	
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