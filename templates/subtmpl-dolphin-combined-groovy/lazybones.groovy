import org.apache.commons.io.FileUtils
import org.apache.commons.io.FilenameUtils

import static org.apache.commons.io.FilenameUtils.concat

def params = [:]
params.PKG = "${parentParams.packageName}"

params.moduleName = ask2('moduleName', 'javafx-client')

// Pass in parameters from the project template
params.parentGroup = parentParams.group
params.parentVersion = parentParams.version
params.GROUP = parentParams.group
params.VERSION = parentParams.version

processTemplates("content/**/*", params)

def pkgPath = params.PKG.replace('.' as char, '/' as char)

// Copy 'src' folder:
File targetDir = new File(params.moduleName, 'src/main/groovy')
File targetPath = new File(targetDir, pkgPath)
targetPath.mkdirs()

File sourcesDir = new File(templateDir, 'content/src/main/groovy')
sourcesDir.eachFile { File file ->
   file.renameTo("${targetPath.absolutePath}/${file.name}")
}

// Copy files in root folder:
['build.gradle'].each { fn ->
	FileUtils.copyFileToDirectory(new File(templateDir, 'content/' + fn), new File(params.moduleName))
}

def ask2(key, proposal) {
	ask("Define value for '$key' [$proposal]: ", proposal, key)
}

