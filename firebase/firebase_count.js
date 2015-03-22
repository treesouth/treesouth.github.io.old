var treesouth_counter = new Firebase("https://treesouth.firebaseio.com");
      //show total count
      treesouth_counter.child("sum").transaction(function (current_counter) {
        return (current_counter || 0) + 1;
      });

      treesouth_counter.child("sum").on("value", function(data) {
        var current_counter = data.val();
        if( $("#web_counter").length > 0 ){
            $("#web_counter").html(
              "|&nbsp;网站访问:&nbsp;<font style='color:white'>"+ current_counter +"</font>&nbsp;"
             );
        };
      });


      // show passage count
      var passage_url = window.location.pathname.replace(/\/+$/, "").replace(/^\//,"").replace(new RegExp('\\/|\\.', 'g'),"_");

      if(passage_url != '')
      {
        treesouth_counter.child("passages/"+passage_url).transaction(function (current_counter) {
          return (current_counter || 0) + 1;
        });

        treesouth_counter.child("passages/"+passage_url).on("value",function(data){
          var current_page_counter = data.val();
          $("#page_counter").html(
              ",本页访问:&nbsp;<font style='color:white'>"+ current_page_counter +"</font>&nbsp;");
        })  
      }
      //show recently passage
      var now = new Date();
      var time = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate()+' '+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
      treesouth_counter.child("recent").set({ time: time, passage: passage_url });