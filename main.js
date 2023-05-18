var vKey = document.querySelectorAll(".dir");
var display = document.getElementsByClassName("screen")[0];
var equal = document.getElementById("equals");
var clear = document.getElementById("allclear");
var erase = document.getElementById("erase");
var exp = "";
var specialKey = false;
var specialValue = "";
var func;
const arr = ['+','-','*','/','%',];
vKey.forEach(btn=>{
    btn.addEventListener('click',e=>{
        var data = e.target.dataset.num;
        display.value += data;
        if(specialKey){
            if(arr.includes(data)){
                exp += func(specialValue);
                exp += data;
                specialKey = false;
                specialValue = "";
                return;
            }
            specialValue += e.target.dataset.num;
            return;
        }
        exp += data;
    })
})

//equals
equal.addEventListener('click',()=>{
    if(display.value){
        try{
            if(specialKey){
                exp += func(specialValue);
                specialKey = false;
                specialValue = "";
            }
            display.value = eval(exp);
            exp = display.value;
        }catch(err){
            display.value = "Error";
        }
    }
})

//allclear
clear.addEventListener('click',()=>{
    display.value= "";
    exp = "";
    specialKey=false;
    specialValue="";
})

//erase

erase.addEventListener('click',()=>{
    if(display.value == "Error"){
        display.value = "";
        return;
    }
    let str = display.value;
    str = str.substring(0,str.length-1);
    display.value = str;
    if(specialKey && specialValue.length == 0){
        specialKey = false;
        exp = display.value;
    }
    else if(specialKey && specialValue.length > 0){
        specialValue = specialValue.substring(0,specialValue.length-1);
    }
    else{   
        str = exp;
        str = str.substring(0,str.length-1);
        exp = str;
    }
})

// function for y^x

function yRaiseTo(){
    specialKey = true;
    var base = validExp(); 
    display.value +="^";
    func = function(param){
        if(param){
            return Math.pow(base,param);
        }
    }
}
// function for getting valid exp for our power buttons;
function validExp(){
    let str = display.value;
    const validOp={
         op1 : str.lastIndexOf("+"),
         op2 : str.lastIndexOf("-"),
         op3 : str.lastIndexOf("*"),
         op4 : str.lastIndexOf("/"),
         op5 : str.lastIndexOf("%"),
         op6 : str.lastIndexOf("("),
         op6 : str.lastIndexOf(")")
    }
    
    let index;
    let max = Number.MIN_SAFE_INTEGER;
    for(var op of Object.values(validOp)){
        if(op > max){
            max = op; 
            index = max+1;
        }
    }
    if(!index){
        exp = "";
        return str; 
    }
    if(exp.endsWith("sin") || exp.endsWith("cos") || exp.endsWith("tan")){
        exp = exp.substring(0,exp.length-4);
        return str.substring(index);
    }
    const validOp2={
        op1 : exp.lastIndexOf("+"),
        op2 : exp.lastIndexOf("-"),
        op3 : exp.lastIndexOf("*"),
        op4 : exp.lastIndexOf("/"),
        op5 : exp.lastIndexOf("%"),
        op6 : str.lastIndexOf("("),

   }
   var index2;
   max = Number.MIN_SAFE_INTEGER;
   for(var op of Object.values(validOp2)){
        if(op > max){
            max = op; 
            index2 = max+1;
        }
    }
    if(index2){
        exp = exp.substring(0,index2);
    }
    return str.substring(index);
    
}

//function for powerButtons

function powerFun(power){
    specialKey = true;
    specialValue +=`${power}`;
    var base = "";
    base = validExp(); 
    if(!base) base = undefined;
    display.value +="^"+`${power}`;
    func = function(param){
        if(param){
            return Math.pow(base,param);
        }
    }
}

//function for cuberoot

function rootCal(){
    specialKey = true;
    specialValue+=`${1/3}`;
    var base = validExp(); 
    display.value +="^0.3";
    func = function(param){
        if(param){

            return Math.pow(base,param);
        }
    }
}

// function for ex 
function eX(){
    specialKey = true;
    display.value +="e^";
    func = function(param){
        if(param){
            return Math.exp(param);
        }
    }
}

//function for 10^x

function tenX(){
    specialKey = true;
    display.value +="10^";
    func = function(param){
        if(param){
            return Math.pow(10,param);
        }
    }
}

//function for pi

function pi(){
    specialKey = true;
    display.value +="pi";
    func = function(param){
        return Math.PI;
    }
}

//function for sin

function sin(){
    specialKey = true;
    display.value += "sin";
    validExp();
    func = function(param){
        if(param){
            var inRadian = (param/180) * Math.PI;
            return Math.sin(inRadian).toFixed(2);
        }
    }
}

function cos(){
    specialKey = true;
    display.value += "cos";
    validExp();
    func = function(param){
        if(param){
            var inRadian = (Math.PI * param)/180;
            return Math.cos(inRadian).toFixed(2);
        }
    }
}


function tan(){
    specialKey = true;
    display.value += "tan";
    validExp();
    func = function(param){
        if(param){
            if(param == 90) return Infinity;
            var inRadian = (Math.PI * param)/180;
            return Math.tan(inRadian).toFixed(2);
        }
    }
}


function logE(){
    specialKey = true;
    display.value += "ln";
    validExp();
    func = function(param){
        return Math.log(param);
    }
}

function log10(){
    specialKey = true;
    display.value += "log";
    validExp();
    func = function(param){
        return Math.log10(param);
    }
}

function divide(){
    specialKey = true;
    var base = "";
    base = validExp(); 
    if(!base) base = undefined;
    display.value +="%";
    func = function(param){
        return base/100;
    }
}

