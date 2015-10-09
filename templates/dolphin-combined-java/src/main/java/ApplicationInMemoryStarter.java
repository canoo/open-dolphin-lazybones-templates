package ${PKG};

public class ApplicationInMemoryStarter {

    public static void main(String[] args) throws Exception {
		Application.clientDolphin = new LocalDolphinProducer().get();
        javafx.application.Application.launch(${PKG}.Application.class);
    }

}
