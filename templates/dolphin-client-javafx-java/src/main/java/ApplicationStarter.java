package ${PKG};

public class ApplicationStarter {

    public static void main(String[] args) {
		Application.clientDolphin = new ClientDolphinProducer().get();
		Application.launch(Application.class);
	}
}
