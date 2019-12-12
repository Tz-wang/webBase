console.log("window", this);

function func() {
    console.log('func', this);
}

const func1 = function () {
    console.log('func1', this);
}

const func2 = () => {
    console.log('func2', this);
}

func()
func1()
func2()

setTimeout(function () {
    console.log('setTimeout1', this)
}, 0)

setTimeout(() => {
    console.log('setTimeout2', this)
},0)