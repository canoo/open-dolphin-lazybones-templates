import uk.co.cacoethes.util.NameType
import org.apache.commons.io.FileUtils
import org.apache.commons.io.FilenameUtils

import static org.apache.commons.io.FilenameUtils.concat

Map props = readInputForRootTemplate()

// use '**/...' syntax because with current lazybones version (0.7.1) the antpath match fails without it:
processRootTemplate(props, props.PROJECT_DIR_NAME, ['**/README.adoc', '**/build.gradle', '**/gradle.properties', 'src/**/*'])

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

	// Copy 'src' folder:
	File targetDir = new File(projectDirName, 'src/main/groovy')
	String packagePath = props.PKG.replace('.' as char, '/' as char)
	File targetPath = new File(targetDir, packagePath)
	targetPath.mkdirs()

	File sourcesDir = new File(templateDir, 'src/main/groovy')
	sourcesDir.eachFile { File file ->
	   file.renameTo("${targetPath.absolutePath}/${file.name}")
	}
}

def ask2(key, proposal) {
	boolean useDefaultValues = binding.hasVariable('dv')
	println "setting '$key'='proposal'" // todo: when lazybones 0.9 is available use log.info instead of println
	if (useDefaultValues) binding.setVariable(key, proposal)
	ask("Define value for '$key' [$proposal]: ", proposal, key)
}

