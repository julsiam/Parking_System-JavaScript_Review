import readline from 'readline'
import { ParkingMethods } from './parkingMethods.js'
let parking = new ParkingMethods()

console.log("\n********************************************************\n")
console.log("           Welcome to the XYZ Parking System               ")
console.log("\n********************************************************")


const rl = readline.createInterface(
    process.stdin, process.stdout);

rl.setPrompt(`\nOptions \nM - View Map \nP - Park Car \nU - Unpark Car \nX - Close \n\nYour Choice: `);

rl.prompt()

rl.on('line', (line) => {
    switch (line.trim()) {

        case 'M':
        case 'm':
            console.log("-------------------------------------------------")
            console.log("Here is the parking lot map for your refrence!");
            console.log("-------------------------------------------------\n")
            parking.viewMap()
            break

        case 'P':
        case 'p':
            console.log("\n----------------------------------")
            console.log("You are about to park your car!");
            console.log("----------------------------------")

            rl.question('Please specify the size of your Vehicle...\n0 - Small Size Vehicle \n1 - Medium Size Vehicle \n2 - Large Size Vehicle \n\nVehicle Size: ', function (v) {
                let strEntrance = parking.ENTRANCE.map((e) => e.name).join('\n')
                rl.question(`--------------------------------------\nEntry Points to the Parking Complex\n--------------------------------------\n${strEntrance}\n\nChoose Entry Point: `, function (entrance) {
                    parking.park(v, entrance)
                    console.log("Your car is succesfully parked!");

                    rl.prompt()
                })

            })
            break

        case 'U':
        case 'u':
            console.log("\nYou are about to unpark your car!");
            rl.question('Location of your vehicle to unpark. Seperate by a space [row column]: ', function (location) {
                let strLoc = location.trim().split(' ')

                if (strLoc.length >= 2) {
                    let row = strLoc[0]
                    let col = strLoc[1]
                    parking.unpark(row, col)
                    console.log('Vehicle Unparked!')

                    rl.prompt()
                } else {
                    console.log('No Vehicle Parked in the area!')

                }
            })
            break

        case 'X':
        case 'x':
            rl.close()
            break

        default:
            break;
    }

    rl.prompt();


}).on('close', () => {

    console.log('Thank you for coming!');
    process.exit(0);

});
