/* eslint-disable no-loop-func */
import {DbTable} from "../../types";

interface ProcessedTable extends DbTable {
    processed: boolean
}

export const tablesToCode = (tables: Array<DbTable>, type: "MySQL" | "MSSQL" | "Mongoose") => {
    const tablesProcess: Array<ProcessedTable> = tables.map(table => ({...table, processed: false}));
    switch (type) {
        case "MySQL":
            return tablesToMySQL(tablesProcess);
        case "MSSQL":
            return tablesToMSSQL(tablesProcess);
        case "Mongoose":
            return tablesToMongoose(tablesProcess);
        default:
            return "";
    }
}

function tablesToMySQL(tables: Array<ProcessedTable>): string {
    let output = "";
    while (tables.filter(table => !table.processed).length > 0) {
        tables.forEach(table => {
            if (table.processed)
                return;
            if (table.columns.filter(col => col.reference).length === 0 ||
                table.columns.filter(col => col.reference && tables.find(t => col.reference && t.name === col.reference.table.name && t.processed)).length > 0) {
                const rows: Array<string> = [];
                table.columns.forEach(col => {
                    rows.push(`  \`${col.name}\` ${col.type.toMySQL()} ${col.required ? 'NOT NULL' : 'NULL'}${col.auto ? ' AUTO_INCREMENT' : ''}`);
                });
                rows.push(`  PRIMARY KEY(${table.columns.filter(col => `\`${col.primary}\``).map(col => col.name).join(', ')})`);
                table.columns.forEach(col => {
                    if (col.reference)
                        rows.push(`  FOREIGN KEY \`${col.name}\` REFERENCES ${col.reference ? `\`${col.reference.table.name}\`(\`${col.reference.col.name}\`)` : ''}`);
                });
                output += `CREATE TABLE \`${table.name}\`{\n`;
                output += rows.join(`,\n`);
                output += `\n};\n\n`;
                table.processed = true;
            }
        });
    }
    return output;
}

function tablesToMSSQL(tables: Array<ProcessedTable>): string {
    let output = "";
    while (tables.filter(table => !table.processed).length > 0) {
        tables.forEach(table => {
            if (table.processed)
                return;
            if (table.columns.filter(col => col.reference).length === 0 ||
                table.columns.filter(col => col.reference && tables.find(t => col.reference && t.name === col.reference.table.name && t.processed)).length > 0) {
                const rows: Array<string> = [];
                table.columns.forEach(col => {
                    rows.push(`  [${col.name}] ${col.type.toMSSQL()} ${col.required ? 'NOT NULL' : 'NULL'}${col.auto ? ' IDENTITY(1,1)' : ''}`);
                });
                rows.push(`  CONSTRAINT pk_${table.name} PRIMARY KEY(${table.columns.filter(col => col.primary).map(col => `[${col.name}]`).join(', ')})`);
                table.columns.forEach(col => {
                    if (col.reference)
                        rows.push(`  CONSTRAINT fk_${table.name}_${col.name} FOREIGN KEY [${col.name}] REFERENCES ${col.reference ? `[${col.reference.table.name}]([${col.reference.col.name}])` : ''}`);
                });
                output += `CREATE TABLE [${table.name}]{\n`;
                output += rows.join(`,\n`);
                output += `\n};\n\n`;
                table.processed = true;
            }
        });
    }
    return output;
}

function tablesToMongoose(tables: Array<ProcessedTable>): string {
    let output = '';

    while (tables.filter(table => !table.processed).length > 0) {
        tables.forEach(table => {
            if (table.processed)
                return;
            if (
                table.columns.filter(col => col.reference).length === 0
                || table.columns.filter(col => col.reference && tables.find(t => col.reference && t.name === col.reference.table.name && t.processed)).length > 0
            ) {
                const rows: Array<string> = [];
                table.columns.forEach(col => {
                    const columnOptions: any = {};
                    columnOptions.type = col.type.toMongoose();
                    columnOptions.required = !!col.required;
                    // columnOptions.auto;
                    rows.push(`  ${col.name}: {type: ${col.reference ? 'Schema.Types.ObjectId' : col.type.toMongoose()}, ${col.reference ? `ref: '${col.reference.table.name}', ` : ''}${col.required ? 'required: true, ' : 'required: false, '}}, ${col.auto || col.name.toLowerCase() === 'id' ? '// MongoDB doesn\'t accept other a different id than it\'s own "_id" with type "ObjectId"' : ''}`);
                });

                output += `const ${table.name} = new Schema({\n`;
                output += rows.join(`\n`);
                output += `\n});\n\n`;
                table.processed = true;
            }
        });
    }

    tables.forEach(table => {
        output += `mongoose.model('${table.name}', ${table.name});\n`;
    });

    return output;
}

