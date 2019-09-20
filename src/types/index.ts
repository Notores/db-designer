import React from "react";

function staticImplements<T>() {
    return <U extends T>(constructor: U) => constructor;
}

export interface DbTable {
    ref?: React.RefObject<HTMLDivElement>;
    name: string,
    columns: Array<DbCol>,
}
export interface DbCol {
    name: string,
    type: DbColType,
    primary?: boolean,
    auto?: boolean,
    required?: boolean,
    reference?: {table: DbTable, col: DbCol},
}
export interface DbColType {
    toString: () => string,
    toMySQL: () => string,
    toMSSQL: () => string,
    toMongoose: () => string,
}
@staticImplements<DbColType>()
export class String {
    static toString(){
        return 'string';
    }

    static toMySQL(){
        return "varchar(8000)";
    }

    static toMSSQL(){
        return "varchar(8000)";
    }

    static toMongoose(){
        return "String";
    }
}
@staticImplements<DbColType>()
export class Integer  {
    static toString(){
        return 'string';
    }

    static toMySQL(){
        return "varchar(8000)";
    }

    static toMSSQL(){
        return "varchar(8000)";
    }

    static toMongoose(){
        return "Number";
    }
}
@staticImplements<DbColType>()
export class Float  {
    static toString(){
        return 'string';
    }

    static toMySQL(){
        return "varchar(8000)";
    }

    static toMSSQL(){
        return "varchar(8000)";
    }

    static toMongoose(){
        return "Number";
    }
}
@staticImplements<DbColType>()
export class Date  {
    static toString(){
        return 'string';
    }

    static toMySQL(){
        return "varchar(8000)";
    }

    static toMSSQL(){
        return "varchar(8000)";
    }

    static toMongoose(){
        return "Date";
    }
}

