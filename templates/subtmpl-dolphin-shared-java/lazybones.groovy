import org.apache.commons.io.FileUtils
import org.apache.commons.io.FilenameUtils

import static org.apache.commons.io.FilenameUtils.concat

def params = [:]
params.pkg = "${parentParams.packageName}"

params.moduleName = ask2('moduleName', 'dolphin-shared')

// Pass in parameters from the project template
params.parentGroup = parentParams.group
params.parentVersion = parentParams.version

processTemplates("content/src/main/**/*", params)
processTemplates("sven.txt", params)

def pkgPath = params.pkg.replace('.' as char, '/' as char)

//new File(projectDir, concat("src/main/java", pkgPath) ).mkdirs()
//new File(projectDir, concat("src/test/java", pkgPath) ).mkdirs()

FileUtils.moveDirectoryToDirectory(new File(templateDir, 'content/src'), new File(params.moduleName), true )

//FileUtils.moveDirectoryToDirectory(templateDir, new File("bla"), true )

def ask2(key, proposal) {
	ask("Define value for '$key' [$proposal]: ", proposal, key)
}
