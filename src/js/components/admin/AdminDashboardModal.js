/**
 * ============================================================================
 * HARMONIQ CREATOR INTELLIGENCE & ADMIN DASHBOARD
 * Lead Architect & Creator: VANSHI SAINI
 * ============================================================================
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { closeAdminModal } from '../../feedback/actions';
import { fetchAdminMetrics, exportDataAsCsv } from '../../services/cloudDatabase';

const ModalBackdrop = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background: rgba(0, 0, 0, 0.82);
   backdrop-filter: blur(10px);
   -webkit-backdrop-filter: blur(10px);
   display: flex;
   align-items: center;
   justify-content: center;
   z-index: 10000;
   padding: 16px;
   animation: fadeIn 0.2s ease-out;

   @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
   }
`;

const ModalCard = styled.div`
   background: ${props => (props.themeMode === 'light' ? '#ffffff' : '#121218')};
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
   border: 1px solid
      ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.1)'
            : 'rgba(255, 255, 255, 0.12)'};
   border-radius: 20px;
   width: 100%;
   max-width: 820px;
   max-height: 92vh;
   overflow-y: auto;
   padding: 28px;
   box-shadow: 0 24px 60px rgba(0, 0, 0, 0.7);
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

   @media screen and (max-width: 600px) {
      padding: 18px;
      gap: 16px;
   }
`;

const CloseButton = styled.button`
   position: absolute;
   top: 20px;
   right: 20px;
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
   justify-content: space-between;
   flex-wrap: wrap;
   gap: 12px;
   padding-right: 32px;
`;

const TitleBox = styled.div`
   display: flex;
   flex-direction: column;
`;

const Title = styled.h2`
   margin: 0;
   font-size: 22px;
   font-weight: 800;
   letter-spacing: -0.5px;
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
   display: flex;
   align-items: center;
   gap: 10px;
`;

const Subtitle = styled.span`
   font-size: 13px;
   color: #1ed760;
   font-weight: 700;
   margin-top: 3px;
`;

const CloudStatusBadge = styled.div`
   display: flex;
   align-items: center;
   gap: 6px;
   background: ${props =>
      props.connected ? 'rgba(30, 215, 96, 0.15)' : 'rgba(59, 130, 246, 0.15)'};
   border: 1px solid
      ${props =>
         props.connected ? 'rgba(30, 215, 96, 0.4)' : 'rgba(59, 130, 246, 0.4)'};
   color: ${props => (props.connected ? '#1ed760' : '#60a5fa')};
   font-size: 11.5px;
   font-weight: 800;
   padding: 5px 12px;
   border-radius: 9999px;
`;

const StatusDot = styled.span`
   width: 7px;
   height: 7px;
   border-radius: 50%;
   background: ${props => (props.connected ? '#1ed760' : '#60a5fa')};
   box-shadow: 0 0 8px ${props => (props.connected ? '#1ed760' : '#60a5fa')};
`;

const MetricGrid = styled.div`
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   gap: 12px;

   @media screen and (max-width: 700px) {
      grid-template-columns: repeat(2, 1fr);
   }
   @media screen and (max-width: 400px) {
      grid-template-columns: 1fr;
   }
`;

const MetricCard = styled.div`
   background: ${props => (props.themeMode === 'light' ? '#f8f9fa' : '#1a1a24')};
   border: 1px solid
      ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.08)'
            : 'rgba(255, 255, 255, 0.08)'};
   border-radius: 14px;
   padding: 14px 16px;
   display: flex;
   flex-direction: column;
   gap: 6px;
   transition: transform 0.2s ease;

   &:hover {
      transform: translateY(-2px);
      border-color: rgba(30, 215, 96, 0.3);
   }
`;

const MetricLabel = styled.span`
   font-size: 11.5px;
   font-weight: 700;
   text-transform: uppercase;
   letter-spacing: 0.5px;
   color: ${props => (props.themeMode === 'light' ? '#6b7280' : '#9ca3af')};
   display: flex;
   align-items: center;
   gap: 5px;
`;

const MetricValue = styled.span`
   font-size: 24px;
   font-weight: 900;
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
`;

const MetricDetail = styled.span`
   font-size: 11px;
   color: ${props => (props.themeMode === 'light' ? '#9ca3af' : '#6b7280')};
`;

const TabBar = styled.div`
   display: flex;
   gap: 8px;
   border-bottom: 1px solid
      ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.1)'
            : 'rgba(255, 255, 255, 0.1)'};
   padding-bottom: 8px;
   overflow-x: auto;
`;

const TabButton = styled.button`
   background: ${props =>
      props.active
         ? props.themeMode === 'light'
            ? '#111827'
            : '#ffffff'
         : 'transparent'};
   color: ${props =>
      props.active
         ? props.themeMode === 'light'
            ? '#ffffff'
            : '#000000'
         : props.themeMode === 'light'
            ? '#4b5563'
            : '#9ca3af'};
   border: none;
   border-radius: 20px;
   padding: 7px 16px;
   font-size: 12.5px;
   font-weight: 800;
   cursor: pointer;
   display: flex;
   align-items: center;
   gap: 6px;
   white-space: nowrap;
   transition: all 0.2s ease;

   &:hover {
      color: ${props => (props.active ? '' : '#1ed760')};
   }
`;

const ContentSection = styled.div`
   display: flex;
   flex-direction: column;
   gap: 14px;
`;

const SectionHeader = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   flex-wrap: wrap;
   gap: 8px;
`;

const SectionTitle = styled.h3`
   margin: 0;
   font-size: 15px;
   font-weight: 800;
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
`;

const CsvButton = styled.button`
   background: transparent;
   border: 1px solid rgba(30, 215, 96, 0.5);
   color: #1ed760;
   border-radius: 8px;
   padding: 5px 12px;
   font-size: 11.5px;
   font-weight: 700;
   cursor: pointer;
   display: flex;
   align-items: center;
   gap: 6px;
   transition: all 0.2s ease;

   &:hover {
      background: #1ed760;
      color: #000000;
   }
`;

const FeedbackCard = styled.div`
   background: ${props => (props.themeMode === 'light' ? '#f9fafb' : '#181822')};
   border: 1px solid
      ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.08)'
            : 'rgba(255, 255, 255, 0.08)'};
   border-radius: 12px;
   padding: 14px;
   display: flex;
   flex-direction: column;
   gap: 8px;
`;

const FeedbackTop = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   flex-wrap: wrap;
   gap: 8px;
`;

const CategoryBadge = styled.span`
   background: rgba(30, 215, 96, 0.15);
   color: #1ed760;
   font-size: 11px;
   font-weight: 800;
   padding: 3px 8px;
   border-radius: 6px;
   border: 1px solid rgba(30, 215, 96, 0.3);
`;

const FeedbackMessage = styled.p`
   margin: 0;
   font-size: 13px;
   line-height: 1.5;
   color: ${props => (props.themeMode === 'light' ? '#1f2937' : '#e5e7eb')};
`;

const FeedbackMeta = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   flex-wrap: wrap;
   gap: 8px;
   font-size: 11px;
   color: ${props => (props.themeMode === 'light' ? '#9ca3af' : '#6b7280')};
`;

const Table = styled.table`
   width: 100%;
   border-collapse: collapse;
   font-size: 12.5px;
`;

const Th = styled.th`
   text-align: left;
   padding: 10px 12px;
   border-bottom: 1px solid
      ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.1)'
            : 'rgba(255, 255, 255, 0.1)'};
   color: ${props => (props.themeMode === 'light' ? '#6b7280' : '#9ca3af')};
   font-weight: 700;
   font-size: 11.5px;
   text-transform: uppercase;
`;

const Td = styled.td`
   padding: 10px 12px;
   border-bottom: 1px solid
      ${props =>
         props.themeMode === 'light'
            ? 'rgba(0, 0, 0, 0.05)'
            : 'rgba(255, 255, 255, 0.05)'};
   color: ${props => (props.themeMode === 'light' ? '#1f2937' : '#e5e7eb')};
`;

const LockContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   padding: 48px 24px;
   text-align: center;
   gap: 18px;
`;

const LockIconCircle = styled.div`
   width: 76px;
   height: 76px;
   border-radius: 50%;
   background: rgba(30, 215, 96, 0.12);
   border: 2px solid #1ed760;
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 34px;
   box-shadow: 0 0 28px rgba(30, 215, 96, 0.25);
`;

const LockTitle = styled.h3`
   margin: 0;
   font-size: 20px;
   font-weight: 800;
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
`;

const LockDesc = styled.p`
   margin: 0;
   font-size: 13px;
   color: ${props => (props.themeMode === 'light' ? '#6b7280' : '#9ca3af')};
   max-width: 380px;
   line-height: 1.5;
`;

const PinInput = styled.input`
   width: 200px;
   text-align: center;
   font-size: 26px;
   letter-spacing: 10px;
   padding: 10px 16px;
   border-radius: 12px;
   background: ${props => (props.themeMode === 'light' ? '#f3f4f6' : '#1e1e28')};
   border: 2px solid
      ${props => (props.hasError ? '#ef4444' : 'rgba(30, 215, 96, 0.4)')};
   color: ${props => (props.themeMode === 'light' ? '#111827' : '#ffffff')};
   outline: none;
   font-family: inherit;
   font-weight: 800;
   transition: all 0.2s ease;

   &:focus {
      border-color: #1ed760;
      box-shadow: 0 0 16px rgba(30, 215, 96, 0.35);
   }
`;

const UnlockButton = styled.button`
   background: #1ed760;
   color: #000000;
   border: none;
   border-radius: 10px;
   font-size: 13.5px;
   font-weight: 800;
   padding: 11px 28px;
   cursor: pointer;
   transition: all 0.2s ease;

   &:hover {
      background: #1fdf64;
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(30, 215, 96, 0.4);
   }
`;

const ErrorMsg = styled.span`
   font-size: 12px;
   color: #ef4444;
   font-weight: 700;
`;

// Master PIN for Creator (VANSHI SAINI)
const MASTER_CREATOR_PIN = '2507';

class AdminDashboardModal extends Component {
   state = {
      activeTab: 'feedback', // feedback | searches | sessions | cloud
      metrics: null,
      loading: true,
      isUnlocked: false,
      pinInput: '',
      pinError: false,
   };

   componentDidMount() {
      if (this.state.isUnlocked) {
         this.loadMetrics();
      }
   }

   componentDidUpdate(prevProps) {
      if (!prevProps.isOpen && this.props.isOpen) {
         if (this.state.isUnlocked) {
            this.loadMetrics();
         }
      }
   }

   handleUnlock = e => {
      if (e) e.preventDefault();
      if (this.state.pinInput.trim() === MASTER_CREATOR_PIN) {
         this.setState({ isUnlocked: true, pinError: false }, () => {
            this.loadMetrics();
         });
      } else {
         this.setState({ pinError: true, pinInput: '' });
      }
   };

   loadMetrics = async () => {
      this.setState({ loading: true });
      try {
         const metrics = await fetchAdminMetrics();
         this.setState({ metrics, loading: false });
      } catch (e) {
         console.error('Error fetching admin metrics:', e);
         this.setState({ loading: false });
      }
   };

   render() {
      const { isOpen, closeAdminModal, themeState } = this.props;
      const { activeTab, metrics, loading, isUnlocked, pinInput, pinError } =
         this.state;

      if (!isOpen) return null;

      const themeMode = (themeState && themeState.theme) || 'dark';

      return (
         <ModalBackdrop onClick={closeAdminModal}>
            <ModalCard
               themeMode={themeMode}
               onClick={e => e.stopPropagation()}>
               <CloseButton
                  themeMode={themeMode}
                  onClick={closeAdminModal}
                  title="Close">
                  ×
               </CloseButton>

               {!isUnlocked ? (
                  <LockContainer>
                     <LockIconCircle>
                        <span role="img" aria-label="lock">🔒</span>
                     </LockIconCircle>
                     <LockTitle themeMode={themeMode}>
                        Creator Security Gate
                     </LockTitle>
                     <LockDesc themeMode={themeMode}>
                        This administration and telemetry console is restricted exclusively to <strong>VANSHI SAINI</strong>. Enter your Creator Master PIN to proceed.
                     </LockDesc>
                     <form
                        onSubmit={this.handleUnlock}
                        style={{
                           display: 'flex',
                           flexDirection: 'column',
                           alignItems: 'center',
                           gap: '12px',
                           marginTop: '8px',
                        }}>
                        <PinInput
                           type="password"
                           maxLength="8"
                           autoFocus
                           placeholder="••••"
                           hasError={pinError}
                           themeMode={themeMode}
                           value={pinInput}
                           onChange={e =>
                              this.setState({
                                 pinInput: e.target.value,
                                 pinError: false,
                              })
                           }
                        />
                        {pinError && (
                           <ErrorMsg>
                              <span role="img" aria-label="denied">⛔</span> Access Denied: Incorrect Master PIN
                           </ErrorMsg>
                        )}
                        <UnlockButton type="submit">
                           <span role="img" aria-label="key">🔑</span> Authenticate &amp; Unlock
                        </UnlockButton>
                     </form>
                  </LockContainer>
               ) : (
                  <React.Fragment>
               <Header>
                  <TitleBox>
                     <Title themeMode={themeMode}>
                        <span role="img" aria-label="shield">🛡️</span>
                        Harmoniq Intelligence & Database Hub
                     </Title>
                     <Subtitle>Lead Architect & Creator • VANSHI SAINI</Subtitle>
                  </TitleBox>

                  <CloudStatusBadge connected={metrics && metrics.isCloudConnected}>
                     <StatusDot connected={metrics && metrics.isCloudConnected} />
                     {metrics && metrics.isCloudConnected
                        ? `Firebase Live (${metrics.projectId})`
                        : 'Local Telemetry & Sync Mode'}
                  </CloudStatusBadge>
               </Header>

               {/* Metric KPI Cards */}
               <MetricGrid>
                  <MetricCard themeMode={themeMode}>
                     <MetricLabel themeMode={themeMode}>
                        <span role="img" aria-label="users">👥</span> App Visits
                     </MetricLabel>
                     <MetricValue themeMode={themeMode}>
                        {metrics ? metrics.totalVisits : '—'}
                     </MetricValue>
                     <MetricDetail themeMode={themeMode}>
                        Total device sessions
                     </MetricDetail>
                  </MetricCard>

                  <MetricCard themeMode={themeMode}>
                     <MetricLabel themeMode={themeMode}>
                        <span role="img" aria-label="mobile">📱</span> Mobile vs Desktop
                     </MetricLabel>
                     <MetricValue themeMode={themeMode} style={{ fontSize: '18px', paddingTop: '4px' }}>
                        {metrics ? `${metrics.mobileVisits} / ${metrics.desktopVisits}` : '—'}
                     </MetricValue>
                     <MetricDetail themeMode={themeMode}>
                        {metrics ? `iOS: ${metrics.iosVisits} • Android: ${metrics.androidVisits}` : '—'}
                     </MetricDetail>
                  </MetricCard>

                  <MetricCard themeMode={themeMode}>
                     <MetricLabel themeMode={themeMode}>
                        <span role="img" aria-label="key">🔑</span> Logged-in Users
                     </MetricLabel>
                     <MetricValue themeMode={themeMode}>
                        {metrics ? metrics.registeredUsersCount : '—'}
                     </MetricValue>
                     <MetricDetail themeMode={themeMode}>
                        Registered accounts
                     </MetricDetail>
                  </MetricCard>

                  <MetricCard themeMode={themeMode}>
                     <MetricLabel themeMode={themeMode}>
                        <span role="img" aria-label="star">⭐</span> User Feedback
                     </MetricLabel>
                     <MetricValue themeMode={themeMode} style={{ color: '#fbbf24' }}>
                        {metrics ? `${metrics.averageRating} ★` : '—'}
                     </MetricValue>
                     <MetricDetail themeMode={themeMode}>
                        {metrics ? `${metrics.totalFeedbackCount} requests & reviews` : '—'}
                     </MetricDetail>
                  </MetricCard>
               </MetricGrid>

               {/* Tab Navigation */}
               <TabBar themeMode={themeMode}>
                  <TabButton
                     type="button"
                     active={activeTab === 'feedback'}
                     themeMode={themeMode}
                     onClick={() => this.setState({ activeTab: 'feedback' })}>
                     <span role="img" aria-label="chat">💬</span> Feedback & Requests ({metrics ? metrics.totalFeedbackCount : 0})
                  </TabButton>
                  <TabButton
                     type="button"
                     active={activeTab === 'searches'}
                     themeMode={themeMode}
                     onClick={() => this.setState({ activeTab: 'searches' })}>
                     <span role="img" aria-label="search">🔍</span> Search Trends ({metrics && metrics.topSearches ? metrics.topSearches.length : 0})
                  </TabButton>
                  <TabButton
                     type="button"
                     active={activeTab === 'sessions'}
                     themeMode={themeMode}
                     onClick={() => this.setState({ activeTab: 'sessions' })}>
                     <span role="img" aria-label="devices">🌐</span> Connected Sessions
                  </TabButton>
                  <TabButton
                     type="button"
                     active={activeTab === 'cloud'}
                     themeMode={themeMode}
                     onClick={() => this.setState({ activeTab: 'cloud' })}>
                     <span role="img" aria-label="cloud">☁️</span> Google Firebase Guide
                  </TabButton>
               </TabBar>

               {/* Tab 1: Feedback */}
               {activeTab === 'feedback' && (
                  <ContentSection>
                     <SectionHeader>
                        <SectionTitle themeMode={themeMode}>
                           User Feedback, Song Requests & Feature Ideas
                        </SectionTitle>
                        <CsvButton onClick={() => exportDataAsCsv('feedback')}>
                           <span role="img" aria-label="download">📥</span> Export to CSV (Excel)
                        </CsvButton>
                     </SectionHeader>

                     {loading ? (
                        <p style={{ color: '#9ca3af', fontSize: '13px' }}>Loading feedback...</p>
                     ) : !metrics || metrics.recentFeedbacks.length === 0 ? (
                        <div style={{ padding: '24px', textAlign: 'center', color: '#9ca3af', fontSize: '13px' }}>
                           No feedback submitted yet. Users can click "Feedback & Requests" to send song requests or feature suggestions!
                        </div>
                     ) : (
                        metrics.recentFeedbacks.map(fb => (
                           <FeedbackCard key={fb.id} themeMode={themeMode}>
                              <FeedbackTop>
                                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <CategoryBadge>{fb.category}</CategoryBadge>
                                    <span style={{ color: '#fbbf24', fontSize: '12px' }}>
                                       {'★'.repeat(fb.rating || 5)}
                                    </span>
                                 </div>
                                 <span style={{ fontSize: '11px', color: '#9ca3af' }}>
                                    {fb.dateStr} at {fb.timeStr}
                                 </span>
                              </FeedbackTop>
                              <FeedbackMessage themeMode={themeMode}>
                                 {fb.message}
                              </FeedbackMessage>
                              {fb.trackInfo && (
                                 <div style={{ fontSize: '11.5px', color: '#1ed760' }}>
                                    <span role="img" aria-label="music">🎵</span> Attached Song: <strong>{fb.trackInfo}</strong>
                                 </div>
                              )}
                              <FeedbackMeta themeMode={themeMode}>
                                 <span>
                                    From: <strong>{fb.name || 'Anonymous'}</strong> {fb.email ? `(${fb.email})` : ''}
                                 </span>
                                 <span>Device: {fb.os}</span>
                              </FeedbackMeta>
                           </FeedbackCard>
                        ))
                     )}
                  </ContentSection>
               )}

               {/* Tab 2: Searches */}
               {activeTab === 'searches' && (
                  <ContentSection>
                     <SectionHeader>
                        <SectionTitle themeMode={themeMode}>
                           Top Search Queries (Analyze What Listeners Love)
                        </SectionTitle>
                        <CsvButton onClick={() => exportDataAsCsv('searches')}>
                           <span role="img" aria-label="download">📥</span> Export to CSV (Excel)
                        </CsvButton>
                     </SectionHeader>

                     {metrics && metrics.topSearches && metrics.topSearches.length > 0 ? (
                        <Table>
                           <thead>
                              <tr>
                                 <Th themeMode={themeMode}>Rank</Th>
                                 <Th themeMode={themeMode}>Search Query</Th>
                                 <Th themeMode={themeMode}>Search Volume</Th>
                              </tr>
                           </thead>
                           <tbody>
                              {metrics.topSearches.map((s, idx) => (
                                 <tr key={s.query}>
                                    <Td themeMode={themeMode}>#{idx + 1}</Td>
                                    <Td themeMode={themeMode}>
                                       <strong style={{ color: '#1ed760' }}>{s.query}</strong>
                                    </Td>
                                    <Td themeMode={themeMode}>{s.count} searches</Td>
                                 </tr>
                              ))}
                           </tbody>
                        </Table>
                     ) : (
                        <div style={{ padding: '24px', textAlign: 'center', color: '#9ca3af', fontSize: '13px' }}>
                           No search data recorded yet. As users search for songs and artists, their top search terms will appear here.
                        </div>
                     )}
                  </ContentSection>
               )}

               {/* Tab 3: Connected Sessions */}
               {activeTab === 'sessions' && (
                  <ContentSection>
                     <SectionHeader>
                        <SectionTitle themeMode={themeMode}>
                           Recent User Connections & Devices
                        </SectionTitle>
                        <CsvButton onClick={() => exportDataAsCsv('sessions')}>
                           <span role="img" aria-label="download">📥</span> Export to CSV (Excel)
                        </CsvButton>
                     </SectionHeader>

                     <Table>
                        <thead>
                           <tr>
                              <Th themeMode={themeMode}>Date & Time</Th>
                              <Th themeMode={themeMode}>Device / OS</Th>
                              <Th themeMode={themeMode}>Browser</Th>
                              <Th themeMode={themeMode}>App Mode</Th>
                              <Th themeMode={themeMode}>Resolution</Th>
                           </tr>
                        </thead>
                        <tbody>
                           {metrics && metrics.recentSearches ? (
                              metrics.recentLogins.concat(metrics.recentFeedbacks).slice(0, 8).map((item, idx) => (
                                 <tr key={idx}>
                                    <Td themeMode={themeMode}>{item.dateStr || 'Today'}</Td>
                                    <Td themeMode={themeMode}>
                                       <strong style={{ color: '#1ed760' }}>{item.os || 'Desktop'}</strong>
                                    </Td>
                                    <Td themeMode={themeMode}>{item.browser || 'Web Browser'}</Td>
                                    <Td themeMode={themeMode}>{item.isPwa ? '📱 Installed App' : '🌐 Browser Tab'}</Td>
                                    <Td themeMode={themeMode}>{item.screen || 'Standard'}</Td>
                                 </tr>
                              ))
                           ) : null}
                        </tbody>
                     </Table>
                  </ContentSection>
               )}

               {/* Tab 4: Cloud Guide */}
               {activeTab === 'cloud' && (
                  <ContentSection>
                     <SectionTitle themeMode={themeMode}>
                        How to Connect Free Google Firebase Firestore
                     </SectionTitle>
                     <p style={{ fontSize: '13px', lineHeight: '1.6', color: themeMode === 'light' ? '#4b5563' : '#d1d5db' }}>
                        Harmoniq is currently storing and aggregating all telemetry, feedback, and search rankings in its high-speed client store.
                        To also mirror this data to Google's cloud servers so you can view it directly on <strong>console.firebase.google.com</strong>:
                     </p>

                     <div
                        style={{
                           background: themeMode === 'light' ? '#f3f4f6' : '#1a1a24',
                           padding: '16px',
                           borderRadius: '12px',
                           fontSize: '13px',
                           lineHeight: '1.6',
                        }}>
                        <ol style={{ margin: 0, paddingLeft: '20px' }}>
                           <li>Go to <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#1ed760' }}>console.firebase.google.com</a> and sign in with your Google account.</li>
                           <li>Click <strong>"Create a project"</strong> and name it <code>Harmoniq</code> (Spark Plan is 100% Free forever).</li>
                           <li>Click <strong>"Firestore Database"</strong> in the left menu $\rightarrow$ click <strong>"Create database"</strong> (Start in Test Mode).</li>
                           <li>Open <code>src/js/config/firebaseConfig.js</code> and paste your <code>projectId</code>.</li>
                        </ol>
                     </div>
                  </ContentSection>
               )}
                  </React.Fragment>
               )}
            </ModalCard>
         </ModalBackdrop>
      );
   }
}

const mapStateToProps = state => ({
   isOpen: state.feedbackState ? state.feedbackState.isAdminModalOpen : false,
   themeState: state.themeState,
});

const mapDispatchToProps = dispatch => ({
   closeAdminModal: () => dispatch(closeAdminModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboardModal);
