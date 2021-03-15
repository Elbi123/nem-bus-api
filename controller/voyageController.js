const fs = require("fs");

const voyages = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/data.json`, (err) => {
      if (err) {
          console.log(err);
      }
  })
);

exports.getAllVoyage = (req, res) => {
  res.status(200).json({
      status: "success",
      total: voyages.length,
      data: {
          voyages: voyages,
      },
  });
};

exports.getVoyage = (req, res) => {
  const id = parseInt(req.params.id);
  const voyage = voyages.find((el) => el.id === id);
  if (!voyage) {
      res.status(404).json({
          status: fail,
          message: "Invalid ID",
      });
  }
  res.status(200).json({
      status: "success",
      data: {
          voyage: voyage,
      },
  });
};

exports.createVoyage = (req, res) => {
  const newId = voyages[voyages.length - 1].id + 1;
  const newVoyage = Object.assign({ id: newId }, req.body);
  voyages.push(newVoyage);
  fs.writeFile(
      `${__dirname}/data/data.json`,
      JSON.stringify(voyages),
      (err) => {
          res.status(201).json({
              status: "success",
              voyage: newVoyage,
          });
      }
  );
};

exports.updateVoyage = (req, res) => {
  if (req.params.id * 1 > voyages.length) {
      res.status(404).json({
          status: fail,
          message: "Invalid ID",
      });
  }
  res.status(200).json({
      status: "success",
      data: {
          voyage: "Updated",
      },
  });
};

exports.deleteVoyage = (req, res) => {
  if (req.params.id * 1 > voyages.length) {
      res.status(404).json({
          status: fail,
          message: "Invalid ID",
      });
  }
  res.status(204).json({
      status: "success",
      data: {},
  });
};