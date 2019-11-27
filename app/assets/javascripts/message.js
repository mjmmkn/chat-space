$(function(){
  function buildHTML(message){
    // console.log(message)
    if (message.image) {
      let html = `<div class="message">
      <div class="upper-message">
        <div class="upper-message__user-name">
          ${ message.user_name }
        </div>
        <div class="upper-message__date">
          ${message.created_at}
        </div>
      </div>
      <div class="lower-message">
      ${ message.image}
          <p class="lower-message__content">
            ${ message.content }
          </p>
      </div>
    </div>`
    return html;
    
    } else {
      let html = `<div class="message">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${ message.user_name }
                      </div>
                      <div class="upper-message__date">
                        ${ message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                    <p class="lower-message__content">
                      ${ message.content}
                    </p>
                    </div>
                  </div>`
       return html;
    }
      
  }

  $('.new_message').on('submit', function(e) {
    e.preventDefault();
    // console.log('a')
    // let form = $(".form__message").val();
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
      $('.form__message').val('');
      $('.form__submit').prop('disabled', false);
      })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });

    });
  });