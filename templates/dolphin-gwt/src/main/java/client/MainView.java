package ${PKG}.client;

import com.google.gwt.user.client.ui.*;

public class MainView {

	TextBox nameTextBox;
	Label greetingLabel;
	Button greetButton;

	public MainView initialize() {
		nameTextBox = new TextBox();
		greetingLabel = new Label("");
		greetButton = new Button("Greet");

		// Assume that the host HTML has elements defined whose
		// IDs are "slot1", "slot2".  In a real app, you probably would not want
		// to hard-code IDs.  Instead, you could, for example, search for all
		// elements with a particular CSS class and replace them with widgets.
		//
		RootPanel.get("slot1").add(nameTextBox);
		RootPanel.get("slot1").add(greetingLabel);
		RootPanel.get("slot1").add(greetButton);

		return this;
	}

	public Label getGreetingLabel() {
		return greetingLabel;
	}

	public TextBox getNameTextBox() {
		return nameTextBox;
	}

	public Button getGreetButton() {
		return greetButton;
	}
}