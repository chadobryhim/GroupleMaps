$(document)
  .ready(function() {
    $('.ui.form')
      .form({
        fields: {
          email: {
            identifier: 'email',
            rules: [{
                type: 'empty',
                prompt: 'Please enter your e-mail'
              },
              {
                type: 'email',
                prompt: 'Please enter a valid e-mail'
              }
            ]
          },
          password: {
            identifier: 'password',
            rules: [{
                type: 'empty',
                prompt: 'Please enter your password'
              },
              {
                type: 'length[6]',
                prompt: 'Your password must be at least 6 characters'
              }
            ]
          }
        }
      });
  });

$("#aboutBtn").click(function() {
  $('.ui.right.sidebar')
    .sidebar('setting', 'transition', 'overlay')
    .sidebar('toggle');
});

$("#accountBtn").click(function() {
  $('.ui.left.sidebar')
    .sidebar('setting', 'transition', 'overlay')
    .sidebar('toggle');
});

$("#resultsBtn").click(function() {
  $('.ui.bottom.sidebar')
    .sidebar('setting', 'transition', 'overlay')
    .sidebar('toggle');
});

$("#closeBBtn").click(function() {
  $('.ui.bottom.sidebar')
    .sidebar('setting', 'transition', 'overlay')
    .sidebar('toggle');
});

$("#closeRBtn").click(function() {
  $('.ui.right.sidebar')
    .sidebar('setting', 'transition', 'overlay')
    .sidebar('toggle');
});

$("#closeLBtn").click(function() {
  $('.ui.left.sidebar')
    .sidebar('setting', 'transition', 'overlay')
    .sidebar('toggle');
});
