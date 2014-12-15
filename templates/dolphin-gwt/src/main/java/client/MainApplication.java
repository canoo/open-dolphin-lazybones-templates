package ${PKG}.client;

import com.canoo.opendolphin.client.gwt.*;
import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.core.client.GWT;
import java.util.List;

import static ${PKG}.client.ApplicationConstants.*;

/**
 * Entry point classes define <code>onModuleLoad()</code>
 */
public class MainApplication implements EntryPoint {


    public static final String DOLPHIN_URL = GWT.getHostPageBaseURL() + "dolphin/";

	/**
	 * This is the entry point method.
	 */
	public void onModuleLoad() {
		initialize();
	}

	public void initialize() {
		// 1: Bootstrap Dolphin:
        final ClientDolphin clientDolphin = OpenDolphin.dolphin(DOLPHIN_URL, true, 0);

		// 2: Initialize View:
        final MainView view = new MainView().initialize();

        // 3: Initialize PMs:
		clientDolphin.send(COMMAND_INIT, new OnFinishedHandler() {
			public void handlePresentationModels(List<ClientPresentationModel> list) {
				new Binder().bind(view, clientDolphin);
			}
		});

	}
}
