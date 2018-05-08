var postcard = document.getElementById("postcard"),
    preview = document.getElementById("preview"),
    
    to = document.getElementById("to"),
    message = document.getElementById("message"),
    from = document.getElementById("from"),

    toinp = document.getElementById("toinp"),
    messinp = document.getElementById("messinp"),
    frominp = document.getElementById("frominp"),
    bginp = document.getElementById("bginp"),
    
    add = document.getElementById("add"),
    save = document.getElementById("save"),
    load = document.getElementById("load"),
    
    postarray = [],
    num = 0
;


//inputs
toinp.addEventListener("keyup", function() {
    to.innerText = "To: "+toinp.value;
});
messinp.addEventListener("keyup", function() {
    message.innerText = messinp.value;
});
frominp.addEventListener("keyup", function() {
    from.innerText = "From: "+frominp.value;
});
bginp.addEventListener("keyup", function(ev) {
    
    if(ev.keyCode == 13){
        if(bginp.value == "auto"){
            num = num+1;
            postcard.style.backgroundImage = "url(imgs/auto"+num+".jpg)"
            
            if(num >= 3){
                num = 0;
            }
        } else if(bginp.value == "") {
            postcard.style.backgroundImage = "url(imgs/default.png)"
        } else {
            postcard.style.backgroundImage = "url("+bginp.value+")";
        }
    }
});


//add to gallery
add.addEventListener("click", function() {
    createPostcard(to.innerText, postcard.style.backgroundImage, from.innerText,message.innerText);
    
    var allminip = {
        bgimg:postcard.style.backgroundImage,
        to:to.innerText,
        message:message.innerText,
        from :from.innerText
    }
    
    postarray.push(allminip);
    console.log(postarray);
});

function createPostcard(to, bgImg, from, message) {
    var minip = document.createElement("div");
    minip.id = "minicard";
    var minito = document.createElement("div");
    minito.id = "minito";
    var minifrom = document.createElement("div");
    minifrom.id = "minifrom";
    var minimsg = document.createElement("div");
    minimsg.id = "minimsg";
    
    minip.style.backgroundImage = bgImg;
    minito.innerText = to;
    minifrom.innerText = from;
    minimsg.innerText = message;
    
    preview.appendChild(minip);
    minip.appendChild(minito);
    minip.appendChild(minifrom);
    minip.appendChild(minimsg);
    
    minip.addEventListener("click", function(){
        postcard.style.backgroundImage = this.style.backgroundImage;
        document.getElementById("to").innerText = minito.innerText;
        document.getElementById("message").innerText = minimsg.innerText;
        document.getElementById("from").innerText = minifrom.innerText;
        
        console.log(postcard);
    });
    
    console.log(preview);
}


//save to localstorage
save.addEventListener("click", function() {
    localStorage.setItem("gallerystore", JSON.stringify(postarray));
});

//load back into gallery ***

load.addEventListener("click", function() {
    preview.innerHTML = "";
    saved = localStorage.getItem("gallerystore");
    saved = JSON.parse(saved);
    
    for(var i=0; i<saved.length; i++){
        createPostcard(saved[i].to, saved[i].bgimg, saved[i].from, saved[i].message); 
        console.log(preview);
    }
});






