package ${PKG}.client;

import com.canoo.opendolphin.client.gwt.*;
import com.canoo.opendolphin.client.js.DolphinLoaderJS;
import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.core.client.GWT;

import static org.group.client.ApplicationConstants.*;

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
		DolphinLoaderJS.load(DOLPHIN_URL, new DolphinStarter() {

			@Override
			public void start(final ClientDolphin clientDolphin) {

				// 2: Initialize PMs:
				//PMContext pmContext = new PMContext().initialize(clientDolphin);
				ClientPresentationModel pm = clientDolphin.presentationModel(PM_APP,  ATT_NAME, ATT_GREETING);

				MainView view = new MainView().initialize();

				new Binder().bind(view, clientDolphin);

				clientDolphin.getAt(PM_APP).getAt(ATT_NAME).setValue("Duke");
			}
		});

	}
}
