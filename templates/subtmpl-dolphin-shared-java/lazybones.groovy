import org.apache.commons.io.FileUtils
import org.apache.commons.io.FilenameUtils

import static org.apache.commons.io.FilenameUtils.concat

def params = [:]
params.pkg = "${parentParams.packageName}"

params.moduleName = ask2('moduleName', 'shared')

// Pass in parameters from the project template
params.parentGroup = parentParams.group
params.parentVersion = parentParams.version

processTemplates("content/src/main/**/*", params)

def pkgPath = params.pkg.replace('.' as char, '/' as char)

FileUtils.moveDirectoryToDirectory(new File(templateDir, 'content/src'), new File(params.moduleName), true )

def ask2(key, proposal) {
	ask("Define value for '$key' [$proposal]: ", proposal, key)
}
