(async function () {
    let search = document.querySelector("#third");
    await fetch("http://localhost:3000/search/hot",{
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
            let output="";
            output+=`
                <div class="input">
                    <div id="search">
                        <input type="search" placeholder="搜索歌曲、歌手、专辑" value="" id="input">
<!--                        <img src="../img/search.svg" alt="">-->
                    </div>
                    <h3>热门搜索</h3>
                </div>
            `
            let output2="";
            data.result.hots.forEach(value=>{
                // console.log(data.result.hots)
                output2+=`
                <div>
                    <p>
                        ${value.first}
                    </p>
                </div>
                    
                `
            });
            search.innerHTML=output+output2;
        });

    function searchvalue()
    {
        let input=document.getElementById("input").value;
        // console.log(input);
        fetch("http://localhost:3000/search?keywords="+input,{
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
                // console.log(data);
                let output3="";
                data.result.songs.forEach(value=>{
                    output3+=
                        `
                            <a href="play.html?/${value.id}">
                                <div class="songlist">
                                    <div class="songs">
                                       <p>${value.name}</p>
                                       <p2>
                                           <img src="img/sq.png" alt="">
                                           ${value.artists[0].name}
                                           -${value.album.name}
                                       </p2>
                                    </div>
                                </div>
                            </a>
                        `
                })
                search.innerHTML=output3;
            })

    }
    document.onkeydown=function(event){
        let e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13){
            searchvalue();
        }
    };
})();

