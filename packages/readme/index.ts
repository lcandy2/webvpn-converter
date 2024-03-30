import { readFileSync, writeFileSync } from 'node:fs';

const baseDir = process.cwd() + '/';
const repoDir = baseDir + '../../';
const dataDir = repoDir + './data/';
const assetsDir = baseDir + 'assets/';

const readme = async () => {
  const readme = readFileSync(assetsDir + './readme.md', 'utf-8');
  return readme;
};

const supportedSchool = async () => {
  const supportedSchool = readFileSync(dataDir + './webvpn.json', 'utf-8');
  const submit = readFileSync(assetsDir + 'submit-school.md', 'utf-8');
  const json = JSON.parse(supportedSchool);
  let schoolList = '';
  Object.keys(json).forEach((province: string) => {
    if (Object.prototype.hasOwnProperty.call(json, province)) {
      schoolList += `> **${province}**：`;
      const schools = Object.keys(json[province]);
      schoolList += schools.join('、');
      schoolList += '\n> \n';
    }
  });
  const content = `## 支持的学校\n\n${schoolList}\n\n${submit}`;
  return content;
};

const development = async () => {
  const development = readFileSync(assetsDir + './development.md', 'utf-8');
  return development;
};

const api = async () => {
  const api = readFileSync(assetsDir + './api.md', 'utf-8');
  return api;
};

const credits = async () => {
  const credits = readFileSync(assetsDir + './credits.md', 'utf-8');
  return credits;
};

const license = async () => {
  const license = readFileSync(repoDir + './LICENSE.md', 'utf-8');
  const content = `## License\n\n\`\`\`\n${license}\`\`\``;
  return content;
};

const merge = async () => {
  const readmeContent = await readme();
  const supportedSchoolContent = await supportedSchool();
  const developmentContent = await development();
  const apiContent = await api();
  const creditsContent = await credits();
  const licenseContent = await license();
  const content = `${readmeContent}\n\n${supportedSchoolContent}\n\n${developmentContent}\n\n${apiContent}\n\n${creditsContent}\n\n${licenseContent}`;
  return content;
};

const write = async (content: string) => {
  await writeFileSync(repoDir + 'README.md', content, 'utf-8');
};

write(await merge());
