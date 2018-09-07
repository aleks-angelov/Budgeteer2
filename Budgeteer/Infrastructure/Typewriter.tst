${
    using System.Text.RegularExpressions;

    string Cleanup(string typeName, bool? removeArrays = true)
    {
	    if (removeArrays.HasValue && removeArrays.Value) { typeName = typeName.Replace("[]", ""); }
	    return typeName.Replace("Model", "").Replace("Enum", "");
    }

    string ToKebabCase(string typeName)
    {
	    return Regex.Replace(typeName, "(?<!^)([A-Z][a-z]|(?<=[a-z])[A-Z])", "-$1", RegexOptions.Compiled).Trim().ToLower();
    }

    string ClassImports(Class c) => (c.BaseClass != null ? $"import {{ {Cleanup(c.BaseClass.Name)} }} from './{ToKebabCase(Cleanup(c.BaseClass.Name))}';\r\n" : "") +
									    c.Properties
										    .Where(p => !p.Type.IsPrimitive || p.Type.IsEnum)
										    .Select(p => $"import {{ {Cleanup(p.Type.Name)} }} from './{ToKebabCase(Cleanup(p.Type.Name))}';")
										    .Aggregate("", (all, import) => $"{all}{import}\r\n")
										    .TrimStart();
	
    string ClassModifiers(Class c) => c.IsAbstract ? " abstract" : "";

    string ClassName(Class c) => c.Name.Replace("Model", "") + (c.BaseClass != null ? $" extends {Cleanup(c.BaseClass.Name)}" : "");

    string ClassProperties(Class c) => c.Properties
										    .Select(p => $"\t{p.name}{(p.Type.IsNullable ? "?" : "")}: {Cleanup(p.Type.Name, false)};")
										    .Aggregate("", (all, prop) => $"{all}{prop}\r\n")
										    .TrimEnd();

    string EnumName(Enum e) => e.Name.Replace("Enum", "");

    string EnumValues(Enum e) => e.Values
								    .Select(v => $"\t{v.Name} = {v.Value}")
								    .Aggregate("", (all, val) => $"{all}{val},\r\n")
								    .TrimEnd();

    Template(Settings settings)
    {
	    string outputDirectory = @"../ClientApp/src/app/infrastructure/models";


	    settings.OutputFilenameFactory = (file) => {
		    if (file.Classes.Count > 0)
		    {
			    Class c = file.Classes.First();
			    string className = ToKebabCase(Cleanup(c.Name));
			    return $"{outputDirectory}/{className}.ts";
		    }

		    if (file.Enums.Count > 0)
		    {
			    Enum e = file.Enums.First();
			    string enumName = ToKebabCase(Cleanup(e.Name));
			    return $"{outputDirectory}/{enumName}.ts";
		    }

		    return file.Name;
	    };
    }
}
$Classes(*Model)[$ClassImports
export$ClassModifiers class $ClassName {
$ClassProperties
}]$Enums(*Enum)[
export enum $EnumName {
$EnumValues
}]
