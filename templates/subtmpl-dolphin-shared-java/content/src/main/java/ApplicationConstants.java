package ${pkg};

/**
 * Place for shared information among client and server. Typically identifiers for models, attributes and actions.
 */
public class ApplicationConstants {

    public static final String PM_APP = unique("APP");
    public static final String ATT_NAME = "ATT_NAME";
    public static final String ATT_GREETING = "ATT_GREETING";

	public static final String COMMAND_GREET = unique("CMD_GREET");


    /**
     * Unify the identifier with the class name prefix.
     */
    private static String unique(String key) {
        return ApplicationConstants.class.getName() + "." + key;
    }

}
