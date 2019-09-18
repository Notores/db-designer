import {useEffect, useState} from "react";
import {DbTable} from "../../types";
import {tablesToCode} from "./utils";

interface Code {
    content: string
}

interface CodeState {
    loaded: Boolean,
    MSSQL?: Code,
    MySQL?: Code,
    Mongoose?: Code,
}

export const useGeneration = (tables : Array<DbTable>) => {
    const [code, setCode] = useState<CodeState>({loaded: false});


    useEffect(() => {
        (async () => {
            if(!code.loaded){
                const newCode : CodeState = {loaded: true}
                for(let type of ['MySQL', 'MSSQL', 'Mongoose']) {
                    // @ts-ignore
                    const code = tablesToCode(tables, type);
                    // @ts-ignore
                    newCode[type] = {content: code};
                }
                setCode(newCode);
            }
        })();
    });

    return {
        code,
        loaded: code.loaded
    }
}
