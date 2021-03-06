import React, { useState } from 'react';

import NavBar from 'Components/NavBar';
import Jumbotron from 'Components/Jumbotron';
import Footer from 'Components/Footer';
import NewPostModal from 'Components/Modals/NewPostModal';

import tableIcons from 'Constants/icons';
import dummyBoardData from 'Constants/dummy';
import communityBg from 'Assets/img/background/community.jpg';

import MaterialTable from 'material-table';
import { Modal } from 'reactstrap';

function CommunityPage() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const tableStyle = {
    marginTop: '30px',
    width: '100%',
  };
  return (
    <>
      <NavBar />
      <Jumbotron title="Feel free to talk." content="Always available for everyone" backgroundSrc={communityBg} />
      <div className="container">
        <div className="communityPage">
          <MaterialTable
            style={tableStyle}
            options={{
              paginationType: 'stepped',
            }}
            icons={tableIcons}
            actions={[{ icon: () => (
              '글쓰기'
            ),
            isFreeAction: true,
            onClick: toggle,
            }]}
            columns={[
              { title: '번호', field: 'name' },
              { title: '제목', field: 'surname' },
              { title: '작성자', field: 'birthYear' },
              { title: '작성일자', field: 'birthCity' },
            ]}
            data={dummyBoardData}
            title="Dagather 게시판"
          />
          <Modal isOpen={modal} toggle={toggle} autoFocus>
            <NewPostModal />
          </Modal>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CommunityPage;
