// generateDoors() is a function that returns an array of 3 objects each representing a door
// the doors have properties: num, prize and choice

function generateDoors() {
    const doors = [1, 2, 3]

    return doors.map(n => {
        return {
            num: n,
            prize: "goat",
            choice: false
        }
    })
}

// setWinnerDoor will take the array of door objects and randomly set one's prize to be a car

function setWinnerDoor(arr) {
    arr[Math.floor(Math.random() * 3)].prize = "car"
}

// setChoice will take the array of door objs and randomly set one to be "chosen" by setting it as true

function setChoice(arr) {
    arr[Math.floor(Math.random() * 3)].choice = true
}

// montyHallReveal will take the array of objects and return the number of a door that has a prize of "goat"
// AND does not have a choice of true

function montyHallReveal(arr) {
    const randomDoor = arr[Math.floor(Math.random() * 3)]
    return randomDoor.prize === "goat" && randomDoor.choice !== true ? randomDoor.num : montyHallReveal(arr)
}

// chooseOtherDoor will loop over the array of door objects.
// If the door object has the same num as what is returned from montyHallReveal()
// OR if the choice property is true then it will set that property to false
// ELSE it will set the choice property to true
// this represents the contestant's choice to switch to the door
// Monty hall did not reveal and is not the initial door they chose

function chooseOtherDoor(num, doors) {
    let doorsCopy = JSON.parse(JSON.stringify(doors))
    // console.log("copy of doors\n", doorsCopy)
    // console.log("num", num)
    for (let i = 0; i < doors.length; i++) {
        const door = doors[i]
        if (door.num === num || door.choice === true) {
            doorsCopy[i].choice = false
        } else {
            doorsCopy[i].choice = true
        }
    }
    return doorsCopy
}

function runTest(times) {
    let count = 0
    let wins = 0

    while (count < times) {
        const doors = generateDoors()
        setWinnerDoor(doors)
        setChoice(doors)
        // console.log(doors)
        // console.log(montyHallReveal(doors))
        const newdoors = chooseOtherDoor(montyHallReveal(doors), doors)
        
        for (const door of newdoors) {
            door.prize === "car" && door.choice === true ? wins++ : null
        }

        count++
    }

    const percentWins = wins / count
    console.log(`    The test ran ${times} times.
    The percentage the contestant chose correctly
    after switching their choice post Monty Hall Reveal is: 
    ${percentWins * 100}%`)
}

runTest(10000)