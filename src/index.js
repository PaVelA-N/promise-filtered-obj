import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//------------------------ Промисы --------------------------------------------------------------------------
function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}
function createRandomObj(length, currentDepth, depth){
  let obj={};
  let randomPrimitiveValueSelector;
  let keyName;

  if (currentDepth != 0) {obj.filter=false}

  for (let i=0; i <length; i++){
    keyName ='Name'+(currentDepth) +'-'+i
    randomPrimitiveValueSelector=getRandomInRange(0, 10) >9 ? true : false
    if (randomPrimitiveValueSelector) {
      obj[keyName]='prmtvData'+Math.round(getRandomInRange(0, 10))
    } else {
      if (currentDepth !=depth) {obj[keyName]=createRandomObj(length, currentDepth+1, depth)
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

function makeFilterOn(obj){
  let objWithOnFilter={};

    Object.entries(obj).forEach(([key, value]) => { 
      const backEndAnswer = new Promise((resolve, reject) => {
        let Answer;  
        let AnswerDelay;
        Answer = Math.round(getRandomInRange(0,10))>5 ? true : false
        AnswerDelay = getRandomInRange(1000,10000)
        setTimeout(() => {
          // console.log('860 ) x ', Answer)  
          resolve(Answer)
        }, AnswerDelay );
        // resolve(Answer);
      });

      backEndAnswer
      .then(
        result => {
          value = result
          return result 
        },
        error => {
          alert("Rejected: " + error); 
        }
      )

      if ((typeof(value) === 'object')&&(value!=null)) {
        value = makeFilterOn(value)
      }
      if (key ==='filter') {
        // value = await test()
        let x = backEndAnswer
        .then(
          result => {
          // console.log('885 ) x ', value)
        //     value = result
            return result }
        );
        // value = getRandomInRange(0, 15) >7 ? true : false
        // console.log('885 ) x ', value)
      }
      objWithOnFilter[key] = value
  });
  return objWithOnFilter
}

function testPromiseParallel_makeFilterOn(obj){
  let objWithOnFilter={};
  let keysNameArray = Object.keys(obj)
  console.log('2-928) keysNameArray: ', keysNameArray);

  const RequestArray = 
    keysNameArray.map(function(key) 
    {if (key ==='filter') {
          return ('filterKey')
        } else {
          if (typeof(obj[key])!='object') {
            return 'notObject'
          } else {
            return (backEndAnswer(key))
          }
        }
    })
  console.log('3-912) RequestArray: ', RequestArray)

  Object.keys(obj).forEach(key =>{})

  Promise.all([
    RequestArray
  ])
    .then((responses) => {
      // responses — массив результатов выполнения промисов
      responses.forEach(resp => {
        console.log('924 ',resp)
      })
    })
    .then(
    result=>{
      // if ниже выдает ошибку
      // if (typeof(objWithOnFilter['Name0-0'])==='object'){objWithOnFilter['Name0-0']['filter']=true},
      objWithOnFilter = returnWithFilter(obj, RequestArray)
      console.log('4-924) обьект с фильтром: ', objWithOnFilter)
    }
  )
  return objWithOnFilter
}

function returnWithFilter(obj, RequestArray){
  let keysNameArray = Object.keys(obj)
  for (const [key, value] of Object.entries(obj)) {
    if ((key !='filter')&&(typeof(value) === 'object')) {
      let index = keysNameArray.indexOf(key)
      console.log('7-937) key: ', key, '; index: ', index, '; RequestArray[index]: ', RequestArray[index])
      obj[key].filter = RequestArray[index].then(result=>{return (result)})
    }
  }
  
  // тестовая заглушка
  // if (typeof(obj['Name0-0'])==='object'){obj['Name0-0']['filter']=true}
  
  // Object.entries(obj).forEach(([key, value]) => {
  //     if ((key !='filter')&&(typeof(value) === 'object')) {
  //       let index = keysNameArray.indexOf(key)
  //       console.log('921) key: ', key, '; index: ', index)
  //       obj[key].filter = RequestArray[index]
  //     }
  //   });

  return obj
}

// function parallelPromisesFiltration(keysNameArray){
//   const RequestArray = 
//   keysNameArray.map(key => 
//     backEndAnswer
//     .then((response) => {
//       console.log('934', response)
//       return response
//     })
//   )

//   Promise.all(RequestArray)
//   .then((responses) => {
//     // responses — массив результатов выполнения промисов
//     responses.forEach(resp => {
//       console.log('943)', resp)
//     })
//   })
//   .catch(error => {
//     console.error(error)
//   })
//   return RequestArray
// }

// function promiseFiltration(){
// // ПОСЛЕДОВАТЕЛЬНЫЙ THEN

// const backEndAnswer = new Promise((resolve, reject) => {
//   let Answer;  
//   let AnswerDelay;
//   Answer = Math.round(getRandomInRange(0,11))>5 ? true : false
//   AnswerDelay = getRandomInRange(500,1000)
//   setTimeout(() => {
//     // console.log('926 ) рандомный Answer в промисе. пока не используется ', Answer)  
//     resolve(Answer)
//   }, AnswerDelay );
//   // reject('error'); 
// });

//   backEndAnswer
//   .then(
//     result=>{
//     console.log('1031) результат предыдущего: ', result)
//     // TODO начну использовать Answer-result после отладки параллельности
//     let settedFiltersObject=initialObject;
//     if (typeof(settedFiltersObject["Name0-0"])==='object') {
//       settedFiltersObject["Name0-0"].filter=true
//       // console.log('947) 2й then. Установка фильтра в Name0-0')
//     }
//     // console.log('949) установленный фильтр: ',settedFiltersObject)
//     return (settedFiltersObject)
//     },
//     error => {
//       alert("939) Rejected: " + error); 
//       return error 
//     }
//   )
//   .then(
//     result=>{
//     // console.log('956)  результат предыдущего: ', result)
//     let settedFiltersObject=initialObject;
//     if (typeof(settedFiltersObject["Name0-1"])==='object') {
//       settedFiltersObject["Name0-1"].filter=true
//       // console.log('961) 3й then. Установка фильтра в Name0-1')
//     }
//     // console.log('962) установленный фильтр: ',settedFiltersObject)
//     return (settedFiltersObject)
//     }
//   )  
//   .then(
//     result=>{
//       console.log('968) результат предыдущего: ', result)
//       let filteredObject =filterObject(result)
//       return (console.log('969) отфильтрованный обьект', filteredObject))
//     }
//   )
//   .catch(function (err) {
//     console.log('973) ',err)
//   })
//   .finally(function () {
//     console.log('976 The end. finally')
//   })
// }

// let testAnswer = promiseFiltration()

// Эти 6 строчек ниже ОК!
let initialObject=createRandomObj(3, 0, 2)
console.log('1-1077) начальный обьект: ', initialObject)
let settedFiltersObject = testPromiseParallel_makeFilterOn(initialObject)
// let settedFiltersObject = makeFilterOn(initialObject)
console.log('5-1080) еще раз вывод с фильтром ', settedFiltersObject)
let filteredObject =filterObject(settedFiltersObject)
console.log('6-1082) отфильтровано ', filteredObject)

// let filterNameArray=['f1', 'f2', 'f3', 'f4', 'f5']
// let backEndAnswersArray=[]
// let promiseArray=filterNameArray.push()

// backEndAnswer
//   .then(
//     result => {
//       result
//       // backEndAnswersArray[0] = result
//       // console.log(backEndAnswersArray[0])
//     },
//     error => {
//       alert("Rejected: " + error); 
//     }
//   );

  // backEndAnswersArray = filterNameArray.map(function (item) {
  //   return (backEndAnswer)
  // })  

