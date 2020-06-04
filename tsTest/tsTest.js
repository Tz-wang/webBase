var Person = /** @class */ (function () {
    function Person(age, name) {
        this.name = name;
        this.age = age;
    }
    Object.defineProperty(Person.prototype, "getName", {
        get: function () { return this.name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "setName", {
        set: function (name) { this.name = name; },
        enumerable: true,
        configurable: true
    });
    return Person;
}());
var myPerson = new Person(12, 'Jone');
console.log(myPerson.name);
myPerson.name = 'hahaha';
console.log(myPerson.name);
