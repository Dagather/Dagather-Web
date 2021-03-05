import React from 'react';

import NavBar from 'Components/NavBar';
import Jumbotron from 'Components/Jumbotron';
import Footer from 'Components/Footer';

import tableIcons from 'Constants/icons';
import dummyBoardData from 'Constants/dummy';
import communityBg from 'Assets/img/background/community.jpg';

import MaterialTable from 'material-table';

function CommunityPage() {
  const tableStyle = {
    width: '80%',
    margin: 'auto',
    marginTop: '30px',
  };
  return (
    <>
      <NavBar />
      <Jumbotron title="Feel free to talk." content="Always available for everyone" backgroundSrc={communityBg} />
      <MaterialTable
        style={tableStyle}
        options={{
          paginationType: 'stepped',
        }}
        icons={tableIcons}
        columns={[
          { title: '번호', field: 'name' },
          { title: '제목', field: 'surname' },
          { title: '작성자', field: 'birthYear' },
          { title: '작성일자', field: 'birthCity' },
        ]}
        data={dummyBoardData}
        title="Dagather 게시판"
      />
      <Footer />
    </>
  );
}

export default CommunityPage;
