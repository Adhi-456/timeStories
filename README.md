# TIME.com Latest Stories API

This is a small Node.js project that fetches the latest 6 stories from TIME.com
 and shows them as JSON.
I only used the built-in http and https modules (no extra npm packages), since that was required in the assignment.

# How to Run

1.Make sure Node.js is installed on your system.

2.Save the code in a file, for example time_stories.js.

3.Run it using:
node time_stories.js

4.Open your browser and go to:
http://localhost:8000/getTimeStories

You should see the JSON with the stories

# Note
1.Sometimes the output might be an empty list []. That’s because TIME.com often changes how their homepage is structured or loads content dynamically with JavaScript.

2.The code is written in a simple way (regex + string checks), which works as long as the HTML has the story links directly.

3.If the site changes again, the regex pattern may need to be updated
