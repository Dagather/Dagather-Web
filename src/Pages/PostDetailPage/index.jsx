import React, { useEffect, useState } from 'react';

import ReactRouterPropTypes from 'react-router-prop-types';

import NavBar from 'Components/NavBar';
import Jumbotron from 'Components/Jumbotron';
import Footer from 'Components/Footer';
import Post from 'Components/Post';

import firebaseConfig from 'Config/firebaseConfig';

import communityBg from 'Assets/img/background/community.jpg';

function PostDetailPage({ match }) {
  const database = firebaseConfig();

  const [values, setValues] = useState(null);

  useEffect(() => {
    const { postId } = match.params;
    database.ref('posts').child(postId).get().then((snapshot) => {
      if (snapshot.exists()) {
        setValues(snapshot.val());
      }
    });
  }, []);
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
          {values && <Post values={values} toggle={null} />}
        </div>
      </div>
      <Footer />
    </>
  );
}

PostDetailPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default PostDetailPage;
