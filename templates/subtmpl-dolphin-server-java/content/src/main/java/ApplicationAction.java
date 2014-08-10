package ${PKG};

import org.opendolphin.core.comm.Command;
import org.opendolphin.core.server.action.DolphinServerAction;
import org.opendolphin.core.server.comm.ActionRegistry;
import org.opendolphin.core.server.comm.CommandHandler;

import static ${PKG}.ApplicationConstants.*; // TODO: dependency to module 'shared'

import java.util.List;

public class ApplicationAction extends DolphinServerAction{

    public void registerIn(ActionRegistry actionRegistry) {

        actionRegistry.register(ApplicationConstants.COMMAND_GREET, new CommandHandler<Command>() {
            public void handleCommand(Command command, List<Command> response) {
                System.out.println("Server reached.");
				getServerDolphin().getAt(PM_APP).getAt(ATT_GREETING).setValue("Hey " + getServerDolphin().getAt(PM_APP).getAt(ATT_NAME).getValue() + " !");
            }
        });

    }
}
