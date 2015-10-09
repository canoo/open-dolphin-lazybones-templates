package ${PKG};

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.testfx.api.FxRobot;
import org.testfx.api.FxToolkit;
import org.testfx.framework.junit.ApplicationTest;

import static org.testfx.api.FxAssert.*;
import static org.testfx.matcher.base.NodeMatchers.*;

public class HelloAppTest extends FxRobot {

	public static final String ID_NAME_TEXTFIELD = "#name_textfield";
	public static final String ID_GREET_BUTTON = "#greet_button";
	public static final String ID_GREETING_LABEL = "#greeting_label";

	public HelloAppTest() {
		Application.clientDolphin = runningInCombinedMode() ? new LocalDolphinProducer().get() : new ClientDolphinProducer().get();
	}

	@Before
	public void setup() throws Exception {
		ApplicationTest.launch(Application.class);
	}

	@After
	public void cleanup() throws Exception {
		FxToolkit.cleanupStages();
	}

	@Test
	public void testButtonClick() throws Exception {

		Thread.sleep(2000);

		verifyThat(ID_NAME_TEXTFIELD, hasText("Duke"));
		verifyThat(ID_GREETING_LABEL, hasText((String) null));
		verifyThat(ID_GREET_BUTTON, hasText("Greet"));
		clickOn(ID_GREET_BUTTON);
		Thread.sleep(100);
		verifyThat(ID_GREETING_LABEL, hasText("Hey Duke !"));
	}

	public static boolean runningInCombinedMode() {
		return "combined".equals(System.getProperty("mode"));
	}

}
