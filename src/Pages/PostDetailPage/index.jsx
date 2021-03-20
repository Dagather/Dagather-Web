import React from 'react';

import NavBar from 'Components/NavBar';
import Jumbotron from 'Components/Jumbotron';
import Footer from 'Components/Footer';
import Post from 'Components/Post';

import communityBg from 'Assets/img/background/community.jpg';

function PostDetailPage() {
  return (
    <>
      <NavBar />
      <Jumbotron title="Feel free to talk." content="Always available for everyone" backgroundSrc={communityBg} />
      <div className="container">
        <div className="postDetailPage">
          <div className="postDetailPage__header">
            게시글 상세보기
          </div>
          <hr />
          <Post values={[]} toggle={null} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PostDetailPage;
