package ${PKG};

import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.Pane;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.stage.Stage;
import org.opendolphin.binding.JFXBinder;
import org.opendolphin.core.PresentationModel;
import org.opendolphin.core.client.ClientAttribute;
import org.opendolphin.core.client.ClientDolphin;
import org.opendolphin.core.client.ClientPresentationModel;
import org.opendolphin.core.client.comm.OnFinishedHandlerAdapter;

import static ${PKG}.ApplicationConstants.*;

import java.util.List;

public class Application extends javafx.application.Application {
    static ClientDolphin clientDolphin;

    private Button button;
    private TextField nameTextField;
    private Label greetingLabel;

    @Override
    public void start(Stage stage) throws Exception {

        stage.setTitle("Application Title");

        Pane root = setupStage();

        addClientSideAction();
        initializePMs();

        Scene scene = new Scene(root, 300, 300);
        scene.setFill(Color.GREEN);
        stage.setScene(scene);
        stage.setTitle(getClass().getName());
        stage.show();
    }

    private Pane setupStage() {
        Pane pane = new Pane();
        VBox vBox = new VBox(10);
        vBox.setPadding(new Insets(10));
        vBox.setSpacing(10);
        button = new Button();
        nameTextField = new TextField();
        greetingLabel = new Label("");
        greetingLabel.setTextFill(Color.WHITE);
        greetingLabel.setFont(Font.font ("Verdana", 20));

        pane.getChildren().addAll(vBox);
        vBox.getChildren().addAll(nameTextField);
        vBox.getChildren().addAll(button);
        vBox.getChildren().addAll(greetingLabel);
        button.setText("Greet");
        return pane;
    }

    private void initializePMs() {
		clientDolphin.send(COMMAND_INIT, new OnFinishedHandlerAdapter() {
    		@Override
    		public void onFinished(List<ClientPresentationModel> presentationModels) {
    			setupBinding();
    		}
    	});
    }

    private void setupBinding() {

        PresentationModel pm = clientDolphin.getAt(PM_APP);

        JFXBinder.bind(ATT_NAME).of(pm).to("text").of(nameTextField);
        JFXBinder.bind("text").of(nameTextField).to(ATT_NAME).of(pm);

        JFXBinder.bind(ATT_GREETING).of(pm).to("text").of(greetingLabel);

        clientDolphin.getAt(PM_APP).getAt(ATT_NAME).setValue("Duke");
    }

    private void addClientSideAction() {
        button.setOnAction(new EventHandler<ActionEvent>() {
            @Override
            public void handle(ActionEvent actionEvent) {
                clientDolphin.send(COMMAND_GREET);
            }
        });
    }
}
