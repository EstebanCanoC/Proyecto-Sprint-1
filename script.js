//Create an array of objects with the data of the "test Users".

let testUsers = [
    {
        name: 'Jane Doe',
        idNumber: '1234',
        password: 'Admon',
        userType: 1
    },
    {
        name: 'John Doe',
        idNumber: '2341',
        password: 'User',
        userType: 2
    },
    {
        name: 'Lennon',
        idNumber: '3412',
        password: 'User2',
        userType: 2
    },
    {
        name: 'Elton',
        idNumber: '4123',
        password: 'Admon2',
        userType: 1
    },

]

// Create the atm array for save the money
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

// To count the withdraw bills
let atmWithdraw = [
    {
        denomination: 100000,
        quantity: 0,
    },
    {
        denomination: 50000,
        quantity: 0,
    },
    {
        denomination: 20000,
        quantity: 0,
    },
    {
        denomination: 10000,
        quantity: 0,
    },
    {
        denomination: 5000,
        quantity: 0,
    }
];

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
let confirm = 0;

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
let totalWithraw = 0;

// Create a loop to keep the program runing
let online = true;

//keep the user "online"
let inProcess = true;

while (online) {

    alert(`Bienvenido al cajero de Makaia`);

    //Menu

    online = prompt(`Digite ->  1   Para ingresar con su número de documento y contraseña. \nDigite ->  0   Si desea salir. `);

    if (online === '' || (online !== '1' && online !== '0')) {
        alert('NO ha ingresado ninguna opción  valida, seleccione de nuevo');
        online = true;
    } else if (online === '0') {
        online = false;
    } else {

        //Keep the program running
        online = true;

        //Add the property name to the "fake" object.
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
                    alert(`Bienvenido ${userData.name}`);
                    if (atmMoney === 0) {
                        alert('El cajero actualmente no tiene ningún depósito.');
                        console.log('El cajero actualmente no tiene ningún depósito.');
                        for (let index = 0; index < atm.length; index++) {
                            deposit = parseInt(prompt(`Ingrese la cantidad de billetes que desea ingresar de $${atm[index].denomination}`));
                            if (isNaN(deposit)) {
                                deposit = 0;
                            }
                            atm[index].quantity = deposit;
                            tempQuantity = atm[index].quantity;
                            tempAmount = atm[index].denomination * tempQuantity;
                            atm[index].amount = parseInt(tempAmount);
                            totalAmount += tempAmount;
                        }
                        atmMoney = totalAmount;
                        totalAmount = 0;

                    //if there is something in the ATM and an admon access show
                    } else {
                        // BAD LOOP => RECURSIVE LOOP >>> CONVERT TO A FUNCTION
                        for (let index = 0; index < atm.length; index++) {
                            tempQuantity = atm[index].quantity;
                            tempAmount = atm[index].denomination * tempQuantity;
                        }
                        alert(`${userData.name} Antes de su ingreso \nEl cajero cuenta con un total de $${atmMoney}.`);
                        console.log(`${userData.name} Antes de su ingreso \nEl cajero cuenta con un total de $${atmMoney}.`);
                        //Ask for the quantity for deposit with the same loop
                        for (let index = 0; index < atm.length; index++) {
                            tempQuantity = atm[index].quantity;
                            tempAmount = atm[index].denomination * tempQuantity;
                            alert(`Billete de -> $${atm[index].denomination}. \nCantidad de -> ${tempQuantity} \nPara un total de: $${tempAmount} en billetes de $${atm[index].denomination}.`)
                            console.log(`Billete de -> $${atm[index].denomination}. \nCantidad de -> ${tempQuantity} \nPara un total de: $${tempAmount} en billetes de $${atm[index].denomination}.`)
                        }

                        //Add the secondary entry for another administrator
                        for (let index = 0; index < atm.length; index++) {
                            deposit = parseInt(prompt(`Ingrese la cantidad de billetes que desea ingresar de $${atm[index].denomination}`));
                            if (isNaN(deposit)) {
                                deposit = 0;
                            }
                            atm[index].quantity += deposit;
                            tempQuantity = atm[index].quantity;
                            tempAmount = atm[index].denomination * tempQuantity;
                            atm[index].amount = parseInt(tempAmount);
                            totalAmount += tempAmount;
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
                            withdraw = prompt(`Bienvenido ${userData.name} \nIngrese la cantidad desada para retirar \n`);
                            //Check if the amount is greater than the balance
                            if (withdraw > atmMoney) {
                                alert('El cajero no cuenta con fondos suficientes para realizar esta transaccion. \nIngrese un valor menor al anterior.');
                                //Keep the process running while the withdraw was greater than the totalAmount in the ATM
                                inProcess = true;

                            } else {
                                //WITHDRAW PROCCESS --->.
                                //Loop to get the data of the ATM
                                for (let index = 0; index < atm.length; index++) {
                                    tempAmount = atm[index].amount;

                                    while (tempAmount > 0 && withdraw >= atm[index].denomination) {
                                        //HERE SEARCH FOR THE AMOUNT AND THE QUANTITY BILLS --->
                                        let bills = Math.floor(withdraw / atm[index].denomination);
                                        //Save in the atmWithdraw to have the info of the amount of bills for each denomination
                                        atmWithdraw[index].denomination = atm[index].denomination;
                                        atmWithdraw[index].quantity = bills;

                                        //withDraw the amonut of the client.
                                        totalWithraw += bills * atm[index].denomination;
                                        atm[index].quantity -= bills;
                                        tempAmount -= bills * atm[index].denomination;
                                        withdraw -= bills * atm[index].denomination;
                                    }

                                    //Save the amount delivered to the user
                                    tempAmount = totalWithraw;
                                }
                                //Operation was successfull, exit the loop
                                console.log(`La cantidad de dinero entregada fue $${tempAmount}.`);
                                //Show the amount of bills delivered with another loop at the atmWithdraw
                                console.log(`A continuación se mostraran los billetes entregados a ${userData.name} durante la transacción.`);
                                for (let index = 0; index < atmWithdraw.length; index++) {
                                    if (atmWithdraw[index].quantity > 0) {
                                        console.log(`Billetes de $${atmWithdraw[index].denomination}. \nEntregados es de: ${atmWithdraw[index].quantity}.`);
                                        atmWithdraw[index].quantity = 0;
                                    }
                                }

                                alert('Proceso exitoso.\n');
                                alert(`Su retiro de $${tempAmount}. Ha sido un exito.`);
                                atmMoney -= tempAmount;
                                inProcess = false;
                                alert('sesion cerrada con exito.');

                                //Last console logs with the status of the atm
                                console.log(`La transacción del usuario ${userData.name} ha finalizado. \nA continuación se mostraran los billetes restantes en el cajero \nY el total.`);
                                for (let index = 0; index < atm.length; index++) {
                                    tempQuantity = atm[index].quantity;
                                    tempAmount = atm[index].denomination * tempQuantity;
                                    console.log(`Billete de -> $${atm[index].denomination}. \nCantidad de -> ${tempQuantity} \nPara un total de: $${tempAmount}. En billetes de $${atm[index].denomination}.`);
                                }
                                console.log(`El total en el ATM actualmente es: $${atmMoney}`);
                                // Clean the flags of the user
                                authUser = {};
                                userData = {};
                                validId = false;
                                validPassword = false;
                                validUser = false;

                                //Clean the flags of the proccess
                                withdraw = 0;
                                tempAmount = 0;
                                totalWithraw = 0;
                                inProcess = false;
                            }
                        }
                        //Clean the flag for the next users
                        inProcess = true;
                    }
                }
            }
        } else {
            continue;
        }
    }
}
alert(`Gracias por usar el cajero de Makaia. \nVuelva pronto :)`);
