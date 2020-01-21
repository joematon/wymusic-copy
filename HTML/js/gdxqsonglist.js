let UrlID = location.search;
fetch("http://localhost:3000/playlist/detail"+UrlID,{
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
        // console.log(data)
        let output= "";
        let i=1;
        data.playlist.tracks.forEach((value) => {
            output += `
                        <a href="play.html?/${value.id}">
                            <div class="song_list">
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
                                    <img src="../img/play.png" alt="">
                               </div>
                        </a>
                       `
        });
        document.body.innerHTML+=output;
    });