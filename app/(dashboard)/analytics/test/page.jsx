'use client';
import { DataManager, UrlAdaptor, ODataV4Adaptor  } from '@syncfusion/ej2-data';
import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';
import { registerLicense } from '@syncfusion/ej2-base';
import * as React from 'react';
import { shandleAdd, shandleUpdate, shandleDelete  } from './DataHandler';


export default function Test() {
  let grid;
  let res;
  const [d2, setD2] = React.useState({});
  const [likes, setLikes] = React.useState(0);

  const data = new DataManager({
    // adaptor: new ODataV4Adaptor,
    // url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders/?$top=7'
    adaptor: new UrlAdaptor,
    url: 'http://127.0.0.1:5231/api/Users/read'
  });

  const handleRefresh = () => {
    console.log('about to refresh');
    if (grid) {
      console.log('refreshing');
      grid.refresh();
    }
  };


async function handleAdd () {
const user = {
  "username": "rakesh6",
  "firstName": "Rakesh",
  "lastName": "Gupta6",
  "email": "rakesh6@asta.com",
  "address": ""
}  
res = shandleAdd('Users?password=1a2b3c', user);
// fetch ('http://127.0.0.1:5231/api/Users?password=1a2b3c', {
//   method: 'POST',
//   headers: {
//     "Content-Type": 'application/json'
//   },
//   body: JSON.stringify(user)
// }).then (res => res.json());
handleRefresh ();
} 

function handleDelete () {
const userdel = "rakesh6";
res = shandleDelete('Users/username', 'username=' + userdel);
// fetch ('http://127.0.0.1:5231/api/Users/username?username=' + userdel, {
//   method: 'DELETE',
//   headers: {
//     "Content-Type": 'application/json'
//   },
// }).then (res => res.json());
handleRefresh ();
} 

function handleUpdate () {
const user = {
  "username": "rakesh6",
  "firstName": "RakeshNew",
  "lastName": "GuptaNew6",
  "email": "rakeshnew6@asta.com",
  "address": ""
}  
res = shandleUpdate('Users', user);
// fetch ('http://127.0.0.1:5231/api/Users', {
//   method: 'PUT',
//   headers: {
//     "Content-Type": 'application/json'
//   },
//   body: JSON.stringify(user)
// }).then (res => res.json());
handleRefresh ();
} 

async function handleClick() {
  setLikes(likes + 1);
}


  return (
    <> 
    <GridComponent id='grid' 
    ref={(g) => (grid = g)}
    // ref={grid => this.gridInstance = grid} 
    dataSource={data} height={315}>
         <ColumnsDirective>
             <ColumnDirective field='username' width='100' textAlign="Right"/>
             <ColumnDirective field='firstName' width='100'/>
             <ColumnDirective field='lastName' width='100' textAlign="Right"/>
             <ColumnDirective field='email' width='100' format="C2" textAlign="Right"/>
             <ColumnDirective field='address' width='100'/>
         </ColumnsDirective>
    </GridComponent>
    <div><button onClick={handleAdd}>Add</button></div>
    <div><button onClick={handleUpdate}>Update</button></div>
    <div><button onClick={handleDelete}>Delete</button></div>
    <button onClick={handleClick}>Like({likes})</button>
    </>
  );
}
