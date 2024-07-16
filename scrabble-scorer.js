// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble! Enter a word:");
   let word = input.question();
   let selectedAlgorithm = scorerPrompt();
   let score = selectedAlgorithm.scorerFunction(word);
   console.log(`Score for '${word}': ${score}`);
};
function simpleScorer(word) {
   return word.length;
 }
 
 function vowelBonusScorer(word) {
   const vowels = ['A', 'E', 'I', 'O', 'U'];
   let score = 0;
 
   for (let i = 0; i < word.length; i++) {
     if (vowels.includes(word[i].toUpperCase())) {
       score += 3;
     } else {
       score += 1;
     }
   }
 
   return score;
 }
 

const scoringAlgorithms = [{
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
 },
 {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
 },
 {
   name: "Scrabble",
   description: "The scoring algorithm.",
   scorerFunction: scrabbleScorer
 }];

function scorerPrompt() {
   console.log("Which scoring algorithm would you like to use?");
   console.log("0 - Simple Score: Each letter is worth 1 point.");
   console.log("1 - Bonus Vowels: Vowels are 3 pts, consonants are 1 pt.");
   console.log("2 - Scrabble: The scoring algorithm.");
   
   let choice = input.question("Enter 0, 1, or 2: ");
   
 return scoringAlgorithms[choice];
}
function transform(oldPointStructure) {
   let newPointStructure = {};
   for (let pointValue in oldPointStructure) {
      for (let i = 0; i < oldPointStructure[pointValue].length; i++) {
      let letter = oldPointStructure[pointValue][i].toLowerCase();
      newPointStructure[letter] = parseInt(pointValue);
      }
   }
return newPointStructure;
}
   
const newPointStructure = transform(oldPointStructure);
    
   function scrabbleScorer(word) {
      word = word.toLowerCase();
      let score = 0;
    
      for (let i = 0; i < word.length; i++) {
        score += newPointStructure[word[i]];
      }
    
      return score;
   }

function runProgram() {
   initialPrompt();
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
