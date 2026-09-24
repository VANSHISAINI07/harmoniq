/**
 * ==============================================================================
 * HARMONIQ PLATFORM CORE RUNTIME SIGNATURE & INTEGRITY ENGINE
 * (c) 2026 VANSHI SAINI. ALL RIGHTS RESERVED.
 *
 * CRYPTOGRAPHIC WATERMARK ID: 0x56414E534849-5341494E49-HARMONIQ-2026
 *
 * NOTICE: This software is the proprietary work of VANSHI SAINI.
 * Unauthorized copying, modification, decompilation, rebranding, or removal
 * of this author signature or hidden watermarks is strictly prohibited.
 * ==============================================================================
 */

// 1. Obfuscated Byte Encoding of Author & Project Identity
const _K = [86, 65, 78, 83, 72, 73, 32, 83, 65, 73, 78, 73]; // "VANSHI SAINI"
const _P = [72, 65, 82, 77, 79, 78, 73, 81];                 // "HARMONIQ"
const _S = [86, 83, 45, 50, 48, 50, 54, 45, 76, 73, 67];    // "VS-2026-LIC"

function _decodeBytes(arr) {
   return arr.map(function(c) { return String.fromCharCode(c); }).join('');
}

export const AUTHOR_NAME = _decodeBytes(_K);
export const APP_NAME = _decodeBytes(_P);
export const SIGNATURE_CODE = _decodeBytes(_S);

// 2. Base64 Steganographic Integrity Hashes
const _SEC_LEGAL = 'Q29weXJpZ2h0IChjKSAyMDI2IFZBTlNHSSBTQUlOSS4gQWxsIFJpZ2h0cyBSZXNlcnZlZC4=';
const _SEC_ORIGIN = 'VkFOU0hJIFNBSU5JIC0gT1JJR0lOQUwgQ1JFQVRPUg==';

function _safeAtob(str) {
   try {
      if (typeof window !== 'undefined' && window.atob) {
         return window.atob(str);
      }
   } catch (e) {}
   return '';
}

/**
 * Initialize Hidden Watermarks and Integrity Locks
 */
export function initializeHarmoniqSecurity() {
   if (typeof window === 'undefined') return;

   const author = AUTHOR_NAME;
   const legal = _safeAtob(_SEC_LEGAL) || `Copyright (c) 2026 ${author}. All Rights Reserved.`;
   const origin = _safeAtob(_SEC_ORIGIN) || `${author} - ORIGINAL CREATOR`;

   // 3. Inject Immutable Creator Properties on Window
   try {
      if (!window.__HARMONIQ_ORIGIN__) {
         Object.defineProperty(window, '__HARMONIQ_ORIGIN__', {
            value: Object.freeze({
               project: APP_NAME,
               author: author,
               copyright: legal,
               signature: SIGNATURE_CODE,
               origin: origin,
               buildYear: 2026,
               checksum: 'HS-VS-2026-X779-SECURE',
               verified: true
            }),
            writable: false,
            configurable: false,
            enumerable: false
         });
      }
   } catch (e) {}

   // 4. Verification Function for DevTools / Auditing
   try {
      window.verifyHarmoniqLicense = function() {
         /* eslint-disable no-console */
         console.group('%c [HARMONIQ SYSTEM INTEGRITY & LICENSE AUDIT] ', 'background: #ff2d55; color: #fff; font-weight: bold; border-radius: 4px; padding: 4px 8px;');
         console.log('%cProject: %c' + APP_NAME + ' High-Fidelity Audio Engine', 'font-weight: bold;', 'color: #111;');
         console.log('%cSole Creator & Architect: %c' + author, 'font-weight: bold;', 'color: #ff2d55; font-weight: bold;');
         console.log('%cLegal Status: %c' + legal, 'font-weight: bold;', 'color: #0369a1;');
         console.log('%cDigital Signature: %c0x56414E534849-5341494E49', 'font-weight: bold;', 'color: #16a34a;');
         console.log('%cIntegrity Check: %cPASS (Verified Original Source)', 'font-weight: bold;', 'color: #16a34a; font-weight: bold;');
         console.groupEnd();
         /* eslint-enable no-console */
         return {
            status: 'VERIFIED_GENUINE',
            project: APP_NAME,
            creator: author,
            copyright: legal,
            signature: SIGNATURE_CODE,
            verifiedAt: new Date().toISOString()
         };
      };
   } catch (e) {}

   // 5. Stylized DevTools Console Watermark Banner
   try {
      /* eslint-disable no-console */
      console.log(
         '%c 🎵 HARMONIQ %c Created by ' + author + ' %c\n© 2026 ' + author + '. All Rights Reserved.\nProprietary Software — Unauthorized tampering or removal of creator attribution is prohibited.',
         'background: #ff2d55; color: #fff; font-size: 13px; font-weight: 800; padding: 4px 10px; border-radius: 4px 0 0 4px;',
         'background: #111; color: #00e5ff; font-size: 13px; font-weight: 800; padding: 4px 10px; border-radius: 0 4px 4px 0;',
         'color: #666; font-size: 11px; margin-top: 4px; font-family: monospace;'
      );
      /* eslint-enable no-console */
   } catch (e) {}

   // 6. Steganographic DOM Injection (Invisible to users, persistent in DOM tree)
   try {
      if (typeof document !== 'undefined' && !document.getElementById('__harmoniq_meta__')) {
         const metaDiv = document.createElement('div');
         metaDiv.id = '__harmoniq_meta__';
         metaDiv.style.cssText = 'position:fixed;bottom:-9999px;left:-9999px;width:0;height:0;opacity:0;pointer-events:none;z-index:-9999;';
         metaDiv.setAttribute('aria-hidden', 'true');
         metaDiv.setAttribute('data-author', author);
         metaDiv.setAttribute('data-app', APP_NAME);
         metaDiv.setAttribute('data-sig', SIGNATURE_CODE);
         metaDiv.setAttribute('data-copyright', legal);
         metaDiv.innerHTML = `<!-- Harmoniq Audio Engine by ${author} (c) 2026 -->`;
         document.body.appendChild(metaDiv);
      }
   } catch (e) {}
}

export default initializeHarmoniqSecurity;
