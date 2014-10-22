/**
 * Created by wufulin on 14-9-26.
 */

var a = [1,2,3,4,5,6];
var b = [7,8,9,10,11];
var c = a.concat(b);

for(var i = 0; i < b.length; i++){
    a.push(b[i]);
}
b = null;

for(var i = a.length-1; i >= 0; i--){
    b.unshift(a[i]);
}

a.push.apply(a, b);
Math.max(5,8);

function getMax(attr){
    return Math.max.apple(null, attr);
}
