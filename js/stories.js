"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;
let favList;
let myStories;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();
  putStoriesOnPage();
}

 
async function putFavStoriesOnPage(){
  $favoriteStories.empty();
  favList = currentUser.favorites;  
  for(let story of favList){
    
    let $storyHTML=generateStoryMarkup(story);
  //  console.log($storyHTML);
    $favoriteStories.append($storyHTML);
  }
 // $favoriteStories.show();
  
}
 async function putMyStoriesOnPage(){
   $myStories.empty();
   myStories= currentUser.ownStories;
   for(let story of myStories){
    let $storyHTML=generateStoryMarkup(story);
    // console.log($storyHTML);
    $myStories.append($storyHTML);
   }
 }



/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);\\
  let trash="";
  let starType;
  if(currentUser.favorites.some(fav=>fav.storyId===story.storyId)){
     starType="fas";
  }
  else{
    starType="far";
  }

  if(currentUser.ownStories.some(fav=>fav.storyId===story.storyId)){
    trash="fas fa-trash";
  }
  
  // console.log(starType);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
      <i class="${trash}" id="to-remove"></i>
      <i class="${starType} fa-star" id="to-fav"></i>
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
    // console.log($story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
  $favoriteStories.hide();
  $myStories.hide();
  $storyForm.hide();

}

async function addUserStory(){
   const author= $("#author").val();
   const title=$("#title").val();
   const url=$("#url").val();
  //  console.log("add story button clicked",author,title,url)
   let story= await storyList.addStory(currentUser,{title, author,url});
   location.reload();
}

$addStory.on("click", addUserStory) 




async function handleStarClick(e){
  // e.preventDefault();
  // console.log("id:",e.target.parentElement.id);
  // console.log("id:",e.target.className);

  let favStoryId=e.target.parentElement.id;
  let starType=e.target.className;
  let favStory=  storyList.stories.find(story=>story.storyId===favStoryId); 
  // console.log(favStory);
  await currentUser.remFavorite(favStory);

  if(starType==="far fa-star"){
    await currentUser.addFavorite(favStory);
    e.target.setAttribute("class", "fas fa-star");

  }
  else if(starType==="fas fa-star"){
    console.log("no it is not the same");
    e.target.setAttribute("class", "far fa-star");
    await currentUser.remFavorite(favStory);

   }
 
}

$allStoriesList.on("click", handleStarClick );
$favoriteStories.on("click", handleStarClick);

 async function handleRemoveClick(e){

   let myStoryId=e.target.parentElement.id;

  let myStory=  storyList.stories.find(story=>story.storyId===myStoryId);

  console.log("bug is below");
  await currentUser.removeStory(myStory);

  console.log("bug was above");
  location.reload();
 }

 $allStoriesList.on("click", handleRemoveClick );