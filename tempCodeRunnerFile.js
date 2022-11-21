 getRandomSize() {
        // SP = 0, MP = 1, LP = 2
        
        const max = 2
        const min = 0
        const descriptors = ['SP', 'MP', 'LP']
        const size = Math.round(Math.random() * (max - min) + min)
        const desc = descriptors[size]
        return  {
            value: size,
            desc: desc
        }
    }