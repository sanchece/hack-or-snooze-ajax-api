"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;
let favList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();
  putStoriesOnPage();
}

 
async function putFavStoriesOnPage(){
  favList = currentUser.favorites;  
  for(let story of favList){
    
    let $storyHTML=generateStoryMarkup(story);
   console.log($storyHTML);
    $favoriteStories.append($storyHTML);
  }
  $favoriteStories.show();
  
}



/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
      <i class="far fa-star" id="to-fav"></i>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");
  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    console.log($story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

async function addUserStory(){
   const author= $("#author").val();
   const title=$("#title").val();
   const url=$("#url").val();
   console.log("add story button clicked",author,title,url)
   let story= await storyList.addStory(currentUser,{title, author,url});
  
   $allStoriesList.prepend(generateStoryMarkup(story));
  $storyForm.trigger("reset");
  $storyForm.slideup();
}

$addStory.on("click", addUserStory) 




$allStoriesList.on("click", async function(e){
  // e.preventDefault();
  console.log("id:",e.target.parentElement.id);
  console.log("id:",e.target.className);

  let favStoryId=e.target.parentElement.id;
  let starType=e.target.className;
  let favStory=  storyList.stories.find(story=>story.storyId===favStoryId); 
  if(starType==="far fa-star"){
 
    await currentUser.addFavorite(favStory);
    e.target.setAttribute("class", "fas fa-star");

  }
  else{
    console.log("no it is not the same");
    e.target.setAttribute("class", "far fa-star");
    await currentUser.remFavorite(favStory);

  }
});

