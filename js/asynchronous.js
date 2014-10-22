/**
 * Created by wufulin on 14-9-26.
 */

f1();
f2();

function f1(callback){
    setTimeout(function(){
        // f1的任务代码
        callback();
    }, 1000);
}

f1.on('done', f2);

function f1(){
    setTimeout(function(){
        // f1的任务代码
        f1.trigger('done');
    }, 1000);
}

// Ben Alman 的Tiny Pub/Sub
jQuery.subscribe("done", f2);

function f1(){
    setTimeout(function(){
        // f1的任务代码
        jQuery.publish('done');
    }, 1000);
}

jQuery.unsubscribe('done', f2);

// Promises
f1().then(f2);

function f1(){
    var dfd = $.Deferred();
    setTimeout(function(){
        // f1的任务代码
        dfd.resolve();
    }, 500);
    return dfd.promise;
}

var menu = {

    currentState: 'hide',

    initialize: function(){
        var self = this;
        self.on('click', self.transition);
    },

    transition: function(event){
        switch (this.currentState){
            case 'hide':
                this.currentState = 'show';
                this.doSomething();
                break;
            case 'show':
                this.currentState = 'hide';
                this.doSomething();
                break;
            default :
                console.log('Invalid State');
                break;
        }
    },

    doSomething: function(){

    }
}

menu.currentState = 'show';
menu.initialize();

var Promise = function(){
    this.state = 'pending';
    this.thenables = [];
};

Promise.prototype.resolve = function(value){
    if(this.state != 'pending') return;

    this.state = 'fulfilled';
    this.value = value;
    this._handleThen();
    return this;
};

Promise.prototype.reject = function(reason){
    if(this.state != 'pending') return;

    this.state = 'rejected';
    this.reason = reason;
    this._handleThen();
    return this;
};

Promise.prototype.then = function(onFulfilled, onRejected){
    var thenable = {};

    if(typeof onFulfilled == 'function'){
        thenable.fulfill = onFulfilled;
    };

    if(typeof onRejected == 'function'){
        thenable.reject = onRejected;
    };

    if(this.state != 'pending'){
        setImmediate(function(){
            this._handleThen();
        }.bind(this));
    }

    thenable.promise = new Promise();
    this.thenables.push(thenable);

    return thenable.promise;
};

Promise.prototype._handleThen = function(){
    if(this.state === 'pending') return;

    if(this.thenables.length){
        for(var i = 0; i < this.thenables.length; i++){
            var thenPromise = this.thenables[i].promise;
            var returnedVal;
            try{
                switch (this.state) {
                    case 'fulfilled':
                        if (this.thenables[i].fulfill) {
                            returnedVal = this.thenables[i].fulfill(this.value);
                        } else {
                            thenPromise.resolve(this.value);
                        }
                        break;
                    case 'rejected':
                        if (this.thenables[i].reject) {
                            returnedVal = this.thenables[i].reject(this.reason);
                        } else {
                            thenPromise.reject(this.reason);
                        }
                        break;
                }

                if (returnedVal === null) {
                    this.thenables[i].promise.resolve(returnedVal);
                }
                else if (returnedVal instanceof Promise || typeof returnedVal.then === 'function') {
                    returnedVal.then(thenPromise.resolve.bind(thenPromise), thenPromise.reject.bind(thenPromise));
                }
                else {
                    this.thenables[i].promise.resolve(returnedVal);
                }
            }catch(e){
                thenPromise.reject(e);
            }
        }
        this.thenables = [];
    }
};

module.exports = Promise;
