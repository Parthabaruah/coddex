const promptForm = document.getElementById('promptForm');
const ideaInput = document.getElementById('ideaInput');
const audienceInput = document.getElementById('audienceInput');
const formatSelect = document.getElementById('formatSelect');
const outputPrompt = document.getElementById('outputPrompt');
const outputPlaceholder = document.getElementById('outputPlaceholder');
const copyButton = document.getElementById('copyButton');
const characterCount = document.getElementById('characterCount');
const resultBadge = document.getElementById('resultBadge');
const resultHint = document.getElementById('resultHint');
const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');

ideaInput.addEventListener('input', () => {
  characterCount.textContent = `${ideaInput.value.length} / 2000`;
});

promptForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const idea = ideaInput.value.trim();

  if (!idea) {
    ideaInput.focus();
    return;
  }

  const audience = audienceInput.value.trim();
  const sections = [
    'You are a knowledgeable, helpful expert. Respond to the request below.',
    '',
    '## Request',
    idea
  ];

  if (audience) {
    sections.push('', '## Audience', `Tailor your response for ${audience}.`);
  }

  sections.push(
    '',
    '## Response guidelines',
    '- Be specific, clear, and practical.',
    '- State any important assumptions instead of inventing missing details.',
    '- Keep the response focused on the request.',
    '',
    '## Format',
    formatSelect.value
  );

  outputPrompt.value = sections.join('\n');
  outputPrompt.hidden = false;
  outputPlaceholder.hidden = true;
  copyButton.disabled = false;
  resultBadge.textContent = 'PROMPT IMPROVED';
  resultBadge.classList.add('is-ready');
  resultHint.textContent = 'Review it, tweak it, then copy it anywhere.';
});

copyButton.addEventListener('click', async () => {
  if (!outputPrompt.value) {
    return;
  }

  try {
    await navigator.clipboard.writeText(outputPrompt.value);
    copyButton.innerHTML = '<span aria-hidden="true">✓</span> Copied!';
    resultHint.textContent = 'Copied to your clipboard.';
    window.setTimeout(() => {
      copyButton.innerHTML = '<span aria-hidden="true">▢</span> Copy prompt';
      resultHint.textContent = 'Review it, tweak it, then copy it anywhere.';
    }, 1800);
  } catch (error) {
    outputPrompt.focus();
    outputPrompt.select();
    resultHint.textContent = 'Clipboard access is unavailable. Select and copy the prompt above.';
  }
});

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  themeLabel.textContent = isDark ? 'Light' : 'Theme';
  themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
});
