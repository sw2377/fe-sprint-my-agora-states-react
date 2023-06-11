const { agoraStatesDiscussions } = require("../repository/discussions");
const discussionsData = agoraStatesDiscussions;

const handleRequestBody = (req, res) => {
  const { title, author, bodyHTML } = req.body;

  if (!req.body) {
    return res.status(400).send("no request body");
  }
  
  if (!title && !author && !bodyHTML) {
    return res.status(400).send("bad request");
  }

  return true;
}

const discussionsController = {

  findAll: (req, res) => {
    // TODO: 모든 discussions 목록을 응답합니다.
    res.status(200).send(discussionsData);
  },

  findById: (req, res) => {
    // TODO: 요청으로 들어온 id와 일치하는 discussion을 응답합니다.
    const { id } = req.params;
    
    const filteredData = discussionsData.filter((data) => data.id === Number(id));

    if (filteredData.length) {
      res.status(200).json(filteredData[0]);
    } else {
      res.status(404).json("Not Found");
    }
  },

  // 🔥 추가 create, updateById, deleteById
  create: (req, res) => {
    const { title, author, bodyHTML } = req.body;

    if (handleRequestBody(req, res) !== true) {
      return
    }

    /* request example
    {
      "title": "제목입니다.",
      "author": "죠르디",
      "bodyHTML": "질문이 있습니다!"
    } 
     */
    const id = parseInt(Math.random() * 1000);
    const newDiscussion = {
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      title,
      url: null,
      author,
      answer: null,
      bodyHTML,
      avatarUrl: null
    };

    discussionsData.unshift(newDiscussion);
    return res.status(201).send(`created id: ${id}`)
  },

  updateById: (req, res) => {
    const { id } = req.params;
    const bodyData = req.body

    if (handleRequestBody(req, res) !== true) {
      return
    }

    // 요청된 id의 index를 찾아 해당하는 데이터를 수정
    const updatedIdx = discussionsData.findIndex((el) => el.id === Number(id) );

    if (updatedIdx === -1) { // 일치하는 id가 없는 경우
      return res.status(404).send("Not Found");
    } else { // 일치하는 id가 있는 경우
      const updatedData = { 
        ...discussionsData[updatedIdx], 
        ...bodyData,
        updatedAt: new Date().toISOString(), 
      }
  
      discussionsData.splice(updatedIdx, 1, updatedData)
      return res.status(200).send(`updated id: ${id}`)
    }
  },

  deleteById: (req, res) => {
    const { id } = req.params;

    // 요청된 id의 index를 찾아 해당하는 데이터를 삭제
    const idx = discussionsData.findIndex((el) => el.id === Number(id))
    console.log("idx", idx) // id:45를 선택한 경우 idx는 0, 일치하는 id가 없는 경우 -1

    if (idx !== -1) {
      discussionsData.splice(idx, 1); // idx부터 요소 1개 삭제
      return res.status(202).send(`deleted id: ${id}`)
    } else {
      return res.status(404).send("Not Found");
    }
  }

};

module.exports = {
  discussionsController,
};
