$(document).ready(function(){

    //on click of a start button, load first question
    var i;
    var quiz=[];
    var Count;
    var imageChoice;
    
    var correct=0;
    var missed =0;
    var attempted = 0;
    
    var rightAns;
    var intervalTimer;
    var delayButtonAlert;
    var newQuest;
    var ansAttempt;
    
    
    
    quizBuild();        //put data into quiz constructor function to make object
    
    i = 0;
    
    hideStuff();
    
    //first question is loaded with a click
    
    $("#new-question").on("click",displayNewQuestion);
    
    function displayNewQuestion(){
    
        //hide the button after the first click;  new questions
        //will automatically display with timers
    
        if (i > 0) {clearTimeout(newQuest);}
    
        $("#new-question").hide();
        hideStuff();
    
        //send question and options info to screen
    
        ansAttempt = false;
        console.log("New question " + i +  " will display now");
        quizWrite();
    
        //Initialize count & display
        Count = 30;
        intervalTimer = setInterval(countDown,1000)
    
        //take this path if time expires..
        delayButtonAlert = setTimeout(notAttempted,30000)   
    }
    
       //take this path if they attempt an answer ...
      // this had to come out of my new question loop
    
       $(document).on("click",".answer",Attempted);
       
    
    function countDown(){
        Count -= 1;
        $("#seconds-count").html('<h3> You have '+ Count + " seconds left</h3> ") 
        return Count;
    }
    
    function hideStuff(){
    
        $(".stats").hide();
        $("#message").hide();
        $("#picture").hide();
        $("#Reveal").hide();
    }
    
    
    function Attempted(){
        
            //this executes after an answer was attempted
            //clear timers when this is called
            
            clearTimeout(delayButtonAlert);
            clearTimeout(intervalTimer);
        
            // this function is called if an answer is
            // attempted before the timeout
    
            ansAttempt = true;
            $("#message").show();
            
    
            userChoice = parseInt($(this).val());
            console.log(userChoice, i);
        
            attempted += 1;
        
            if (userChoice == quiz[i].ans){
                $("#message").html('correct!');
                correct += 1;
                }
            else {
                $("#message").html('sorry!');   
                missed += 1;
            }
        
            $(".stats").show();
            displayStats();
        
            //call the function that displays the answer and gif
        
            displayAnsImg();
        }
        
        function notAttempted(){
        
             //this executes after 30 seconds have passed
            //clear timers when this is called
            if (ansAttempt != true){
    
            clearTimeout(delayButtonAlert);
            clearTimeout(intervalTimer);
        
            //other two stats will not change
        
            missed +=1;
        
            $(".stats").show();
            displayStats();
        
            displayAnsImg();
            }
            else {
                return
            }
        }   
    
    
    function displayAnsImg(){
    
         //start a 5-second timer so answers will remain
        //for 5 seconds before a new question is displayed
    
        if (i < quiz.length){
            newQuest = setTimeout(displayNewQuestion,5000);
        }
        else {
            $("#message").html("Game Over");
            //$("#new-question").show();          //offer the option to run the game again
    
            document.getElementById("question").style.opacity = "0.0";
            document.getElementById("option-1").style.opacity = "0.0";
            document.getElementById("option-2").style.opacity = "0.0";
            document.getElementById("option-3").style.opacity = "0.0";
            document.getElementById("option-4").style.opacity = "0.0";
    
            //       $("#question").hide();
            $("#seconds-count").hide();
            //       $(".answer").hide();
            return;
        }
        
        imageChoice = imageInsert();
    
        $("#picture").html(imageChoice);
        $("#Reveal").html("The correct answer is: " + quizAnswer());
    
        $("#picture").show();
        $("#Reveal").show();
    
        //display the correct answer and the image
        //increment i only AFTER displaying answer and image
    
        i++; 
        console.log("Answer and image will display now");
        
    }
    
    
    function quizConstructor(question,choice1,choice2,choice3,choice4,ans,imageURL,attempted){
    
        this.question = question;
        this.choice1   = choice1;
        this.choice2   = choice2;
        this.choice3   = choice3;
        this.choice4   = choice4;
        this.ans       = ans;
        this.imageURL  = imageURL;
        this.attempted = attempted;
    }
    
    function quizBuild(){
    
    //    console.log('quizBuild');
    
        quiz[0] = new quizConstructor('She Thinks I’m Too Critical. That’s Another Fault Of Hers','Lucille','GOB','George Michael','Lyndsey',1,"",false);
        quiz[1] = new quizConstructor('Im afraid I just blue myself','Michael','Maeby','Tobias','Buster',3,'',false);
        quiz[2] = new quizConstructor('A little alcohol poisoning never killed anyone','George, Sr','Lucille','GOB','Maeby',3,'',false);
        quiz[3] = new quizConstructor('Say goodbye to these!','Lyndsey','Kitty','Buster','Michael',2,'',false);
        quiz[4] = new quizConstructor('I had to. Its vodka.It goes bad once its opened','Ann Veal','Annyong','Bob Loblaw','Lyndsey',4,'',false);
        quiz[5] = new quizConstructor('Theres always money in the Banana Stand!','Buster','Steve Holt','George Sr','Oscar',3,'https://media.giphy.com/media/nkOqBHEJ1hcTm/giphy.gif',false);
        // quiz[6] = new quizConstructor('Well, Id rather be dead in California than alive in Arizona'Lucille','Buster','GOB','Michael',1,'https://media.giphy.com/media/l0HlHPUWqZ8iTXjAA/giphy.gif',false);
        quiz[7] = new quizConstructor('Steve Holt!','GOB','Maeby','Michael','Steve Holt',4,'https://media.giphy.com/media/3o85xGRWMlHdGB1vMs/giphy.gif',false);
        quiz[8] = new quizConstructor('I dont understand the question and I wont respond to it','Lucille','Lyndsay','Mr Bananagrabber','Franklin Delano Bluth',1,'https://media.giphy.com/media/11mVKGuLwmfAZ2/giphy.gif',false);
        // quiz[9] = new quizConstructor('Its a great day...for being sad'Tobias','George Michael','DeBrie Bardeaux','The Narrator',2,'',false);
      
        return quiz
    }
    
    
    function quizWrite(){
    
     //   console.log('quizWrite');
    
        $("#question").html("Which character said: " + quiz[i].question + " ?");
        
        $("#option-1").html(quiz[i].choice1);
        $("#option-2").html(quiz[i].choice2);
        $("#option-3").html(quiz[i].choice3);
        $("#option-4").html(quiz[i].choice4);
     
    }
    
    //this function doesn't get called. I compare the
    // value of the button to the answer instead ...
    
    function quizAnswer(){
        if (quiz[i].ans == 1){
            quizAns = quiz[i].choice1;
        }else if (quiz[i].ans == 2){
            quizAns = quiz[i].choice2;
        }else if (quiz[i].ans == 3){
            quizAns = quiz[i].choice3;
        }if (quiz[i].ans == 4){
            quizAns = quiz[i].choice4;
        }
        console.log(quizAns);
    
        return quizAns;
    }
    
    
    
    function displayStats(){
        $(".stats").html("<h4> Correct: "+correct+'<br>'+"Incorrect: " + missed + '<br>' +"Attempted: " +attempted+ '</h4>');
    }
    
    
    
    function imageInsert(){ 
    
     //   console.log(quiz[i].imageURL);
    
        var imageChoice = $('<img>');
        
        imageChoice.addClass('animal');
        
        imageChoice.attr('src', quiz[i].imageURL);
    
        imageChoice.attr('width','400px');
                          
       return imageChoice;
    }
    
    
    
    
    })      //end of document ready

    