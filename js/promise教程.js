
// 普通异步函数：以回调形式进行函数调用
setTimeout(() => console.log('hello setTimeout'), 1000);

// 创建一个Promise对象
const mySetTimeout = function (timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, timeout);
    })
}


// 在Promise中，回调函数被放置在then方法中
console.time('mySetTimeout')
mySetTimeout(1000).then(() => console.timeEnd('mySetTimeout'))

// async 函数关键字是Promise语法糖，功能是将Promise的链式表达式写成函数顺序的方式
async function parsePromise() {
    console.time('parsePromise timeout 1000');
    await mySetTimeout(1000);
    console.timeEnd('parsePromise timeout 1000');
    console.time('parsePromise timeout 2000');
    await mySetTimeout(2000);
    console.timeEnd('parsePromise timeout 2000');
    console.time('parsePromise timeout 3000');
    await mySetTimeout(3000);
    console.timeEnd('parsePromise timeout 3000');
}

parsePromise();

// Promise 静态方法介绍
/**
 * Promise.resolve(), Promise的快速包装方法，可以将一个对象转换成Promise对象
 * 接收四种不同的参数：
 * 1、如果参数是Promise对象，则将Promise对象原封不多的返回
 * 2、如果参数是一个带有then方法（可以手动添加）的对象，则将这个对象转成Promise对象，then方法自然地变成Promise对象的then方法
 * 3、如果参数是一个不带then方法的对象，或者根本不是对象，则返回一个新的Promise对象，并将参数作为Promise对象的then方法回调参数
 * 4、如果不传入任何一个参数，则直接生成一个resolve状态的Promise对象
 * */
// 1、接收一个Promise对象
console.time('newPromise');
const newPromise = Promise.resolve(mySetTimeout(1000));
newPromise.then(() => console.timeEnd('newPromise'))

// 2、接收一个带有then方法的对象
console.time('thenObj')
const thenObj = Promise.resolve({then(resolve, reject) {setTimeout(resolve, 1000)}})
thenObj.then(() => console.timeEnd('thenObj'))

// 3、接收一个普通变量
console.time('普通对象')
const ordinaryVariable = Promise.resolve({name: '普通对象'})
ordinaryVariable.then(obj => console.timeEnd(obj.name));

// 4、空参数
Promise.resolve().then(() => console.log('空参数'));


/**
 * Promise.reject(), 可以创建一个rejected状态的Promise实例，几乎跟Promise.resolve()一样的效果
 * 只不过生成的Promise对象都是rejected状态
 * 同样接受4种参数：
 * 1、如果参数是Promise对象，则将Promise对象的状态变为rejected, 且新Promise对象的catch回调还是调用原Promise对象的resolve
 * 2、如果参数是一个带有then方法的对象，则将这个对象转成Promise对象，并且状态马上变为rejected
 * 3、如果参数是一个不带then方法的对象，或者根本不是对象，则返回一个rejected状态的新Promise对象，并将这个对象作为Promise对象的rejected方法的回调
 * 4、如果不传入参数，则直接生成一个rejected状态的Promise对象
 * */
// 1、接收一个promise对象
console.time('Promise.reject(hasRejectPromise)');
const rejectPromiseObj = Promise.reject(mySetTimeout(1000))
rejectPromiseObj.catch(() => console.timeEnd('Promise.reject(hasRejectPromise)'))

// 2、接收一个带then方法的对象
const thenObject = Promise.reject({then(resolve, reject) {setTimeout(reject, 1000)}})
console.time('thenObject')
thenObject.catch(err => console.timeEnd('thenObject'));

// 3、接收一个普通对象
console.time('reject 普通对象')
Promise.reject({name: 'reject 普通对象'}).catch(err => console.timeEnd(err.name));

// 4、不传入参数
console.time('reject 不传入参数')
Promise.reject().catch(() => console.timeEnd('reject 不传入参数'));



/**
 * Promise.all(), 参数是一个promise数组，可以将多个promise对象打包成一个新的promise，
 * 当所有promise都fulfilled后，该promise才触发fulfilled，
 * 任意一个promise rejected，该promise就触发rejected
 * 会将所有promise对象的返回值组成一个数组，传递给p的回调函数,
 * 该函数的主要功能是可以统一调用的顺序，
 * 例如同时需要发起三个接口请求，且三个接口都返回后才执行后面的操作，这个时候可以使用Promise.all()将所有请求封装在一起
 * */
console.time('Promise.all timeout')
Promise.all([mySetTimeout(1000),
                    mySetTimeout(2000),
                    mySetTimeout(3000)])
    .then(() => console.timeEnd('Promise.all timeout'))

/**
 * Promise.race(), 参数是一个Promise数组，同样可以将多个Promise对象打包成一个新的Promise，
 * 功能是，当Promise中有一个Promise fulfilled后，该promise就触发fulfilled
 * 同样，任意一个Promise rejected，该Promise 就触发 rejected
 * */
console.time('Promise.race timeout')
Promise.race([mySetTimeout(1000),
                     mySetTimeout(2000),
                     mySetTimeout(3000)])
    .then(() => console.timeEnd('Promise.race timeout'));

/**
 * Promise.allSettled(), 参数是一个Promise数组，同样可以将多个Promise对象打包成一个新的Promise，
 * 功能是，无论Promise数组中的调用是否成功，都将等到所有的promise返回后执行then方法
 * 用起来跟Promise.all()差不多，目前这个方法将会在ES2020中引入，浏览器支持情况未知
 * */

/**
 * Promise.any(), 参数同样是一个Promise数组，将多个Promise对象打包成一个新的Promise，
 * 只要一个promise变成fulfilled状态，promise就变成fulfilled状态，
 * 所有promise都变成rejected状态，promise就变成rejected状态
 * 用起来跟Promise.race()差不多，目前这个方法处于第三阶段的提案中
 * */
