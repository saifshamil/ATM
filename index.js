import inquirer from "inquirer";
import { faker } from "@faker-js/faker";
const createUser = () => {
    let users = [];
    for (let i = 0; i < 5; i++) {
        let user = {
            id: i,
            pin: 1000 + i,
            name: faker.person.fullName(),
            accountNumber: Math.floor(100000000 * Math.random() * 900000000),
            balance: 10000000 * i,
        };
        users.push(user);
    }
    return users;
};
// ATM Machine
const atmMachine = async (users) => {
    const res = await inquirer.prompt({
        type: "number",
        message: "Write pin code",
        name: "pin"
    });
    const user = users.find(val => val.pin == res.pin);
    if (user) {
        console.log(`Welcome ${user.name}`);
        atmFunc(user);
        return;
    }
    console.log("invalid user pin");
};
// atm function
const atmFunc = async (user) => {
    const ans = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "what do you want?",
        choices: ["withdraw", "balance", "deposite", "exit"],
    });
    if (ans.select == "withdraw") {
        const amount = await inquirer.prompt({
            type: "number",
            message: "enter your amount.",
            name: "rupee"
        });
        if (amount.rupee > 25000) {
            return console.log("you cannot withdraw more than 25 thousand.");
        }
        console.log(`withdraw amount: ${amount.rupee}`);
        console.log(`balance: ${user.balance - amount.rupee}`);
    }
    if (ans.select == "balance") {
        console.log(`balance: ${user.balance}`);
        return;
    }
    if (ans.select == "deposite") {
        const deposite = await inquirer.prompt({
            type: "number",
            message: "Deposite amount enter",
            name: "rupee"
        });
        console.log(`Deposite amount: ${deposite.rupee}`);
        console.log(`Totel balance : ${user.balance + deposite.rupee}`);
    }
    if (ans.select == "exit") {
        console.log("Thanks for using ATM.");
    }
};
const users = createUser();
atmMachine(users);
