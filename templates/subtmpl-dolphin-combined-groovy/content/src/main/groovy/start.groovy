package ${PKG}

import org.opendolphin.core.client.comm.JavaFXUiThreadHandler
import org.opendolphin.core.comm.DefaultInMemoryConfig
import ${PKG}.MainRegistrarAction
import ${PKG}.MainView

def config = new DefaultInMemoryConfig()
config.clientDolphin.clientConnector.uiThreadHandler = new JavaFXUiThreadHandler()
config.serverDolphin.registerDefaultActions()

config.serverDolphin.register(new MainRegistrarAction())

MainView.show(config.clientDolphin)
