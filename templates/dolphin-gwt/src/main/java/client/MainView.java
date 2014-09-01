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

		VerticalPanel verticalPanel = new VerticalPanel();
		HorizontalPanel horizontalPanel = new HorizontalPanel();
		verticalPanel.add(horizontalPanel);
		verticalPanel.add(greetingLabel);
		horizontalPanel.add(nameTextBox);
		horizontalPanel.add(greetButton);

		RootPanel.get("gwtContainer").add(verticalPanel);

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