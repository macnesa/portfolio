// server/scripts/generateTypes.ts
import fs from "fs";
import path from "path";
import * as ts from "typescript";

import { zodToTs } from "zod-to-ts";
import { Response } from "../schemas/shared/response.schema";

async function main() {
  const schemasDir = path.resolve(__dirname, "../schemas/spotify");
  const outputDir = path.resolve(__dirname, "../../client/types");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(schemasDir).filter((f) => f.endsWith(".schema.ts"));

  for (const file of files) {
    const filePath = path.join(schemasDir, file);

    // Dynamic import schema file
    const module = await import(filePath);

    // Asumsi: export schema bernama PascalCase + "Schema"
    const baseName = path.basename(file, ".schema.ts");
    const schemaName = toPascalCase(baseName) + "Schema";

    const schema = module[schemaName];
    if (!schema) {
      console.warn(`⚠️ Schema ${schemaName} tidak ditemukan di ${file}`);
      continue;
    }

    // Generate node tipe literal dari zod schema
    const { node: typeLiteralNode } = zodToTs(Response(schema), schemaName.replace("Schema", ""));

    // Bungkus type literal jadi type alias declaration yang diexport
    const typeAliasNode = createTypeAlias(schemaName.replace("Schema", ""), typeLiteralNode as ts.TypeNode);

    // Cetak node jadi string kode TypeScript
    const output = printNode(typeAliasNode);

    const outputPath = path.join(outputDir, `${baseName}.d.ts`);
    const content = `// AUTO GENERATED DO NOT OVERRIDE \n\n${output}\n`;

    fs.writeFileSync(outputPath, content, "utf-8");
    console.log(`✅ Generated type for ${schemaName} → ${outputPath}`);
  }
}

function toPascalCase(str: string) {
  return str.replace(/(^\w|-\w)/g, (match) => match.replace(/-/, "").toUpperCase());
}

function printNode(node: ts.Node): string {
  const printer = ts.createPrinter();
  const sourceFile = ts.createSourceFile(
    "temp.ts",
    "",
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS
  );
  return printer.printNode(ts.EmitHint.Unspecified, node, sourceFile);
}

function createTypeAlias(typeName: string, typeNode: ts.TypeNode) {
  return ts.factory.createTypeAliasDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)], // modifiers
    typeName, // name
    undefined, // type parameters
    typeNode   // type
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
