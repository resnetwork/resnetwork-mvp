const fs = require('fs');
const filePath = 'app/res365/admin/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');
// Remove null bytes and any weird characters appended at the end
content = content.replace(/\0/g, '');
// Ensure it ends correctly
if (!content.trim().endsWith('}')) {
  content = content.trim() + '\n}\n';
}
fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed syntax error in page.tsx');
