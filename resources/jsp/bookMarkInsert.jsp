<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
try{
	
	String stationId = request.getParameter("STAT_ID");
	String memberId = request.getParameter("MEMBER_ID");
	String busiCd = request.getParameter("BUSI_CD");
	
	sql = "	insert into EVCS_MOBILE_BOOKMARK (MEMBER_ID,CARD_NO,STAT_ID,BUSI_KIND_CD,REG_DATE) VALUES(	 ";
	sql += " '"+memberId+"','aaa','"+stationId+"','"+busiCd+"',SYSDATE() ) " ;
	
	
	out.print(sql);
	stmt = con.createStatement();   
	rs = stmt.executeQuery(sql);
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
   //out.print("success");
}catch(Exception ex){
	//throw;
	System.out.println(ex);
	System.out.println(sql);
	out.print("error");
} 
%>
<%@ include file="dbClose.jsp" %>