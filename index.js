const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const alpha = require('alphavantage')({ key: 'P0F2Q0Y2TCKCBDFI' });
const port = 3000;

//alpha.data.intraday(`msft`).then(data => {
//  console.log(data);
//});

//alpha.data.daily(`msft`).then(data => {
 // console.log(data);
//});
app.use(bodyParser.json());

app.get('/', (req,res) => {
  //res.send('hello!');
  res.status(200).json({status:'ok'});
} );

app.get('/current/price/:smbl', (req,res) => {
  alpha.data.quote(req.params.smbl).then(data => {
    console.log(data);
    res.status(200).json({price:(data['Global Quote']['05. price'])});
 
  })
});

app.get('/current/div/:smbl', (req,res) => {
  var found = false;
  var value = '';
  var foundDate = '';
  alpha.data.monthly_adjusted(req.params.smbl).then(data => {



    const polished = alpha.util.polish(data);
    var key = '';


    for(var i=0;i<4;i++){
      key = Object.keys(polished.data)[i];
      var div = Number(polished.data[key].dividend);

      if(div>0){
        res.status(200).json({data:polished.data[key], date: key});
        break;
      }
    }

 
    //var aaa = polished.data.sort(GetSortOrder(data['data']));
    //var keys = Object.keys(polished.data).map(x=>Number(x.replace(/-/g,'').substring(0,8)));

    //polished.data[first]
    //var dates_ = Object.keys(data['Monthly Adjusted Time Series']);
    
    //var dates = dates_.map(x=> fixDate(x));

   // dates.forEach(element => {
   //   try{
    //    var val = Number(data['Monthly Adjusted Time Series'][element]['7. dividend amount']);
   //     if(val > 0){
   //       found=true;
   //       value = val;
   //       foundDate = element;
   //     }
   //   }
    //  catch(e){
   //     console.log(e);
    //  }
   // });


  })

});

function GetSortOrder(prop) {    
  return function(a, b) {    
      if (a[prop] > b[prop]) {    
          return 1;    
      } else if (a[prop] < b[prop]) {    
          return -1;    
      }    
      return 0;    
  }    
} 

function fixDate(date)
{
  return(Number(date.replace(/-/g,'')));
}

app.listen(port,()=> console.log(`connecte on port ${port}`));



// alpha.data.weekly_adjusted(`ivr`).then(data => {
//   console.log(data);
// });


//alpha.data.search(`ivr`).then(data => {
//  console.log(data);
//});

//alpha.technical.sma(`msft`, `daily`, 60, `close`).then(data => {
 // console.log(data);
//});


