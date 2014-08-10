lazybones generate dolphin-shared-groovy -PmoduleName=shared
lazybones generate dolphin-client-javafx-groovy -PmoduleName=client
lazybones --logLevel=FINE generate -PmoduleName=server dolphin-server-groovy
lazybones generate dolphin-server-webapp -PmoduleName=webapp
lazybones generate dolphin-combined-groovy -PmoduleName=combined



