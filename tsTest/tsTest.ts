class Person {
    private name: string;
    private age: number;

    constructor(age: number, name: string) {
        this.name = name;
        this.age = age;
    }

    get getName(): string {return this.name}
    set setName(name: string) {this.name = name}
}

let myPerson = new Person(12, 'Jone');
console.log(myPerson.name);
myPerson.name = 'hahaha'
console.log(myPerson.name);

