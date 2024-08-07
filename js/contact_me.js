$(function () {
  $("input,textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function ($form, event) {
      event.preventDefault(); // prevent default submit behaviour

      // get values from FORM
      var name = $("input#name").val();
      var email = $("input#email").val();
      var contact = $("input#contact").val();
      var job_title = $("input#job_title").val();
      var company_name = $("input#company_name").val();
      var country = $("input#country").val();
      var project_name = $("input#project_name").val();
      var language = $("input#language").val();
      var message = $("textarea#inquiry").val();
      var firstName = name; // For Success/Failure Message

      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(" ") >= 0) {
        firstName = name.split(" ").slice(0, -1).join(" ");
      }

      $.ajax({
        url: "./send_mail.php",
        type: "POST",
        data: {
          name: name,
          email: email,
          contact: contact,
          job_title: job_title,
          company_name: company_name,
          country: country,
          project_name: project_name,
          language: language,
          message: message,
        },
        cache: false,
        success: function () {
          // Success message
          $("#success").html("<div class='alert alert-success'>");
          $("#success > .alert-success")
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            )
            .append("</button>");
          $("#success > .alert-success").append(
            "<strong>Your message has been sent. </strong>"
          );
          $("#success > .alert-success").append("</div>");

          //clear all fields
          $("#contactForm").trigger("reset");
        },
        error: function () {
          // Fail message
          $("#success").html("<div class='alert alert-danger'>");
          $("#success > .alert-danger")
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            )
            .append("</button>");
          $("#success > .alert-danger").append(
            "<strong>Sorry " +
              firstName +
              ", it seems that my mail server is not responding. Please try again later!"
          );
          $("#success > .alert-danger").append("</div>");

          //clear all fields
          $("#contactForm").trigger("reset");
        },
      });
    },
    filter: function () {
      return $(this).is(":visible");
    },
  });

  $('a[data-toggle="tab"]').click(function (e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$("#name").focus(function () {
  $("#success").html("");
});
