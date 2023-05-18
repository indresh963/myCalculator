function funOut(a=1){
    function funIn(b=1){
        function funIn2(c=1){
            return a+b+c;
        }
        return funIn2;
    }

    return funIn;
}

var value = funOut(1)(2)(3);
console.log(value);