/*****************************************
Treehouse Fullstack Javascript Techdegree,
project #3: "Interactive form v1"
by Ole Petter Baugerød Stokke
www.olepetterstokke.no/treehouse/project3
*****************************************/

//**************************************************
//** standard validation for text input elements ***
//**************************************************

//validating when keys are pressed (real-time validation)
$("form").keyup( (e) => {
  validate(e.target); //send target to validation function
});

//validating when elements looses focus, as well
$("form").focusout( (e) => {
  validate(e.target);
});

//**************************************************
//** validate() function ***************************
//**************************************************
//** the validate() function will be called from ***
//** the element, and depending the element ********
//** (theTarget) the apropriate validation will ****
//** be made and forwarded to handleError () *******
//**************************************************

function validate (theTarget) {
  //validating name
  if (theTarget.id == "name"){
    if ($(theTarget).val() == "") { //empty?
      handleError(theTarget, "(empty)");
    } else { //no error
        handleError(theTarget,"");
      }
  }

  //validating email input
  else if (theTarget.id == "mail"){
    const criteria = /\S+@\S+\.\S+/; //something@something.something
    if ($(theTarget).val() == "") { //empty?
      handleError(theTarget,"(empty)");
    } else if (criteria.test($(theTarget).val())) { //right format?
        handleError(theTarget,""); //no error
      } else {
          handleError(theTarget,"(not valid)");
        }
  }

  //validating credit card number
  else if (theTarget.id == "cc-num") {
    if ($(theTarget).val() == "") { //empty?
      handleError(theTarget,"(empty)");
    } else if ($.isNumeric($(theTarget).val()) && //a number
        $(theTarget).val().length >= 13 && //between 13
        $(theTarget).val().length <= 16) { //and 16 digits long?
          handleError(theTarget,""); //no error
        } else {
            handleError(theTarget,"(13-16 digits)");
          }
  }

  //validating zip code
  else if (theTarget.id == "zip") {
    if ($(theTarget).val() == "") { //empty?
      handleError(theTarget,"(empty)");
    } else if ($.isNumeric($(theTarget).val()) && //a number
        $(theTarget).val().length == 5) { //5 digits long?
          handleError(theTarget,""); //no error
        } else {
            handleError(theTarget,"(5 digits)");
          }
  }

  //validating cvv code
  else if (theTarget.id == "cvv") {
    if ($(theTarget).val() == "") { //empty?
      handleError(theTarget,"(empty)");
    } else if ($.isNumeric($(theTarget).val()) && //a number
        $(theTarget).val().length == 3) { //3 digits long?
          handleError(theTarget,"",false); //no error
        } else {
            handleError(theTarget,"(3 digits)");
          }
  }

  //validating acticities
  else if ($(theTarget).hasClass("activities")) {
    if ($(".activities input[type=checkbox]:checked").length > 0) { //some checked?
      handleError(theTarget,""); //no error
    } else {
      handleError(theTarget,"(no selected activites)");
      }
  }
}

//**************************************************
//** handleError() function ************************
//**************************************************
//** Each error will have a errorTarget and a ******
//** errorMessage. This message will be displayed. *
//** If no errorMessage is given, this means *******
//** there's no error. The message and styled ******
//** error class will be added or removed. *********
//**************************************************

function handleError (errorTarget, errorMessage) {
  //where to output the error message (text)
  if ($(errorTarget).hasClass("activities")) { //activities
    text = $("#activities-legend");
  } else { //for all others, use the target's label
         text = $("label[for='" + errorTarget.id + "']");
    }

  $(text).find("span").remove(); //remove old message, if any

  if (errorMessage != "") { //yes, there's an error
    text.html(text.html() + //display error message
      "<span class='message'>\u2718 " + errorMessage + "</span>");
    $(errorTarget).addClass("error"); //add error class for error-styling
  } else { //no, there's no error
      text.html(text.html() + //display checkmark
        "<span class='message'>\u2714 " + "</span>");
      $(errorTarget).removeClass("error"); //remove error class
    }
}

//**************************************************
//*** basic info, set focus on first field *********
//**************************************************

$("#name").focus();


//***************************************************
//*** job role - hide/show custom role input ********
//***************************************************

$("#other-title").hide(); //hide by default

$("#title").change( () => {
  if ($("#title").val() == "other") { //other selected
    $("#other-title").show();
    $("#other-title").focus();
  } else { //other not selected
      $("#other-title").hide();
    }
});


//**************************************************
//*** t-shirt info - display right color options ***
//**************************************************

$("#colors-js-puns").hide(); //hide color-picker when no design selected

$("#design").change( () => {
  $("#color option").hide(); //hide all options before showing right ones

  //show right colors for selected design
  if ($("#design").val() == "js puns") {
    $("#colors-js-puns").show(); //show the picker
    $("#color option[value='cornflowerblue']").show(); //show right colors
    $("#color option[value='darkslategrey']").show();
    $("#color option[value='gold']").show();
    $("#color").val("cornflowerblue"); //select the first one as default
  } else if ($("#design").val() == "heart js") {
      $("#colors-js-puns").show();
      $("#color option[value='tomato']").show();
      $("#color option[value='steelblue']").show();
      $("#color option[value='dimgrey']").show();
      $("#color").val("tomato");
    } else { //hide picker if no theme selected
        $("#colors-js-puns").hide();
    }
});


//*****************************************************************
//*** register for activities - avoid collisions, calculate sum ***
//*****************************************************************

$(".activities").change ( () => {
  validate($(".activities")[0]);   //real-time validation while using the form

  //reset the sum and all checkboxes before re-evaluation/calculation
  let totalSum = 0;
  $(".activities input").attr("disabled", false);

  //logic for main conference
  if ($("input[name='all']").prop("checked")) {
    totalSum += 200;
  }

  //js-frameworks crashes with express, disable if selected and add to sum
  if ($("input[name='js-frameworks']").prop("checked")) {
    totalSum += 100;
    $("input[name='express']").attr("disabled", true);
  } else if ($("input[name='express']").prop("checked")) {
      totalSum += 100;
      $("input[name='js-frameworks']").attr("disabled", true);
    }

  //js-libs crashes with node, disable if selected and add to sum
  if ($("input[name='js-libs']").prop("checked")) {
    totalSum += 100;
    $("input[name='node']").attr("disabled", true);
  } else if ($("input[name='node']").prop("checked")) {
      totalSum += 100;
      $("input[name='js-libs']").attr("disabled", true);
    }

  //build-tools doesn't crash with anything, just add to sum
  if ($("input[name='build-tools']").prop("checked")) {
    totalSum += 100;
  }

  //npm doesn't crash with anything, just add to sum
  if ($("input[name='npm']").prop("checked")) {
    totalSum += 100;
  }

  $("#total").text(totalSum); //display the calculated sum
});


//**************************************************
//*** payment, show/hide correct elements **********
//**************************************************

//hide all (by default) non-selected options
$("#paypal").hide();
$("#bitcoin").hide();

//show/hide requested options
$("#payment").change( () => {
  if ($("#payment").val() == "credit card") {
    $("#credit-card").show();
    $("#paypal").hide();
    $("#bitcoin").hide();
  } else if ($("#payment").val() == "paypal") {
      $("#paypal").show();
      $("#credit-card").hide();
      $("#bitcoin").hide();
    } else if ($("#payment").val() == "bitcoin") {
        $("#bitcoin").show();
        $("#paypal").hide();
        $("#credit-card").hide();
      }
});

//**************************************************
//*** submitting the form, if validated ************
//**************************************************

$("#register").click( (e) => {
  e.preventDefault(); //dont submit before validation

  $(".error").removeClass("error"); //remove all errors before re-validation

  //validating all required fields
  validate($("#name")[0]);
  validate($("#mail")[0]);
  validate($(".activities")[0]);

  //validate payment if credit card is selected
  if ($("#payment").val() == "credit card") {
    validate($("#cc-num")[0]);
    validate($("#zip")[0]);
    validate($("#cvv")[0]);
  }

  //if no errors exists, as in no error-classes found => submit
  if ($(".error").length == 0){
    $("form").submit();
  } //else => errors will display, and form will not submit
});
