/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Fragment, useState} from 'react';
import './App.scss';
import {DbTable} from "../index";
import {Position} from "../DbTable/DbTable";

import * as DbDesign from "../../types";
import {SteppedLine} from "../SteppedLine/SteppedLine";
// @ts-ignore
import {EntypoExport} from 'react-entypo';
import {Generate} from "../Generate/Generate";


const App: React.FC = () => {
  const [positions, setPositions] = useState<Array<Position>>([]);
  const [showGenerate, setShowGenerate] = useState<Boolean>(false);
  const tables : Array<DbDesign.DbTable> = [];
  tables.push({name: 'Entity', columns: [{name: 'id', type: DbDesign.Integer, primary: true, auto: true}, {name: 'value', type: DbDesign.String}]});
  tables.push({name: 'SubEntity', columns: [{name: 'entity', type: DbDesign.Integer, primary: true, reference: {table: tables[0], col: tables[0].columns[0]}}, {name: 'subValue', type: DbDesign.String}]})
  return (
    <div className="App">
        {tables.map((table, idx) => (
            <Fragment key={idx}>
                <DbTable table={table} key={idx} onMove={(pos) => {
                  const newPositions = [...positions];
                  newPositions[idx] = pos;
                  setPositions(newPositions);
                }}/>
                {
                  table.columns.map((col, index) => {
                    if (col.reference ) {
                      const refIndex = tables.findIndex(t => {
                        // @ts-ignore
                        return t.name === col.reference.table.name;
                      });
                      if(positions[idx] && positions[refIndex]){

                        return <SteppedLine key={index} orientation="v"
                                            pos0={positions[idx]}
                                            pos1={positions[refIndex]}
                                            borderWidth={3} />

                      }
                    }
                    return null;
                  })
                }
            </Fragment>
        ))}
        <div className="actions">
          <a className="button" title="generate" onClick={() => setShowGenerate(true)}>
            <EntypoExport />
          </a>
        </div>
      {
        showGenerate ?
            <Generate tables={tables} onClose={() => setShowGenerate(false)} /> : null
      }
    </div>
  );
};

export default App;
