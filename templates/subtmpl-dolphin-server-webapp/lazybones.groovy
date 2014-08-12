import org.apache.commons.io.FileUtils
import org.apache.commons.io.FilenameUtils

import static org.apache.commons.io.FilenameUtils.concat

def params = [:]
params.PKG = "${parentParams.packageName}"
params._S_EV = "<%"
params._E_EV = "%>"
params.'_<%' = "%>"
params.'_%>' = "%>"
params.'_<%=' = "<%="

params.moduleName = ask2('moduleName', 'webapp')

// Pass in parameters from the project template
params.parentGroup = parentParams.group
params.parentVersion = parentParams.version
params.GROUP = parentParams.group
params.VERSION = parentParams.version

processTemplates("content/src/main/webapp/WEB-INF/web.xml", params)
processTemplates("content/src/main/webapp/**/*.jsp", params)
processTemplates("content/build.gradle", params)

def pkgPath = params.PKG.replace('.' as char, '/' as char)

// Copy 'src' folder:
File targetDir = new File(params.moduleName, 'src/main/webapp')
File targetPath = targetDir
targetPath.mkdirs()

File sourcesDir = new File(templateDir, 'content/src/main/webapp')
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

