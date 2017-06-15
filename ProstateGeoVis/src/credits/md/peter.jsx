import React from 'react'

export default function peter() {
  return (
    <div className="contribution">
      <h2>Peter Finnman</h2>
      <h3 id="1-what-did-i-contribute-with-to-the-team-">1. What did I contribute with to the team?</h3>
      <ul>
        <li>I had some communicative responsibilities with Karolinska, although this did not take too much time. Mainly contacted them to discuss the possibility of receiving higher granularity positional data of patients. 1h</li>
        <li>Initially assisted with data management, including learning pandas. 5h</li>
        <li>Helped develop the parallel coordinates that are used in one of the lenses. Included excessive debugging due to unexpected behaviors (dragging and filtering not working). 15h</li>
        <li>Prepared and presented the pilot of our project. 2h</li>
        <li>Examined ”Statistiska Centralbyrn’s” (SCB) data and researched potential implementa- tions that could work as a good complement to our existing problem formulations. 10h</li>
      </ul>
      <h3 id="2-how-did-you-coordinate-as-a-team-did-you-respond-to-communication-promptly-">2. How did you coordinate as a team? Did you respond to communication promptly?</h3>
      <ul>
        <li>All communication was done either via Slack or face-to-face.</li>
        <li>We coordinated the efforts by dividing ourselves into roles and pairs in the team with specific tasks. It was somewhat difficult because a lot of the work was centered around the visualization lenses.</li>
        <li>I responded to the communication as soon as I had time and when I felt that my input was needed.</li>
      </ul>
      <h3 id="3-name-the-tasks-that-you-worked-on-and-did-not-make-the-final-cut-">3. Name the tasks that you worked on and did not make the final cut.</h3>
      <ul>
        <li>The work with SCB did not make the final cut because there were other features of the visualization that needed my attention.</li>
        <li>Did not manage to solve the bug related to the dragging behavior of the death lens.</li>
      </ul>
      <h3 id="4-what-did-you-learn-from-contributing-to-the-project-">4. What did you learn from contributing to the project.</h3>
      <ul>
        <li>Continued to learn about D3js.</li>
        <li>Importance of alignment between goals. I felt that the goals of Karolinska were somewhat misaligned with the course goals, and we had to account for this in our work.</li>
        <li>Learned about React and general web programming.</li>
      </ul>
    </div>
  )
}
