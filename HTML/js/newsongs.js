 let ns = document.querySelector(".newsongs")
 fetch("http://localhost:3000/personalized/newsong",{
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
         let output= "";
         data.result.forEach((value) => {
               output += `
                           <a href="play.html?/${value.id}">
                               <div>
                                   <p>${value.name}</p>
                                   <p2>
                                        <img src="img/sq.png" alt="">
                                        ${value.song.artists[0].name} 
                                        -${value.song.album.name}
                                   </p2>
                               </div>
                           </a>
                          `
         });
         ns.innerHTML=output;
     });
