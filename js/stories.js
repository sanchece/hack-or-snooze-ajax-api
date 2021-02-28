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
     $favoriteStories.append($storyHTML);
   }
  
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
  let trash="";
  let starType="";
  //assign class appropriately to User's own story, Favorite Story or regular story
  if(currentUser){
  if(currentUser.favorites.some(fav=>fav.storyId===story.storyId)){
     starType="fas fa-star";
  }
  else{
    starType="far fa-star";
  }

   if(currentUser.ownStories.some(fav=>fav.storyId===story.storyId)){
     trash="fas fa-trash";
   }
  }
  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
      <i class="${trash}" id="to-remove"></i>
      <i class="${starType}" id="to-fav"></i>
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
    $allStoriesList.append($story);
  }
  $allStoriesList.show();
}

async function addUserStory(){
   const author= $("#author").val();
   const title=$("#title").val();
   const url=$("#url").val();
   let story= await storyList.addStory(currentUser,{title, author,url});
   location.reload();
}
$addStory.on("click", addUserStory) 

 async function toFavorite(e){
   console.debug("toFavorite");
   let favStoryId=e.target.parentElement.id;
   let starType=e.target.className;
   let favStory= storyList.stories.find(story=>story.storyId===favStoryId); 
   await currentUser.remFavorite(favStory);
   if(starType==="far fa-star"){
     await currentUser.addFavorite(favStory);
     e.target.setAttribute("class", "fas fa-star");
   }
   else if(starType==="fas fa-star"){
     e.target.setAttribute("class", "far fa-star");
     await currentUser.remFavorite(favStory);
    }
 }
 async function toRemove(e){
  console.debug("toRemove");
  let myStoryId=e.target.parentElement.id;
  let myStoryToRemove= storyList.stories.find(story=>story.storyId===myStoryId);
  await currentUser.removeStory(myStoryToRemove);
  e.target.parentElement.remove();
}
  async function handleClick(e){
    let thisClick=e.target.id;
    if(thisClick==="to-fav"){
      toFavorite(e);
    }
    else if(thisClick==="to-remove"){
      toRemove(e);      
    }  
  }
  $favoriteStories.on("click", handleClick);
  $allStoriesList.on("click", handleClick);
  $myStories.on("click", handleClick);
