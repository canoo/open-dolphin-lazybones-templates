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

	ClientDolphin clientDolphin
	def nameTextField
	def btn
	def greetingLabel

	def show() {

		start { app ->


			def sgb = delegate

			stage title:'Application Title', {
				scene(fill: GREEN, width: 300, height: 300, stylesheets: ['/app.css']) {
					vbox(padding: 10) {
						nameTextField = textField(id: 'greet_button')
						btn = button(id: 'greet_button', text: 'Greet')
						greetingLabel = label(id: 'greet_button', text: '', font: '20pt verdana', textFill: WHITE)
					}
				}
			}

			addClientSideAction()

			initializePMs()

			primaryStage.show()
		}
	}

    private void initializePMs() {

		clientDolphin.send(COMMAND_INIT) { pms ->
			setupBinding()
		}
    }

	private void setupBinding() {

		def pm = clientDolphin[PM_APP]

		bind ATT_NAME of pm to 'text' of nameTextField
		bind 'text' of nameTextField to ATT_NAME of pm
		bind ATT_GREETING of pm to 'text' of greetingLabel
	}

	 private void addClientSideAction() {

	 	btn.setOnAction {
			clientDolphin.send(COMMAND_GREET)
		}
	 }

}
