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
      obj[keyName]='prmtvData'+Math.round(getRandomInRange(0, 10))
    } else {
      if (currentDepth !==depth) {obj[keyName]=createRandomObj(length, currentDepth+1, depth)
      }else {
        obj[keyName]='prmtvData'+Math.round(getRandomInRange(0, 10))
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
function filterObject(obj){
  // console.log('59) obj =', obj)
  let filteredObject={}
    Object.entries(obj).forEach(([key, value]) => {
      // console.log('63) key =', key,'value', value)
      // if (key ==='filter') {console.log('64) key =', key,'value', value)        }
      if ((key ==='filter') && (value === true)) {
        filteredObject = 'цензура'
      } else {
        if ((typeof(value) !='object')||(value ===null)) {
          filteredObject[key] = value
        } else {
          filteredObject[key] = filterObject(value)
        }
      }
    });
  return filteredObject
}
// -----------  БЛОК тестирования функций -----------   
let requestArray=[]
let arrayNextElementID

function setPromiseFilterInRecursion2(objFilterOff, nameOfObject){
  let objFilterOn={}
  let keysNameArray = Object.keys(objFilterOff)
  if (keysNameArray.includes('filter')) {
    arrayNextElementID=requestArray.length
    requestArray[arrayNextElementID] = backEndAnswer()
    requestArray[arrayNextElementID]
    .then(res=>{
      objFilterOn.filter=res
    })
  } 
  for (const [key, value] of Object.entries(objFilterOff)) {
    if (key !=='filter') {
      if ((typeof(value)==='object')&&(value!=null)) {
        objFilterOn[key]=setPromiseFilterInRecursion2(value,key)
      } else {
        objFilterOn[key] = value
      }
    }
  }
  return (objFilterOn)
}

// -----------  БЛОК параметры первичного обьекта ----------- 
/* ширина объекта*/ let length =3  
/* глубина */  let depth=3
let initialObject=createRandomObj(length, 0, depth)
console.log('1) Начальный обьект: ', initialObject)

let settedFiltersObject = setPromiseFilterInRecursion2(initialObject, 'Name=initialObject')
Promise.all(requestArray)
.then(res=>{
  console.log('2) Установлены фильтры: ', settedFiltersObject)
  return (settedFiltersObject)
})
.then(res=>{
let filteredObject =filterObject(res)
console.log('3) Отфильтровано ', filteredObject)
})
