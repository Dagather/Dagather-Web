import React, { useState, useRef, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import NavBar from 'Components/NavBar';
import Jumbotron from 'Components/Jumbotron';
import Footer from 'Components/Footer';
import PostModal from 'Components/Modals/PostModal';

import tableIcons from 'Constants/icons';
import communityBg from 'Assets/img/background/community.jpg';

import { database } from 'Config/firebaseConfig';

import MaterialTable from 'material-table';
import { Modal } from 'reactstrap';

function CommunityPage() {
  const tableRef = useRef();
  const history = useHistory();

  const fbDatabase = database();

  const [curPage, setCurPage] = useState(0);

  const [newPostModal, setNewPostModal] = useState(false);
  const newPostToggle = () => setNewPostModal(!newPostModal);

  const [postList, setPostList] = useState([]);
  const [prevSnapshot, setPrevSnapshot] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const optionMapper = { 1: '업로드', 2: '수정', 3: '기타' };

  const rowClickHandler = (e, row) => {
    const { id } = row;
    history.push({ pathname: `/community/post/${id}` });
  };

  const fetchPostList = () => {
    fbDatabase.ref('posts').on('value', (snapshot) => {
      const data = snapshot.val();
      if (data && data !== prevSnapshot) {
        const keyList = Object.keys(data);
        const fetchedPostList = Object.values(data).map((post, index) => ({
          ...post,
          category: optionMapper[post.category],
          id: keyList[index],
        }));
        setPostList(fetchedPostList);
        setPrevSnapshot(data);
        setIsLoading(false);
      } else setIsLoading(false);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchPostList();
  }, []);

  useEffect(() => {
    fetchPostList();
  }, [newPostModal]);

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
            <MaterialTable
              style={tableStyle}
              options={{
                paginationType: 'stepped',
                initialPage: curPage,
                addRowPosition: 'first',
                showEmptyDataSourceMessage: false,
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
                { title: '작성일자', field: 'created_at', defaultSort: 'desc' },
                { title: 'id', field: 'id', hidden: true },
              ]}
              data={postList}
              title="Dagather 게시판"
              onRowClick={(e, row) => rowClickHandler(e, row)}
              onChangePage={(pageNum) => {
                setCurPage(pageNum);
              }}
              tableRef={tableRef}
              isLoading={isLoading}
            />
          </div>
          <Modal className="newPostModal" isOpen={newPostModal} toggle={newPostToggle}>
            <PostModal toggle={newPostToggle} mode="new" />
          </Modal>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CommunityPage;
