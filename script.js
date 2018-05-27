$('.title-input').add($('.body-input')).on('keyup', enableSaveButton);

function enableSaveButton() {
    if ($(".title-input").val() !== "" && $(".body-input").val() !== "") {
        $(".save-button").prop("disabled", false);
    } else {
        return false;
    }
}

$('.idea-form').on('submit', function(event) {
		event.preventDefault();
		saveIdea();
		$('.idea-form')[0].reset();
});
    

function saveIdea() {
	console.log('save');
	// numCards++;
	// $( ".bottom-box").prepend(newCard('card' + numCards, $('.title-input').val(), $('.body-input').val(), qualityVariable)); 
	// localStoreCard();
	// $('form')[0].reset(); 
}
// var newCard = function(id, title, body, quality) {
    //     return `<li role="idea card" aria-selected="true" class="idea-card" data-id="${obj.id}">
    //         <header class="idea-head">
    //           <h2 class="idea-title" tabindex="1" contenteditable="false" aria-label="enter to edit content">
    //           ${obj.title}
    //           </h2>
    //           <button class="delete-button" aria-label="delete"></button>
    //         </header>
    //         <p class="idea-body" tabindex="0" contenteditable="true" type="submit">
    //         ${obj.body}
//         </p>
//         <footer>
//           <button id="up" class="upvote-button" aria-label="upvote"></button>
//           <button id="down" class="downvote-button" aria-label="downvote"></button>
//           <small>${obj.quality}</small>
//         </footer>
//       </li>`;
// };

function cardObject() {
    return {
        title: $('.title-input').val(),
        body: $('.body-input').val(),
        quality: qualityVariable
    };
}

// $.each(localStorage, function(key) {
//     var cardData = JSON.parse(this);
//     numCards++;
//     $('.bottom-box').prepend(newCard(key, cardData.title, cardData.body, cardData.quality));
// });

var localStoreCard = function() {
    var cardString = JSON.stringify(cardObject());
    localStorage.setItem('card' + numCards  , cardString);
}


// $('.bottom-box').on('click', function(event){
//     var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
//     var qualityVariable;

//     if (event.target.className === "upvote" || event.target.className === "downvote"){

//         if (event.target.className === "upvote" && currentQuality === "plausible"){
//             qualityVariable = "genius";
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
//         } else if (event.target.className === "upvote" && currentQuality === "swill") {
//             qualityVariable = "plausible";
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
//         } else if (event.target.className === "downvote" && currentQuality === "plausible") {
//             qualityVariable = "swill"
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//         } else if (event.target.className === "downvote" && currentQuality === "genius") {
//             qualityVariable = "plausible"
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//         } else if (event.target.className === "downvote" && currentQuality === "swill") {
//             qualityVariable = "swill";
        
//         } else if (event.target.className === "upvote" && currentQuality === "genius") {
//             qualityVariable = "genius";
//         }

//     var cardHTML = $(event.target).closest('.card-container');
//     var cardHTMLId = cardHTML[0].id;
//     var cardObjectInJSON = localStorage.getItem(cardHTMLId);
//     var cardObjectInJS = JSON.parse(cardObjectInJSON);

//     cardObjectInJS.quality = qualityVariable;

//     var newCardJSON = JSON.stringify(cardObjectInJS);
//     localStorage.setItem(cardHTMLId, newCardJSON);
//     }
   
//     else if (event.target.className === "delete-button") {
//         var cardHTML = $(event.target).closest('.card-container').remove();
//         var cardHTMLId = cardHTML[0].id;
//         localStorage.removeItem(cardHTMLId);
//     }
// });
      










