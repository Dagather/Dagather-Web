import React from 'react';

import NavBar from 'Components/NavBar';
import Jumbotron from 'Components/Jumbotron';
import Footer from 'Components/Footer';

import communityBg from 'Assets/img/background/community.jpg';

function CommunityPage() {
  return (
    <>
      <NavBar />
      <Jumbotron title="Feel free to talk." content="Always available for everyone" backgroundSrc={communityBg} />

      <Footer />
    </>
  );
}

export default CommunityPage;
