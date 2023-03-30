class Fact {
    constructor(fact){
        this.fact = fact;
    }

    Vypis(){
        return this.fact;
    }
}

class Collection {
    constructor(jmeno, list){
        this.jmeno = jmeno;
        this.list = list;
    }

    List(){
        return this.list;
    }

    AddFact(f){
        this.list.push(f);
    }
}

function request(myUrl){
    $.ajax({
        type: "GET",
        url: myUrl,
        success: function(data){
          if (data === null || data === undefined || data === "") {
                alert("Error, JSON data nejsou dostupne.");
          } else {
              currentFact = new Fact(data.facts[0]);
              if(check(likeCollection, currentFact) && check(disLikeCollection, currentFact) && maxcurrent <= maxRequest){

                $(".loader").hide(0).fadeOut(1000);
                $("#content").hide(0).fadeIn(1000);
                vypis.textContent = String(currentFact.Vypis());
                $("#disLike").show();
                $("#like").show();
                document.getElementById("content").setAttribute("class", "visible");
                document.getElementById("newFact").setAttribute("class", "invisible");
                maxcurrent = 0;
              } else {
                let cell = document.createElement("h4");
                let cellText = document.createTextNode("No new dog fact!");
                cell.appendChild(cellText);
                $("#content").append(cell);
              }
          }
        },
    });
}

let vypis = document.getElementById("vypis");
let currentFact = "";
let maxRequest = 5;
let maxcurrent = 0;

let listLike = [];
let likeCollection = new Collection("like", listLike);
let listDisLike = [];
let disLikeCollection = new Collection("disLike", listDisLike);

let buttonNewFact = document.getElementById("newFact");
buttonNewFact.addEventListener("click", () => {
    request("https://dog-api.kinduff.com/api/facts");
});

let like = document.getElementById("like");
like.addEventListener("click", () => {
    likeCollection.AddFact(currentFact);
    $("#disLike").fadeOut(500);
    $("#like").fadeOut(500);
});
let newFact = document.getElementById("new");
newFact.addEventListener("click", () => {
    request("https://dog-api.kinduff.com/api/facts");
});
let disLike = document.getElementById("disLike");
disLike.addEventListener("click", () => {
    disLikeCollection.AddFact(currentFact);
    $("#disLike").fadeOut(500);
    $("#like").fadeOut(500);
});

function check(collection, currentFact){
    collection.list.forEach(fact => {
        if(fact.Vypis() === currentFact.Vypis()){
            maxcurrent++;
            request("https://dog-api.kinduff.com/api/facts");
        }
    });
    return true;
} 

let likeCollectionButton = document.getElementById("likeCollection");
likeCollectionButton.addEventListener("click", () => {
    likeCollection.list.forEach(fact => {
        return fact.Vypis();
    });
});

let disLikeCollectionButton = document.getElementById("disLikeCollection");
disLikeCollectionButton.addEventListener("click", () => {
    disLikeCollection.list.forEach(fact => {
        return fact.Vypis();
    });
});
