//抓取Form裡面傳送的資料來使用

const weatherForm = document.querySelector('form'); //querySelector抓取的是第一個 EX.第一個form 第一個input
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1'); //抓取id=message-1的資料
const messageTwo = document.querySelector('#message-2'); //.className //#idName

//messageOne.textContent = 'From JavaScript'; //更改index <p>的內容

weatherForm.addEventListener('submit', (e) => { //e=event
    e.preventDefault(); //讓browser不重新刷新

    const location = search.value;

    messageOne.textContent = 'Searching...';

    //將location丟到API 取得回應
    fetch(`/weather?address=${encodeURIComponent(location)}`).then((response) => { //將http://localhost:3000/weather?address=... 更改為/weather?address=... 使得執行heroku就自動對應到heroku, local對應到local
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error; //讓<p>顯示error訊息
                messageTwo.textContent = '';
            } else {
                messageOne.textContent = data.forecast;//讓<p>顯示forecast訊息
                messageTwo.textContent = data.location;//讓<p>顯示location訊息
                ;
            }
        });
    });
});