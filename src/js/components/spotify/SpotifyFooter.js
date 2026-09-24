import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
   padding: 60px 32px 100px 32px;
   background: transparent;
   display: flex;
   flex-direction: column;
   gap: 40px;

   @media screen and (max-width: 768px) {
      padding: 40px 16px 80px 16px;
      gap: 30px;
   }
`;

const TopColumns = styled.div`
   display: flex;
   justify-content: space-between;
   flex-wrap: wrap;
   gap: 32px 24px;
`;

const NavColumnsGroup = styled.div`
   display: flex;
   flex-wrap: wrap;
   gap: 48px 64px;

   @media screen and (max-width: 900px) {
      gap: 32px 40px;
   }
`;

const Column = styled.div`
   display: flex;
   flex-direction: column;
   gap: 12px;
   min-width: 140px;
`;

const ColumnTitle = styled.h5`
   margin: 0;
   font-size: 14px;
   font-weight: 700;
   color: #ffffff;
   letter-spacing: 0.2px;
`;

const ColumnList = styled.div`
   display: flex;
   flex-direction: column;
   gap: 10px;
`;

const FooterLink = styled.a`
   color: #b3b3b3;
   font-size: 14px;
   font-weight: 500;
   text-decoration: none;
   cursor: pointer;
   transition: color 0.15s ease;

   &:hover {
      color: #ffffff;
      text-decoration: underline;
   }
`;

const SocialIconsRow = styled.div`
   display: flex;
   align-items: flex-start;
   gap: 16px;
`;

const SocialButton = styled.a`
   width: 44px;
   height: 44px;
   border-radius: 50%;
   background: #292929;
   color: #ffffff;
   display: flex;
   align-items: center;
   justify-content: center;
   text-decoration: none;
   font-size: 18px;
   transition: all 0.2s ease;

   &:hover {
      background: #727272;
      transform: scale(1.06);
   }
`;

const BottomDivider = styled.div`
   height: 1px;
   background: rgba(255, 255, 255, 0.1);
   width: 100%;
`;

const BottomMeta = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   flex-wrap: wrap;
   gap: 16px;
`;

const CopyrightText = styled.div`
   font-size: 13px;
   color: #b3b3b3;
`;

const DevTag = styled.span`
   color: #1ed760;
   font-weight: 700;
`;

export default function SpotifyFooter() {
   return (
      <FooterWrapper>
         <TopColumns>
            <NavColumnsGroup>
               <Column>
                  <ColumnTitle>Company</ColumnTitle>
                  <ColumnList>
                     <FooterLink href="#about">About</FooterLink>
                     <FooterLink href="#jobs">Jobs</FooterLink>
                     <FooterLink href="#for-the-record">For the Record</FooterLink>
                  </ColumnList>
               </Column>

               <Column>
                  <ColumnTitle>Communities</ColumnTitle>
                  <ColumnList>
                     <FooterLink href="#artists">For Artists</FooterLink>
                     <FooterLink href="#developers">Developers</FooterLink>
                     <FooterLink href="#advertising">Advertising</FooterLink>
                     <FooterLink href="#investors">Investors</FooterLink>
                     <FooterLink href="#vendors">Vendors</FooterLink>
                  </ColumnList>
               </Column>

               <Column>
                  <ColumnTitle>Useful links</ColumnTitle>
                  <ColumnList>
                     <FooterLink href="mailto:vanshi@harmoniq.app">Support</FooterLink>
                     <FooterLink href="#mobile-app">Free Mobile App</FooterLink>
                     <FooterLink href="#popular">Popular by Country</FooterLink>
                     <FooterLink href="#import">Import your music</FooterLink>
                  </ColumnList>
               </Column>

               <Column>
                  <ColumnTitle>Harmoniq Plans</ColumnTitle>
                  <ColumnList>
                     <FooterLink href="#premium">Premium Standard</FooterLink>
                     <FooterLink href="#platinum">Premium Platinum</FooterLink>
                     <FooterLink href="#student">Premium Student</FooterLink>
                     <FooterLink href="#free">Harmoniq Free</FooterLink>
                  </ColumnList>
               </Column>
            </NavColumnsGroup>

            <SocialIconsRow>
               <SocialButton
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
               </SocialButton>
               <SocialButton
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="X (Twitter)">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
               </SocialButton>
               <SocialButton
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.556 5 15.667 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z" />
                  </svg>
               </SocialButton>
            </SocialIconsRow>
         </TopColumns>

         <BottomDivider />

         <BottomMeta>
            <CopyrightText>
               © 2026 Harmoniq Music Inc. • <DevTag>Developed by: VANSHI SAINI</DevTag>
            </CopyrightText>
            <CopyrightText style={{ fontSize: '11px', color: '#777' }}>
               Key: 0x56414E534849-5341494E49-HARMONIQ-2026
            </CopyrightText>
         </BottomMeta>
      </FooterWrapper>
   );
}
