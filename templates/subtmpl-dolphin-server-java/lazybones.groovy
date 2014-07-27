import org.apache.commons.io.FileUtils
import org.apache.commons.io.FilenameUtils

import static org.apache.commons.io.FilenameUtils.concat

def params = [:]
params.PKG = "${parentParams.packageName}"

params.moduleName = ask2('moduleName', 'server')

// Pass in parameters from the project template
params.parentGroup = parentParams.group
params.parentVersion = parentParams.version
params.GROUP = parentParams.group
params.VERSION = parentParams.version

processTemplates("content/**/*", params)

def pkgPath = params.PKG.replace('.' as char, '/' as char)

// Copy 'src' folder:
println "projectDir: $projectDir"
File targetDir = new File(params.moduleName, 'src/main/java')
File targetPath = new File(targetDir, pkgPath)
targetPath.mkdirs()

File sourcesDir = new File(templateDir, 'content/src/main/java')
sourcesDir.eachFile { File file ->
	String s = "${targetPath.absolutePath}/${file.name}"
	println "  s: ${s}"
   file.renameTo(s)
}
//FileUtils.moveDirectoryToDirectory(new File(templateDir, 'content/src/main/java'), new File(concat(params.moduleName, concat('src/main', pkgPath))), true )

// Copy files in root folder:
['build.gradle'].each { fn ->
	FileUtils.copyFileToDirectory(new File(templateDir, 'content/' + fn), new File(params.moduleName))
}

def ask2(key, proposal) {
	ask("Define value for '$key' [$proposal]: ", proposal, key)
}

