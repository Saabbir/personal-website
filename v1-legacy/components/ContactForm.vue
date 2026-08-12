<template>
  <div class="c-contact-form-container">
    <form
      action="https://formcarry.com/s/OZHIhto2IeZ"
      method="POST"
      accept-charset="UTF-8"
      class="c-form c-contact-form"
      id="c-formcarry-form"
    >
      <input type="hidden" name="_gotcha" /><!-- use this to prevent spam -->
      <div class="c-form__group c-form__group--required">
        <label class="c-form__label" for="user_name">Name</label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          class="c-form__control"
          placeholder="Your name"
          required
        />
      </div>
      <div class="c-form__group c-form__group--required">
        <label class="c-form__label" for="user_email">Email</label>
        <input
          type="email"
          id="user_email"
          name="user_email"
          class="c-form__control"
          placeholder="Your email address"
          required
        />
      </div>
      <div class="c-form__group c-form__group--required">
        <label class="c-form__label" for="user_msg">Message</label>
        <textarea
          id="user_msg"
          name="user_msg"
          class="c-form__control"
          placeholder="Your message"
          required
        ></textarea>
      </div>
      <div class="c-form__group">
        <button
          type="submit"
          class="c-button c-button--lg c-button--block c-form__submit-button"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "contact-form",
  mounted() {
    // Submit contact form
    $(function () {
      $(".c-contact-form").submit(function (e) {
        // Prevent default form submission
        e.preventDefault();

        // Get endpoint URL
        var href = $(this).attr("action");

        // Create AJAX request to submit the form
        $.ajax({
          type: "POST",
          dataType: "json",
          url: href,
          data: $(this).serialize(),
          timeout: 6000, // sets timeout to 6 seconds
          beforeSend: function () {
            $(".c-form__submit-button")
              .text("Submitting...")
              .css("pointer-events", "none")
              .append('<div class="c-loader"></div>');
          },
          success: function (response) {
            if (response.status == "success") {
              // Remove loader
              $(".c-loader").remove();

              // Success text
              $(".c-form__submit-button").text("Submitted successfully!");

              // After 3 seconds, get back to normal state
              setTimeout(function () {
                // Reset submit button text
                $(".c-form__submit-button")
                  .text("Submit")
                  .css("pointer-events", "auto");

                // Reset form inputs
                document.querySelector(".c-contact-form").reset();

                // Focus on user name input field
                $(`input#user_name`).trigger("focus");
              }, 3000);
            } else {
              alert("An error occurred: " + response.message);
            }
          },
        });
      });
    });
  },
};
</script>

<style></style>
