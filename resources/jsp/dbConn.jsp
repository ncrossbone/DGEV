<%@ page language="java" import="java.sql.*"%>
<%
String DB_URL = "jdbc:mysql://112.217.167.123:43306/evcis_daegu";

String DB_USER    = "evcis";
String DB_PASSWORD = "evcis";

Connection con = null;
Statement stmt = null;
Statement stmtNew = null;
ResultSet rs = null;
ResultSet rsNew = null;
String sql=null;

try
{
	Class.forName("org.mariadb.jdbc.Driver");
	con = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
}catch(SQLException ex){
	System.out.println(ex);
	out.println("error");
}
%>