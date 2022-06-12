// Time: O(N)
// Space: O(N)
const solution = (intervals) => {
    // sort according to the start point 
    // Time: O(logN)
    intervals.sort((a, b) => a[0] - b[0])
    let impact = intervals.map((i) => i[1] - i[0])
    
    // find the lifegurad with minimum impact and fire him
    // Time: O(N)
    for (let i = 0; i < intervals.length - 1; i++) {
        let curr = intervals[i], next = intervals[i + 1]
        if (curr[1] > next[0]) {
            let overlap = curr[1] - next[0]
            impact[i] -= overlap 
            impact[i + 1] -= overlap
        }
    }
    let firedGuard = impact.indexOf(Math.min(...impact))
    // Time: O(N)
    intervals.splice(firedGuard , 1)
    
    // calculate the maximum coverage
    // Time: O(N)
    let maximum_coverage = 0
    for (let i = 0; i < intervals.length; i++) {
        let coverage = intervals[i][1] - intervals[i][0]
        if (i + 1 < intervals.length && intervals[i + 1][0] < intervals[i][1]) {
            coverage -= intervals[i][1] - intervals[i + 1][0]
        }
        maximum_coverage += coverage
    }
    return maximum_coverage
  }

  const input = [[1, 4], [5, 9], [3, 7]]
  console.log(solution(input))