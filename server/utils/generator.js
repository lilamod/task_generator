// Simple generator logic (customizable)
function generateTasks({ goal, users, constraints, template, risks }) {
  const stories = [];
  const tasks = [];
  
  users.split(',').forEach(user => {
    stories.push(`As a ${user.trim()}, I want ${goal} so that I can achieve my objectives.`);
  });
  
  tasks.push(`Analyze requirements: ${goal}, users: ${users}, constraints: ${constraints}`);
  tasks.push(`Design system architecture`);
  tasks.push(`Implement core functionality`);
  tasks.push(`Add error handling and validation`);
  tasks.push(`Test and deploy`);
  
  if (template === 'mobile') {
    tasks.push(`Develop mobile UI/UX`);
    tasks.push(`Integrate with device APIs (e.g., camera, GPS)`);
  } else if (template === 'web') {
    tasks.push(`Build responsive web interface`);
    tasks.push(`Optimize for browsers and SEO`);
  } else if (template === 'internal tool') {
    tasks.push(`Implement admin dashboard`);
    tasks.push(`Add authentication and permissions`);
  }
  
  if (risks) {
    tasks.push(`Address risks/unknowns: ${risks}`);
  }
  
  return {
    goal,
    users,
    constraints,
    template,
    risks,
    stories,
    tasks: tasks.map((task, index) => ({ id: index + 1, text: task, group: 'General' }))  // Add IDs and default group
  };
}

module.exports = { generateTasks };  // Correct export