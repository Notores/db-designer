import React from "react";

function staticImplements<T>() {
    return <U extends T>(constructor: U) => constructor;
}

export interface Position {
    x: number,
    y: number,
    width: number,
    height: number
}

export interface DbTable {
    ref?: React.RefObject<HTMLDivElement>;
    name: string,
    columns: Array<DbCol>,
}
export interface DbCol {
    name: string,
    type: ColTypeEnum,
    primary?: boolean,
    auto?: boolean,
    required?: boolean,
    reference?: {table: DbTable, col: DbCol},
}
export enum ColTypeEnum {
    Integer = 'int',
    String = 'string',
    Float = 'float',
    Date = 'date'
}
export class DbColType {
    private readonly colType: ColTypeEnum;
    constructor(type: ColTypeEnum){
        this.colType = type;
    }
    toString(){
        return this.colType;
    }
    toMySQL(){
        switch(this.colType){
            case ColTypeEnum.Integer:
                return 'int';
            case ColTypeEnum.Float:
                return 'float';
            case ColTypeEnum.Date:
                return 'datetime';
            case ColTypeEnum.String:
            default:
                return 'varchar(8000)';
        }
    }

    toMSSQL(){
        switch(this.colType){
            case ColTypeEnum.Integer:
                return 'int';
            case ColTypeEnum.Float:
                return 'float';
            case ColTypeEnum.Date:
                return 'datetime';
            case ColTypeEnum.String:
            default:
                return 'varchar(8000)';
        }
    }

    toMongoose(){
        switch(this.colType){
            case ColTypeEnum.Integer:
                return 'Number';
            case ColTypeEnum.Float:
                return 'Number';
            case ColTypeEnum.Date:
                return 'Date';
            case ColTypeEnum.String:
            default:
                return 'String';
        }
    }
}
export const Integer = new DbColType(ColTypeEnum.Integer);
export const String = new DbColType(ColTypeEnum.String);
export const Float = new DbColType(ColTypeEnum.Float);
export const Date = new DbColType(ColTypeEnum.Date);
