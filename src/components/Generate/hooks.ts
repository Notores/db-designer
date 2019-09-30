import {useEffect, useState} from "react";
import {DbTable} from "../../types";
import {tablesToCode} from "./utils";
import {Md5} from "ts-md5";

interface Code {
    content: string
}

export enum CodeType {
    MySQL = 'MySQL',
    MSSQL = 'MSSQL',
    Mongoose = 'Mongoose'
}

interface CodeState {
    loaded: string | Int32Array,
    MSSQL?: Code,
    MySQL?: Code,
    Mongoose?: Code,
}

export const useGeneration = (tables : Array<DbTable>) => {
    const [code, setCode] = useState<CodeState>({loaded: ''});
    useEffect(() => {
        (async () => {
            const tablesHash = Md5.hashStr(JSON.stringify(tables));
            if(!code.loaded || code.loaded !== tablesHash){
                const newCode : CodeState = {loaded: tablesHash};
                for(let type of [CodeType.MySQL, CodeType.MSSQL, CodeType.Mongoose]) {
                    const code = tablesToCode(tables, type);
                    newCode[type] = {content: code};
                }
                setCode(newCode);
            }
        })();
    });

    return {
        code,
        loaded: !!code.loaded
    }
}
