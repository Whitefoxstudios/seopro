var seoProProject = {
  verify: function(object){
    var types = 'project,location,address,hours,citation,social,link,connection', required, defaults;

    switch(object.type) {
      case 'project':
        required = 'name,url';
        break;
      case 'location':
        required = 'name,address,phone,email,hours';
        break;
      case 'address':
        required = 'street,city,state,zip';
        break;
      case 'citation':
      case 'social':
      case 'link':
        required = 'submit';
        break;
        break;
        break;
    };

    loop(required.split(','), function(i, o){
      if(typeof object.data[o] === undefined || typeof object.data[o] == typeof undefined || object.data[o] == undefined || object.data[o] === false){
        console.log(i, o, "Error: "+o+" was not set");
      } else {
        console.log(i, o, object.data[o]);
      }
    });
  },

  create: function(data){

  },

  update: function(data){

  },

  delete: function(data){

  }
};

//helpers
function loop(input, callback){
  for(var i=0; i<input.length; i++){
    callback(i, input[i]);
  }
}