import React, { useState, useRef, useEffect } from 'react';

import NavBar from 'Components/NavBar';
import Jumbotron from 'Components/Jumbotron';
import Footer from 'Components/Footer';
import NewPostModal from 'Components/Modals/NewPostModal';
import ReadPostModal from 'Components/Modals/ReadPostModal';

import tableIcons from 'Constants/icons';
import dummyBoardData from 'Constants/dummy';
import communityBg from 'Assets/img/background/community.jpg';

import MaterialTable from 'material-table';
import { Modal } from 'reactstrap';

function CommunityPage() {
  const tableRef = useRef();

  const [rowsRef, setRowsRef] = useState(null);
  const [postIndex, setPostIndex] = useState(null);

  const [newPostModal, setNewPostModal] = useState(false);
  const newPostToggle = () => setNewPostModal(!newPostModal);

  const [readPostModal, setReadPostModal] = useState(false);
  const readPostToggle = () => {
    if (readPostModal) setPostIndex(null);
    setReadPostModal(!readPostModal);
  };

  const rowClickHandler = (e) => {
    const row = e.target.parentElement;
    const rowIndex = row.getAttribute('index');
    setPostIndex(rowIndex);
    readPostToggle();
  };

  const renderReadPost = () => {
    const values = [];
    if (rowsRef && postIndex) {
      rowsRef.childNodes[postIndex].childNodes.forEach((col) => {
        values.push(col.getAttribute('value'));
      });
    }
    return <ReadPostModal values={values} toggle={readPostToggle} />;
  };

  useEffect(() => {
    const ref = tableRef.current.tableContainerDiv.current
      .childNodes[0].childNodes[0].children[1];
    setRowsRef(ref);
  }, []);

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
            onClick: newPostToggle,
            }]}
            columns={[
              { title: '분류', field: 'name' },
              { title: '제목', field: 'surname' },
              { title: '작성자', field: 'birthYear' },
              { title: '작성일자', field: 'birthCity' },
            ]}
            data={dummyBoardData}
            title="Dagather 게시판"
            onRowClick={(e) => rowClickHandler(e)}
            tableRef={tableRef}
          />
          <Modal isOpen={newPostModal} toggle={newPostToggle}>
            <NewPostModal toggle={newPostToggle} />
          </Modal>
          <Modal isOpen={readPostModal} toggle={readPostToggle}>
            {renderReadPost()}
          </Modal>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default CommunityPage;
