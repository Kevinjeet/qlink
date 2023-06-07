#### 5.16
```
I was assigned tasks to work on, for my endpoint I was tasked with the get one endpoint. We discussed which database would work better for us either Mongodb or Postgresql. Took Paul's advice and looked at our endpoints. We should make them look more restful (they should look more like code and how they would look on the site).

Had some blockers mainly on where to get started there feels like there is so much work that needs to be done. What is an issue and how should we write them??
```

#### 5.17
```
We confirmed our database, decided on using postgres. I think it would work better with our data because I do not think it will change much. Our data is already structured out. I went through our excalidraw and changed our endpoints to look more restful.

I did my first merge request it was straightforward, it makes it so that we will not push broken code to the main file. Like instructor, Josh once said, "Don't put bad code in main. Just don't do it"- Josh Elder

Talked about beekeeper, seems like we don't really need it for the project, its basically like another insomnia but FastApi makes so that you can see your endpoints on chrome if you have an outer built out already.

No blockers
```

#### 5.18
```
Created a working branch but realized with the process of the merge request they will eventually be deleted. We should title our working branches the feature we are working on like ex. Create a profile.

Finished our dockerfile renamed a couple things so that they represent q-link.

Been working on Issues I kind of get how they work, but Rosheen said that they don’t have to be as detailed as I made mine. I bet I can break up the issues even more then.

We built our first endpoint together; it was the Create a profile endpoint. Kevin explained the code to us in great detail.
```

#### 5.19
```
We talked about working together today to get our endpoints worked out. We were able to build the remaining endpoint for get all, get one, edit, and delete. I had get one and it was so easier to build than I thought it was. I can go into my weekend feeling accomplished that we finally got some code done. I re-watched the Curtis tutorial videos and it was a cinch to build out. Thanks Curtis!

Remember I know a lot more than I think I do.
```

#### 5.22
```
Worked on auth with Kevinjeet, we now have a create a user function that creates a token. users have the ability to login and out now.
```

#### 5.23
```
Worked on auth for update user with Dylan. Finally got it to work properly. AUTH=SITH
```

#### 5.24
```
added protected endpoints to our routers, we finished backend auth
```

#### 5.25
```
started working on our frontend portions, i have view a profile page
```

#### 5.29
```
working on frontend having trouble getting auth to work on my frontend page
```

#### 5.30
```
No real changes still working on my frontend page.
```

#### 5.31
```
got my front end page to finally show the user data. now i just have to make it look good. had a meeting with james to get some help.
```

#### 6.1
```
Merged our work together, i added some styling to my page, still barebones and having trouble with my picture sizes, might work on formatting as well.
```

#### 6.2
```
We completed styling and getting frontend functionality working we are able to login, view a suer profile, sign up. Backend is working mostly need to fix edit function. I also need to create another profile view page to look at someone elses profile. grabbing logged in user data is fine but i need to access the same endpoint to grab another user. We are grabbing info by username, i was thinking about creating another hook to grab another profile.
```

#### 6.5
```
having trouble grabbing the other profiles info, when i click on the link to view a profile it still shows the logged in user info, the url changes so it knows it changed, but i think it gets "confused" on what to grab since im grabbing by the username but the user data is getting grabbed again. I talked to a seir and she mentioned using useParams to grab the username that we want and not use props for this page.
```

#### 6.6
```
completed the other profile view page, i ended up using useParams and setting it to username and it worked!! didnt have to use another custom hook and i took off props on this page. it was coming out undefined cause the username wasnt getting grabbed.
```
