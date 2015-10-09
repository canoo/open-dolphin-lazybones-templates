package ${PKG};

import org.opendolphin.core.client.ClientDolphin;
import org.opendolphin.core.client.ClientModelStore;
import org.opendolphin.core.client.comm.ClientConnector;
import org.opendolphin.core.client.comm.HttpClientConnector;
import org.opendolphin.core.client.comm.JavaFXUiThreadHandler;
import org.opendolphin.core.comm.DefaultInMemoryConfig;
import org.opendolphin.core.comm.JsonCodec;

import java.util.function.Supplier;

public class LocalDolphinProducer implements Supplier<ClientDolphin> {

	@Override
	public ClientDolphin get() {
		DefaultInMemoryConfig config = new DefaultInMemoryConfig();
		config.getServerDolphin().registerDefaultActions();
		config.getClientDolphin().getClientConnector().setUiThreadHandler(new JavaFXUiThreadHandler());
		registerApplicationActions(config);
		return config.getClientDolphin();
	}

	private void registerApplicationActions(DefaultInMemoryConfig config) {
		config.getServerDolphin().register(new ApplicationDirector());
	}
}
