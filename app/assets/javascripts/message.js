$(function(){
  function buildHTML(message){
    let content = (message.content) ? `${ message.content}`:"";
    let image = (message.image) ? `<img class "lower-message" src=${message.image} >`:'';
      let html = `<div class="message" data-message-id="${message.id}">
      <div class="upper-message">
        <div class="upper-message__user-name">
          ${ message.user_name }
        </div>
        <div class="upper-message__date">
          ${message.created_at}
        </div>
      </div>
      <div class= "lower-message">
        ${image}
          <p class="lower-message__content">
            ${content}
          </p>
      </div>
    </div>`
    return html;
    }


  $('.new_message').on('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      let html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
      })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });

  });
  let reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    let href = 'api/messages#index {:format=>"json"}'
    let last_message_id = $('.message:last').data('message-id');

    $.ajax({
      url:  href,
      type: 'GET',
      data: {id: last_message_id},
      dataType: 'json'
    })


    .done(function(messages){
      let insertHTML='';
        messages.forEach(function (message){
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        });
    })
        .fail(function() {
          alert("自動更新に失敗しました");
        });
      }
      };
      setInterval(reloadMessages, 7000);
  });