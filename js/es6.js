/**
 * Created by wufulin on 14-9-26.
 */

///// 1、Class
function Point(x,y){
    this.x = x;
    this.y = y;
}

Point.prototype.toString = function(){
    return '(' + this.x + ', ' + this.y + ')';
};

// 定义类
class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    toString(){
        return '(' + this.x + ', ' + this.y + ')';
    }
}

class ColorPoint extends Point{
    constructor(x, y, color){
        super(x,y);
        this.color = color;
    }

    toString(){
        return this.color + ' ' + super();
    }
}

///// 2、Module

// export
var firstName = "David";
var lastName = "Belle";
var year = 1104;

export(firstName, lastName, year);

import {firstName, lastName, year} from './profile';

function setHeader(element){
    element.textContent = firstName + ' ' + lastName;
}

// circle.js

export function area(radius){

}

export function circumference(radius){

}

export class{}

//import * as circle from 'circle';
module circle from 'circle';
console.log(circle.area(4));

export default function(){}


////// let和const命令
{
    let a = 10;
    var b = 1;
}

var a = [];
for (var i = 0; i < 10; i++) {
    var c = i;
    a[i] = function () {
        console.log(c);
    };
}
a[6](); // 9

var a = [];
for (var i = 0; i < 10; i++) {
    let c = i;
    a[i] = function () {
        console.log(c);
    };
}
a[6](); // 6

const MAX = 5;