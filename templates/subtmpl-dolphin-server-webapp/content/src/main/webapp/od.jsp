<%--
<%@ page import="org.group.ApplicationConstants.PM_APP" %>
<%@ page import="org.group.ApplicationConstants.ATT_NAME" %>
<%@ page import="org.group.ApplicationConstants.ATT_GREETING" %>
<%@ page import="org.group.ApplicationConstants.CMD_GREET" %>
--%>

<%
    final String PM_APP = "org.group.ApplicationConstants.APP";
    final String ATT_NAME = "ATT_NAME";
    final String ATT_GREETING = "ATT_GREETING";

    final String CMD_GREET = "org.group.ApplicationConstants.CMD_GREET";

%>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="stylesheet" href="bootstrap/bootstrap-3.1.1-dist/css/bootstrap.min.css">
	<link rel="stylesheet" href="bootstrap/bootstrap-3.1.1-dist/css/bootstrap-theme.min.css">

    <title></title>
    <!-- refer to OpenDolphin, see also http://open-dolphin.org/dolphin_website/Download.html -->
    <script data-main="js/dolphin/" src="libs/require.js"></script>

    
    <script>
        require([ 'opendolphin' ], function (dol) {
            var dolphin = dol.dolphin("<%=application.getContextPath()%>/dolphin/", true);

            var att_name = dolphin.attribute("<%=ATT_NAME%>", undefined, "");
            var att_greeting = dolphin.attribute("<%=ATT_GREETING%>", undefined, "");

            var pm = dolphin.presentationModel("<%=PM_APP%>", undefined, att_name, att_greeting);


            // Get hold to widgets:
            var nameTextField = document.getElementById("nameTextField");
            var greetingLabel = document.getElementById("greetingLabel");
            var greetButton = document.getElementById("greetButton");
			console.log("3");


            // Bindings:
            // nameTextField -> att_name
            nameTextField.addEventListener("input", function () {
				console.log("name: ", nameTextField.value);
                att_name.setValue(nameTextField.value);
            });

            // att_greeting -> greetingLabel
            att_greeting.onValueChange(function (event) {
				console.log("greeting changed");
                greetingLabel.innerHTML = event.newValue;
            });

			att_name.onValueChange(function (event) {
				if (event.newValue !== undefined) {
					console.log("name changed to: ", event.newValue);
					nameTextField.value = event.newValue;
				}
			});


            greetButton.onclick = function () {
                dolphin.send("<%=CMD_GREET%>");
            };

			// Initial Data:
			att_name.setValue('Duke')

        });
    </script>


</head>
<body>
<p></p>
<div class="container" role="main">


<input id="nameTextField" type="text" value="">
<button id="greetButton" class="btn btn-primary">Greet</button>
<h1><span id="greetingLabel" class="label label-primary label-success">unchanged</span></h1>

</div>

</body>
</html>
