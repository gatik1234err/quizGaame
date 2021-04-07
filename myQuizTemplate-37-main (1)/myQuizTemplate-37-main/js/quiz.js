class Quiz {
    constructor() { }
  
    getState() {
      var gameStateRef = database.ref('gameState');
      gameStateRef.on("value", function (data) {
        gameState = data.val();
      })
  
    }
  
    update(state) {
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start() {
      if (gameState === 0) {
        contestant = new Contestant();
        var contestantCountRef = await database.ref('contestantCount').once("value");
        if (contestantCountRef.exists()) {
          contestantCount = contestantCountRef.val();
          contestant.getCount();
        }
        question = new Question()
        question.display();
      }
    }
  
    play() {
      //write code here to hide question elements
      question.hide();
  
  
      //write code to change the background color here
      background("Yellow");
  
      //write code to show a heading for showing the result of Quiz
      fill(0);
      textSize(30);
      text("Result of the Quiz", 340, 50);
      text("----------------------------", 320, 65);
  
      //call getContestantInfo( ) here
      Contestant.getPlayerInfo();
  
      //write condition to check if contestantInfor is not undefined
      
      if (allContestants !== undefined) {
        var display_Answers = 230;
        //write code to add a note here
        textSize(20)
        text("**Note : Contestant who answered correctly are highlighted in green colour")
  
      //write code to highlight contest who answered correctly
        for (var plr in allContestants) {
          var correctAns = "2";
          if (correctAns === allContestants[plr].answer) {
            fill("Green");
            text(allContestants[plr].name +" "+"gave the correct answer", 380, display_Answers+30);
          }
          else {
            fill("Black")
            text("Option 2) Joe Biden is the correct answer. Joe Biden is the current president of America.", 50, display_Answers+100)
            fill("red");
            text(allContestants[plr].name +" "+"gave the incorrect answer", 380, display_Answers+40);
            
          }
          display_Answers += 30;
          textSize(20);
          text(allContestants[plr].name + ": Option " + allContestants[plr].answer, 100, display_Answers);
          
        
        }
      }
    }
  }
  
  
  
  
  