const { agoraStatesDiscussions } = require("../repository/discussions");
const discussionsData = agoraStatesDiscussions;

const handleRequestBody = (req, res) => {
  if (!req.body) return res.status(400).send("no request body");

  const { title, author, bodyHTML } = req.body;

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


  },

  updateById: (req, res) => {

  },

  deleteById: (req, res) => {
    // const { id } = req.params;

    console.log("test")
  }

};

module.exports = {
  discussionsController,
};
