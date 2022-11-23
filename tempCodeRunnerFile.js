
                rl.question('Input must be row column separated with space. Vehicle Location: ', function (location) {
                    let strLoc = location.trim().split(' ')

                    if (strLoc.length >= 2) {
                        let row = strLoc[0]
                        let col = strLoc[1]
                        parking.unpark(row, col)
                        console.log('Vehicle Unparked! Drive Safely! The life you save might be yours!\n')

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

    console.log('Drive Safely! The life you save might be yours!');
    process.exit(0);

});
