"use strict";
var rows = [[]];
    rows[0][0]="Date";
    rows[0][1]="Kit";
    rows[0][2]="Manufacturer";
    rows[0][3]="#Tubes";
    rows[0][4]="Solid Waste (kBq)";
    rows[0][5]="Liquid Waste (kBq)";
    rows[0][6]="Solid+Liquid(kBq)";
    rows[0][7]="Date";
    rows[0][8]="Sum Solid Waste (kBq)";
    rows[0][9]="Sum Liquid Waste (kBq)";
    rows[0][10]="Total Waste (kBq)";
var dates=[];
var Swaste=[];
var Lwaste=[];
var SwasteSum=[];
var LwasteSum=[];
var Total_waste=[];
var alldates=[];
var alldatessort=[]
var Sum_When_delete=0;
var RoWs = [[[]]];
var Roows=[];
var SS=[[]];
var SL=[[]];
function ClearSolidAndLiquidWaste(){
    document.getElementById("sol_waste").innerHTML="";
    document.getElementById("liq_waste").innerHTML="";
    document.getElementById("tubes").value=0;
}
function Refresh(){
    location.reload(true);
}
function EnKit(){
    if(document.getElementById("kit").value=="Other"){
        document.getElementById("ukit").disabled=false;
    } 
    else if(document.getElementById("kit").value!="Other"){
        document.getElementById("ukit").value="";
        document.getElementById("ukit").disabled=true;
    }
}
function EnManu(){
    if(document.getElementById("manu").value=="Other"){
        document.getElementById("umanu").disabled=false;
    } 
    else if(document.getElementById("manu").value!="Other"){
        document.getElementById("umanu").value="";
        document.getElementById("umanu").disabled=true;
    }
}
function Checkbox1(){
    if(document.getElementById("nominal").checked==true){
        document.getElementById("tTracer").disabled=false;
        document.getElementById("tVolTracer").disabled=false;
        document.getElementById("VolPerTube").disabled=false;
        document.getElementById("theoRadPerTube").disabled=false;
        document.getElementById("theoCpmPerTube").disabled=false;
        document.getElementById("my_cpm").checked=false;
        document.getElementById("measCpmPerTube").disabled=true;
        document.getElementById("myTotal").disabled=true;
        document.getElementById("measRadPerTube").disabled=true;
    }
}
function Checkbox2(){
    if(document.getElementById("my_cpm").checked==true){
        document.getElementById("nominal").checked=false;
        document.getElementById("tTracer").disabled=true;
        document.getElementById("tVolTracer").disabled=true;
        document.getElementById("VolPerTube").disabled=true;
        document.getElementById("theoRadPerTube").disabled=true;
        document.getElementById("theoCpmPerTube").disabled=true;
        document.getElementById("measCpmPerTube").disabled=false;
        document.getElementById("myTotal").disabled=true;
        document.getElementById("measRadPerTube").disabled=false;
    }
}
function Calcs() {
    if(document.getElementById("tubes").value==0){
        if(document.getElementById("assay").innerHTML=="??????????????"){
            alert("?????????? ???????? ???? ???????????????? ???????????? ????????????????????!");
            return
        }
        else{
            alert("Type a non-zero number of tubes!");
            return
        }
        
    }
    if(document.getElementById("date").value==""){
        if(document.getElementById("assay").innerHTML=="??????????????"){
        alert("?????????????? ?????? ????????????????????!");
        return
        }
        else{
            alert("Select a date!");
            return
        }
    }
    if(document.getElementById("nominal").checked==false && document.getElementById("my_cpm").checked==false){
        if(document.getElementById("assay").innerHTML=="??????????????"){
        alert("?????????????? ???????? ?????? ???????? ?????? ?????????????? ??????????????????????!");
        return
        }
        else{
        alert("Select a calculation method!");
        return
        }
    }
    if(document.getElementById("method").value==""){
        if(document.getElementById("assay").innerHTML=="??????????????"){
            alert("?????????????? ?????? ???? ?????? RIA/IRMA ?????? ???????????????????? ???????? ???? ???????????????? ??????!");
            return
        }
        else{
            alert("Select one from RIA/IRMA and re-enter your data!");
            return
        }
    }
   if(document.getElementById("nominal").checked==true){
    let tubes=document.getElementById("tubes").value;
    tubes=parseFloat(tubes);
    let theoRadPerTube=document.getElementById("theoRadPerTube").value;
    theoRadPerTube=parseFloat(theoRadPerTube);
    let perSol=document.getElementById("perSol").value;
    perSol=parseFloat(perSol);
    perSol=perSol/100;
    let perLiq=document.getElementById("perLiq").value;
    perLiq=parseFloat(perLiq);
    perLiq=perLiq/100;
    let sol_waste=tubes*theoRadPerTube*perSol;
    let liq_waste=tubes*theoRadPerTube*perLiq;
    document.getElementById("sol_waste").value=sol_waste.toFixed(2);
    document.getElementById("liq_waste").value=liq_waste.toFixed(2);
  }
  else {
      let tubes=document.getElementById("tubes").value;
      let measRadPerTube=document.getElementById("measRadPerTube").value;
      let perSol=document.getElementById("perSol").value;
      let perLiq=document.getElementById("perLiq").value;
      tubes=parseFloat(tubes);
      measRadPerTube=parseFloat(measRadPerTube);
      perSol=parseFloat(perSol)/100;
      perLiq=parseFloat(perLiq)/100;
      let sol_waste=tubes*measRadPerTube*perSol;
      let liq_waste=tubes*measRadPerTube*perLiq;
      document.getElementById("sol_waste").value=sol_waste.toFixed(2);
      document.getElementById("liq_waste").value=liq_waste.toFixed(2);
 
  }
    if(rows.length==3){
        rows.pop();
    }
    else if(rows.length>3){
        let sum_remove=rows[dates.length+1].slice(0,7);
        rows[dates.length+1]=sum_remove;
        rows.pop();
    }
    rows.push([]);
    rows[rows.length-1][0]=new Date(document.getElementById("date").value).toDateString();
    if(document.getElementById("ukit").disabled==false){
        rows[rows.length-1][1]=document.getElementById("ukit").value;
    }
    else{
        rows[rows.length-1][1]=document.getElementById("kit").value;
    }
    if(document.getElementById("umanu").disabled==false){
        rows[rows.length-1][2]=document.getElementById("umanu").value;
    }
    else {
        rows[rows.length-1][2]=document.getElementById("manu").value;
    }
    rows[rows.length-1][3]=document.getElementById("tubes").value;
    rows[rows.length-1][4]=document.getElementById("sol_waste").value;
    rows[rows.length-1][5]=document.getElementById("liq_waste").value;
    for(let i=0;i<rows.length-1;i++){
        RoWs.push([]);
        for(let j=0;j<6;j++){
        RoWs[i][j]=rows[i+1][j];
        }
    }
    RoWs=RoWs.filter(function(element){
        return element!="";
    }) 
    console.log(RoWs)
     if(RoWs.length>1){
    let sortByDate = RoWs => {       // ?????????? ?????? ???????????????????????? ???????? ???????????????????? ???????? ?????????????? ??????????
        let sorter = (a, b) => {
           return new Date(a[0]) - new Date(b[0]);
        };
        RoWs.sort(sorter);
     };
     sortByDate(RoWs);
     for(var i=1;i<rows.length;i++){
        for(var j=0;j<6;j++){
        rows[i][j]=RoWs[i-1][j];//i-1
        }
     }
     }
    for(var i=1;i<rows.length;i++){
        alldates[i-1]=rows[i][0]
    }
    dates=alldates.filter((v, i, a) => a.indexOf(v) === i);   //???????????????? ?????? ???????????? ??????????
for(var i=0;i<dates.length;i++){
  Roows[i] = RoWs.filter(function(x){
      return x[0]==dates[i];
  }) }
 SS=[[]]
 SS.push([])
 SL=[[]]
 SL.push([])
 for(var i=0;i<dates.length;i++){
    for(var j=0;j<Roows[i].length;j++){
        SS[i].push(parseFloat(Roows[i][j][4]))
        SL[i].push(parseFloat(Roows[i][j][5]))
        SS.push([])
        SL.push([])
    }
 }
 if(rows[1].length>6){
     for(var i=0;i<dates.length;i++){
         rows[i+1].splice(6,5);
     }
 }
 for(var i=0;i<dates.length;i++){
     rows[i+1].push("")
     rows[i+1].push(dates[i])
     rows[i+1].push(SS[i].reduce((a,b)=>a+b,0).toFixed(2).toString())
     rows[i+1].push(SL[i].reduce((a,b)=>a+b,0).toFixed(2).toString())
     Sum_When_delete=SS[i].reduce((a,b)=>a+b,0)+SL[i].reduce((a,b)=>a+b,0)
     rows[i+1].push(Sum_When_delete.toFixed(2).toString())
 }
let Allsolidwastes=[];
let AllLiquidwastes=[];
let AllWastes=0;
Allsolidwastes=RoWs.map(d => parseFloat(d[4]));// ?????????????? ?????? ???????? ???????????? 2d ?????? ?????????? ?????? ?????????? ?????????????? ????????
AllLiquidwastes=RoWs.map(d => parseFloat(d[5]))// ?????????????? ?????? ???????? ???????????? 2d ?????? ?????????? ?????? ?????????? ?????????????? ????????
 Allsolidwastes=Allsolidwastes.reduce((a,b)=>a+b,0).toFixed(2);
 AllLiquidwastes=AllLiquidwastes.reduce((a,b)=>a+b,0).toFixed(2);
 Allsolidwastes=parseFloat(Allsolidwastes);
 AllLiquidwastes=parseFloat(AllLiquidwastes);
 AllWastes=Allsolidwastes+AllLiquidwastes;
rows.push(["Total Waste(kBq)","","","",Allsolidwastes.toFixed(2).toString(),AllLiquidwastes.toFixed(2).toString(),AllWastes.toFixed(2).toString()]);
 let overall=rows[rows.length-1].slice(4,7);
 overall.unshift("Total Waste(kBq)");
 let last_row=rows[dates.length+1].concat(overall);
 rows[dates.length+1]=last_row;
 if(rows[dates.length+1].length!=11){
     if(rows[dates.length+1].length>11){
        rows[dates.length+1].splice(7,1)
     }
     else if(rows[dates.length+1].length<11){
        rows[dates.length+1].splice(6,0,"");
     }
 }
 var table1=document.getElementById("csv_table");
 if(table1.rows.length>1){
    while (table1.rows.length > 1) {
        table1.deleteRow(1);
      }
 }
 for(var i=1;i<rows.length-1;i++){
     var Row=table1.insertRow(i);
     for(var j=0;j<6;j++){
         Row.insertCell(j).innerHTML=rows[i][j];
     }
     Row.insertCell(6).innerHTML="<button id=del onclick=Delete(this) ><img src=x-512.png style=width:20px;height:20px; > </button>";
  }
  Row=table1.insertRow(rows.length-1);
  for(let i=0;i<7;i++){
      Row.insertCell(i).innerHTML=rows[rows.length-1][i];
  }
 var table2=document.getElementById("csv_table_Sums");
 if(table2.rows.length>1){
    while (table2.rows.length > 1) {
        table2.deleteRow(1);
      }
 }
for(var i=0;i<dates.length;i++){
     var Rrow=table2.insertRow(i+1)
     let Cells=Rrow.insertCell(0);
      Cells.innerHTML=dates[i];
     }
for(var i=0;i<dates.length;i++){
    for(var j=0;j<3;j++){
        table2.rows[i+1].insertCell(j+1).innerHTML=rows[i+1][8+j]
    }
}
table2.insertRow(dates.length+1)
for(let i=0;i<4;i++){
    table2.rows[dates.length+1].insertCell(i).innerHTML=rows[dates.length+1][7+i];
}
}
function numbersOnly(input){
    var regex=/[^0-9] /gi;
    input.value=input.value.replace(regex,"");
}
function EnTotal(){
   if(document.getElementById("measRadPerTube").disabled==true && document.getElementById("measCpmPerTube").disabled==true){
    document.getElementById("measCpmPerTube").disabled=false;
    document.getElementById("measRadPerTube").disabled=false;
   }
   else if(document.getElementById("measRadPerTube").disabled==false && document.getElementById("measCpmPerTube").disabled==false){
    document.getElementById("measCpmPerTube").disabled=true;
    document.getElementById("measRadPerTube").disabled=true;
   }
   if(document.getElementById("measRadPerTube").disabled==false && document.getElementById("measCpmPerTube").disabled==false){
       alert("?????? ???????????????? ???? ???????????????????????? ?????? ?????????????? ??????");
   }
}
function Calc_kBq(){ //???????????????????? ?????? ???????????????????? ???????????????????? ?????? ??????????????????
    if(document.getElementById("myTotalBox").checked==false){
    let Efficiency=document.getElementById("efficiency").value;
    let MyCpm=document.getElementById("measCpmPerTube").value;
    let ActivityPerTube=MyCpm/(600*Efficiency);
    document.getElementById("measRadPerTube").value=ActivityPerTube.toFixed(5);
    }
    else{
    document.getElementById("measCpmPerTube").disabled=true;
    let Efficiency=document.getElementById("efficiency").value;
    let Total=document.getElementById("myTotal").value;
    let ActivityPerTube=Total/(600*Efficiency);
    document.getElementById("measRadPerTube").value=ActivityPerTube.toFixed(5);
    }
}
function Calc_Cpm(){
    let Efficiency=document.getElementById("efficiency").value;
    let ActivityPerTube=document.getElementById("theoRadPerTube").value;
    let CpmPerTubeNominal=ActivityPerTube*600*Efficiency;
    document.getElementById("theoCpmPerTube").value=CpmPerTubeNominal.toFixed(0);

}
function EnMeasRadPerTube(){
    document.getElementById("measRadPerTube").disabled=false;
}
function DisAndEnMeasCpmPerTube(){
    if(document.getElementById("myTotalBox").checked==false){
            document.getElementById("measCpmPerTube").disabled=false;
            document.getElementById("myTotal").disabled=true;
         }
    else{
        document.getElementById("measCpmPerTube").disabled=true;
        document.getElementById("myTotal").disabled=false;
    }
}
  function SaveCsv(){
    let data = "";
    var tableData = [];
    for (var row of rows) {
      var rowData = [];
      for (var column of row) {
        rowData.push(column);
      }
      tableData.push(rowData.join(","));
    }
    data += tableData.join("\n");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([data], { type: "text/csv" }));
    if(document.getElementById("file_name").value==""){
        var filename="???? ???????????? ??????".concat(".csv");
    }
    else{
        let LoadedFileName=document.getElementById("file_name").value;
        var filename=LoadedFileName;
    }
    a.setAttribute("download", filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
function UploadFileAlert(){
    if(document.getElementById("assay").innerHTML=="??????????????"){
        if(rows.length>1){
            alert("??????????????! ?????????? ???????????????????? ???????? ?????????? ???? ????????????????????, ???? ?????? ???????????? ???? ???????????????????? ?????????????? ???? ??????????.");
        }
    }
    else{
        if(rows.length>1){
            alert("Caution! The registrations will be deleted, otherwise click cancel.");
        }
    }
   
}
  function processFile(){
    var filename=document.getElementById("MyFile").value;
    var filelength=filename.length;
    filename=filename.substr(12,filelength);
    document.getElementById("file_name").value=filename;
    console.log(filename);
    var file = document.getElementById("MyFile").files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    //When the file finish load
    reader.onload = function(event) {
      //get the file.
      var csv = event.target.result;
      //split and get the rows in an array
      var notreadyrows = csv.split('\n');
        var readyrows=[];
      for(var i=0;i<notreadyrows.length;i++){
      readyrows[i]=notreadyrows[i].split(",");
      }
     rows=readyrows;
     if(rows[rows.length-1]==""){
        rows.pop()
    }
     let sortByDate = rows => {
        let sorter = (a, b) => {
           return new Date(a[0]) - new Date(b[0]);
        };
        rows.sort(sorter);
     };
     sortByDate(rows);
     alldates=[];
     for(var i=1;i<rows.length-1;i++){
         alldates.push(rows[i][0]);
     }
     dates=alldates.filter((v, i, a) => a.indexOf(v) === i);   //???????????????? ?????? ???????????? ??????????
     let g=rows.map(d => parseFloat(d[4]).toFixed(2)); // ?????????????? ?????? ???????????? ?????? ?????????????? ???? ???? ???????????? ?????? ???????? ?????????????????? 
     let l=rows.map(d => parseFloat(d[5]).toFixed(2)); // ?????? ?????? ?????????????????? ???? ???????????????? ???? ?????? ???????????????? 
     let kl=rows.map(d => parseFloat(d[8]).toFixed(2)); // ?????? ???????? ???????? ???? string
     let bn=rows.map(d => parseFloat(d[9]).toFixed(2));
     let bm=rows.map(d => parseFloat(d[10]).toFixed(2));
     for(let i=1;i<rows.length-1;i++){
         rows[i][4]=g[i];
         rows[i][5]=l[i];
     }
     for(let i=1;i<dates.length-1;i++){
         rows[i][8]=kl[i];
         rows[i][9]=bn[i];
         rows[i][10]=bm[i];
     }                                                      
    var table1=document.getElementById("csv_table");
 if(table1.rows.length>1){
    while (table1.rows.length > 1) {
        table1.deleteRow(1);
      }
    }
    var table1=document.getElementById("csv_table");
    for(var i=1;i<rows.length-1;i++){
        var Row=table1.insertRow(i);
        for(var j=0;j<6;j++){
            Row.insertCell(j).innerHTML=rows[i][j];
        }
        Row.insertCell(6).innerHTML="<button id=del onclick=Delete(this) ><img src=x-512.png style=width:20px;height:20px; > </button>";
     }
     Row=table1.insertRow(rows.length-1);
     for(let i=0;i<7;i++){
         Row.insertCell(i).innerHTML=rows[rows.length-1][i];
     }
var table2=document.getElementById("csv_table_Sums");
if(table2.rows.length>1){
   while (table2.rows.length > 1) {
       table2.deleteRow(1);
     }
}
for(var i=0;i<dates.length;i++){//
    var Rrow=table2.insertRow(i+1)
    let Cells=Rrow.insertCell(0);
     Cells.innerHTML=dates[i];
    }
for(var i=0;i<dates.length;i++){
   for(var j=0;j<3;j++){
       table2.rows[i+1].insertCell(j+1).innerHTML=rows[i+1][8+j]
   }
}
table2.insertRow(table2.rows.length);
let LastRowOfrows=rows[rows.length-1];   //?????????????????? ?????? ?????? ???????????????????? ???????????? ???? ???? Total Sum ???????? ???????????????? ????????????
LastRowOfrows.splice(1,3);
for(let j=0;j<4;j++){         
    table2.rows[dates.length+1].insertCell(j).innerHTML=LastRowOfrows[j];
}
}
}
function Delete(y){
    let javascriptrow=y.parentNode.parentNode //???????????????? ?????? ???????????? ?????? ???????????? ?????? ???????????????? ???? delete
    while(rows.length>1){
        rows.pop();
    }
    let tableforEdit=document.getElementById("csv_table");
     tableforEdit.deleteRow(javascriptrow.rowIndex);
     console.log(tableforEdit);
    for(let i=0;i<tableforEdit.rows.length-1;i++){
        rows.push([]);
        for(let j=0;j<6;j++){
            rows[i+1][j]=tableforEdit.rows[i+1].cells[j].innerHTML;
        }
    }
     RoWs = [[[]]];
     Roows=[];
     SS=[[]];
     SL=[[]];
     dates=[];
     alldates=[];
     for(var i=0;i<rows.length-1;i++){
        for(var j=0;j<6;j++){
        RoWs[i][j]=rows[i][j];
        }
        RoWs.push([]);
    }
    for(var i=1;i<rows.length-1;i++){
        alldates[i-1]=rows[i][0]
    }
    dates=alldates.filter((v, i, a) => a.indexOf(v) === i);   //???????????????? ?????? ???????????? ??????????
for(var i=0;i<dates.length;i++){
  Roows[i] = RoWs.filter(function(x){
      return x[0]==dates[i];
  }) }
 SS=[[]]
 SS.push([])
 SL=[[]]
 SL.push([])
 for(var i=0;i<dates.length;i++){
    for(var j=0;j<Roows[i].length;j++){
        SS[i].push(parseFloat(Roows[i][j][4]))
        SL[i].push(parseFloat(Roows[i][j][5]))
        SS.push([])
        SL.push([])
    }
 }
 if(rows[1].length>6){
     for(var i=0;i<dates.length;i++){
         rows[i+1].splice(6,5);
     }
 }
 for(var i=0;i<dates.length;i++){
     rows[i+1].push("")
     rows[i+1].push(dates[i])
     rows[i+1].push(SS[i].reduce((a,b)=>a+b,0).toFixed(2).toString())
     rows[i+1].push(SL[i].reduce((a,b)=>a+b,0).toFixed(2).toString())
     Sum_When_delete=SS[i].reduce((a,b)=>a+b,0)+SL[i].reduce((a,b)=>a+b,0)
     rows[i+1].push(Sum_When_delete.toFixed(2).toString())
 }
 rows.pop();
 let Allsolidwastes=[];
 let AllLiquidwastes=[];
 let AllWastes=0;
 RoWs.pop();
 RoWs.shift();
 console.log(RoWs);
 Allsolidwastes=RoWs.map(d => parseFloat(d[4]));// ?????????????? ?????? ???????? ???????????? 2d ?????? ?????????? ?????? ?????????? ?????????????? ????????
 AllLiquidwastes=RoWs.map(d => parseFloat(d[5]));// ?????????????? ?????? ???????? ???????????? 2d ?????? ?????????? ?????? ?????????? ?????????????? ????????
  Allsolidwastes=Allsolidwastes.reduce((a,b)=>a+b,0).toFixed(2);
  AllLiquidwastes=AllLiquidwastes.reduce((a,b)=>a+b,0).toFixed(2);
  console.log(Allsolidwastes);
  console.log(AllLiquidwastes);
  Allsolidwastes=parseFloat(Allsolidwastes);
  AllLiquidwastes=parseFloat(AllLiquidwastes);
  AllWastes=Allsolidwastes+AllLiquidwastes;
 rows.push(["Total Waste(kBq)","","","",Allsolidwastes.toFixed(2).toString(),AllLiquidwastes.toFixed(2).toString(),AllWastes.toFixed(2).toString()])
  console.log(rows)
  var table1=document.getElementById("csv_table");
  if(table1.rows.length>1){
     while (table1.rows.length > 1) {
         table1.deleteRow(1);
       }
  }
  console.log(rows)
  for(var i=1;i<rows.length-1;i++){
      var Row=table1.insertRow(i);
      for(var j=0;j<6;j++){
          Row.insertCell(j).innerHTML=rows[i][j];
      }
      Row.insertCell(6).innerHTML="<button id=del onclick=Delete(this) ><img src=x-512.png style=width:20px;height:20px; > </button>";
   }
   Row=table1.insertRow(rows.length-1);
   for(let i=0;i<7;i++){
       Row.insertCell(i).innerHTML=rows[rows.length-1][i];
   }
 let table2=document.getElementById("csv_table_Sums")
 while(table2.rows.length>1){
        table2.deleteRow(1);
 }
 for(var i=0;i<dates.length;i++){
    var Rrow=table2.insertRow(i+1)
    let Cells=Rrow.insertCell(0);
     Cells.innerHTML=dates[i];
    }
console.log(rows)
for(var i=0;i<dates.length;i++){
   for(var j=0;j<3;j++){
       table2.rows[i+1].insertCell(j+1).innerHTML=rows[i+1][8+j]
   }
}
console.log(table1)
if(table1.rows.length==2){
    rows.pop();
    document.getElementById("csv_table").deleteRow(1);
}
}
function Calc_theoRadPerTube(){//???????????????????? ?????? ?????????????????? ???????????????????? ?????? ?????????????????? ???? kbq ?????? ???? cpm
    let tTracer=document.getElementById("tTracer").value;
    let tVolTracer=document.getElementById("tVolTracer").value;
    let VolPerTube=document.getElementById("VolPerTube").value;
    let theoRadPerTube=tTracer/tVolTracer*VolPerTube;
    let e=document.getElementById("efficiency").value;
    document.getElementById("theoRadPerTube").value=theoRadPerTube.toFixed(2);
    let theoCpmPerTube=theoRadPerTube*e*600;
    document.getElementById("theoCpmPerTube").value=theoCpmPerTube.toFixed(2);

}
function PercentageCorretion1(){//?????????????????????? ???????????????? ???? ?????????????? ?????? ??????????
    let perSol=document.getElementById("perSol").value;
    let perLiq=document.getElementById("perLiq").value;
    perLiq=100-perSol;
    document.getElementById("perLiq").value=perLiq;
}
 function PercentageCorretion2(){//?????????????????????? ???????????????? ???? ?????????????? ?????? ??????????????
    let perSol=document.getElementById("perSol").value;
    let perLiq=document.getElementById("perLiq").value;
    perSol=100-perLiq;
    document.getElementById("perSol").value=perSol;
 }
 function Clear_otherKit(){
     document.getElementById("ukit").value="";
     document.getElementById("ukit").disabled=true;
 }
 function Clear_otherManu(){
     document.getElementById("umanu").value="";
     document.getElementById("umanu").disabled=true;
     document.getElementById("myTotal").value="0";
 }
 function Print(){
     window.print()
 }
 function ResetValues(){
    document.getElementById("manu").value="";
    document.getElementById("method").value="";
    document.getElementById("sol_waste").value="0";
    document.getElementById("liq_waste").value="0";
    document.getElementById("perSol").value="0";
    document.getElementById("perLiq").value="0";
    document.getElementById("myTotal").value="0";
    document.getElementById("tTracer").value="0";
    document.getElementById("manu").value="0";
    document.getElementById("tVolTracer").value="0";
    document.getElementById("VolPerTube").value="0";
    document.getElementById("theoRadPerTube").value="0";
    document.getElementById("theoCpmPerTube").value="0";
    document.getElementById("measCpmPerTube").value="0";
    document.getElementById("measRadPerTube").value="0";
}
function CpmPerKBqToPercentage(){
    let cpmPerkBq=document.getElementById("cpm/kBq").value;
    let efficiency=cpmPerkBq/600;
    document.getElementById("efficiency").value=efficiency.toFixed(4);
}
function PercentageToCpmPerKBq(){
    let efficiency=document.getElementById("efficiency").value;
    let cpmPerkBq=efficiency*600;
    document.getElementById("cpm/kBq").value=cpmPerkBq.toFixed(0);
}
