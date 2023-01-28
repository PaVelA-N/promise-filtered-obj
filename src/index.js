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
    Answer = Math.round(getRandomInRange(0,10))>1 ? true : false
    AnswerDelay = getRandomInRange(100,200)
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
      // if (key ==='filter') {console.log('62) key =', key,'value', value)        }
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
function deepCopy(obj1){
  let obj2 ={}
  for (const [key, value] of Object.entries(obj1)) {
      if ((typeof(value)==='object')&&(value!=null)) {
        obj2[key]=deepCopy(value)
      } else {
        obj2[key] = value
      }
    }
  return obj2
}
//++++++++++++++++++
function test1(objFilterOff, nameOfObject){
    let objFilterOn={}
    let keysNameArray = Object.keys(objFilterOff)
      if (keysNameArray.includes('filter')) {
        // objFilterOn.filter=true
        objFilterOn.filter= Math.round(getRandomInRange(0,10))>3 ? true : false
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

function promiseFiltration(obj1){
// ПОСЛЕДОВАТЕЛЬНЫЙ THEN
let obj2=deepCopy(obj1);

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
    console.log('---------------- 1й тестовый промис ----------------')
    console.log('115) результат предыдущего: ', result)
    if (typeof(obj2["Name0-0"])==='object') {
      obj2["Name0-0"].filter=result+'_test_1'
    }
    return (obj2)
    },
    error => {
      alert("132) Rejected: " + error); 
      return error 
    }
  )
  .then(
    result=>{
    if (typeof(obj2["Name0-1"])==='object') {
      obj2["Name0-1"].filter=true
    }
    return (obj2)
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

function promiseFiltration2(objFilterOff, nameOfObject){
  let objFilterOn={}
  let keysNameArray = Object.keys(objFilterOff)

  if (keysNameArray.includes('filter')) {
    objFilterOn.filter= backEndAnswer().then(res=>{objFilterOn.filter= res})
  } 
  for (const [key, value] of Object.entries(objFilterOff)) {
    if (key !=='filter') {
      if ((typeof(value)==='object')&&(value!=null)) {
        promiseFiltration2(value,key)
        .then(
          result=>{objFilterOn[key]=result}
        )
      } else {
        objFilterOn[key] = value
      }
    }
  }

  return new Promise((resolve, reject) => {
      resolve(objFilterOn)
  })
}

function filterObject2(obj){
  console.log('189) Входящий obj =', obj)
  let filteredObject={}
  let filterOn=false;
    Object.entries(obj).forEach(([key, value]) => {
      if (key ==='filter') {console.log('193) key =', key,'; value= ', value)}
      if ((key ==='filter') && (obj[key] === true)) {
        // value === true
        filterOn=true
      } else {
        if ((typeof(value) !='object')||(value ===null)) {
          console.log('199) Простое значение. key = ', key,'; value= ', value)          
          filteredObject[key] = value
        } else {
          console.log('202) Объект. key = ', key,'; value= ', value)          
          filteredObject[key] = filterObject2(value)
        }
      }
    });

    if ( filterOn===true) {filteredObject = 'цензура'}
  // return filteredObject
  return new Promise((resolve, reject) => {
    resolve(filteredObject)
})
}
/*ширина объекта*/ let length =2  
/*шлубина */  let depth=2
let initialObject=createRandomObj(length, 0, depth)
console.log('1-188) начальный обьект: ', initialObject)
let settedFiltersObject = test1(initialObject, 'initialObjectID')
console.log('2-190) вывод с включенным фильтром ', settedFiltersObject)
let filteredObject =filterObject(settedFiltersObject)
console.log('3-192) отфильтровано ', filteredObject)
console.log('---------------- Синхронная часть закончилась ----------------')

// /*- 1й тест промиса - последовательный */
let testAnswer = promiseFiltration(initialObject)

// /*- 2й тест промиса - с рекурсией */
let testAnswer2 = promiseFiltration2(initialObject, 'Name=initialObject')
testAnswer2
.then(result =>{
  console.log('---------------- 2й тест. Часть 1. установка фильтров ----------------')
  console.log('6-228) установлены фильтры: ', result)
  return result
})
.then(result =>{
  console.log('---------------- 2й тест. Часть 2. Проверка перед фильтрацией ----------------')
  console.log('7-232) result: ', result)
  console.log('---------------- 2й тест. Часть 3. Фильтрация ----------------')
  let testObj = filterObject2(result)
  console.log('7-234) отфильтровано: ', testObj)
  console.log('---------------- 2й тест окончен----------------')
})
