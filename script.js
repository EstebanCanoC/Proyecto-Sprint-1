//Create an array of objects with the data of the "test Users".

let testUsers = [
    {
        name: 'Jane Doe',
        idNumber: '1234',
        password: 'Admon000',
        userType: 1
    },
    {
        name: 'John Doe',
        idNumber: '2341',
        password: 'User000',
        userType: 2
    },
    {
        name: 'Lennon',
        idNumber: '3412',
        password: 'User001',
        userType: 2
    },
    {
        name: 'Elton',
        idNumber: '4123',
        password: 'Admon002',
        userType: 1
    },

]

// Create the atm array
let atm = [
    {
        denomination: 100000,
        quantity: 0,
        amount: 0,
    },
    {
        denomination: 50000,
        quantity: 0,
        amount: 0,
    },
    {
        denomination: 20000,
        quantity: 0,
        amount: 0,
    },
    {
        denomination: 10000,
        quantity: 0,
        amount: 0,
    },
    {
        denomination: 5000,
        quantity: 0,
        amount: 0,
    }
]

// ---> To find an equivalence between two objects, the first thing is create a reference of the object to search

//Create a flag object to validate the data
let authUser = {};
let userData = {};

//Create a flag to the id number and password
let idNumber;
let validId = false;
let password;
let validPassword = false;
let validUser = false;

//Create a flag to the admon action select
let action = 1;
let confirm;

//create the flag balance to gather the amount of bills
let totalAmount = 0;
let atmMoney = 0;

//create the flags to save the temp data to handle the array loop
let tempQuantity = 0;
let tempAmount = 0;

//Create a flag to enter the deposit
let deposit = 0;

// create a flag to the withdraw
let withdraw = 0;


// Create a loop to keep the program runing
let online = true;

//keep the user "online"
let inProcess = true;


while (online) {

    alert(`Bienvenido al cajero de Makaia`);

    //Test menu

    online = prompt(`Digite ->  1   Para ingresar con su número de documento y contraseña. \nDigite ->  0   Si desea salir. `);
    //   console.log(online)

    if (online === '' || (online !== '1' && online !== '0')) {
        alert('NO ha ingresado ninguna opción  valida, seleccione de nuevo');
        online = true;
    } else if (online === '0') {
        online = false;
    } else {
        //Add the property name to the "fake" object.
        online = true;

        idNumber = (prompt(`Ingrese su número de documento`));
        // Find data name using FOR LOOP
        // This for is to find the user doc in the array
        for (let index = 0; index < testUsers.length; index++) {
            //Create the instance of the object to get the data
            authUser = testUsers[index];
            if (authUser.idNumber === idNumber) {
                // Confirm the idNumber as true
                confirm = index;
                userData = authUser;
                validId = true;
                break;
            } else {
                //Ask again for a valid number\
                validId = false;
            }
        }
        //If the user name is Ok, continue and ask for the password
        if (!validId) {
            alert('Su número de documento es incorrecto');
            userData = {};
        } else {
            //Ask for the password
            password = prompt('Ingrese su contraseña');

            //To "hide" the information of the admon we are going to use the list in the position to match
            if (testUsers[confirm].password === password) {
                // If the previously saved data corresponds to the entry give access
                validPassword = true;
            } else {
                //Clean the data for security
                userData = {};
                alert('Su contraseña es incorrecta');
            }
        }
        // It is a redundancy, perhaps for a function it will work
        if (validId && validPassword) {
            validUser = true;
            // Confirm the two parameters
            if (validUser) {
                if (userData.userType === 1) {
                    alert(`Bienvenido ${userData.name} (ADMON)`);
                    if (atmMoney === 0) {
                        alert('El cajero actualmente no tiene ningún depósito.');
                        console.log('El cajero actualmente no tiene ningún depósito.');
                        for (let index = 0; index < atm.length; index++) {
                            deposit = parseInt(prompt(`Ingrese la cantidad de billetes que desea ingresar de $${atm[index].denomination}`));
                            atm[index].quantity = deposit;
                            tempQuantity = atm[index].quantity;
                            tempAmount = atm[index].denomination * tempQuantity;
                            atm[index].amount = parseInt(tempAmount);
                            totalAmount += tempAmount;
                        }
                        atmMoney = totalAmount;
                        totalAmount = 0;
                        //if there is something in "cash" and an admon access show
                    } else {
                        // BAD LOOP => RECURSIVE LOOP >>> CONVERT TO A FUNCTION
                        for (let index = 0; index < atm.length; index++) {
                            tempQuantity = atm[index].quantity;
                            tempAmount = atm[index].denomination * tempQuantity;
                        }
                        alert(`Antes de su ingreso ${userData.name} \nEl cajero cuenta con un total de $${atmMoney}.`);
                        console.log(`Después de el ingreso realizado por ${userData.name} \nEl cajero tiene  ahora un total de $${atmMoney}.`);
                        //Ask for the quantity for deposit with the same loop
                        for (let index = 0; index < atm.length; index++) {
                            tempQuantity = atm[index].quantity;
                            tempAmount = atm[index].denomination * tempQuantity;
                            alert(`Billete de -> $${atm[index].denomination} \nCantidad de -> ${tempQuantity} \nPara un total de: $${tempAmount} en billetes de $${atm[index].denomination}.`)
                            console.log(`Billete de -> $${atm[index].denomination} \nCantidad de -> ${tempQuantity} \nPara un total de: $${tempAmount} en billetes de $${atm[index].denomination}.`)
                        }

                        //Add the secondary entry for another administrator
                        for (let index = 0; index < atm.length; index++) {
                            deposit = parseInt(prompt(`Ingrese la cantidad de billetes que desea ingresar de $${atm[index].denomination}`));
                            atm[index].quantity += deposit;
                            console.log(atm[index].quantity);
                            tempQuantity = atm[index].quantity;
                            console.log(tempQuantity);
                            tempAmount = atm[index].denomination * tempQuantity;
                            console.log(tempAmount);
                            atm[index].amount = parseInt(tempAmount);
                            console.log(atm[index].amount);
                            totalAmount += tempAmount;
                            console.log(totalAmount);
                        }
                        atmMoney = totalAmount;
                        totalAmount = 0;
                    }
                    alert(`El cajero tiene un total de $${atmMoney}.`);
                    console.log(`El cajero tiene un total de $${atmMoney}.`);

                } else {
                    //User access -> Part 2. of the proccess Withdraw by the user

                    //If the Atm is empty
                    if (atmMoney === 0) {
                        alert('Cajero en mantenimiento, vuelva pronto.');
                    } else {
                        //Create a loop to keep the operation in process
                        while (inProcess) {
                            //Ask for the amount of money to withdraw
                            withdraw = prompt(`Bienvenido ${userData.name} \nIngrese la cantidad desada para retirar \n`)
                            //Check if the amount is greater than the balance
                            if (withdraw > atmMoney) {
                                alert('El cajero no cuenta con fondos suficientes para realizar esta transaccion. \n Ingrese un valor menor al anterior.');
                                //Keep the process running while the withdraw was greater than the totalAmount in the ATM
                                inProcess = true;

                            } else {
                                //WITHDRAW PROCCESS --->.
                                do {
                                    for (let index = 0; index < atm.length; index++) {

                                        console.log(atm[index].amount)
                                        withdraw = 0;
                                    }
                                } while (withdraw != 0);
                                //Loop to get the data of the ATM
                                for (let index = 0; index < atm.length; index++) {

                                    tempQuantity = atm[index].quantity;
                                    tempAmount = atm[index].denomination * tempQuantity;

                                }
                                //Operation was successfull, exit the loop
                                alert('Proceso exitoso.\n FIN mostrar los console log');
                                inProcess = false;
                                alert('sesion cerrada con exito.');
                            }
                        }
                    }
                }
            }
            validUser = false;
            validId = false;
            validPassword = false;
        } else {
            continue;
        }
    }
}
alert(`Gracias por usar el cajero de Makaia. \nVuelva pronto :)`);