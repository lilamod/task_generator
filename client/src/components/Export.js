import React from 'react';

function Export({ spec }) {
  const generateMarkdown = () => {
    let md = `# Feature Spec\n\n**Goal:** ${spec.goal}\n\n**Users:** ${spec.users}\n\n**Constraints:** ${spec.constraints}\n\n**Template:** ${spec.template}\n\n**Risks/Unknowns:** ${spec.risks || 'None'}\n\n## User Stories\n`;
    spec.stories.forEach(s => md += `- ${s}\n`);
    md += '\n## Engineering Tasks\n';
    const grouped = spec.tasks.reduce((acc, t) => {
      acc[t.group] = acc[t.group] || [];
      acc[t.group].push(t.text);
      return acc;
    }, {});
    Object.keys(grouped).forEach(g => {
      md += `### ${g}\n`;
      grouped[g].forEach(t => md += `- ${t}\n`);
    });
    return md;
  };

  const generateText = () => {
    let txt = `Feature Spec\n\nGoal: ${spec.goal}\n\nUsers: ${spec.users}\n\nConstraints: ${spec.constraints}\n\nTemplate: ${spec.template}\n\nRisks/Unknowns: ${spec.risks || 'None'}\n\nUser Stories:\n`;
    spec.stories.forEach(s => txt += `- ${s}\n`);
    txt += '\nEngineering Tasks:\n';
    const grouped = spec.tasks.reduce((acc, t) => {
      acc[t.group] = acc[t.group] || [];
      acc[t.group].push(t.text);
      return acc;
    }, {});
    Object.keys(grouped).forEach(g => {
      txt += `${g}:\n`;
      grouped[g].forEach(t => txt += `- ${t}\n`);
    });
    return txt;
  };

  const handleDownloadText = () => {
    const content = generateText();
    if (!content) return;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'spec.txt';
    a.click();
    URL.revokeObjectURL(url);  // Clean up
  };

  const handleDownloadMarkdown = () => {
    const content = generateMarkdown();
    if (!content) return;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'spec.md';
    a.click();
    URL.revokeObjectURL(url);  // Clean up
  };

  const handleCopy = () => {
    const content = generateMarkdown();  // Copy Markdown; change to generateText() if preferred
    navigator.clipboard.writeText(content);
    alert('Copied to clipboard!');
  };

  return (
    <div className="export-buttons">
      <button onClick={handleDownloadText}>Download as Text</button>
      <button onClick={handleDownloadMarkdown}>Download as Markdown</button>
      <button onClick={handleCopy}>Copy to Clipboard</button>
    </div>
  );
}

export default Export;