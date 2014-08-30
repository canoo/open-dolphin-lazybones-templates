package ${PKG}

import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.collections.ObservableList
import javafx.collections.FXCollections
import org.opendolphin.core.client.ClientDolphin
import org.opendolphin.core.client.ClientPresentationModel
import org.opendolphin.core.client.ClientAttribute
import static org.opendolphin.binding.JFXBinder.bind
import static ${PKG}.ApplicationConstants.*

import static groovyx.javafx.GroovyFX.start

class MainView {
	static show(ClientDolphin clientDolphin) {

		start { app ->

			def nameTextField
			def btn
			def greetingLabel

			def sgb = delegate

			stage title:'Application Title', {
				scene(fill: GREEN, width: 300, height: 300) {
					vbox(padding: 10) {
						nameTextField = textField()
						btn = button(text: 'Greet')
						greetingLabel = label(text: '', font: '20pt verdana', textFill: WHITE)
					}
				}
			}

			def pm = clientDolphin.presentationModel(PM_APP, new ClientAttribute(ATT_NAME, null), new ClientAttribute(ATT_GREETING, null));

			bind ATT_NAME of pm to 'text' of nameTextField
			bind 'text' of nameTextField to ATT_NAME of pm
			bind ATT_GREETING of pm to 'text' of greetingLabel

			pm.getAt(ATT_NAME).value = "Duke";


			btn.setOnAction(new EventHandler<ActionEvent>() {
	            @Override
	            public void handle(ActionEvent actionEvent) {
	                clientDolphin.send(COMMAND_GREET);
	            }
	        });

			primaryStage.show()
		}
	}
}
