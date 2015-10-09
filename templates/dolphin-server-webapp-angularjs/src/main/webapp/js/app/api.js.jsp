${'<%'}@page language="java" contentType="text/javascript; charset=UTF-8" pageEncoding="UTF-8"${'%>'}
${'<%'}@ page import="${PKG}.ApplicationConstants" ${'%>'}

// private
// get values from server as javascript values, so that they can be used in client side javascript:
readDolphinConfig = function() {
	return {
		ODAPI: {
			PM_ID: "${'<%='}ApplicationConstants.PM_APP${'%>'}",
			ATT_NAME: "${'<%='}ApplicationConstants.ATT_NAME${'%>'}",
			ATT_GREETING: "${'<%='}ApplicationConstants.ATT_GREETING${'%>'}",
            COMMAND_INIT: "${'<%='}ApplicationConstants.COMMAND_INIT${'%>'}",
			COMMAND_GREET: "${'<%='}ApplicationConstants.COMMAND_GREET${'%>'}",
		}
	}
};

newDolphinBuilder = function() {
  return opendolphin.makeDolphin()
    .url("${'<%='}application.getContextPath()${'%>'}/dolphin/")
    .reset(true)
    ;
};

