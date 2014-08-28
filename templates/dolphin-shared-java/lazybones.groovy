import uk.co.cacoethes.util.NameType
import org.apache.commons.io.FileUtils
import org.apache.commons.io.FilenameUtils

import static org.apache.commons.io.FilenameUtils.concat

Map props = [:]
File projectDir = projectDir instanceof File ? projectDir : new File(String.valueOf(projectDir))
String projectDirName = ('.' == projectDir.name) ? new File(projectDir.canonicalPath).name : projectDir.name

def params = [:]
props.ARG_PROJECT_DIR_NAME = projectDir.name
props.PROJECT_DIR_NAME = projectDirName
props.PROJECT_NAME = transformText(projectDir.name, from: NameType.HYPHENATED, to: NameType.PROPERTY)

props.GROUP = ask2('group', 'org.group')
props.VERSION = ask2('version', '0.1.0-SNAPSHOT')
props.PKG = ask2('packageName', props.GROUP)


props.PROJECT_CAPITALIZED_NAME = props.PROJECT_NAME.capitalize()

// use '**/...' syntax because with current lazybones version (0.7.1) the antpath match fails without it:
processTemplates '**/README.adoc', props
processTemplates '**/build.gradle', props
processTemplates '**/gradle.properties', props
processTemplates("src/**/*", props)

// Copy 'src' folder:
File targetDir = new File(projectDirName, 'src/main/java')
String packagePath = props.PKG.replace('.' as char, '/' as char)
File targetPath = new File(targetDir, packagePath)
targetPath.mkdirs()

File sourcesDir = new File(templateDir, 'src/main/java')
sourcesDir.eachFile { File file ->
	println file.name
   file.renameTo("${targetPath.absolutePath}/${file.name}")
}

def ask2(key, proposal) {
	ask("Define value for '$key' [$proposal]: ", proposal, key)
}
