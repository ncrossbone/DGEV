<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.Iterator"%>
<%@page import="java.util.Set"%>
<%@page import="java.util.Map"%>
<%@page import="java.io.InputStream"%>
<%@page import="java.io.OutputStream"%>
<%@page import="java.io.IOException"%>
<%@page import="java.util.Enumeration"%>
<%@page import="java.net.HttpURLConnection"%>
<%@page import="java.net.URL"%>
<%@page import="java.net.MalformedURLException"%>
<%@page import="java.io.BufferedReader"%>
<%@page import="java.io.InputStreamReader"%>

<%@page import="java.nio.CharBuffer"%>
<%@page import="java.nio.ByteBuffer"%>
<%@page import="java.nio.charset.Charset"%>

<%@page import="java.io.ByteArrayOutputStream"%>
<%@page import="java.lang.Exception"%>

<%!public static String getParam(HttpServletRequest request, String name) {
	 
		String paramsToString = "";
	
		Map map = (Map) request.getAttribute("Map");
		if (map == null) {
			map = new HashMap();
			
			Enumeration e = request.getParameterNames();
			while (e.hasMoreElements()) {
				String key = (String) e.nextElement();
				String value = request.getParameter(key);
				
				paramsToString += ( "&" + key + "=" + value );
				
				System.out.println( "1 paramsToString : " + paramsToString );
				
				try {
					//value = new String(value.getBytes("8859_1"), "UTF-8");
				} catch (Exception ex) {
				}
				//map.put(key.toUpperCase(), value);
			}
			paramsToString = paramsToString.replaceFirst( "&url=", "" );
			//request.setAttribute("Map", map);
		}
		System.out.println();
		//System.out.println( "paramsToString : " + paramsToString );
		
		//return (String) map.get(name.toUpperCase());
		return paramsToString;
	}

	public static void proxy(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException, Exception {
		String urlParam = getParam(request, "URL");
		
		
		
		/* 
		String originalStr = urlParam; // 테스트 
		String[] charSet = { "utf-8", "euc-kr", "ksc5601", "iso-8859-1",
				"x-windows-949" };

		for (int i = 0; i < charSet.length; i++) {
			for (int j = 0; j < charSet.length; j++) {
				try {
					System.out.println("["
							+ charSet[i]
							+ ","
							+ charSet[j]
							+ "] = "
							+ new String(originalStr.getBytes(charSet[i]),
									charSet[j]));
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		 */

		System.out.println(urlParam);
		if (urlParam == null || urlParam.trim().length() == 0) {
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}
		boolean doPost = request.getMethod().equalsIgnoreCase("POST");
		URL url = new URL(urlParam.replaceAll(" ", "%20"));
		
		HttpURLConnection http = (HttpURLConnection) url.openConnection();
		Enumeration headerNames = request.getHeaderNames();
		while (headerNames.hasMoreElements()) {
			String key = (String) headerNames.nextElement();
			if (!key.equalsIgnoreCase("Host")) {
				http.setRequestProperty(key, request.getHeader(key));
			}
			
			System.out.println( "2 paramsToString : " + key );
		}

		http.setDoInput(true);
		http.setDoOutput(doPost);

		byte[] buffer = new byte[8192];
		int read = -1;

		if (doPost) {
			OutputStream os = http.getOutputStream();
			ServletInputStream sis = request.getInputStream();
			while ((read = sis.read(buffer)) != -1) {
				os.write(buffer, 0, read);
				System.out.println( "5 paramsToString : " + read);
			}
			os.close();
		}

		InputStream is = http.getInputStream();
		response.setStatus(http.getResponseCode());

		Map headerKeys = http.getHeaderFields();
		Set keySet = headerKeys.keySet();
		Iterator iter = keySet.iterator();
		while (iter.hasNext()) {

			String key = (String) iter.next();
			String value = http.getHeaderField(key);
			if (key != null && value != null) {
				if (value.indexOf("text/xml") > -1
						&& value.indexOf("ISO-8859-1") > -1) {
					value = value.replaceAll("ISO-8859-1", "UTF-8");
				}
				if ( !(key.equals("Transfer-Encoding")) ) {
					response.setHeader(key, value);
				}
			}
			System.out.println( "3 paramsToString : " + key );
		}

		//response.setContentType("text/xml");
		//response.setCharacterEncoding("UTF-8");

		ServletOutputStream sos = response.getOutputStream();

		//response.setContentType("text/xml");
		//response.setCharacterEncoding("UTF-8");
		response.resetBuffer();
		//String myString = IOUtils.toString(is, "UTF-8");
		//System.out.println(myString);
		int cnt = 0;
		while ((read = is.read(buffer)) != -1) {

			cnt++;
			//if(cnt < 10){
				/* StringBuffer stringBuffer = new StringBuffer();
				stringBuffer.append(new String(buffer, 0, read)); */
				
				//if(stringBuffer.toString().contains("SD_NM") == true){
					//System.out.println(cnt);
					//sos.write(buffer, 0, read);
				//}
			//}
			
			sos.write(buffer, 0, read);
			
		}
		System.out.println("end");
		//out.println("suc");
		sos.println();
		response.flushBuffer();
		sos.close();
		http.disconnect();

	}
%><%
	try {
		out.clear();
		proxy(request, response);
	} catch (Exception e) {
		response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		response.setContentType("text/plain");
		%><%=e.getStackTrace()[0].getMethodName() + ":" + e.getStackTrace()[0].getLineNumber()%><%
	}
	if (true) {
		return;
	}
%>
