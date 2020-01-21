window.onload = function() {
    let rs = document.querySelector(".recom-songlist")
    fetch("http://localhost:3000/personalized", {
        method: "GET",
        mode: "cors"
    })
        .then(r => {
            if (r.status == 200) {
                return r.json();
            }
        })
        .then(data => {
            // console.log(data.result);
            let output = "";
            data.result.slice(0,6).forEach((value) => {
                output += `
                            <a href="gdxq.html?id=${value.id}">
                                <div>
                                    <img src="${value.picUrl}" alt="">
                                    <p>${value.name}</p>
                                </div>
                            </a>
                            `
            });
            rs.innerHTML = output;
        })
}