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
        .then(result => {
            if (result.value) {
                // QRコードのスキャンが成功した場合
                console.log("QRコードスキャン結果:", result.value);

                let qr_data = parseInt(result.value, 10); // 10進数

                // sendQRValueToAPI関数を非同期で呼び出し、結果を待つ
                sendQRValueToAPI(qr_data)
                    .then(bbbb => {
                        let bb = qr_data * niti + ji * hun;
                        let aaa = "qr_data:" + bb + bbbb;
                        sendText(aaa);
                    })
                    .catch(err => {
                        console.error('Error sending QR value to API:', err);
                    });
            }
        })
        .catch(err => {
            console.error(err);
        });
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
	








function sendQRValueToAPI(qrValue) {
	var apiUrl = 'https://script.google.com/macros/s/AKfycbx_U92XH20lBCNP4dT1hLN8Da2ttcD8Ctc_WybWfHIPd0-b2RSXwZGpT8IVssKa5UoVDA/exec'; //POST
    // var apiUrl = 'https://script.google.com/macros/s/AKfycbxBqODd6ebAWSWUy12pwQR_cMC0g1sJ5_KIyzTOXY60A2ZkUBMs_vnZGF9-Darc5wYidQ/exec'; //GET
	
    var payload = {
        qrValue: qrValue
    };
    var options = {
        method: 'post',
        payload: JSON.stringify(payload),
        contentType: 'application/json'
    };

    // fetch関数を使用してAPIにリクエストを送信
    return fetch(apiUrl, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('APIレスポンスがエラーを返しました');
            }
            return response.json(); // JSON形式でレスポンスを解析して返す
        })
        .then(data => {
            return data.convertedValue; // convertedValueを返す
        })
        .catch(err => {
            throw err;
        });
}

