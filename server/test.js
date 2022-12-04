const { response } = require("express");
const { waitForDebugger } = require("inspector");


// These functions can be used as templates to send and receive data on the front end. 


async function test_create_single_user(testID) {

  // Create a user on first sign

  var body_parameters = {
    'id': testID, // NOTE THIS WILL BE THE GOOGLE USER ID
    'username': 'test@gmail.com',
    'interests': '["test"]',
    'groups': '["test"]',
  };

  var formBody = [];
  for (var property in body_parameters) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body_parameters[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  fetch('http://127.0.0.1:3000/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  });



}

async function test_update_single_user(testID) {

  // Updates user profile: username, interests, or groups

  var body_parameters = {
    'id': testID, // NOTE THIS WILL BE THE GOOGLE USER ID
    'username': 'UPDATED_WITH_TEST',
    'interests': '["test"]',
    'groups': '["test"]',
  };

  var formBody = [];
  for (var property in body_parameters) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body_parameters[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  fetch('http://127.0.0.1:3000/api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  });
}

async function delete_test_user(testID) {

  // This is really only to be used to delete the test user created in this test.js file

  var body_parameters = {
    'id': testID, // NOTE THIS WILL BE THE GOOGLE USER ID
  };

  var formBody = [];
  for (var property in body_parameters) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body_parameters[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  fetch('http://127.0.0.1:3000/api/user/remove', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  });
}

async function test_find_single_user(testID) {

  // Fetch the user profile on sign in.

  var body_parameters = {
    'id': testID, // NOTE THIS WILL BE THE GOOGLE USER ID
  };

  var formBody = [];
  for (var property in body_parameters) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body_parameters[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  let resp = await fetch('http://127.0.0.1:3000/api/user/find', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  })
  .then(response=> response)
  if (resp.ok) {
    resp.json().then((data)=>{
      console.log("Found test user:")
      console.log(data)
    });
  }
  
  
}

async function get_all_users() {

  // get a list of all users

    let resp = await fetch('http://127.0.0.1:3000/api/user', {
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
    })
    .then(response=> response)
    if (resp.ok) {
      console.log(resp.json().then((data)=>console.log(data)))
    }
}

async function user_test() {

  // runs a seies of tests on the api / database for operations on user profiles

  let testID = new Date().getTime().toString(); // NOTE THIS WILL BE THE GOOGLE USER ID
  //await test_create_single_user(testID)
  //await test_update_single_user(testID)
  //await test_find_single_user(testID)
  //await delete_test_user(testID)

}


async function test_get_all_events(testID) {

  // get a list of all events

  let resp = await fetch('http://127.0.0.1:3000/api/event', {
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
  })
  .then(response=> response)
  if (resp.ok) {
    resp.json().then((data)=>console.log(data))
  }


}

async function test_create_one_event(event_doc_id) {

  // Creates an event 

  var body_parameters = {
    'id': 'test',
    'dateTimeStart':new Date().getTime()+100000, // THIS IS A TEST VALUE!!!!!!!!!,
    'dateTimeEnd':new Date().getTime()+200000, // THIS IS A TEST VALUE!!!!!!!!!
    'title':'Study Group for Automata Theory',
    'creator':'A very sad person',
    'descritption':'Banding together to defeat CISC303',
    'attendees': '["test"]',
    'coordinates': '[39.68243,-75.75402]',
    'tags': '["test"]',
    'groups': '["test"]',
  };


  var formBody = [];
  for (var property in body_parameters) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body_parameters[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  let resp = await fetch('http://127.0.0.1:3000/api/event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  })

  if (resp.ok) {
    event_doc_id = resp.json()
  }
  
  event_doc_id = await event_doc_id.then(data=>{
    
    console.log("\nEvent ID is: ",event_doc_id);
    return data
  });
  event_doc_id = event_doc_id['insertedId']
  return await event_doc_id;

}

async function test_update_one_event(event_doc_id) {

  // Update an event's details. DO NOT ADD/REMOVE USERS WITH THIS METHOD

  var body_parameters = {
    'id': event_doc_id,
    'title':'hangin with squanch',
    'descritption':'staying inside',
  };

  var formBody = [];
  for (var property in body_parameters) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body_parameters[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  let resp = await fetch('http://127.0.0.1:3000/api/event', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  })

}

async function test_get_group_events() {

  // get a list of all events belonging to one group

  var body_parameters = {
    'groups': '["test"]',
  };

  var formBody = [];
  for (var property in body_parameters) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body_parameters[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  let resp = fetch('http://127.0.0.1:3000/api/event/groups', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  })
  .then(res=>res.json().then((data)=>console.log(data)))
}

async function test_get_fileterd_events() {

  // get a list of events based on filter(s)

  var body_parameters = {
    'filter': '["test"]', // or '["test","filter2"]' 
  };

  var formBody = [];
  for (var property in body_parameters) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body_parameters[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  let resp = fetch('http://127.0.0.1:3000/api/event/filter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  })
  .then(res=>res.json().then((data)=>console.log(data)))

}

async function test_add_user_to_event(event_doc_id) {
  var body_parameters = {
    'id': event_doc_id, // NOTE THIS WILL BE THE DOCUMENT ID
    'attendees':'["Added_user1"]',
  };

  var formBody = [];
  for (var property in body_parameters) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body_parameters[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  let resp = await fetch('http://127.0.0.1:3000/api/event/addUser', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  })

}

async function test_remove_user_from_event(event_doc_id) {
  var body_parameters = {
    'id': event_doc_id, // NOTE THIS WILL BE THE DOCUMENT ID
    'attendees':'["Added_user"]',
  };

  var formBody = [];
  for (var property in body_parameters) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body_parameters[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  let resp = await fetch('http://127.0.0.1:3000/api/event/addUser', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  })
}

async function delete_test_event(event_doc_id) {
  var body_parameters = {
    'id': event_doc_id, // NOTE THIS WILL BE THE DOCUMENT ID
  };

  var formBody = [];
  for (var property in body_parameters) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body_parameters[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  fetch('http://127.0.0.1:3000/api/event/remove', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  });
}

async function event_test(){

  // runs a seies of tests on the api / database for operations on event profiles

  let event_doc_id; // This will be the document id from mongoDB. The post request will return this.
  event_doc_id = await test_create_one_event(event_doc_id);
  await test_get_group_events(), // query event based on group -- prior to edit
  await test_update_one_event(event_doc_id),
  await test_get_fileterd_events(), // query event based on group -- after edit,
  await test_add_user_to_event(event_doc_id), // add user to event
  await test_remove_user_from_event(event_doc_id), // remove user from event
  //await delete_test_event(event_doc_id)
  console.log("\nNote the change in description and title")
}



async function test_get_all_groups() {
  let resp = await fetch('http://127.0.0.1:3000/api/group', {
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
  })
  .then(response=> response);
  if (resp.ok) {
    resp.json().then((data)=>console.log(data));
  }
}

async function test_create_one_group(group_id) {

  var body_parameters = {
    'id': 'to_update_later',
    'name':'da_boyz',
    'users': '["test_user1"]'
  };


  var formBody = [];
  for (var property in body_parameters) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body_parameters[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  let resp = await fetch('http://127.0.0.1:3000/api/group', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  })

  if (resp.ok) {
    group_id = resp.json()
  }
  
  group_id = await group_id.then(data=>{
    
    console.log("\nGroup_id is: ",group_id);
    return data
  });
  group_id = group_id['insertedId']
  return await group_id;

}

async function test_update_one_group(group_id){
  var body_parameters = {
    'id': group_id, // NOTE THIS WILL BE THE DOCUMENT ID
    'name':'test_group',
  };

  var formBody = [];
  for (var property in body_parameters) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body_parameters[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  let resp = await fetch('http://127.0.0.1:3000/api/group', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  })

}

async function test_get_one_group(group_id) {

  var body_parameters = {
    'id': group_id, // NOTE THIS WILL BE THE DOCUMENT ID
  };

  var formBody = [];
  for (var property in body_parameters) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body_parameters[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  let resp = await fetch('http://127.0.0.1:3000/api/group/find', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  })
  .then(response=> response)
  if (resp.ok) {
    resp.json().then((data)=>{
      console.log("Found test group:")
      console.log(data)
    });
  }
}


async function delete_test_group(group_id) {
  var body_parameters = {
    'id': group_id, // NOTE THIS WILL BE THE DOCUMENT ID
  };

  var formBody = [];
  for (var property in body_parameters) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body_parameters[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  fetch('http://127.0.0.1:3000/api/group/remove', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  });
}

async function group_test(){

  // runs a seies of tests on the api / database for operations on group profiles
  
  let group_id; // this is the document id returned after creating an object in the db
  group_id = await test_create_one_group(group_id);
  console.log(group_id)
  await test_update_one_group(group_id);
  //await test_get_all_groups();
  await test_get_one_group(group_id);
  await delete_test_group(group_id);

}


event_test();
//user_test();
//group_test();