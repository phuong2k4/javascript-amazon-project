import formatCurrency from "../script/util/money.js";

if(formatCurrency(2095)==='20.95'){
    console.log("pass")
}else{
    console.log('failed')
}

if(formatCurrency(2000.5)==='20.01'){
    console.log("pass")
}else{
    console.log('failed')
}

if(formatCurrency(0)==='0.00'){
    console.log("pass")
}else{
    console.log('failed')
}

if(formatCurrency(2000.4)==='20.00'){
    console.log("pass")
}else{
    console.log('failed')
}