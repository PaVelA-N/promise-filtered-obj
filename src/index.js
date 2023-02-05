import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
  </React.StrictMode>
);
// ----------- БЛОК базовых проверенных функций -----------    
function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}
function createRandomObj(length, currentDepth, depth){
  let obj={};
  let randomPrimitiveValueSelector;
  let keyName;

  if (currentDepth !== 0) {obj.filter=false}

  for (let i=0; i <length; i++){
    keyName ='Name'+(currentDepth) +'-'+i
    randomPrimitiveValueSelector=getRandomInRange(0, 10) >9 ? true : false
    if (randomPrimitiveValueSelector) {
      obj[keyName]='prmtv_'+Math.round(getRandomInRange(0, 10))
    } else {
      if (currentDepth !==depth) {obj[keyName]=createRandomObj(length, currentDepth+1, depth)
      }else {
        obj[keyName]='prmtv_'+Math.round(getRandomInRange(0, 10))
      }
    }
  }
  return obj;
}
function backEndAnswer(key){
  const backEndAnswer = new Promise((resolve, reject) => {
    let Answer;  
    let AnswerDelay;
    Answer = Math.round(getRandomInRange(0,10))>5 ? true : false
    AnswerDelay = getRandomInRange(100,200)
    setTimeout(() => {
      resolve(Answer);
    }, AnswerDelay );
    // reject('error'); 
  });
  return backEndAnswer
}
// -----------   БЛОК параметры первичного обьекта ----------- 
/* ширина объекта*/ let width =3  
/* глубина */  let depth=2
// ----------- БЛОК тестирования функций -----------   
let initialObject4=createRandomObj(width, 0, depth)
console.log('61-1) Начальный обьект 3: ', initialObject4)
let requestArray4=[]
let nameArray=[]
let arrayNextElementID4

function test4_setPromiseFilterInRecursion_tasksMinimisation(objFilterOff, ObjName) {
  let objFilterOn={}
  // console.log('2- 68) : objFilterOff', objFilterOff)
  for (const [key, value] of Object.entries(objFilterOff)) {
    if ((typeof(value)==='object')&&(value!=null)) {
      // console.log('3- 71) : key', key, value)
      arrayNextElementID4=requestArray4.length
      nameArray[arrayNextElementID4]=ObjName+'-'+key
      requestArray4[arrayNextElementID4] = backEndAnswer()
      requestArray4[arrayNextElementID4]
      .then(res=>{
        // objFilterOn[key]={filter:res}
        // // console.log('4- 78) : key', key, value, res)
        if (res===true) {
          objFilterOn[key]='цунзура'
        } else {
          objFilterOn[key]=test4_setPromiseFilterInRecursion_tasksMinimisation(value,key)
        }
      })
      .then(res=>{

        return (objFilterOn)      
      })
    } else {
      objFilterOn[key]=value
    }
  }
  return (objFilterOn)
}

let filteredObject4 = test4_setPromiseFilterInRecursion_tasksMinimisation(initialObject4, 'Name=initialObject')

Promise.all(requestArray4)
.then(res=>{
  console.log('6- 100) Отфильтровано: ', filteredObject4)
})