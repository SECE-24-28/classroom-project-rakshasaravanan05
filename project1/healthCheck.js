const fs = require('fs');
const path = require('path');

console.log('🔍 Campus Issue Reporting System - Health Check\n');

// Check project structure
const checkFile = (filePath, description) => {
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${description}`);
    return true;
  } else {
    console.log(`❌ ${description} - MISSING`);
    return false;
  }
};

console.log('📁 Checking Project Structure:');
checkFile('package.json', 'Main package.json');
checkFile('client/package.json', 'Client package.json');
checkFile('server/package.json', 'Server package.json');
checkFile('server/.env', 'Server environment file');
checkFile('server/server.js', 'Server main file');
checkFile('client/src/App.tsx', 'Client main file');

console.log('\n📂 Checking Server Files:');
checkFile('server/models/User.js', 'User model');
checkFile('server/models/Issue.js', 'Issue model');
checkFile('server/controllers/authController.js', 'Auth controller');
checkFile('server/controllers/issueController.js', 'Issue controller');
checkFile('server/routes/auth.js', 'Auth routes');
checkFile('server/routes/issues.js', 'Issue routes');
checkFile('server/middleware/auth.js', 'Auth middleware');

console.log('\n📂 Checking Client Files:');
checkFile('client/src/context/AuthContext.tsx', 'Auth context');
checkFile('client/src/utils/api.ts', 'API utilities');
checkFile('client/src/pages/Home.tsx', 'Home page');
checkFile('client/src/pages/Login.tsx', 'Login page');
checkFile('client/src/pages/Register.tsx', 'Register page');
checkFile('client/src/pages/Dashboard.tsx', 'Dashboard page');
checkFile('client/src/pages/ReportIssue.tsx', 'Report Issue page');
checkFile('client/src/pages/MyIssues.tsx', 'My Issues page');
checkFile('client/src/pages/AdminPanel.tsx', 'Admin Panel page');
checkFile('client/src/components/Navbar.tsx', 'Navbar component');
checkFile('client/src/components/IssueCard.tsx', 'Issue Card component');

console.log('\n📂 Checking Upload Directory:');
if (!fs.existsSync('server/uploads')) {
  fs.mkdirSync('server/uploads', { recursive: true });
  console.log('✅ Created uploads directory');
} else {
  console.log('✅ Uploads directory exists');
}

console.log('\n🔧 Checking Dependencies:');
try {
  const serverPkg = JSON.parse(fs.readFileSync('server/package.json', 'utf8'));
  const clientPkg = JSON.parse(fs.readFileSync('client/package.json', 'utf8'));
  
  const serverDeps = ['express', 'mongoose', 'bcryptjs', 'express-session', 'cors', 'multer', 'dotenv'];
  const clientDeps = ['react', 'react-router-dom', 'axios'];
  
  console.log('Server dependencies:');
  serverDeps.forEach(dep => {
    if (serverPkg.dependencies && serverPkg.dependencies[dep]) {
      console.log(`✅ ${dep}`);
    } else {
      console.log(`❌ ${dep} - MISSING`);
    }
  });
  
  console.log('Client dependencies:');
  clientDeps.forEach(dep => {
    if (clientPkg.dependencies && clientPkg.dependencies[dep]) {
      console.log(`✅ ${dep}`);
    } else {
      console.log(`❌ ${dep} - MISSING`);
    }
  });
} catch (error) {
  console.log('❌ Error checking dependencies:', error.message);
}

console.log('\n🎯 Next Steps:');
console.log('1. Fix any missing files shown above');
console.log('2. Run: npm run install-all');
console.log('3. Run: npm run create-admin');
console.log('4. Run: npm run add-mixed-status');
console.log('5. Run: npm run dev');
console.log('6. Open: http://localhost:3000');

console.log('\n📞 If issues persist, check SETUP_GUIDE.md for detailed troubleshooting');