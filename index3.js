var params = (new URL(document.location)).searchParams;
var key = params.get('key');

//let daytime2 = document.getElementById("textArea").value.trim();

   let today = new Date();
    console.log(today);

     let nen=today.getFullYear();
     let tuki=today.getMonth()+1;
     let niti=today.getDate();
     let ji=today.getHours();
     let hun=today.getMinutes();
    let byou =today.getSeconds();


$(function () {
    // 送信
    $('#form1').submit(function () {
  
        var s_code = $('input[name="serialcode"]').val();
        
        // var date = $('input[name="date"]').val();
        // var tool = $('input[name="tool"]').val();
        
  //var breed = obj.filter(function(input) {
  //return input.name.match(/breed/);});
        
    let msg={};
    
       msg = ["code：" + s_code] ;　 //トークに送信する内容

        
        
        sendText(String(msg)); 
      
        return false;
        
    });
});



function openQRCodeReader() {
    liff.scanCode()
        .then(async result => {
            if (result.value) {
                // QRコードのスキャンが成功した場合
                console.log("QRコードスキャン結果:", result.value);

                let qr_data = parseInt(result.value, 10); // 10進数

                try {
                    let cc = await sendQRValueToAPI_3(qr_data); // sendQRValueToAPI_2関数を非同期で実行し、処理を待つ


			
                    let bb = qr_data * niti + ji * hun;
                    let aaa = "qr_data:" + bb + cc;
                    sendText(aaa);
                } catch (err) {
                    console.error('Error sending QR value to API:', err);
                }
            }
        })
        .catch(err => {
            console.error(err);
        });
}






// IDトークンをGASに送信する関数
function sendQRValueToAPI_3(qrValue) {
    var payload = {
        qr_data: qrValue
    };

    var options = {
        method: 'post',
        contentType: 'application/x-www-form-urlencoded',
        payload: payload
    };

    var response = UrlFetchApp.fetch('https://script.google.com/macros/s/AKfycbyGxDjBCnYhK-eQ86yVr1_jqRsU3bcxeGE0uoP8beg-sFmeSICpcD1dre89ismqsTQ3/exec', options);
    var responseData = JSON.parse(response.getContentText());
	// var responseData =response.getContentText();

			 res=${jsonData.convertedValue} 
	
    return res
}
















function hukugo(text1){

let text= unicodeToText(text1);

   let shift =100;
let unicord_arr=[];
let encrypt_arr=[];

 
    for (let i = 0; i < text.length; i++) {
        
       unicoded=textToUnicode(String(text[i]))
      unicord_arr += String(Number.parseInt(unicoded)).padStart(5, '0')
      encrypt_arr += String(Number.parseInt(unicoded)-shift).padStart(5, '0')
      //let ac=unicodeToText(unicord_arr)
     //let ac_encrypt=unicodeToText(encrypt_arr)
    }

let hukugo = unicodeToText(encrypt_arr);
return hukugo

}
 
 
// ユニコードをテキストに戻す
function unicodeToText(unicodeText) {
    if (!unicodeText) {
        return '';
    }

    let text = '';
    for (let i = 0; i < unicodeText.length; i += 5) {
        const unicodeChar = parseInt(unicodeText.substr(i, 5), 10);
        text += String.fromCharCode(unicodeChar);
    }
    return text;
}



// 日本語テキストをユニコードに変換
function textToUnicode(text) {
    if (!text) {
        return '';
    }

    let unicodeText = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const unicodeChar = char.charCodeAt(0);
        unicodeText += String(unicodeChar).padStart(5, '0');
    }
    return unicodeText;
}
	







