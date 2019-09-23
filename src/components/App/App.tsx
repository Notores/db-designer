/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Fragment, useState} from 'react';
import './App.scss';
import {DbTable} from "../index";
import {SteppedLine} from "../SteppedLine/SteppedLine";
// @ts-ignore
import {EntypoExport, EntypoTextDocument} from 'react-entypo';
import {Generate} from "../Generate/Generate";
import {moveTable, addTable} from "../../store/project/actions";
import {useDispatch, useSelector} from 'react-redux';
import {ApplicationState} from "../../store"
import Draggable from "react-draggable";
import {Button, DraggableButton} from "../Button/Button";


const App: React.FC = () => {
  const [showGenerate, setShowGenerate] = useState<Boolean>(false);
  const tables = useSelector((state : ApplicationState) => state.project.data/*, (left, right) => {
    const equality = JSON.stringify(left) === JSON.stringify(right);
    console.log(equality, left, right)
    return equality;
  }*/);
  console.log(tables);
  const dispatch = useDispatch();
  return (
    <div className="App">
        {tables.map((table, idx) => (
            <Fragment key={idx}>
                <DbTable table={table} key={idx} onMove={(pos) => {
                  dispatch(moveTable(table, pos))
                }}/>
                {
                  table.columns.map((col, index) => {
                    if (col.reference ) {
                      const refIndex = tables.findIndex(t => {
                        // @ts-ignore
                        return t.name === col.reference.table.name;
                      });
                      return <SteppedLine key={index} orientation="v"
                                        pos0={tables[idx].position}
                                        pos1={tables[refIndex].position}
                                        borderWidth={3} />
                    }
                    return null;
                  })
                }
            </Fragment>
        ))}
        <div className="actions">
            <Button onClick={() => setShowGenerate(true)}>
                <EntypoExport />
            </Button>
            <DraggableButton onStop={(ev, data) => {
                dispatch(addTable({x: data.x, y: data.y}))
            }} resetOnStop={true}>
                <EntypoTextDocument />
            </DraggableButton>
        </div>
      {
        showGenerate ?
            <Generate tables={tables} onClose={() => setShowGenerate(false)} /> : null
      }
    </div>
  );
};

export default App;
