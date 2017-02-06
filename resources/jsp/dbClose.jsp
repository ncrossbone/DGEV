<%@ page language="java" import="java.sql.*" %>
<%
try{
	if(rs != null) rs.close();
	if(stmt != null) stmt.close();
	if(con != null) con.close();
	rs = null;
	stmt = null;
	con = null;
}catch(Exception ex){
	System.out.println(ex);
}
//Prints out to console
//System.out.println("Hello World in Console!");
//Prints out to HTML page
//out.println("Hello World!");
%>