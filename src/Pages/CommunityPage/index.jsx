import React, { useState, useRef, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import NavBar from 'Components/NavBar';
import Jumbotron from 'Components/Jumbotron';
import Footer from 'Components/Footer';
import Post from 'Components/Post';
import NewPostModal from 'Components/Modals/NewPostModal';

import tableIcons from 'Constants/icons';
import dummyBoardData from 'Constants/dummy';
import communityBg from 'Assets/img/background/community.jpg';

import MaterialTable from 'material-table';
import { Modal } from 'reactstrap';

function CommunityPage() {
  const tableRef = useRef();
  const history = useHistory();

  const [curPage, setCurPage] = useState(0);

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
    history.push({ pathname: '/community/post/1' });
  };

  const renderReadPost = () => {
    const values = [];
    if (rowsRef && postIndex) {
      rowsRef.childNodes[postIndex].childNodes.forEach((col) => {
        values.push(col.getAttribute('value'));
      });
    }
    return <Post values={values} toggle={readPostToggle} />;
  };

  const setRef = () => {
    const ref = tableRef.current.tableContainerDiv.current
      .childNodes[0].childNodes[0].children[1];
    setRowsRef(ref);
  };

  useEffect(() => {
    setRef();
    // fetchDb();
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
          <div className="communityPage__content">
            {!readPostModal && (
            <MaterialTable
              style={tableStyle}
              options={{
                paginationType: 'stepped',
                initialPage: curPage,
              }}
              icons={tableIcons}
              actions={[{ icon: () => (
                '글쓰기'
              ),
              isFreeAction: true,
              onClick: newPostToggle,
              }]}
              columns={[
                { title: '분류', field: 'category' },
                { title: '제목', field: 'title' },
                { title: '작성자', field: 'author' },
                { title: '작성일자', field: 'created_at' },
              ]}
              data={dummyBoardData}
              title="Dagather 게시판"
              onRowClick={(e) => rowClickHandler(e)}
              onChangePage={(pageNum) => {
                setRef();
                setCurPage(pageNum);
              }}
              tableRef={tableRef}
            />
            )}
            {readPostModal && renderReadPost()}
          </div>
          <Modal isOpen={newPostModal} toggle={newPostToggle}>
            <NewPostModal toggle={newPostToggle} />
          </Modal>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CommunityPage;
