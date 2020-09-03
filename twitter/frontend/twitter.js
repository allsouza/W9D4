const FollowToggle = require('./follow_toggle');

$(() =>{
    $("button.follow-toggle").each(function(idex, ele){
        let $toggle = new FollowToggle(ele);
    });
})