const APIUtil = require('./api_util');

class FollowToggle {
    constructor($el){
        //debugger;
        this.userId = $el.dataset.userId;
        this.followState = $el.dataset.initialFollowState;
        this.$el = $($el);
        this.render();
        this.handleClick();
    }

    render(){
        //debugger;
        if(this.followState === 'unfollowed'){
            this.$el.text("Follow!");
        } else if(this.followState === 'followed') {
            this.$el.text("Unfollow!");
        }
    }

    handleClick(){
        $('button.follow-toggle').on('click', e =>{
            e.preventDefault();
            if(this.userId === e.target.dataset.userId){
                this.followState = this.followState === 'followed' ? 'unfollowing' : 'following';
                if(this.followState.slice(this.followState.length-3) === 'ing'){
                    $(e.target).prop('disabled', true);
                }
                if (this.followState === 'unfollowing'){
                    APIUtil.unfollowUser(this.userId).then(this.toggleFollowState.bind(this));
                }
                else{
                    APIUtil.followUser(this.userId).then(this.toggleFollowState.bind(this));
                    // () => { this.toggleFollowState(args) } one way to pass a func with args to .then
                }
            }
        });
    }

    // handleClick(){
    //     $('button.follow-toggle').on('click', e =>{
    //         e.preventDefault();
    //         debugger
    //         $(e.target).prop("disabled", true);
    //         this.pressButton(e);
    //     });
    // }
    
    toggleFollowState(){
        this.followState === 'unfollowing' ? this.followState = 'unfollowed' : this.followState = 'followed';
        this.$el.empty();
        this.$el.prop("disabled", false);
        this.render();
    }

    pressButton(e){
        if(this.userId === e.target.dataset.userId){
            $.ajax({
                method: this.followState === 'followed' ? 'DELETE' : 'POST',
                url: `/users/${this.userId}/follow`,
                dataType: "json"
            }).then(this.toggleFollowState.bind(this));
        } 
    }

}

module.exports = FollowToggle;