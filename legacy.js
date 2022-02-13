var funtimes = new Vue({
  el: '#funtimes',
  data: {
      mode: 'setup',
      setA: [2, 3],
      setB: [1, 2, 3, 4],
      problems: [],
      currProbIndex: 0,
      responseEmoji: "🤔",
      answer:'',
      errorMessage:'',
      forceCorrect: false,
      modal: 'notShowing'
  },

  methods: {
      setUp(){
          this.mode = 'setup';
          this.problems = [];
      },

      practice(){
          if (this.setA.length < 1 || this.setB.length < 1 ){
              this.errorMessage = 'Hey, you need to choose at least one factor to practice from each list.';
          }

          else {
              this.mode = 'practice';
              for (var i = 0; i < this.setA.length; i++) {
                  var factorA = this.setA[i];
                  for (var k=0; k < this.setB.length; k++){
                      var prob = {};
                      prob.factor1 = this.setA[i];
                      prob.factor2 = this.setB[k];
                      prob.showProduct = false;
                      prob.product = prob.factor1 * prob.factor2;
                      this.problems.push(prob);
                  }
              }
          }
      },

      toggleInSet: function(num, set){
          indS = set.indexOf(num);
          if ( indS > -1 ){
              set.splice(indS, 1);
          } else {
              set.push(num);
          }
          if (this.setA.length > 0 || this.setB.length > 0){
              this.errorMessage = '';
          }
      },

      incrementIt(){
          this.currProbIndex++;
          if (this.currProbIndex > this.problems.length -1){
              this.currProbIndex = 0;
          }
          this.resetPracticeArea();
      },

      decrementIt(){
          this.currProbIndex--;
          if (this.currProbIndex < 0 ){
              this.currProbIndex = this.problems.length - 1;
          }
          this.resetPracticeArea();
      },

      indexUp(){
          if ( this.forceCorrect == false ) {
              this.incrementIt();
          }

          if ( this.forceCorrect == true && this.isCorrect() ){
              this.incrementIt();
          }

          else if ( this.forceCorrect == true && !this.isCorrect() ){
              this.errorMessage = 'You need to get the right answer to go to the next card';
          }
      },

      indexDown(){
          if ( this.forceCorrect == false ) {
              this.decrementIt();
          }

          if ( this.forceCorrect == true && this.isCorrect() ){
              this.decrementIt();
          }

          else if ( this.forceCorrect == true && !this.isCorrect() && !this.answer == ''){
              this.errorMessage = 'You need to get the right answer to go to the previous card';
          }
      },

      check(){
          if (this.answer == '' || this.answer == ' ' || this.answer == "__") {
              this.responseEmoji = "🤔";
          } else if (this.answer == this.problems[this.currProbIndex].product){
              this.responseEmoji = "😄";
          } else {
              this.responseEmoji = "🙁";
          }

          if (this.isCorrect()){
              this.errorMessage = '';
          }

          if (!this.isCorrect() && this.answer == '' || this.answer == ' ' || this.answer == "__"){
              this.errorMessage = '';
          }
      },

      isCorrect(){
          return this.answer == this.problems[this.currProbIndex].product ? true : false;
      },

      shuffle(){
          if ( this.forceCorrect == false ){
              this.problems.sort(() => Math.random() * 2 - 1);
              this.resetPracticeArea();
          }

          if ( this.forceCorrect == true && this.isCorrect() ){
              this.problems.sort(() => Math.random() * 2 - 1);
              this.resetPracticeArea();
          }

          else if (this.forceCorrect == true && !this.isCorrect() ){
              this.errorMessage = "You cannot shuffle until you get the correct answer";
          }
      },

      resetPracticeArea(){
          this.responseEmoji = "🤔";
          this.answer = "";
          document.getElementById("theanswer").focus();
          this.errorMessage = '';
      },

      handleKeys(e){
          if ( e.keyCode == 39 || e.keyCode == 13 ){
              this.indexUp();
          }

          if ( e.keyCode == 37 ){
              this.indexDown();
          }
      },

      showInfoModal(){
          this.modal = 'isShowing';
      },

      hideInfoModal(){
          this.modal = 'notShowing';
      }

  }
});

window.addEventListener('keydown', function(e){
  //console.log(e.keyCode);
  if ( e.keyCode == 39 || e.keyCode == 37 || e.keyCode == 13 ){
      funtimes.handleKeys(e);
  }
});
