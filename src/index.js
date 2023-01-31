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
      // console.log('50 ) Answer: ', Answer)  
      resolve(Answer);
      key=Answer;
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
function setFilter(objFilterOff, nameOfObject){
  let objFilterOn={}
  let keysNameArray = Object.keys(objFilterOff)
    if (keysNameArray.includes('filter')) {
      // objFilterOn.filter=true
      objFilterOn.filter= Math.round(getRandomInRange(0,10))>3 ? true : false
    } 
    for (const [key, value] of Object.entries(objFilterOff)) {
      if (key !=='filter') {
        if ((typeof(value)==='object')&&(value!=null)) {
          objFilterOn[key]=setFilter(value,key)
        } else {
          objFilterOn[key] = value
        }
      }
    }
  return objFilterOn
}
// -----------  БЛОК тестирования функций -----------   

function promiseFiltration_test1_serially(obj1){
// 1й тест - ПОСЛЕДОВАТЕЛЬНЫЙ THEN. 
// результат фильтра берется из промиса, устанавливается в фильтр. 
// используется возврат return (obj2)
let obj2=deepCopy(obj1);

const backEndAnswer = new Promise((resolve, reject) => {
  let Answer;  
  let AnswerDelay;
  Answer = Math.round(getRandomInRange(0,11))>0 ? true : false
  AnswerDelay = getRandomInRange(200,500)
  setTimeout(() => {
    resolve(Answer)
  }, AnswerDelay );  /* reject('error'); */
});

  backEndAnswer
  .then(
    result=>{
    console.log('---------------- 1й тестовый промис ----------------')
    console.log('129) результат предыдущего: ', result)
    if (typeof(obj2["Name0-0"])==='object') {
      obj2["Name0-0"].filter=result
      console.log('132) obj2["Name0-0"].filter ', obj2["Name0-0"].filter)
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
      obj2["Name0-1"].filter=true+'_test_1'
    }
    return (obj2)
    }
  )  
  .then(
    result=>{
      console.log('149) результат предыдущего: ', result)
      let filteredObject =filterObject(result)
      return (console.log('151) отфильтрованный обьект', filteredObject))
    }
  )
  .catch(function (err) {
    console.log('159) ',err)
  })
  .finally(function () {
    console.log('162) The end. finally')
  })
}
let requestArray=[]
let requestArray2=[]
let arrayNextElementID

function setPromiseFilterInRecursion2(objFilterOff, nameOfObject){
       // console.log('2 ', arrayNextElementID)
  let objFilterOn={}
  let keysNameArray = Object.keys(objFilterOff)
  if (keysNameArray.includes('filter')) {
    // console.log('3 ', arrayNextElementID, '; nameOfObject ', nameOfObject)
    arrayNextElementID=requestArray.length
    requestArray[arrayNextElementID] = backEndAnswer(nameOfObject.filter)
    // requestArray2[arrayNextElementID]=
    requestArray[arrayNextElementID]
    .then(res=>{
      objFilterOn.filter=res
      // console.log('175) objFilterOn.filter=res ', res)
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

function setPromiseFilterInRecursion(objFilterOff, nameOfObject){
  let objFilterOn={}
  let keysNameArray = Object.keys(objFilterOff)
    
  const backEndAnswer = new Promise((resolve, reject) => {
    let Answer;  
    let AnswerDelay;
    Answer = Math.round(getRandomInRange(0,10))>1 ? true : false
    AnswerDelay = getRandomInRange(100,200)
    setTimeout(() => {
      resolve(Answer)
    }, AnswerDelay ); /* reject('error'); */
  });

  return new Promise((resolve, reject) => {
  if (keysNameArray.includes('filter')) {
    // 1. ниже возвращался промис и не работал с фильтрацией. переделал на прием значения изнутри промса через внешнюю переменную
    /* objFilterOn.filter= backEndAnswer().then(res=>{objFilterOn.filter= res})*/
    // 2я попытка
    // backEndAnswer.then(res=>{
    //   objFilterOn.filter= res
    //   console.log('181) objFilterOn.filter', objFilterOn.filter)
    // })
    // 3я попытка:
    objFilterOn.filter=backEndAnswer.then(res=>{
      console.log('181) objFilterOn.filter', objFilterOn.filter)
      return res
    })
  } 
  for (const [key, value] of Object.entries(objFilterOff)) {
    if (key !=='filter') {
      if ((typeof(value)==='object')&&(value!=null)) {
        setPromiseFilterInRecursion(value,key)
        .then(
          result=>{objFilterOn[key]=result}
        )
      } else {
        objFilterOn[key] = value
      }
    }
  }
  // 4я попытка. уберу промис выше = оберну все в промис 
  // return new Promise((resolve, reject) => {
      resolve(objFilterOn)
  })
  // return (objFilterOn)
}

function filterObject2(obj){
  return new Promise((resolve, reject) => {
  console.log('212) Входящий obj =', obj)
  let test;
  let filteredObject={}
    Object.entries(obj).forEach(([key, value]) => {
      new Promise ((resolve, reject) => {
        console.log('216) key =', key,'; value= ', value)
        if (key ==='filter') {
          console.log('218) key =', key,'; value= ', value)
          value.then(res=>{
            console.log('220) test =', res)
            test=res
            return test
          })
        }
      })
      .then(res=>{
        if ((key ==='filter') && (res === true)) {
          console.log('225) Простое значение.  key = ', key,'; value= ', value)          
          filteredObject = 'цензура'
        } else {
          if ((typeof(value) !='object')||(value ===null)) {
            // console.log('226) Простое значение. key = ', key,'; value= ', value)          
            filteredObject[key] = value
          } else {
            // console.log('229) Объект. key = ', key,'; value= ', value)          
            filteredObject[key] = filterObject2(value)
          }
        }
      })
    });
    //5я попытка - убираю промис
  // return new Promise((resolve, reject) => {
    resolve(filteredObject)
  })
  // return(filteredObject)
}
// -----------  БЛОК параметры первичного обьекта ----------- 
/* ширина объекта*/ let length =3  
/* глубина */  let depth=3
let initialObject=createRandomObj(length, 0, depth)
console.log('1-242) начальный обьект: ', initialObject)
// -----------  БЛОК синхронный. Выводы результатов ----------- 
// let settedFiltersObject = setFilter(initialObject, 'initialObjectID')
// 1console.log('2-245) вывод с включенным фильтром ', settedFiltersObject)
// let filteredObject =filterObject(settedFiltersObject)
// console.log('3-247) отфильтровано ', filteredObject)
// console.log('---------------- Синхронная часть закончилась ----------------')
// /*- 1й тест промиса - последовательный */
// let testAnswer = promiseFiltration_test1_serially(initialObject)
// /*- 2й тест промиса - с рекурсией */

let testAnswer2 = setPromiseFilterInRecursion2(initialObject, 'Name=initialObject')
Promise.all(requestArray)
.then(res=>{
  console.log('2-295) requestArray: ', requestArray)
  // console.log('3-296) requestArray2: ', requestArray2)
  console.log('4-298) testAnswer2: ', testAnswer2)
  return (testAnswer2)
})
.then(res=>{
// console.log('4-302) res: ', res)
let filteredObject =filterObject(res)
console.log('5-304) отфильтровано ', filteredObject)
})

// requestArray
// testAnswer2
// .then(result =>{
//   console.log('---------------- 2й тест. Часть 1. установка фильтров ----------------')
//   console.log('6-287) установлены фильтры: ', result)
//   return result
// })
// .then(result =>{
//   console.log('---------------- 2й тест. Часть 2. Проверка перед фильтрацией ----------------')
//   console.log('7-261) result: ', result)
//   console.log('---------------- 2й тест. Часть 3. Фильтрация ----------------')
//   let testObj = filterObject2(result)
//   console.log('7-264) отфильтровано: ', testObj)
//   console.log('---------------- 2й тест окончен----------------')
// })
//------------------ тест 3 ----------------

// let testObj={filter:false, Name1: {filter:false, Name1: 'prmtvData1'}, Name2: {filter:false, Name1: 'prmtvData1'}}

// function testBackEndAnswer(key){
//   const backEndAnswer = new Promise((resolve, reject) => {
//     let Answer;  
//     let AnswerDelay;
//     Answer = Math.round(getRandomInRange(0,10))>0 ? true : false
//     AnswerDelay = getRandomInRange(100,200)
//     key=Answer;
//     setTimeout(() => {
//       // console.log('313) рандомный Answer в промисе. пока не используется ', Answer)  
//       resolve(Answer)
//     }, AnswerDelay );
//     // reject('error'); 
//   });
//   return backEndAnswer
// }

// testBackEndAnswer(testObj.filter)
// .then(
//   res=>{
//     testObj.Name1.filter = res  
//     testObj.filter = res
//   })
// .then(res=>{
//   // testObj.filter = res
//   console.log('299)++ res', res, '; testObj ', testObj)
// })

// function filterArray(arr1){
//   console.log('5 ',arr1);
//   let filteredArray=arr1.filter(x=> x!=true)
//   // let arrLength = arr.length
//   // for (let i=0; i<arrLength; i++) {
//   //   if (arr[i]===true) {}
//   // }
//   return filteredArray
// }

// let testArray = []
// let arrayNextElementID
// let appearPromise
// function testCircle(){
//   for (let i=0; i<15; i++) {
//     appearPromise = getRandomInRange(0, 10) >5 ? true : false
//     if (appearPromise===true) {
//       arrayNextElementID=testArray.length
//       // console.log('2 ', arrayNextElementID)
//       // testArray[arrayNextElementID]=appearPromise
//       testArray[arrayNextElementID]=backEndAnswer(i)
//     }
//   }
//   return ''
// }

// console.log('1 ', testArray,'testArray.length', testArray.length)
// testCircle()
// console.log('3 ', testArray,'testArray.length', testArray.length)
// Promise.all(testArray)
// .then(res =>{
//   console.log('4 ',testArray);
//   return (testArray)
// })
// .then(res =>{
//   console.log('6 ',filterArray(testArray));
// })