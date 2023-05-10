function calculateAverage(accurateVotes, io) {
    const average = accurateVotes.reduce((acc, curr) => acc + curr, 0) / accurateVotes.length;
  
    // Find nearest Fibonacci-number
    let prev = 1;
    let current = 1;
  
    while (current <= average) {
      const next = prev + current;
      prev = current;
      current = next;
    }
  
    const nearestFibonacci =
      current - average < average - prev ? current : prev;
  
    console.log("medeltal till frontend" + nearestFibonacci);
    io.emit("average", nearestFibonacci);
  }

  module.exports = calculateAverage;
  