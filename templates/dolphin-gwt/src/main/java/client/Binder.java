package ${PKG}.client;

import com.canoo.opendolphin.client.gwt.*;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.event.dom.client.KeyUpEvent;
import com.google.gwt.event.dom.client.KeyUpHandler;
import com.google.gwt.event.logical.shared.ValueChangeEvent;
import com.google.gwt.event.logical.shared.ValueChangeHandler;
import com.google.gwt.user.client.ui.Label;

import static ${PKG}.client.ApplicationConstants.*;

import java.util.List;

public class Binder {
	public void bind(final MainView view, final ClientDolphin clientDolphin) {

		// TODO: find a way to register a real ValueChangedHandler (we did not find one with GWT)
		// in HTML5 you do it as follows:
		//  textInput.addEventListener("input", function () {
		//    textAttribute.setValue(textInput.value);
	    //  });
		view.getNameTextBox().addKeyUpHandler(new KeyUpHandler() {
			public void onKeyUp(final KeyUpEvent event) {
				clientDolphin.getAt(PM_APP).getAt(ATT_NAME).setValue(view.getNameTextBox().getText());
			}
		});
		clientDolphin.getAt(PM_APP).getAt(ATT_NAME).addValueChangeHandler(new AttributeChangeHandler() {
			@Override
			public void handleChange(final String oldValue, final String newValue) {
				view.getNameTextBox().setText(newValue);
			}
		});
		clientDolphin.getAt(PM_APP).getAt(ATT_GREETING).addValueChangeHandler(new AttributeChangeHandler() {
			@Override
			public void handleChange(final String oldValue, final String newValue) {
				view.getGreetingLabel().setText(newValue);
			}
		});

		view.getGreetButton().addClickHandler(new ClickHandler() {
			public void onClick(final ClickEvent event) {
				clientDolphin.send(COMMAND_GREET);
			}
		});

	}


}
