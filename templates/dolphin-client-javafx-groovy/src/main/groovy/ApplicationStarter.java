package ${PKG};

public class ApplicationStarter {

    public static void main(String[] args) {

        MainView mainView = new MainView();
        mainView.setClientDolphin(new ClientDolphinProducer().get());
        mainView.show();
    }

}
