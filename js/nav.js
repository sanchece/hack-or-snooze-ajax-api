"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  location.reload();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */
function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick)
/** When a user first logins in, update the navbar to reflect that. */
function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();  
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

$navLogOut.on("click",()=>{
  location.reload();
})

function navSubmit(evt){
  console.debug("navSubmitForm",evt);
 hidePageComponents();
 $storyForm.show();
}
$submit.on("click",navSubmit);

function navFavorites(evt){
  console.debug("navFavorites",evt);
  hidePageComponents();
  $favoriteStories.show();
  putFavStoriesOnPage();
}
$navFav.on("click",navFavorites);

function navMyStories(evt){
  console.debug("navMyStories",evt);
  hidePageComponents();
  $myStories.show();
  putMyStoriesOnPage();
}
$myStoriesButton.on("click",navMyStories);

function navMyProfile(){
  console.debug("navMyProfile");
    $user.text(currentUser.username);
    $name.text(currentUser.name);
    $date.text(currentUser.createdAt);
    hidePageComponents();
    $profile.show();

}
$navUserProfile.on("click",navMyProfile);