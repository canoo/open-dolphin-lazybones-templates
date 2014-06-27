import uk.co.cacoethes.util.NameType
import java.nio.file.Path
import java.nio.file.Paths
import java.nio.file.Files

Map props = [:]
File projectDir = projectDir instanceof File ? projectDir : new File(String.valueOf(projectDir))
props.project_name = transformText(projectDir.name, from: NameType.HYPHENATED, to: NameType.PROPERTY)

props.project_group = ask2('group', 'org.group')
props.project_version = ask2('version', '0.1.0-SNAPSHOT')
props.project_package_name = ask2('packageName', props.project_group)

String packagePath = props.project_package_name.replace('.' as char, '/' as char)

props.project_capitalized_name = props.project_name.capitalize()

processTemplates 'build.gradle', props
processTemplates 'gradle.properties', props
processTemplates 'settings.gradle', props

List<String> modules = ['client', 'server', 'shared', 'combined']

modules.each { module ->

	
	if (new File(projectDir, "$module/build.gradle").exists() ) {
		processTemplates "$module/build.gradle", props
	}

	List<String> srcMainEntries = [ "$module/src/main/java", "$module/src/main/groovy" ]

	srcMainEntries.each { String relPath ->
		processTemplates "${relPath}/**/*", props

		File sme = new File(projectDir, relPath)

		File oldFolder = sme
		File newFolder = new File(oldFolder, packagePath)

		oldFolder.eachFile { File file ->
			if (! newFolder.exists() ) newFolder.mkdirs()
			Files.move(file.toPath(), Paths.get(newFolder.absolutePath, file.name) )
		}

	}
}

processTemplates 'server-app/src/main/**/*', props

def ask2(key, proposal) {
	ask("Define value for '$key' [$proposal]: ", proposal, key)
}
