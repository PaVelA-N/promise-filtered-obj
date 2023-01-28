import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

//------------------------ Промисы --------------------------------------------------------------------------
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
    Answer = Math.round(getRandomInRange(0,11))>5 ? true : false
    AnswerDelay = getRandomInRange(500,1000)
    setTimeout(() => {
      // console.log('926 ) рандомный Answer в промисе. пока не используется ', Answer)  
      resolve(Answer)
    }, AnswerDelay );
    // reject('error'); 
  });
  return backEndAnswer
}
function filterObject(obj){
  let filteredShallowObject={}
  let filterOn=false;
    Object.entries(obj).forEach(([key, value]) => {
      // if (key ==='filter') {console.log('883) key ', key,'value', value)        }
      if ((key ==='filter') && (value === true)) {
        filterOn=true
      } else {
        if ((typeof(value) !='object')||(value ===null)) {
          filteredShallowObject[key] = value
        } else {
          filteredShallowObject[key] = filterObject(value)
        }
      }
    });

    if ( filterOn===true) {filteredShallowObject = 'цензура'}
  return filteredShallowObject
}
//++++++++++++++++++
function test1(objFilterOff, nameOfObject){
    let objFilterOn={}
    let keysNameArray = Object.keys(objFilterOff)
      if (keysNameArray.includes('filter')) {
        objFilterOn.filter='test'
      } 
      for (const [key, value] of Object.entries(objFilterOff)) {
        if (key !=='filter') {
          if ((typeof(value)==='object')&&(value!=null)) {
            objFilterOn[key]=test1(value,key)
          } else {
            objFilterOn[key] = value
          }
        }
      }
    return objFilterOn
}

function promiseFiltration(){
// ПОСЛЕДОВАТЕЛЬНЫЙ THEN

const backEndAnswer = new Promise((resolve, reject) => {
  let Answer;  
  let AnswerDelay;
  Answer = Math.round(getRandomInRange(0,11))>0 ? true : false
  AnswerDelay = getRandomInRange(200,500)
  setTimeout(() => {
    // console.log('926 ) рандомный Answer в промисе. пока не используется ', Answer)  
    resolve(Answer)
  }, AnswerDelay );
  // reject('error'); 
});

  backEndAnswer
  .then(
    result=>{
    console.log('124) результат предыдущего: ', result)
    let settedFiltersObject=initialObject;
    if (typeof(settedFiltersObject["Name0-0"])==='object') {
      settedFiltersObject["Name0-0"].filter=result+'_test'
    }
    return (settedFiltersObject)
    },
    error => {
      alert("132) Rejected: " + error); 
      return error 
    }
  )
  .then(
    result=>{
    let settedFiltersObject=initialObject;
    if (typeof(settedFiltersObject["Name0-1"])==='object') {
      settedFiltersObject["Name0-1"].filter=true
    }
    return (settedFiltersObject)
    }
  )  
  .then(
    result=>{
      console.log('137) результат предыдущего: ', result)
      let filteredObject =filterObject(result)
      return (console.log('155) отфильтрованный обьект', filteredObject))
    }
  )
  .catch(function (err) {
    console.log('159) ',err)
  })
  .finally(function () {
    console.log('162) The end. finally')
  })
}
function promiseFiltration2(initialObject, objName){
  return new Promise((resolve, reject) => {
    setTimeout(() => {    resolve('Answer')  }, 500 );
  })
  .then(
    result=>{
    console.log('155) результат предыдущего: ', result)
    }
  )
  .catch(error => {
    alert(error); // Error: Not Found
  });
  // .then(
  //   result=>{
  //     let filteredObject =filterObject(result)
  //     return (console.log('155) отфильтрованный обьект', filteredObject))
  //   }
  // )
}

let testAnswer = promiseFiltration()


let initialObject=createRandomObj(3, 0, 2)
console.log('1-164) начальный обьект: ', initialObject)
let settedFiltersObject = test1(initialObject, 'initialObjectID')
console.log('2-166) вывод с включенным фильтром ', settedFiltersObject)
let filteredObject =filterObject(settedFiltersObject)
console.log('3-168) отфильтровано ', filteredObject)

let testAnswer2 = promiseFiltration2(initialObject, 'Name=initialObject')
testAnswer2
.then(console.log('6-176) отфильтровано testAnswer2: ', testAnswer2))
