${'<%'}@page language="java" contentType="text/javascript; charset=UTF-8"
    pageEncoding="UTF-8"${'%>'}

${'<%'}@ page import="${PKG}.ApplicationConstants" ${'%>'}

readConstants = function() {
	return {
		pmId: "${'<%='}ApplicationConstants.PM_APP${'%>'}",
		COMMAND_GREET: "${'<%='}ApplicationConstants.COMMAND_GREET${'%>'}"
	}
};

