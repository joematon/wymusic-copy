let hotsong = document.querySelector("#second")
fetch("http://localhost:3000/top/list?idx=1",{
    method:"GET",
    mode:"cors"
})
    .then(r=>{
        if (r.status==200)
        {
            return r.json();
        }
    })
    .then(data=>{
        console.log(data);
        let output="";
        output+=`
                 <div class="top">
                    <div class="hottime">
                        <div class="hot_font"></div>
                        <div class="date">更新日期：${getNowFormatDate()}</div>
                    </div>
                </div>
                 `;


        let output2="";
        let i=1;
        data.playlist.tracks.forEach(value=>{
            output2+=`
            <a href="play.html?/${value.id}">
                <div class="songlist">
                    <div class="num">
                        ${i++}
                    </div>
                    <div class="songs">
                       <p>${value.name}</p>
                       <p2>
                           ${value.ar[0].name}
                           -${value.al.name}
                       </p2>
                    </div>
                </div>
            </a>
        `
        })

        hotsong.innerHTML=output+output2;
    });

function getNowFormatDate() {
    let date = new Date();
    let seperator1 = "月";
    let seperator2 = "日";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();

    let currentdate =  month + seperator1 +  strDate +seperator2;
    return currentdate;
}