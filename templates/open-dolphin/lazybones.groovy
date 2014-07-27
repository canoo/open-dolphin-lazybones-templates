import uk.co.cacoethes.util.NameType
import org.apache.commons.io.FileUtils
import org.apache.commons.io.FilenameUtils

Map props = [:]
File projectDir = projectDir instanceof File ? projectDir : new File(String.valueOf(projectDir))
props.project_dir_name = projectDir.name
props.project_name = transformText(projectDir.name, from: NameType.HYPHENATED, to: NameType.PROPERTY)

props.project_group = ask2('group', 'org.group')
props.project_version = ask2('version', '0.1.0-SNAPSHOT')
props.project_package_name = ask2('packageName', props.project_group)

String packagePath = props.project_package_name.replace('.' as char, '/' as char)

props.project_capitalized_name = props.project_name.capitalize()

processTemplates 'README.adoc', props
processTemplates 'build.gradle', props
processTemplates 'gradle.properties', props
processTemplates 'settings.gradle', props

List<String> modules = ['org-client', 'org-server', 'org-shared', 'org-combined']

modules.each { module ->

	
	if (new File(projectDir, "$module/build.gradle").exists() ) {
		processTemplates "$module/build.gradle", props
	}

	List<String> srcMainEntries = [ "$module/src/main/java", "$module/src/main/groovy" ]

	srcMainEntries.each { String relPath ->
		processTemplates "${relPath}/**/*", props

		File oldFolder = new File(projectDir, relPath)
		File newFolder = new File(oldFolder, packagePath)

		oldFolder.eachFile { File file ->
			if ( file.isDirectory() ) {
				FileUtils.moveDirectoryToDirectory(file, newFolder, true )
			}
			else {
				FileUtils.moveFileToDirectory(file, newFolder, true )
			}
		}

	}
}

processTemplates 'server-app/src/main/**/*', props

def ask2(key, proposal) {
	ask("Define value for '$key' [$proposal]: ", proposal, key)
}
