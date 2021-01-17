// From https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
function fancyTimeFormat(duration)
{   
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

chrome.runtime.onMessage.addListener(
    function(request, sender) {
        var progress_bar = document.getElementsByClassName("ytp-progress-bar")[0];
        var video_time_arr = document.getElementsByClassName("ytp-bound-time-right")[0].innerText.split(":");
        var video_time = parseInt(video_time_arr[0]) * 60 + parseInt(video_time_arr[1]);
        for(const lie_tmstmp in request){
            time_portion = parseInt(lie_tmstmp) / video_time;
            lie_elem = document.createElement("div");
            lie_elem.className = "polygraph-lie-marker";
            lie_elem.style.left = (time_portion * 100).toString() + "%";
            progress_bar.appendChild(lie_elem);

            lie_elem.addEventListener("mouseenter", function( event ) {
                event.target.innerHTML = `
                    <li class="result polygraph-inject-false-claim">
                        <h4 class="polygraph-inject-false-claim-header">${request[lie_tmstmp]["textual_rating"]} Statement</h4>
                        <div class="polygraph-inject-false-claim-inner">
                            <p class="polygraph-inject-time-statement">This claim has been shown to be ${request[lie_tmstmp]["textual_rating"].toLowerCase()}.</p>
                            <br>
                            <p class="polygraph-inject-article-link"> To learn more, see "<a href="${request[lie_tmstmp]["url"]}">${request[lie_tmstmp]["title"]}</a>"</p>
                        </div>
                    </li>
                `
            }, false);

            lie_elem.addEventListener("mouseout", function( event ) {
                event.target.innerHTML = ''; // Remove child nodes
            }, false);
        }
    }
);