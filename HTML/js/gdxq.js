function $(e)
{
    return document.querySelector(e);
}
let UrlId = location.search;
fetch("http://localhost:3000/playlist/detail"+UrlId,{
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
        console.log(data.playlist);
        let output="";
        output += `<div class="container">
                            <div class="top">
                                 <div class="bk" style="background: url(${data.playlist.coverImgUrl})"></div>
                                 <img src="${data.playlist.coverImgUrl}" alt="">
                                 <span>${data.playlist.name}</span>
                                 <img src="${data.playlist.creator.avatarUrl}" alt="" class="avatarUrl">
                                 <span class="nickname">${data.playlist.creator.nickname}</span> 
                            </div>
                            <div class="list_intro">
                                <div class="tags">
                                    <span class="tag">标签:</span>`;
                                    let tags = '';
                                    for (let i = 0; i<data.playlist.tags.length; i++) {
                                        tags += `<span id="tag">${data.playlist.tags[i]}</span>`;
                                    }
                                    output += tags;
                                output += `</div>
                                <div class="description">
                                    <span class="descript">简介:</span>
                                    <p class="content">${data.playlist.description}</p>
                                </div>
                            </div>
                            <div class="songlist">
                                <span>歌曲列表</span>
                            </div>
                   </div>
                    `
        document.body.innerHTML=output;
    }).then(() => {
    // console.log('aaaaa');
        $('#body').click(() => {
            console.log('test');
        });
});
