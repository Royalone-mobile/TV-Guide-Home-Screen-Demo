function timeStamp(){
				var d = new Date(); 
                    var hours = d.getHours();
                    var minutes = d.getMinutes();

                    var ampm = hours >= 12 ? 'p' : 'a';
                    hours = (hours % 12);
                    hours = hours ? hours : 12; // the hour '0' should be '12'
                    minutes = minutes < 10 ? '0' + minutes : minutes;

                    var time = hours + ":" + minutes + ampm;

                    $("#time").html(time);
}

var currentTime = new timeStamp();