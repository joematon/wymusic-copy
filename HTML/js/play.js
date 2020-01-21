let Id = location.search;
Id = Id.split('/');
Id = Id[Id.length - 1];
let audio;
let lrc;
let output="";
//歌曲获取
fetch("http://localhost:3000/song/url?id="+Id,{
    method:"GET",
    mode:"cors"
})
    .then(r=>{
        if (r.status===200)
        {
            return r.json();
        } else {
            throw "嗝屁了";
        }
    })
    .then(data=>{
        return data.data[0].url;
    }).then(res => {
        //document.getElementById('au').src = res;
        audio = new Audio(res);
        // console.log(audio);
}).catch(e => {
    alert(e);
});

//播放歌曲
fetch("http://localhost:3000/song/detail?ids="+Id,{
    method:"GET",
    mode:"cors"
})
    .then(r=>{
        if (r.status===200)
        {
            return r.json();
        } else {
            throw "嗝屁了";
        }
    })
    .then(data=>{
        // console.log(data.songs[0]);
        data.songs.forEach(value=>{
            output+=`
                        <div class="background">
                            <img src="${value.al.picUrl}" alt="" class="img1">
                            <div class="song-wrap">
                                <div class="song-disc" id="playImg" onclick="musicControl()">
                                    <div class="song-turn">
                                        <div class="rollwrap">
                                            <div class="song-img">
                                                <img src="${value.al.picUrl}" alt="">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="plybtn"></div>
                                </div>
                            </div>
                            <div class="songword">
                                <div class="word">
                                    <div>${value.name}</div>
                                </div>
                                <div class="m-song-info">
                                    <ul><li id="lrc"></li></ul>
                                </div>
                            </div>
                        </div>
                        `
        });
        $("#app").html(output);
    });

//歌词
    fetch("http://localhost:3000/lyric?id="+Id,{
        method:"GET",
        mode:"cors"
    })
    .then(r=>{
        if (r.status===200)
        {
            return r.json();
        } else {
            throw "嗝屁了";
        }
    })
    .then(data=>{
        if (data.lrc.lyric === undefined) {
            console.log("纯音乐无歌词！");
        } else {
            let lrcData=data.lrc.lyric;
            lrc = new Lyric({
                onPlay: function (line, text) { // 歌词播放时的回调
                    console.log(line, text) // line 是当前播放行
                    $("#app").html(output);
                    $('#lrc').text(text);
                },
                onSetLyric: function (lines) { // 监听歌词设置事件。当设置歌词时，歌词解析完毕会触发此回调。
                    console.log(lines) // lines 是一个数组[{time,text}]，里面包含播放时间及对应的歌词文本。
                },
                offset: 3000 // 歌词偏移时间单位毫秒, 默认 150 ms
            })
            console.log("00000000000000000");
            lrc.setLyric(lrcData);
        }
    }).catch((err) => {
        console.error(err);
    })


function musicControl()
{
    if (!audio.paused)
    {
        audio.pause();
        lrc.pause();
        $(".plybtn").show();
    }
    else
        {
        audio.play();
        // console.log(audio.currentTime);
        lrc.play(audio.currentTime * 1000);
        $(".plybtn").hide();
    }
}

