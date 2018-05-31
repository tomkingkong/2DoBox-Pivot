$('.title-input').add($('.body-input')).on('keyup', enableSaveButton);
$('ul').on('focus', ('.idea-title, .idea-body'), makeContentEditable);
$('ul').on('focusout', ('.idea-title, .idea-body'), changeText);
// $('ul').on('submit', ('.idea-title, .idea-body'), changeTextOnEnter);
$('ul').on('click', ('.upvote-btn, .downvote-btn'), voting);
$('ul').on('click', '.delete-btn', removeIdea);
$('.search').on('keyup search', search);
$('.show-more-btn').on('click', populateAllIdeasToPage);
$('ul').on('click', '.completed-task-btn', toggleComplete);
$('.filter-btns').on('click', 'input', filterImportance);
$('.show-completed-btn').on('click', showCompletedTasks);

$(window).on('load', function(){
	if(Object.keys(localStorage).length > 10){
		populateFirstTenIdeas(); 
	} else {
		populateAllIdeasToPage();
	}
})

$('.idea-form').on('submit', function (event) {
	event.preventDefault();
	setIdeaToStorage(newIdea(newIdea));
	displayIdea(generateIdea(newIdea(newIdea)));
	clearForm();
})

function enableSaveButton() {
	($('.title-input').val() === '' || $('.body-input').val() === '') ? 
	$('.save-btn').prop('disabled', true) : 	$('.save-btn').prop('disabled', false);
}

function clearForm() {
	$('.idea-form')[0].reset();
	$('.save-btn').prop('disabled', true);
}

function Idea(title, body) {
	this.title = title;
	this.body = body;
	this.id = Date.now();
	this.quality = 'Normal';
	this.isComplete = false;
}

function newIdea(newIdea) {
	var newIdea = new Idea($('.title-input').val(), $('.body-input').val());
	return newIdea
}

function displayIdea(idea) {
	$('ul').prepend(idea);
}

function generateIdea(newIdea) {
	var completed = 'idea-card'; 
	if(newIdea.isComplete === true) {
		completed = 'idea-card completed hide';
	}
	var ideaCard =
		`<li role="idea card" aria-selected="true" class="${completed}" data-id="${newIdea.id}">
        <header class="idea-head">
					<h2 class="idea-title" tabindex="1" contenteditable="false" aria-label="enter to edit content">${newIdea.title}</h2>
					<button class="delete-btn" aria-label="delete"></button>
        </header>
        <p class="idea-body" tabindex="0" contenteditable="false" type="submit">${newIdea.body}</p>
				<footer>
					<input class="completed-task-btn" aria-label="completed">
					<button class="upvote-btn" aria-label="upvote"></button>
					<button class="downvote-btn" aria-label="downvote"></button>
					<h3>quality:&nbsp;</h4>
					<small>${newIdea.quality}</small>
        </footer>
    </li>`;
	return ideaCard;
}

function makeContentEditable(event) {
	if ($(event.target).prop('contenteditable', false)){
		$(event.target).prop('contenteditable', true)
	} else {
		$(event.target).prop('contenteditable', false);
	}
}

function changeText() {
	var currentIdea = getIdeaFromStorage($(this).closest('li').attr('data-id'));
	var newText = $(this).closest('h2').text() || $(this).closest('p').text();
	(this.className === 'idea-body') ? (currentIdea.body = newText) :
	(this.className === 'idea-title') ? (currentIdea.title = newText) : undefined;
	setIdeaToStorage(currentIdea);
	$('li').remove();
	populateAllIdeasToPage();
}

function changeTextOnEnter(event){
	event.preventDefault();
	if(event.which === 13){
		changeText();
	}
}

function removeIdea() {
	$(this).closest('li').remove();
	localStorage.removeItem($(this).closest('li').attr('data-id'));
}

function getIdeaFromStorage(idea) {
	return JSON.parse(localStorage.getItem(idea));
}

function setIdeaToStorage(newIdea) {
	return localStorage.setItem(JSON.stringify(newIdea.id), JSON.stringify(newIdea));
}

function populateFirstTenIdeas() {
	Object.keys(localStorage).slice(-10, ).forEach(function(idea) {
		displayIdea(generateIdea(JSON.parse(localStorage.getItem(idea))));
	})
}

function populateAllIdeasToPage() {
	$('li').remove();
	Object.keys(localStorage).forEach(function(idea) {
		displayIdea(generateIdea(JSON.parse(localStorage.getItem(idea))));
	})
}

function voting() {
	var currentIdea = getIdeaFromStorage($(this).closest('li').attr('data-id'));
	var qualityArray = ['None', 'Low', 'Normal', 'High', 'Critical'];
	var thisQuality = qualityArray.indexOf(currentIdea.quality);
	(this.className === 'upvote-btn' && thisQuality < 4) ? (thisQuality++, currentIdea.quality = qualityArray[thisQuality])
	: (this.className === 'downvote-btn' && thisQuality > 0) ? (thisQuality--, currentIdea.quality = qualityArray[thisQuality]) 
	: currentIdea.quality = currentIdea.quality;
	setIdeaToStorage(currentIdea);
	$(this).siblings('small').text(currentIdea.quality);
}

function search() {
	$('li').remove();
	var storageList = [];
	var search = $('.search').val();
	var regexp = new RegExp(search, 'ig');
	Object.keys(localStorage).forEach(function(idea){
		storageList.push(JSON.parse(localStorage.getItem(idea)));
		return storageList;
	})
	storageList.filter(idea => idea.title.match(regexp) || idea.body.match(regexp)).forEach(function(idea){
			displayIdea(generateIdea(idea));
	});
}

function toggleComplete() {
	$(this).closest('li').toggleClass('completed');
	var currentIdea = getIdeaFromStorage($(this).closest("li").attr("data-id"));
	currentIdea.isComplete = !currentIdea.isComplete;
	setIdeaToStorage(currentIdea);
}

function showCompletedTasks() {
	$('li').remove();
	var storageList = [];
	Object.keys(localStorage).forEach(function(idea){
		storageList.push(JSON.parse(localStorage.getItem(idea)));
		return storageList;
	});
	storageList.sort(function(a, b){return a.isComplete - b.isComplete}).forEach(function(idea) {
		displayIdea(generateIdea(idea));
	});
	$('.completed').toggleClass('hide');
}

function filterImportance() {
	$('li').remove();
	var storageList = [];
	Object.keys(localStorage).forEach(function(idea){
		storageList.push(JSON.parse(localStorage.getItem(idea)));
		return storageList;
	});
	if(this.className === 'critical'){
		var filtered = 	storageList.filter(idea => idea.quality === 'Critical');
	} else if (this.className === 'high'){
		var filtered = storageList.filter(idea => idea.quality === 'High');
	} else if (this.className === 'normal'){
		var filtered = storageList.filter(idea => idea.quality === 'Normal');
	} else if (this.className === 'low'){
		var filtered = storageList.filter(idea => idea.quality === 'Low');
	} else if (this.className === 'none'){
		var filtered = storageList.filter(idea => idea.quality === 'None');
	} 
	filtered.forEach(function(idea){
		displayIdea(generateIdea(idea));
	});
}