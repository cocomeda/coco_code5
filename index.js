
        // LIFFの初期化
        liff.init({ liffId: '2001905227-7dKy6ERe' }, () => {
            if (liff.isLoggedIn()) {
                // ユーザーがログインしている場合
                sendIdTokenToGAS();
            } else {
                // ログインが必要な場合、ログインページを表示
                liff.login();
            }
        });

        // IDトークンをGASに送信する関数
        function sendIdTokenToGAS() {
            const idToken = liff.getIDToken();

            // ローディング画像表示
            $('#loading').show();

            // IDトークンをGASに送信
            $.ajax({
                url: 'https://script.google.com/macros/s/AKfycbz-ffWFPc36O-ptmFqijL10vbctVuUm1i_Yv3KgjKQotJnXtGlITC4klGh0cJ7RaS28Ww/exec',
                type: 'POST',
                data: { idToken: idToken },
                success: function (response) {
                    // 成功時の処理
                    console.log(response);
              sendText(response); 
                    //displayData(response);
                },
                error: function (error) {
                    // エラー時の処理
                    console.error(error);
                    alert('Failed to send ID Token to GAS.');
                },
                complete: function () {
                    // 通信完了時の処理（ローディング画像を非表示にし、コンテンツを表示）
                    $('#loading').hide();
                    $('#content').show();
                }
            });
        }



  
