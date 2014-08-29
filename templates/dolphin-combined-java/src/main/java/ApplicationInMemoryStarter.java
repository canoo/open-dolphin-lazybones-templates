package ${PKG};

import org.opendolphin.core.client.comm.JavaFXUiThreadHandler;
import org.opendolphin.core.comm.DefaultInMemoryConfig;

public class ApplicationInMemoryStarter {
    public static void main(String[] args) throws Exception {
        DefaultInMemoryConfig config = new DefaultInMemoryConfig();
        config.getServerDolphin().registerDefaultActions();
        config.getClientDolphin().getClientConnector().setUiThreadHandler(new JavaFXUiThreadHandler());
        registerApplicationActions(config);
        ${PKG}.Application.clientDolphin = config.getClientDolphin();
        javafx.application.Application.launch(${PKG}.Application.class);
    }

    private static void registerApplicationActions(DefaultInMemoryConfig config) {
        config.getServerDolphin().register(new ApplicationDirector());
    }

}
