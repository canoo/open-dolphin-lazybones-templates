${'<%'}@page language="java" contentType="text/javascript; charset=UTF-8"
    pageEncoding="UTF-8"${'%>'}

${'<%'}@ page import="${PKG}.ApplicationConstants" ${'%>'}

readApiConstants = function() {
	return {
		DOLPHIN_URL: "${'<%='}application.getContextPath()${'%>'}/dolphin/",
		PM_ID: "${'<%='}ApplicationConstants.PM_APP${'%>'}",
		ATT_NAME: "${'<%='}ApplicationConstants.ATT_NAME${'%>'}",
		ATT_GREETING: "${'<%='}ApplicationConstants.ATT_GREETING${'%>'}",
		COMMAND_GREET: "${'<%='}ApplicationConstants.COMMAND_GREET${'%>'}",
	}
};

