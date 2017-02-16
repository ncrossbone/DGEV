<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
try{
	
	String memberId = request.getParameter("MEMBER_ID");
	String statId = request.getParameter("STAT_ID");
	
	sql = " select * from EVCS_MOBILE_BOOKMARK ";
	if(statId == null){
		sql += " where MEMBER_ID = '"+memberId+"'";
	}else{
		sql+= "where MEMBER_ID = '"+memberId+"' and STAT_ID='"+statId+"' ";	
	}
	
	
		
   stmt = con.createStatement();   
   rs = stmt.executeQuery(sql);
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();

		jsonRecord.put("MEMBER_ID"	, rs.getString("MEMBER_ID"));
		jsonRecord.put("CARD_NO"	, rs.getString("CARD_NO"));
		jsonRecord.put("STAT_ID"	, rs.getString("STAT_ID"));
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