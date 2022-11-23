import readline from 'readline'
import { ParkingMethods } from './parkingMethods.js'
let parking = new ParkingMethods()

console.log("\n\t\t********************************************************\n")
console.log("\t\t          Welcome to the XYZ Parking System               ")
console.log("\n\t\t********************************************************")


const rl = readline.createInterface(
    process.stdin, process.stdout);

rl.setPrompt(`\nOptions \n\t\tM - View Map \n\t\tP - Park Car \n\t\tU - Unpark Car \n\t\tX - Close \n\nYour Choice: `);

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
            console.log("\n\t\t----------------------------------")
            console.log("\t\t  You are about to park your car!");
            console.log("\t\t----------------------------------\n")

            rl.question('Please specify the size of your Vehicle...\n\t\t0 - Small Size Vehicle \n\t\t1 - Medium Size Vehicle \n\t\t2 - Large Size Vehicle \n\nVehicle Size: ', function (v) {
                let strEntrance = parking.ENTRANCE.map((e) => e.name).join('\n')
                rl.question(`\t\t--------------------------------------\n\t\t  Entry Points to the Parking Complex\n\t\t--------------------------------------\n${strEntrance}\n\nChoose Entry Point: `, function (entrance) {

                    parking.park(v, entrance)
                    rl.question("Owner's Name: ", function (owner) {
                        // console.log("\nYour car is succesfully parked! Check the map for the location of your vehicle. \n")
                        parking.viewMap()
                        console.log(`\n\t\t------------------------------------------------------------------------------------------\n\t\t${owner},your car is succesfully parked! Check the map above for the location of your vehicle.\n\t\t------------------------------------------------------------------------------------------\n`);
                        rl.prompt()
                    })


                })

            })
            break

        case 'U':
        case 'u':
            console.log("\n\t\t--------------------------------------\n\t\t  You are about to unpark your car!\n\t\t--------------------------------------\n");
            parking.viewMap()
            console.log('\n\t-----------------------------------------------------------------------------------------------------------\n\tCheck the map above for the location of your vehicle. Just get the row and column of your vahicle location!\n\t-----------------------------------------------------------------------------------------------------------\n'),

                rl.question('Input must be row column separated with space. Vehicle Location: ', function (location) {
                    let strLoc = location.trim().split(' ')

                    if (strLoc.length >= 2) {
                        let row = strLoc[0]
                        let col = strLoc[1]
                        parking.unpark(row, col)
                        console.log('\t---------------------------------------------------------------------\n\tVehicle Unparked! Drive Safely! The life you save might be yours!\n\t---------------------------------------------------------------------\n')

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

    console.log('\t-----------------------------------------------\n\tDrive Safely! The life you save might be yours!\n\t-----------------------------------------------\n');
    process.exit(0);

});
