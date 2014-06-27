import uk.co.cacoethes.util.NameType

Map props = [:]
File projectDir = projectDir instanceof File ? projectDir : new File(String.valueOf(projectDir))
props.project_name = transformText(projectDir.name, from: NameType.HYPHENATED, to: NameType.PROPERTY)

props.project_group = ask2('group', 'org.group')
props.project_version = ask2('version', '0.1.0-SNAPSHOT')
props.project_package_name = ask2('packageName', props.project_group)

props.project_capitalized_name = props.project_name.capitalize()

processTemplates 'build.gradle', props
processTemplates 'gradle.properties', props
processTemplates 'settings.gradle', props
processTemplates 'pom.xml', props
processTemplates 'src/main/java/*.java', props

String packagePath = props.project_package_name.replace('.' as char, '/' as char)

File sources = new File(projectDir, 'src/main/java')
File resources = new File(projectDir, 'src/main/resources')

File sourcesPath = new File(sources, packagePath)
sourcesPath.mkdirs()
File resourcesPath = new File(resources, packagePath)
resourcesPath.mkdirs()

sources.eachFile { File file ->
	println "--> ${file.name} "
   file.renameTo(sourcesPath.absolutePath + '/' + file.name)
}


def ask2(key, proposal) {
	ask("Define value for '$key' [$proposal]: ", proposal, key)
}