/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting



// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var solution = []; //fixed
  var size = n; 
  board.togglePiece(0, 0);
  for (var i = 0; i < size; i++) {
    for (var j = 1; j < size; j++) {
      board.togglePiece(i, j);
      if (board.hasAnyRooksConflicts() === true) {
        board.togglePiece(i, j);
      }  
    }
  }

  for (var k = 0; k < size; k++) {
    solution.push(board.get(k));
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount; //fixed
  
  var factorial = function(n) {
    if (n === 0) {
      return 1;
    }
    return n * factorial(n - 1);
  };

  solutionCount = factorial(n);


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// hasAnyQueenConflictsOn: function(rowIndex, colIndex) 
// hasAnyQueensConflicts: function()


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution = []; //fixed
  var size = n;
  var count = 0;
  if (size === 0) {
    return solution;
  }
  var colStart = 0;
  var rowStart = 0;



  var recurse = function(rowStart, colStart, loopNum) {
    // toggle starting piece on row 0
    debugger;
    board.togglePiece(rowStart, colStart);
    count++;
    // start on nextRow (rowStart + 1)
    var currentRow = rowStart + 1;
    if (currentRow === size) {
      return;
    }
    //for (var i = rowStart + 1; i < size; i++) {
    var storeJ = [];
    // iterate through col, start on col 0
    for (var j = 0; j < size; j++) {
      // togglePiece
      board.togglePiece(currentRow, j);
        // no conflict
      if (board.hasAnyQueensConflicts() === false) {
        // increase count
        storeJ.push(j);
        board.togglePiece(currentRow, j);
      } else {
        // toggleOFF
        board.togglePiece(currentRow, j);
      }
    }
    if (storeJ.length > 0) {
      loopNum++;
      for (var k = 0; k < storeJ.length; k++) {
        if (count === n) {
          return;
        }
        recurse(currentRow, storeJ[k], loopNum);
      }
      loopNum--;
    }
     
    // base case:
    if (count === n) {
      loopNum--;
      return;
    } else if (loopNum !== 0) {
      board.togglePiece(rowStart, colStart);
      count--;
      loopNum--;
      return;
    } else if (count !== n) {
      colStart++;
      count = 0;
      board = new Board({n: n});
      if (colStart === size) {
        return;
      }
      return recurse(0, colStart, 0);
    }
  };

  recurse(rowStart, colStart, 0);

  for (var k = 0; k < n; k++) {
    solution.push(board.get(k));
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
