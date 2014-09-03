import uk.co.cacoethes.util.NameType
import org.apache.commons.io.FileUtils
import org.apache.commons.io.FilenameUtils

import static org.apache.commons.io.FilenameUtils.concat

Map props = readInputForRootTemplate()
props.'_<%' = "%>"
props.'_%>' = "%>"
props.'_<%=' = "<%="

// use '**/...' syntax because with current lazybones version (0.7.1) the antpath match fails without it:
processRootTemplate(props, props.PROJECT_DIR_NAME,
	['**/README.adoc', '**/build.gradle', '**/gradle.properties', 'src/main/webapp/WEB-INF/web.xml', 'src/main/webapp/**/*.jsp']
)

Map readInputForRootTemplate() {
	Map props = [:]
	File projectDir = projectDir instanceof File ? projectDir : new File(String.valueOf(projectDir))
	String projectDirName = ('.' == projectDir.name) ? new File(projectDir.canonicalPath).name : projectDir.name

	props.ARG_PROJECT_DIR_NAME = projectDir.name
	props.PROJECT_DIR_NAME = projectDirName
	props.PROJECT_NAME = transformText(projectDir.name, from: NameType.HYPHENATED, to: NameType.PROPERTY)

	props.GROUP = ask2('group', 'org.group')
	props.VERSION = ask2('version', '0.1.0-SNAPSHOT')
	props.PKG = ask2('packageName', props.GROUP)

	props.PROJECT_CAPITALIZED_NAME = props.PROJECT_NAME.capitalize()

	return props
}

def processRootTemplate(def props, String projectDirName, List<String> filenamePatterns) {

	filenamePatterns.each { processTemplates it, props }

}

def ask2(key, proposal) {
	ask("Define value for '$key' [$proposal]: ", proposal, key)
}

