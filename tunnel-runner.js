const { spawn } = require('child_process');
const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');

const STATUS_FILE = path.join(__dirname, 'src', 'tunnel-status.json');
const TARGET_SUBDOMAIN = 'harmoniq-player-vanshi';
const EXPECTED_URL = `https://${TARGET_SUBDOMAIN}.loca.lt`;
const LOCAL_PORT = 3000;

let currentChild = null;
let currentUrl = EXPECTED_URL;
let isStopping = false;
let cachedPublicIp = '';

// Helper to get local LAN IPv4
function getLanIp() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return '127.0.0.1';
}

// Fetch public IP
function refreshPublicIp() {
  https
    .get('https://api.ipify.org', { timeout: 6000 }, res => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => {
        const ip = data.trim();
        if (ip && /^[\d\.]+$/.test(ip)) {
          cachedPublicIp = ip;
          updateStatusFile(true);
        }
      });
    })
    .on('error', () => {
      // Ignore network hiccup
    });
}

// Write status to disk for frontend consumption
function updateStatusFile(isOnline) {
  try {
    const statusData = {
      targetUrl: EXPECTED_URL,
      currentUrl: currentUrl || EXPECTED_URL,
      isExactMatch: currentUrl === EXPECTED_URL,
      isOnline: Boolean(isOnline),
      lanIp: getLanIp(),
      publicIp: cachedPublicIp,
      updatedAt: new Date().toISOString()
    };
    fs.writeFileSync(STATUS_FILE, JSON.stringify(statusData, null, 2));
  } catch (e) {
    console.error('[Tunnel] Failed to write status file:', e.message);
  }
}

// Launch localtunnel
function launchTunnel() {
  if (isStopping) return;

  console.log(`[Tunnel] Launching localtunnel for subdomain: "${TARGET_SUBDOMAIN}"...`);

  const child = spawn(
    'npx.cmd',
    ['--yes', 'localtunnel', '--port', String(LOCAL_PORT), '--subdomain', TARGET_SUBDOMAIN],
    {
      shell: true,
      stdio: ['ignore', 'pipe', 'pipe']
    }
  );

  currentChild = child;

  const handleData = chunk => {
    const str = chunk.toString();
    process.stdout.write(str);

    const match = str.match(/your url is:\s*(https?:\/\/[^\s]+)/i);
    if (match) {
      currentUrl = match[1].trim();
      console.log(`[Tunnel] SUCCESS: Active at ${currentUrl}`);
      updateStatusFile(true);
    }
  };

  child.stdout.on('data', handleData);
  child.stderr.on('data', chunk => {
    process.stderr.write(chunk);
  });

  child.on('exit', (code, signal) => {
    console.log(`[Tunnel] Process exited (code: ${code}, signal: ${signal}).`);
    currentChild = null;
    updateStatusFile(false);

    if (!isStopping) {
      console.log('[Tunnel] Reconnecting in 5 seconds...');
      setTimeout(launchTunnel, 5000);
    }
  });

  child.on('error', err => {
    console.error('[Tunnel] Spawn error:', err.message);
    killCurrentChild();
  });
}

function killCurrentChild() {
  if (currentChild) {
    try {
      spawn('taskkill', ['/pid', currentChild.pid, '/f', '/t']);
    } catch (e) {
      try {
        currentChild.kill('SIGKILL');
      } catch (e2) {}
    }
    currentChild = null;
  }
}

// Start public IP discovery
refreshPublicIp();
setInterval(refreshPublicIp, 10 * 60 * 1000);

// Initialize status file
updateStatusFile(false);

// Start tunnel
launchTunnel();

// Cleanup on exit
process.on('SIGINT', () => {
  isStopping = true;
  killCurrentChild();
  process.exit();
});
process.on('SIGTERM', () => {
  isStopping = true;
  killCurrentChild();
  process.exit();
});


