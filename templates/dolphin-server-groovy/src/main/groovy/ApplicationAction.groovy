package ${PKG};

import org.opendolphin.core.server.DTO
import org.opendolphin.core.server.Slot
import org.opendolphin.core.server.action.DolphinServerAction
import org.opendolphin.core.server.comm.ActionRegistry

import static ${PKG}.ApplicationConstants.*

public class ApplicationAction extends DolphinServerAction {


    public void registerIn(ActionRegistry actionRegistry) {

        actionRegistry.register(COMMAND_INIT) { cmd, response ->
            // Create PM:
            DTO dto = new DTO( new Slot(ATT_NAME, null), new Slot(ATT_GREETING, null) );
            serverDolphin.presentationModel PM_APP, null, dto

            // Init PM:
            serverDolphin[PM_APP][ATT_NAME].value = 'Duke'
        }

        actionRegistry.register(COMMAND_GREET) { cmd, response ->
            println 'Server reached.'
            serverDolphin[PM_APP][ATT_GREETING].value = "Hey \${serverDolphin[PM_APP][ATT_NAME].value} !"
        }

    }
}
