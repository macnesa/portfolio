import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import * as ts from "typescript";
import { zodToTs } from "zod-to-ts";
import { Response } from "../schemas/shared/response.schema";

const schemasRoot = path.resolve(__dirname, "../schemas"); // root folder schema
const outputDir = path.resolve(__dirname, "../../client/types"); // tempat export .d.ts

function toPascalCase(str: string): string {
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

function createTypeAlias(typeName: string, typeNode: ts.TypeNode): ts.TypeAliasDeclaration {
  return ts.factory.createTypeAliasDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    typeName,
    undefined,
    typeNode
  );
}

function getAllSchemaFiles(dir: string): string[] {
  let results: string[] = [];

  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results = results.concat(getAllSchemaFiles(filePath));
    } else if (file.endsWith(".schema.ts")) {
      results.push(filePath);
    }
  }

  return results;
}

async function main() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const schemaFiles = getAllSchemaFiles(schemasRoot);
  

  for (const filePath of schemaFiles) {
    const fileName = path.basename(filePath);
    const baseName = fileName.replace(".schema.ts", "");
    const schemaVarName = baseName + "Schema";
    const typeName = toPascalCase(baseName);

    try {
      // const module = await import(pathToFileURL(filePath).href);
      const module = await import(filePath);
      const schema = module[schemaVarName];

      if (!schema) {
        console.warn(`⚠️ Schema ${schemaVarName} tidak ditemukan di ${filePath}`);
        continue;
      }

      const { node: typeLiteralNode } = zodToTs(Response(schema), typeName);
      const typeAliasNode = createTypeAlias(typeName, typeLiteralNode as ts.TypeNode);
      const output = printNode(typeAliasNode);

      const outputPath = path.join(outputDir, `${baseName}.d.ts`);
      const content = `// AUTO GENERATED DO NOT OVERRIDE \n\n${output}\n`;

      fs.writeFileSync(outputPath, content, "utf-8");
      console.log(`✅ Generated type for ${schemaVarName} → ${outputPath}`);
    } catch (err) {
      console.error("❌ Error importing " + filePath + ":", err);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
