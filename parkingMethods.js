import util from 'util'

export class ParkingMethods {

    constructor() {
        this.MAX_COLS = 8
        this.MAX_ROWS = 5

        //can't modify the fill() part
        this.PARK = new Array(this.MAX_ROWS).fill().map(() => new Array(this.MAX_COLS).fill())

        this.initSpaces()

        //parking slot entry points
        this.ENTRANCE = [
            { name: 'A', row: 0, col: 2 },
            { name: 'B', row: 0, col: 6 },
            { name: 'C', row: this.MAX_ROWS, col: 3 }
        ]
    }


    viewMap() {
        console.log(util.inspect(this.PARK, {
            showHidden: false,
            colors: true,
            compact: true,
            depth: null
        }))
    }

    park(size, ent) {

        let entrance = this.ENTRANCE.find(o => o.name === ent.toUpperCase())
        let nrow = -1, ncol = -1
        let distance = 9999

        for (let i = 0; i < this.MAX_ROWS; i++) {
            for (let j = 0; j < this.MAX_COLS; j++) {
                if (!this.isGateway(i, j)) {
                    let p = this.PARK[i][j]
                    if (size <= p.Parking_Slot_Size.Value) {
                        let computedDistance = Math.abs(entrance.row - p.row) + Math.abs(entrance.col - p.col)
                        if (distance > computedDistance && !p.Occupied) {
                            distance = computedDistance
                            nrow = i
                            ncol = j
                        }
                    }
                }
            }
        }

        if (nrow == -1) {
            console.log('No vacant slot available!')
            return false
        } else {

            Object.assign(this.PARK[nrow][ncol], {
                Occupied: true,
                Vehicle_Size: {
                    Value: parseInt(size),
                    Description: this.getVehicleDesc(size)
                },
                row: nrow,
                col: ncol,
                Start_of_Parking: new Date()
            })

            return this.PARK[nrow][ncol]
        }
    }

    /*
     Vehicle Value and Description
    0 - Small SIze Vehicle
    1 - Medium Size Vehicle
    2 - Large Size Vehicle 
    */

    getVehicleDesc(size) {

        switch (parseInt(size)) {
            case 0:
                return 'Small Size Vehicle'
                break
            case 1:
                return 'Medium Size Vehicle'
                break
            case 2:
                return 'Large Size Vehicle'
                break
            default:
                return ''

        }

    }

    getOwner(owner) {

    }

    unpark(row, col) {

        let p = this.PARK[row][col]
        let diff = (new Date()) - p.Start_of_Parking
        let totalPayable = this.compute(p.Parking_Slot_Size.Value, diff)
        console.log(`\t---------------------------------------\n\t  Your Total Parking Charges: ₱ ${totalPayable}\n\t---------------------------------------\n`)

        Object.assign(this.PARK[row][col], {
            Occupied: false,
            Vehicle_Size: null,
            Start_of_Parking: null
        })
    }

    /*charges computation when parking depending on the vehicle size and the parking slot size
    
    -All types of car pay the flat rate of 40 pesos for the first three (3) hours;
    -The exceeding hourly rate beyond the initial three (3) hours will be charged as follows:
    
          - 20/hour for vehicles parked in SP;
          - 60/hour for vehicles parked in MP; and
          - 100/hour for vehicles parked in LP

    
     For parking that exceeds 24 hours, every full 24 hour chunk is charged 5,000 pesos regardless of parking slot.
    
     */

    compute(size, totalTime) {

        let remainingTime = totalTime
        let t24 = 1000 * 60 * 24
        let t1h = 1000 * 60
        let charges = 0

        var hourlyCharge = 0

        if (size == 0) {
            hourlyCharge = 20
        } else if (size == 1) {
            hourlyCharge = 60
        } else if (size == 2) {
            hourlyCharge = 100
        }

        if (remainingTime > t24) {
            let n24 = parseInt(totalTime / t24)
            charges += n24 * 5000
            remainingTime -= (n24 * t24)
        }

        if (remainingTime > (t1h * 3)) {
            remainingTime -= (t1h * 3)
            charges += 40
        }

        if (remainingTime > 0) {
            let remainingHours = Math.ceil(remainingTime / t1h)
            charges += remainingHours * hourlyCharge
        }

        return charges

    }

    initSpaces() {

        for (let i = 0; i < this.MAX_ROWS; i++) {
            for (let j = 0; j < this.MAX_COLS; j++) {
                if (!this.isGateway(i, j)) {
                    this.PARK[i][j] = {
                        Occupied: false,
                        Parking_Slot_Size: this.getRandomSize(),
                        row: i,
                        col: j
                    }

                }
            }
        }

    }

    isGateway(row, col) {

        if (col == 0 || row == 0 || row == this.MAX_ROWS - 1 || col == this.MAX_COLS - 1) {
            return true
        } else {
            return false
        }

    }

    isValidSize(size) {

        if (size >= 0 && size <= 2)
            return true
        else
            return false

    }

    getRandomSize() {
        const max = 2
        const min = 0
        const descriptors = ['Small-size Parking Slot', 'Medium-sized Parking Slot', 'Large-size Parking Slot']
        const size = Math.round(Math.random() * (max - min) + min)
        const desc = descriptors[size]
        return {
            Value: size,
            Slot_Description: desc
        }
    }
}