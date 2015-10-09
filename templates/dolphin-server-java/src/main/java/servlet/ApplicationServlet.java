package ${PKG}.servlet;

import org.opendolphin.core.server.DefaultServerDolphin;
import org.opendolphin.server.adapter.DolphinServlet;
import ${PKG}.ApplicationDirector;

/**
 * For real server mode, this servlet acts as entry point for all communication.
 */
public class ApplicationServlet extends DolphinServlet{
    @Override
    protected void registerApplicationActions(DefaultServerDolphin serverDolphin) {
        serverDolphin.register(new ApplicationDirector());
    }
}
