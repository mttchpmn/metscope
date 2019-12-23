const Brief = require("../../../database/models").Brief;

module.exports = async (req, res) => {
  const brief = await Brief.findOne({ order: [["createdAt", "DESC"]] });
  return res.status(200).json({ data: brief });
};
