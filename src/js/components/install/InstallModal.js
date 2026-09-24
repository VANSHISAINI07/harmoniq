import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import QRCode from 'qrcode';
import { closeInstallModal, triggerPwaInstall } from '../../install/actions';

const ModalBackdrop = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background: rgba(0, 0, 0, 0.78);
   backdrop-filter: blur(8px);
   -webkit-backdrop-filter: blur(8px);
   display: flex;
   align-items: center;
   justify-content: center;
   z-index: 300;
   padding: 16px;
   animation: fadeIn 0.2s ease-out;

   @keyframes fadeIn {
      from {
         opacity: 0;
      }
      to {
         opacity: 1;
      }
   }
`;

const ModalCard = styled.div`
   background: ${props =>
      props.themeMode === 'light' ? '#ffffff' : '#14141c'};
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
   border: 1px solid
      ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.1)'
            : 'rgba(255, 255, 255, 0.12)'};
   border-radius: 20px;
   width: 100%;
   max-width: 540px;
   max-height: 90vh;
   overflow-y: auto;
   padding: 28px;
   box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
   display: flex;
   flex-direction: column;
   gap: 20px;
   position: relative;

   &::-webkit-scrollbar {
      width: 6px;
   }
   &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
   }

   @media screen and (max-width: 500px) {
      padding: 20px;
      gap: 16px;
   }
`;

const CloseButton = styled.button`
   position: absolute;
   top: 18px;
   right: 18px;
   background: transparent;
   border: none;
   color: ${props => (props.themeMode === 'light' ? '#6b7280' : '#9ca3af')};
   font-size: 24px;
   line-height: 1;
   cursor: pointer;
   padding: 4px 8px;
   border-radius: 50%;
   transition: all 0.2s ease;

   &:hover {
      color: #1ed760;
      transform: scale(1.15);
   }
`;

const Header = styled.div`
   display: flex;
   align-items: center;
   gap: 16px;
`;

const AppIcon = styled.img`
   width: 56px;
   height: 56px;
   border-radius: 14px;
   object-fit: cover;
   box-shadow: 0 4px 16px rgba(30, 215, 96, 0.4);
   border: 1.5px solid #1ed760;
`;

const HeaderText = styled.div`
   display: flex;
   flex-direction: column;
`;

const Title = styled.h2`
   margin: 0;
   font-size: 22px;
   font-weight: 800;
   letter-spacing: -0.5px;
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
`;

const Subtitle = styled.span`
   font-size: 13px;
   color: #1ed760;
   font-weight: 700;
   margin-top: 2px;
`;

const PwaBanner = styled.div`
   background: linear-gradient(
      135deg,
      rgba(30, 215, 96, 0.15) 0%,
      rgba(30, 215, 96, 0.04) 100%
   );
   border: 1.5px solid #1ed760;
   border-radius: 14px;
   padding: 18px;
   display: flex;
   flex-direction: column;
   gap: 12px;
`;

const PwaHeader = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
`;

const PwaTitle = styled.h3`
   margin: 0;
   font-size: 15px;
   font-weight: 800;
   color: #1ed760;
   display: flex;
   align-items: center;
   gap: 6px;
`;

const PwaBadge = styled.span`
   background: #1ed760;
   color: #000000;
   font-size: 10px;
   font-weight: 900;
   padding: 2px 8px;
   border-radius: 10px;
   letter-spacing: 0.5px;
`;

const PwaDesc = styled.p`
   margin: 0;
   font-size: 13px;
   color: ${props => (props.themeMode === 'light' ? '#374151' : '#d1d5db')};
   line-height: 1.45;
`;

const PrimaryInstallBtn = styled.button`
   background: #1ed760;
   color: #000000;
   border: none;
   border-radius: 12px;
   padding: 12px 20px;
   font-size: 14px;
   font-weight: 800;
   cursor: pointer;
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 8px;
   transition: all 0.2s ease;
   box-shadow: 0 4px 14px rgba(30, 215, 96, 0.35);

   &:hover {
      background: #1fdf64;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(30, 215, 96, 0.5);
   }

   &:active {
      transform: scale(0.98);
   }
`;

const StoreGrid = styled.div`
   display: grid;
   grid-template-columns: 1fr 1fr;
   gap: 12px;

   @media screen and (max-width: 480px) {
      grid-template-columns: 1fr;
   }
`;

const StoreButton = styled.a`
   background: ${props =>
      props.themeMode === 'light' ? '#f3f4f6' : '#1e1e28'};
   border: 1px solid
      ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.1)'
            : 'rgba(255, 255, 255, 0.12)'};
   border-radius: 12px;
   padding: 12px 14px;
   display: flex;
   align-items: center;
   gap: 12px;
   text-decoration: none;
   cursor: pointer;
   transition: all 0.2s ease;

   &:hover {
      border-color: #1ed760;
      background: ${props =>
         props.themeMode === 'light' ? '#e5e7eb' : '#282836'};
      transform: translateY(-2px);
   }
`;

const StoreIcon = styled.div`
   font-size: 26px;
   display: flex;
   align-items: center;
   justify-content: center;
`;

const StoreTexts = styled.div`
   display: flex;
   flex-direction: column;
`;

const StoreSmall = styled.span`
   font-size: 10px;
   font-weight: 600;
   text-transform: uppercase;
   color: ${props => (props.themeMode === 'light' ? '#6b7280' : '#9ca3af')};
   letter-spacing: 0.5px;
`;

const StoreMain = styled.span`
   font-size: 14px;
   font-weight: 800;
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
`;

const QrSection = styled.div`
   background: ${props =>
      props.themeMode === 'light' ? '#f8f9fa' : '#1a1a24'};
   border: 1px solid
      ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.08)'
            : 'rgba(255, 255, 255, 0.08)'};
   border-radius: 14px;
   padding: 16px;
   display: flex;
   align-items: center;
   gap: 16px;

   @media screen and (max-width: 480px) {
      flex-direction: column;
      text-align: center;
   }
`;

const QrCodeBox = styled.div`
   width: 112px;
   height: 112px;
   background: #ffffff;
   border-radius: 12px;
   padding: 6px;
   display: flex;
   align-items: center;
   justify-content: center;
   flex-shrink: 0;
   box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
   border: 2px solid #1ed760;
   cursor: pointer;
   transition: transform 0.2s ease, box-shadow 0.2s ease;

   &:hover {
      transform: scale(1.04);
      box-shadow: 0 6px 20px rgba(30, 215, 96, 0.35);
   }
`;

const QrInfo = styled.div`
   display: flex;
   flex-direction: column;
   gap: 4px;
`;

const QrTitle = styled.h4`
   margin: 0;
   font-size: 14px;
   font-weight: 800;
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
`;

const QrDesc = styled.p`
   margin: 0;
   font-size: 12px;
   color: ${props => (props.themeMode === 'light' ? '#6b7280' : '#9ca3af')};
   line-height: 1.4;
`;


const IosGuideCard = styled.div`
   background: ${props =>
      props.themeMode === 'light'
         ? 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)'
         : 'linear-gradient(135deg, rgba(30, 215, 96, 0.08) 0%, rgba(20, 20, 28, 0.6) 100%)'};
   border: 1.5px solid rgba(30, 215, 96, 0.35);
   border-radius: 14px;
   padding: 16px;
   display: flex;
   flex-direction: column;
   gap: 12px;
`;

const IosGuideHeader = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
`;

const IosGuideTitle = styled.h4`
   margin: 0;
   font-size: 14px;
   font-weight: 800;
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
   display: flex;
   align-items: center;
   gap: 8px;
`;

const IosStepList = styled.div`
   display: flex;
   flex-direction: column;
   gap: 10px;
`;

const IosStepItem = styled.div`
   display: flex;
   align-items: flex-start;
   gap: 10px;
   font-size: 12.5px;
   line-height: 1.45;
   color: ${props => (props.themeMode === 'light' ? '#374151' : '#d1d5db')};
`;

const StepBadge = styled.span`
   background: #1ed760;
   color: #000000;
   font-weight: 900;
   font-size: 11px;
   width: 20px;
   height: 20px;
   border-radius: 50%;
   display: flex;
   align-items: center;
   justify-content: center;
   flex-shrink: 0;
   margin-top: 1px;
`;

const NetworkTabs = styled.div`
   display: flex;
   background: ${props =>
      props.themeMode === 'light' ? '#e5e7eb' : '#0f0f17'};
   padding: 4px;
   border-radius: 12px;
   gap: 6px;
   border: 1px solid
      ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.08)'
            : 'rgba(255, 255, 255, 0.08)'};
`;

const NetworkTab = styled.button`
   flex: 1;
   padding: 8px 12px;
   border: none;
   border-radius: 8px;
   font-size: 12px;
   font-weight: 700;
   cursor: pointer;
   transition: all 0.2s ease;
   background: ${props => (props.active ? '#1ed760' : 'transparent')};
   color: ${props =>
      props.active
         ? '#000000'
         : props.themeMode === 'light'
         ? '#4b5563'
         : '#9ca3af'};

   &:hover {
      background: ${props =>
         props.active
            ? '#1fdf64'
            : props.themeMode === 'light'
            ? '#d1d5db'
            : '#1e1e28'};
   }
`;

const AlertNotice = styled.div`
   background: ${props =>
      props.variant === 'warning'
         ? props.themeMode === 'light'
            ? '#fffbeb'
            : 'rgba(245, 158, 11, 0.12)'
         : props.themeMode === 'light'
         ? '#f0fdf4'
         : 'rgba(30, 215, 96, 0.08)'};
   border: 1px solid
      ${props =>
         props.variant === 'warning'
            ? 'rgba(245, 158, 11, 0.35)'
            : 'rgba(30, 215, 96, 0.3)'};
   border-radius: 10px;
   padding: 12px;
   font-size: 12px;
   line-height: 1.45;
   color: ${props => (props.themeMode === 'light' ? '#374151' : '#e5e7eb')};
   display: flex;
   flex-direction: column;
   gap: 6px;
`;

const ArchitectFooter = styled.div`
   text-align: center;
   font-size: 11px;
   color: ${props => (props.themeMode === 'light' ? '#9ca3af' : '#6b7280')};
   font-weight: 600;
   letter-spacing: 0.5px;
`;

class InstallModal extends Component {
   constructor(props) {
      super(props);
      const isBrowser = typeof window !== 'undefined';
      const defaultHost =
         isBrowser &&
         window.location.hostname &&
         window.location.hostname !== 'localhost' &&
         window.location.hostname !== '127.0.0.1'
            ? window.location.hostname
            : '192.168.1.55';
      const defaultPort =
         isBrowser && window.location.port ? window.location.port : '3000';
      const defaultProtocol =
         isBrowser && window.location.protocol
            ? window.location.protocol
            : 'http:';

      this.state = {
         mode: 'cloud',
         host: defaultHost,
         port: defaultPort,
         protocol: defaultProtocol,
         cloudUrl: 'https://harmoniq-player-vanshi.loca.lt',
         cloudPassword: '',
         qrDataUrl: '',
         copied: false,
         copiedPw: false,
         isCustomizingHost: false,
         tunnelOnline: true,
      };
   }

   componentDidMount() {
      this.generateQr();
      this.fetchNetworkInfo();
   }

   fetchNetworkInfo = async () => {
      try {
         const resp = await fetch('/api/network-info');
         if (resp.ok) {
            const data = await resp.json();
            this.setState(
               prevState => ({
                  host: data.lanIp || prevState.host,
                  cloudPassword: data.publicIp || prevState.cloudPassword,
                  cloudUrl: data.currentUrl || prevState.cloudUrl,
                  tunnelOnline: data.isOnline !== undefined ? data.isOnline : true,
               }),
               this.generateQr
            );
         }
      } catch (err) {
         // Silently keep default fallbacks
      }
   };

   getMobileUrl = () => {
      if (this.state.mode === 'cloud' && this.state.cloudUrl) {
         return this.state.cloudUrl;
      }
      const { protocol, host, port } = this.state;
      const portPart = port ? `:${port}` : '';
      return `${protocol}//${host}${portPart}`;
   };

   generateQr = async () => {
      const targetUrl = this.getMobileUrl();
      try {
         const url = await QRCode.toDataURL(targetUrl, {
            width: 256,
            margin: 1,
            color: {
               dark: '#000000',
               light: '#ffffff',
            },
            errorCorrectionLevel: 'M',
         });
         this.setState({ qrDataUrl: url });
      } catch (err) {
         console.error('Error generating QR code:', err);
         this.setState({
            qrDataUrl: `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(
               targetUrl
            )}`,
         });
      }
   };

   handleCopyUrl = () => {
      const targetUrl = this.getMobileUrl();
      this.handleCopyText(targetUrl, 'copied');
   };

   handleCopyText = (text, key = 'copied') => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
         navigator.clipboard.writeText(text).then(() => {
            this.setState({ [key]: true });
            setTimeout(() => this.setState({ [key]: false }), 2500);
         });
      } else {
         const input = document.createElement('input');
         input.value = text;
         document.body.appendChild(input);
         input.select();
         document.execCommand('copy');
         document.body.removeChild(input);
         this.setState({ [key]: true });
         setTimeout(() => this.setState({ [key]: false }), 2500);
      }
   };

   handleOpenUrl = () => {
      const targetUrl = this.getMobileUrl();
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
   };

   handleStoreClick = storeName => {
      const mobileUrl = this.getMobileUrl();
      if (storeName === 'Apple App Store') {
         alert(
            `🍏 Harmoniq on Apple iOS (iPhone & iPad):\n\nApple doesn't allow one-click browser popups like Android, but you can install Harmoniq in 3 quick taps right now:\n\n1. Open Safari on your iPhone/iPad and visit:\n   ${mobileUrl}\n2. Tap the Share button at the bottom (square with arrow [↑]).\n3. Tap "Add to Home Screen" (➕) and tap "Add".\n\nHarmoniq installs directly to your home screen with zero browser bars and full background lock-screen audio playback!`
         );
         return;
      }
      alert(
         `Harmoniq for ${storeName} by VANSHI SAINI:\n\nYou can install Harmoniq directly as a full standalone PWA application on this device right now using the green "Install Harmoniq" button, or on mobile via the QR code below:\n${mobileUrl}`
      );
   };

   render() {
      const {
         installState,
         themeState,
         closeInstallModal,
         triggerPwaInstall,
      } = this.props;

      if (!installState || !installState.isInstallModalOpen) {
         return null;
      }

      const themeMode = (themeState && themeState.theme) || 'dark';
      const hasNativePrompt = Boolean(installState.deferredPrompt);
      const mobileUrl = this.getMobileUrl();
      const {
         mode,
         qrDataUrl,
         copied,
         copiedPw,
         isCustomizingHost,
         host,
         port,
         cloudPassword,
      } = this.state;

      return (
         <ModalBackdrop onClick={closeInstallModal}>
            <ModalCard
               themeMode={themeMode}
               onClick={e => e.stopPropagation()}>
               <CloseButton
                  themeMode={themeMode}
                  onClick={closeInstallModal}
                  title="Close">
                  ×
               </CloseButton>

               <Header>
                  <AppIcon
                     src="images/harmoniq_logo.png"
                     alt="Harmoniq App Logo"
                     onError={e => {
                        e.target.src = 'favicon.ico';
                     }}
                  />
                  <HeaderText>
                     <Title themeMode={themeMode}>Install Harmoniq</Title>
                     <Subtitle>Lead Architect • VANSHI SAINI</Subtitle>
                  </HeaderText>
               </Header>

               {/* PWA 1-Click Installation */}
               <PwaBanner>
                  <PwaHeader>
                     <PwaTitle>
                        <span role="img" aria-label="lightning">⚡</span>
                        Native App Experience
                     </PwaTitle>
                     <PwaBadge>RECOMMENDED</PwaBadge>
                  </PwaHeader>
                  <PwaDesc themeMode={themeMode}>
                     Install Harmoniq directly to your device desktop or home screen.
                     No App Store account needed — runs in its own window with zero lag,
                     full offline caching, and instant audio playback.
                  </PwaDesc>

                  {hasNativePrompt ? (
                     <PrimaryInstallBtn onClick={triggerPwaInstall}>
                        <span role="img" aria-label="download">⬇️</span>
                        Install Harmoniq Now (1-Click)
                     </PrimaryInstallBtn>
                  ) : (
                     <PrimaryInstallBtn
                        onClick={() => {
                           alert(
                              'To install Harmoniq on your browser:\n\n• In Chrome/Edge: Click the Install icon (⊕) located inside your address bar at the top right.\n• In Safari on iPhone/iPad: Tap the Share button (↑) and choose "Add to Home Screen".'
                           );
                        }}>
                        <span role="img" aria-label="star">⭐</span>
                        How to Install on This Browser
                     </PrimaryInstallBtn>
                  )}
               </PwaBanner>

               {/* Official Store Links */}
               <StoreGrid>
                  <StoreButton
                     themeMode={themeMode}
                     onClick={() => this.handleStoreClick('Apple App Store')}>
                     <StoreIcon>
                        <span role="img" aria-label="apple">🍏</span>
                     </StoreIcon>
                     <StoreTexts>
                        <StoreSmall themeMode={themeMode}>Download on the</StoreSmall>
                        <StoreMain themeMode={themeMode}>Apple App Store</StoreMain>
                     </StoreTexts>
                  </StoreButton>

                  <StoreButton
                     themeMode={themeMode}
                     onClick={() => this.handleStoreClick('Google Play Store')}>
                     <StoreIcon>
                        <span role="img" aria-label="play store">▶️</span>
                     </StoreIcon>
                     <StoreTexts>
                        <StoreSmall themeMode={themeMode}>Get it on</StoreSmall>
                        <StoreMain themeMode={themeMode}>Google Play Store</StoreMain>
                     </StoreTexts>
                  </StoreButton>
               </StoreGrid>

               {/* Network Mode Switcher */}
               <NetworkTabs themeMode={themeMode}>
                  <NetworkTab
                     type="button"
                     active={mode === 'cloud'}
                     themeMode={themeMode}
                     onClick={() =>
                        this.setState({ mode: 'cloud' }, this.generateQr)
                     }>
                     <span role="img" aria-label="globe">🌐</span> Cloud Link (Universal • Works on 4G/5G/Any Wi-Fi)
                  </NetworkTab>
                  <NetworkTab
                     type="button"
                     active={mode === 'local'}
                     themeMode={themeMode}
                     onClick={() =>
                        this.setState({ mode: 'local' }, this.generateQr)
                     }>
                     <span role="img" aria-label="signal">📶</span> Local Wi-Fi (Home Network)
                  </NetworkTab>
               </NetworkTabs>

               {/* QR Code for Mobile Scanning */}
               <QrSection themeMode={themeMode}>
                  <QrCodeBox
                     title="Click to open or test this link directly"
                     onClick={this.handleOpenUrl}>
                     {qrDataUrl ? (
                        <img
                           src={qrDataUrl}
                           alt="Scan QR to open Harmoniq on Mobile"
                           style={{
                              width: '100%',
                              height: '100%',
                              display: 'block',
                              borderRadius: '6px',
                              objectFit: 'contain',
                           }}
                        />
                     ) : (
                        <img
                           src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                              mobileUrl
                           )}`}
                           alt="Scan QR to open Harmoniq on Mobile"
                           style={{
                              width: '100%',
                              height: '100%',
                              display: 'block',
                              borderRadius: '6px',
                              objectFit: 'contain',
                           }}
                        />
                     )}
                  </QrCodeBox>
                  <QrInfo style={{ flex: 1, minWidth: 0 }}>
                     <div
                        style={{
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'space-between',
                           flexWrap: 'wrap',
                           gap: '6px',
                        }}>
                        <QrTitle themeMode={themeMode}>
                           {mode === 'cloud'
                              ? 'Scan for Instant Cloud Access'
                              : 'Scan to Open via Local Wi-Fi'}
                        </QrTitle>
                        <span
                           style={{
                              fontSize: '11px',
                              color: '#1ed760',
                              fontWeight: 800,
                           }}>
                           {copied
                              ? '✓ Copied to clipboard!'
                              : mode === 'cloud'
                              ? '● Cloud Tunnel Online'
                              : '● LAN Network Ready'}
                        </span>
                     </div>
                     <QrDesc themeMode={themeMode}>
                        {mode === 'cloud'
                           ? 'Scan this QR code with your phone camera (iOS or Android) to instantly open Harmoniq from anywhere — even on 4G/5G mobile data!'
                           : 'Scan this QR code with your phone camera while connected to Wi-Fi "Khatu Shyam ji5g" to open Harmoniq directly:'}
                     </QrDesc>
                     <div
                        style={{
                           marginTop: '8px',
                           display: 'flex',
                           alignItems: 'center',
                           gap: '6px',
                           flexWrap: 'wrap',
                        }}>
                        <code
                           onClick={this.handleOpenUrl}
                           title="Click to open this URL"
                           style={{
                              background: 'rgba(30, 215, 96, 0.15)',
                              color: '#1ed760',
                              padding: '5px 10px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: 700,
                              display: 'inline-block',
                              border: '1px solid rgba(30, 215, 96, 0.3)',
                              cursor: 'pointer',
                              textDecoration: 'underline',
                              wordBreak: 'break-all',
                           }}>
                           {mobileUrl}
                        </code>
                        <button
                           type="button"
                           onClick={this.handleCopyUrl}
                           style={{
                              background: copied
                                 ? '#1ed760'
                                 : themeMode === 'light'
                                 ? '#e5e7eb'
                                 : '#282836',
                              color: copied
                                 ? '#000000'
                                 : themeMode === 'light'
                                 ? '#111827'
                                 : '#ffffff',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '5px 9px',
                              fontSize: '11px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                           }}>
                           {copied ? '✓ Copied' : '📋 Copy Link'}
                        </button>
                        <button
                           type="button"
                           onClick={this.handleOpenUrl}
                           style={{
                              background:
                                 themeMode === 'light' ? '#f3f4f6' : '#1f1f2e',
                              color: '#1ed760',
                              border: '1px solid rgba(30, 215, 96, 0.3)',
                              borderRadius: '6px',
                              padding: '5px 9px',
                              fontSize: '11px',
                              fontWeight: 700,
                              cursor: 'pointer',
                           }}>
                           ↗ Open
                        </button>
                        {mode === 'local' && (
                           <button
                              type="button"
                              onClick={() =>
                                 this.setState(prev => ({
                                    isCustomizingHost: !prev.isCustomizingHost,
                                 }))
                              }
                              style={{
                                 background: 'transparent',
                                 color:
                                    themeMode === 'light' ? '#6b7280' : '#9ca3af',
                                 border: 'none',
                                 fontSize: '11px',
                                 cursor: 'pointer',
                                 textDecoration: 'underline',
                                 padding: '2px 4px',
                              }}>
                              {isCustomizingHost ? 'Close IP Editor' : '⚙️ Change IP'}
                           </button>
                        )}
                     </div>

                     {mode === 'cloud' && (
                        <AlertNotice
                           variant="info"
                           themeMode={themeMode}
                           style={{ marginTop: '10px' }}>
                           <div
                              style={{
                                 fontWeight: 800,
                                 color: '#1ed760',
                                 display: 'flex',
                                 alignItems: 'center',
                                 gap: '6px',
                              }}>
                              <span role="img" aria-label="key">🔑</span> First-Time Phone Access Password
                           </div>
                           <div
                              style={{
                                 display: 'flex',
                                 alignItems: 'center',
                                 gap: '8px',
                                 flexWrap: 'wrap',
                              }}>
                              <span>When prompted for Tunnel Password on your phone, enter:</span>
                              <code
                                 style={{
                                    background: 'rgba(30, 215, 96, 0.2)',
                                    color: '#1ed760',
                                    padding: '2px 8px',
                                    borderRadius: '5px',
                                    fontSize: '13px',
                                    fontWeight: 800,
                                    letterSpacing: '0.5px',
                                 }}>
                                 {cloudPassword}
                              </code>
                              <button
                                 type="button"
                                 onClick={() =>
                                    this.handleCopyText(cloudPassword, 'copiedPw')
                                 }
                                 style={{
                                    background: copiedPw
                                       ? '#1ed760'
                                       : themeMode === 'light'
                                       ? '#e5e7eb'
                                       : '#282836',
                                    color: copiedPw
                                       ? '#000000'
                                       : themeMode === 'light'
                                       ? '#111827'
                                       : '#ffffff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '3px 8px',
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                 }}>
                                 {copiedPw ? '✓ Copied' : <span><span role="img" aria-label="clipboard">📋</span> Copy Password</span>}
                              </button>
                              <button
                                 type="button"
                                 onClick={this.fetchNetworkInfo}
                                 style={{
                                    background: 'transparent',
                                    color: '#1ed760',
                                    border: '1px solid rgba(30, 215, 96, 0.3)',
                                    borderRadius: '6px',
                                    padding: '3px 8px',
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                 }}>
                                 <span role="img" aria-label="refresh">🔄</span> Refresh Status
                              </button>
                           </div>
                           <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '6px', lineHeight: '1.4' }}>
                              <span role="img" aria-label="info">ℹ️</span> If you see <strong>"503 - Tunnel Unavailable"</strong>, the tunnel was cycling. Tap "Refresh Status" or switch to <strong>Local Wi-Fi</strong> for direct home network access!
                           </div>
                        </AlertNotice>
                     )}

                     {mode === 'local' && (
                        <AlertNotice
                           variant="warning"
                           themeMode={themeMode}
                           style={{ marginTop: '10px' }}>
                           <div
                              style={{
                                 fontWeight: 800,
                                 color: '#f59e0b',
                                 display: 'flex',
                                 alignItems: 'center',
                                 gap: '6px',
                              }}>
                              <span role="img" aria-label="warning">⚠️</span> If phone shows "This site can't be reached":
                           </div>
                           <div>
                              <strong>1. Same Wi-Fi:</strong> Phone must be on <strong>Khatu Shyam ji5g</strong> (turn off cellular mobile data).
                           </div>
                           <div>
                              <strong>2. Windows Firewall Setting:</strong> Windows blocks inbound connections on Public networks. Press <code style={{ color: '#1ed760' }}>Win + I</code> &gt; <strong>Network &amp; internet</strong> &gt; <strong>Wi-Fi</strong> &gt; click <strong>Khatu Shyam ji5g</strong> &gt; select <strong>Private network</strong>.
                           </div>
                           <div style={{ fontSize: '11px', color: '#1ed760', fontWeight: 700, marginTop: '2px' }}>
                              <span role="img" aria-label="light bulb">💡</span> Tip: Or switch to the <strong>Cloud Link</strong> tab above for instant access from any phone/network without changing settings!
                           </div>
                        </AlertNotice>
                     )}

                     {mode === 'local' && isCustomizingHost && (
                        <div
                           style={{
                              marginTop: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              flexWrap: 'wrap',
                              padding: '8px',
                              borderRadius: '8px',
                              background:
                                 themeMode === 'light'
                                    ? 'rgba(0,0,0,0.04)'
                                    : 'rgba(255,255,255,0.04)',
                           }}>
                           <span
                              style={{
                                 fontSize: '11px',
                                 color:
                                    themeMode === 'light'
                                       ? '#4b5563'
                                       : '#9ca3af',
                                 fontWeight: 600,
                              }}>
                              Network IP:
                           </span>
                           <input
                              type="text"
                              value={host}
                              onChange={e =>
                                 this.setState(
                                    { host: e.target.value.trim() },
                                    this.generateQr
                                 )
                              }
                              placeholder="192.168.1.55"
                              style={{
                                 padding: '3px 8px',
                                 borderRadius: '5px',
                                 border: '1px solid #1ed760',
                                 background:
                                    themeMode === 'light'
                                       ? '#ffffff'
                                       : '#14141c',
                                 color:
                                    themeMode === 'light'
                                       ? '#111827'
                                       : '#ffffff',
                                 fontSize: '11px',
                                 fontFamily: 'monospace',
                                 width: '130px',
                              }}
                           />
                           <span
                              style={{
                                 fontSize: '11px',
                                 color:
                                    themeMode === 'light'
                                       ? '#4b5563'
                                       : '#9ca3af',
                                 fontWeight: 600,
                              }}>
                              Port:
                           </span>
                           <input
                              type="text"
                              value={port}
                              onChange={e =>
                                 this.setState(
                                    { port: e.target.value.trim() },
                                    this.generateQr
                                 )
                              }
                              placeholder="3000"
                              style={{
                                 padding: '3px 6px',
                                 borderRadius: '5px',
                                 border: '1px solid #1ed760',
                                 background:
                                    themeMode === 'light'
                                       ? '#ffffff'
                                       : '#14141c',
                                 color:
                                 themeMode === 'light'
                                       ? '#111827'
                                       : '#ffffff',
                                 fontSize: '11px',
                                 fontFamily: 'monospace',
                                 width: '55px',
                              }}
                           />
                        </div>
                     )}
                  </QrInfo>
               </QrSection>

               <IosGuideCard themeMode={themeMode}>
                  <IosGuideHeader>
                     <IosGuideTitle themeMode={themeMode}>
                        <span role="img" aria-label="apple">🍎</span>
                        iPhone & iPad (iOS) 3-Step Install
                     </IosGuideTitle>
                     <PwaBadge>SAFARI</PwaBadge>
                  </IosGuideHeader>
                  <IosStepList>
                     <IosStepItem themeMode={themeMode}>
                        <StepBadge>1</StepBadge>
                        <div>
                           Open <strong>Safari</strong> on your iPhone and go to{' '}
                           <code style={{ color: '#1ed760', fontWeight: 700 }}>
                              {mobileUrl}
                           </code>{' '}
                           (or scan the QR code above).
                        </div>
                     </IosStepItem>
                     <IosStepItem themeMode={themeMode}>
                        <StepBadge>2</StepBadge>
                        <div>
                           Tap the <strong>Share</strong> button at the bottom of Safari (the square box with an arrow pointing up: <strong style={{ color: '#1ed760' }}>[↑]</strong>).
                        </div>
                     </IosStepItem>
                     <IosStepItem themeMode={themeMode}>
                        <StepBadge>3</StepBadge>
                        <div>
                           Scroll down and tap <strong style={{ color: '#1ed760' }}>"Add to Home Screen"</strong> (<span role="img" aria-label="plus">➕</span>), then tap <strong>Add</strong> at top right.
                        </div>
                     </IosStepItem>
                  </IosStepList>
               </IosGuideCard>

               <ArchitectFooter themeMode={themeMode}>
                  Harmoniq Audio Engine • Engineered by VANSHI SAINI
               </ArchitectFooter>
            </ModalCard>
         </ModalBackdrop>
      );
   }
}

const mapStateToProps = state => ({
   installState: state.installState,
   themeState: state.themeState,
});

const mapDispatchToProps = dispatch => ({
   closeInstallModal: () => dispatch(closeInstallModal()),
   triggerPwaInstall: () => dispatch(triggerPwaInstall()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InstallModal);
