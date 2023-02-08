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
/* глубина */  let depth=3
// ----------- БЛОК тестирования функций -----------   
let initialObject4=createRandomObj(width, 0, depth)
console.log('61-1) Начальный обьект 3: ', initialObject4)

function test4_setPromiseFilterInRecursion_tasksMinimisation(objFilterOff, ObjName) {
  const requestArray4=[]
  for (const [key, value] of Object.entries(objFilterOff)) {
    if ((typeof(value)==='object')&&(value!=null)) {
      requestArray4.push(backEndAnswer().then(
        res => res? 'хрен вам':test4_setPromiseFilterInRecursion_tasksMinimisation(value,key)
      ))
    } else {
      requestArray4.push(value)
    }
  }

  return Promise.all(requestArray4).then(array => {
    // debugger
    const obj = {}
    let i=0
    for(const [key] of Object.entries(objFilterOff)) {
      obj[key] = array[i];
      i++
    }
    return obj
  })

}
async function x(){
let filteredObject4 = await test4_setPromiseFilterInRecursion_tasksMinimisation(initialObject4, 'initObject')
console.log(filteredObject4)
}

x()