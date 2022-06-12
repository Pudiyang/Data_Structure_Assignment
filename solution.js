var fs = require("fs");

// Time: O(N)
// Space: O(N)
const solve = (intervals) => {
    // sort according to the start point 
    intervals.sort((a, b) => a[0] - b[0])
    let impact = intervals.map((i) => i[1] - i[0])

    // find the lifegurad with minimum impact and fire him
    let guard = null
    for (let i = 0; i < intervals.length - 1; i++) {
        let curr = intervals[i], next = intervals[i + 1]
        if (curr[1] > next[0]) {
            let overlap = curr[1] - next[0]
            impact[i] -= overlap
            impact[i + 1] -= overlap
        }
    }
    if (!guard) guard = impact.indexOf(Math.min(...impact))
    intervals.splice(guard, 1)

    // calculate the maximum coverage
    let maximum_coverage = 0
    for (let i = 0; i < intervals.length; i++) {
        const [start, end] = intervals[i]
        let coverage = end - start
        // skip if next interval is covered by current interval
        while (i + 1 < intervals.length && intervals[i + 1][1] <= end) {
            i++
        }
        if (i + 1 < intervals.length && intervals[i + 1][0] < end) {
            coverage -= end - intervals[i + 1][0]
        }
        maximum_coverage += coverage
    }
    return maximum_coverage
}

const readFile = (i) => {
    let data = fs.readFileSync(i + '.in').toString(), 
    raw_intervals = data.toString().split("\n"),
    intervals = []
    for (let i = 1; i < raw_intervals.length; i++) {
        const interval = raw_intervals[i].split(" ")
        if (interval[0] && interval[1]) {
            intervals.push([Number.parseInt(interval[0]), Number.parseInt(interval[1])])
        }
    }
    return intervals
}

// main logic
for (let i = 1; i <= 10; i++) {
    const intervals = readFile(i)
    const coverage = solve(intervals)
    fs.writeFileSync(i + ".out", coverage.toString())
}


